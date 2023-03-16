import { Injectable } from '@nestjs/common';
import { SignInDto } from './dto/signin.dto';
import { BusinessLogicService } from 'src/business_logic/business_logic.service';
import AuthModel from './models/auth.model';
import { SignUpDto } from './dto/signup.dto';

@Injectable()
export class AuthService {
  constructor(private businessLogicService: BusinessLogicService) { }
  async signUp(locale: string, signUpDto: SignUpDto): Promise<AuthModel<any>> {
    return this.businessLogicService.signUp(locale, signUpDto);
  }

  async signIn(locale: string, signInDto: SignInDto) {
    return this.businessLogicService.signIn(locale, signInDto);
  }

  async signOut(locale: string, user_id: string) {
    return this.businessLogicService.signOut(locale, user_id);
  }

  async refreshToken(locale: string, user_id: string, refresh_token: string) {
    return this.businessLogicService.refreshToken(locale, user_id, refresh_token);
  }
}
