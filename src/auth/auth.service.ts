import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { BusinessLogicService } from 'src/business_logic/business_logic.service';
import AuthModel from './models/auth.model';

@Injectable()
export class AuthService {
  constructor(private businessLogicService: BusinessLogicService) { }
  async signUp(locale: string, createAuthDto: CreateAuthDto): Promise<AuthModel<any>> {
    return this.businessLogicService.signUp(locale, createAuthDto);
  }

  async signIn(locale: string, createAuthDto: CreateAuthDto) {
    return this.businessLogicService.signIn(locale, createAuthDto);
  }

  async signOut(locale: string, user_id: string) {
    return this.businessLogicService.signOut(locale, user_id);
  }

  async refreshToken(locale: string, user_id: string, refresh_token: string) {
    return this.businessLogicService.refreshToken(locale, user_id, refresh_token);
  }
}
