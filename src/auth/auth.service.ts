import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { BusinessLogicService } from 'src/business_logic/business_logic.service';

@Injectable()
export class AuthService {
  constructor(private businessLogicService: BusinessLogicService) { }
  signUp(createAuthDto: CreateAuthDto) {
    return this.businessLogicService.signUp();
  }

  signIn(createAuthDto: CreateAuthDto) {
    return 'This action adds a new auth';
  }

  signOut(createAuthDto: CreateAuthDto) {
    return 'This action adds a new auth';
  }

  refreshToken(createAuthDto: CreateAuthDto) {
    return 'This action adds a new auth';
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
