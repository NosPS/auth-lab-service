import { ForbiddenException, Injectable } from '@nestjs/common';
import { SignInDto } from 'src/auth/dto/signin.dto';
import AuthModel from 'src/auth/models/auth.model';
import { CreateUserDto } from 'src/persistence/user/dto/create-user.dto';
import { UserEntity } from 'src/persistence/user/entities/user.entity';
import { UserService } from 'src/persistence/user/user.service';
import { JwtService } from '@nestjs/jwt/dist';
import * as responseMessage from 'src/utils/response.message.json';
import * as bcrypt from 'bcrypt';
import TokensModel from './models/tokens.model';
import { SignUpDto } from 'src/auth/dto/signup.dto';

@Injectable()
export class BusinessLogicService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) { }

  async signUp(locale: string, signUpDto: SignUpDto): Promise<AuthModel<any>> {
    const existUserEntity: UserEntity = await this.userService.findOneByUsername(signUpDto.username);
    if (existUserEntity !== null) {
      throw new ForbiddenException(locale === "en" ? responseMessage.signup.found_username.en : responseMessage.signup.found_username.th);
    }
    const hash = await this.hashData(signUpDto.password);
    const createUserDto: CreateUserDto = {
      username: signUpDto.username,
      password: hash,
    }
    const newUser = await this.userService.create(createUserDto);
    const tokens = await this.getTokens(newUser.user_id, newUser.username);
    await this.updateRefreshToken(newUser.user_id, tokens.refresh_token);
    return new AuthModel<any>({
      message: locale === "en" ? responseMessage.signup.success.en : responseMessage.signup.success.th,
      result: tokens,
    });
  }

  async signIn(locale: string, signInDto: SignInDto): Promise<AuthModel<any>> {
    const existUserEntity: UserEntity = await this.userService.findOneByUsername(signInDto.username);
    if (existUserEntity === null) {
      throw new ForbiddenException(locale === "en" ? responseMessage.signin.not_found_username.en : responseMessage.signin.not_found_username.th);
    }
    const passwordMatches = await bcrypt.compare(signInDto.password, existUserEntity.password);
    if (passwordMatches === false) {
      throw new ForbiddenException(locale === "en" ? responseMessage.signin.wrong_password.en : responseMessage.signin.wrong_password.th);
    }
    const tokens = await this.getTokens(existUserEntity.user_id, existUserEntity.username);
    await this.updateRefreshToken(existUserEntity.user_id, tokens.refresh_token);
    return new AuthModel<any>({
      message: locale === "en" ? responseMessage.signin.success.en : responseMessage.signin.success.th,
      result: tokens,
    });
  }

  async signOut(locale: string, user_id: string): Promise<AuthModel<any>> {
    await this.userService.updateRefreshToken(user_id, null);
    const user = await this.userService.findOneByUserId(user_id);
    return new AuthModel<any>({
      message: locale === "en" ? responseMessage.signout.success.en : responseMessage.signout.success.th,
      result: {
        access_token: user.refresh_token,
        refresh_token: user.refresh_token
      },
    });
  }

  async refreshToken(locale: string, user_id: string, refresh_token: string): Promise<AuthModel<any>> {
    const existUserEntity: UserEntity = await this.userService.findOneByUserId(user_id);
    if (existUserEntity === null) {
      throw new ForbiddenException(locale === "en" ? responseMessage.refreshtoken.not_found_username.en : responseMessage.refreshtoken.not_found_username.th);
    }
    const refreshTokenMatches = await bcrypt.compare(refresh_token, existUserEntity.refresh_token);
    if (refreshTokenMatches === false) {
      throw new ForbiddenException(locale === "en" ? responseMessage.refreshtoken.rt_not_matches.en : responseMessage.refreshtoken.rt_not_matches.th);
    }
    const tokens = await this.getTokens(existUserEntity.user_id, existUserEntity.username);
    await this.updateRefreshToken(existUserEntity.user_id, tokens.refresh_token);
    return new AuthModel<any>({
      message: locale === "en" ? responseMessage.refreshtoken.success.en : responseMessage.refreshtoken.success.th,
      result: tokens,
    });
  }

  async updateRefreshToken(user_id: string, refresh_token: string) {
    const hash = await this.hashData(refresh_token);
    await this.userService.updateRefreshToken(user_id, hash);
  }

  // ---- Utils ---- //
  hashData(data: string) {
    return bcrypt.hash(data, 10);
  }

  async getTokens(user_id: string, username: string): Promise<TokensModel> {
    const [access_token, refresh_token] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: user_id,
          username: username
        },
        {
          secret: process.env.AT_SECRET,
          expiresIn: 60 * 60
        }
      ),
      this.jwtService.signAsync(
        {
          sub: user_id,
          username: username
        },
        {
          secret: process.env.RT_SECRET,
          expiresIn: 7 * 24 * 60 * 60
        }
      )
    ])
    return new TokensModel({
      access_token: access_token,
      refresh_token: refresh_token
    })
  }
  // ---- Utils ---- //
}
