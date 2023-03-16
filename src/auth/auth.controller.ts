import { Controller, Get, Post, Body, Patch, Param, Delete, UseFilters, HttpCode, HttpException, HttpStatus, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/signin.dto';
import { SignUpDto } from './dto/signup.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { HttpExceptionFilter } from 'src/middleware/http-exception.filter.ts';
import AuthModel from './models/auth.model';
import { JoiValidationPipe } from 'src/middleware/validation-pipe';
import { SignInValidator } from './validators/signin';
import { SignUpValidator } from './validators/signup';
import { RefreshTokenGuard } from 'src/middleware/guards/refresh_token.guard';
import { GetCurrentUserId } from 'src/middleware/decorators/get-current-user-id.decorator';
import { GetCurrentUser } from 'src/middleware/decorators/get-current-user.decorator';
import { Public } from 'src/middleware/decorators/public.decorator';

@ApiBearerAuth()
@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Public()
  @UseFilters(new HttpExceptionFilter())
  @HttpCode(HttpStatus.CREATED)
  @Post('/signup/:locale')
  async signUp(@Param('locale') locale: string, @Body(new JoiValidationPipe(SignUpValidator)) signUpDto: SignUpDto): Promise<AuthModel<any>> {
    try {
      return await this.authService.signUp(locale, signUpDto);
    } catch (error) {
      throw new HttpException({
        status: error.status,
        error: error.error,
        message: error.message,
      }, error.status);
    }
  }

  @Public()
  @UseFilters(new HttpExceptionFilter())
  @HttpCode(HttpStatus.OK)
  @Post('/signin/:locale')
  async signIn(@Param('locale') locale: string, @Body(new JoiValidationPipe(SignInValidator)) signInDto: SignInDto): Promise<AuthModel<any>> {
    try {
      return await this.authService.signIn(locale, signInDto);
    } catch (error) {
      throw new HttpException({
        status: error.status,
        error: error.error,
        message: error.message,
      }, error.status);
    }
  }

  @UseFilters(new HttpExceptionFilter())
  @HttpCode(HttpStatus.OK)
  @Post('/signout/:locale')
  async signOut(@Param('locale') locale: string, @GetCurrentUserId() user_id: string): Promise<AuthModel<any>> {
    try {
      console.log(user_id);
      
      return await this.authService.signOut(locale, user_id);
    } catch (error) {
      throw new HttpException({
        status: error.status,
        error: error.error,
        message: error.message,
      }, error.status);
    }
  }

  @Public()
  @UseGuards(RefreshTokenGuard)
  @UseFilters(new HttpExceptionFilter())
  @HttpCode(HttpStatus.OK)
  @Post('/refresh/:locale')
  async refreshToken(
    @Param('locale') locale: string,
    @GetCurrentUserId() user_id: string,
    @GetCurrentUser('refresh_token') refresh_token: string
  ): Promise<AuthModel<any>> {
    try {
      return await this.authService.refreshToken(locale, user_id, refresh_token);
    } catch (error) {
      throw new HttpException({
        status: error.status,
        error: error.error,
        message: error.message,
      }, error.status);
    }
  }
}
