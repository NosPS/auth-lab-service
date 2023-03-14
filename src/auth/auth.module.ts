import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { BusinessLogicModule } from 'src/business_logic/business_logic.module';

@Module({
  imports: [BusinessLogicModule],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule { }
