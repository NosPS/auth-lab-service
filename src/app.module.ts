import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './persistence/user/user.module';
import { AuthModule } from './auth/auth.module';
import { BusinessLogicModule } from './business_logic/business_logic.module';
import { APP_GUARD } from '@nestjs/core';
import { AccessTokenGuard } from 'src/middleware/guards/access_token.guard';

@Module({
  imports: [
    ConfigModule.forRoot({
      // envFilePath: `.env.${process.env.NODE_ENV}`,
      isGlobal: true
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      migrationsRun: true,
    }), UserModule, AuthModule, BusinessLogicModule],
  controllers: [AppController],
  providers: [{
    provide: APP_GUARD,
    useClass: AccessTokenGuard,
  }, AppService],
})
export class AppModule { }
