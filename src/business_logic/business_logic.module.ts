import { Module } from '@nestjs/common';
import { BusinessLogicService } from './business_logic.service';
import { UserModule } from 'src/persistence/user/user.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [UserModule],
  providers: [BusinessLogicService],
  exports: [BusinessLogicService]
})
export class BusinessLogicModule {}
