import { Controller, Get, Post, Body, Patch, Param, Delete, UseFilters, HttpCode, HttpException, HttpStatus, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { HttpExceptionFilter } from 'src/middleware/http-exception.filter.ts';
import AuthModel from './models/auth.model';
import * as responseMessage from 'src/utils/response.message.json';
import { JoiValidationPipe } from 'src/middleware/validation-pipe';
import { CreateAuthValidator } from './validators/create-auth';
import { Request } from 'express';
import { AccessTokenGuard } from 'src/middleware/guards/access_token.guard';
import { RefreshTokenGuard } from 'src/middleware/guards/refresh_token.guard';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @UseFilters(new HttpExceptionFilter())
  @HttpCode(HttpStatus.CREATED)
  @Post('/signup/:locale')
  async signUp(@Param('locale') locale: string, @Body(new JoiValidationPipe(CreateAuthValidator)) createAuthDto: CreateAuthDto): Promise<AuthModel<any>> {
    try {
      return await this.authService.signUp(locale, createAuthDto);
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
  @Post('/signin/:locale')
  async signIn(@Param('locale') locale: string, @Body(new JoiValidationPipe(CreateAuthValidator)) createAuthDto: CreateAuthDto): Promise<AuthModel<any>> {
    try {
      return await this.authService.signIn(locale, createAuthDto);
    } catch (error) {
      throw new HttpException({
        status: error.status,
        error: error.error,
        message: error.message,
      }, error.status);
    }
  }

  @UseGuards(AccessTokenGuard)
  @UseFilters(new HttpExceptionFilter())
  @HttpCode(HttpStatus.OK)
  @Post('/signout/:locale')
  async signOut(@Param('locale') locale: string, @Req() req: Request): Promise<AuthModel<any>> {
    try {
      const user = req.user;
      return await this.authService.signOut(locale, user['sub']);
    } catch (error) {
      throw new HttpException({
        status: error.status,
        error: error.error,
        message: error.message,
      }, error.status);
    }
  }

  @UseGuards(RefreshTokenGuard)
  @UseFilters(new HttpExceptionFilter())
  @HttpCode(HttpStatus.OK)
  @Post('/refresh/:locale')
  async refreshToken(@Param('locale') locale: string, @Req() req: Request): Promise<AuthModel<any>> {
    try {
      const user = req.user;
      return await this.authService.refreshToken(locale, user['sub'], user['refresh_token']);
    } catch (error) {
      throw new HttpException({
        status: error.status,
        error: error.error,
        message: error.message,
      }, error.status);
    }
  }
}
