import { Module } from '@nestjs/common';
import { BusinessLogicService } from './business_logic.service';
import { UserModule } from 'src/persistence/user/user.module';
import { AccessTokenStrategy } from 'src/middleware/strategies/access_token.strategy';
import { RefreshTokenStrategy } from 'src/middleware/strategies/refresh_token.strategy';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [JwtModule.register({}), UserModule],
  providers: [BusinessLogicService, AccessTokenStrategy, RefreshTokenStrategy],
  exports: [BusinessLogicService]
})
export class BusinessLogicModule { }
