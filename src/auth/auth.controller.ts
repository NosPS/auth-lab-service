import { Controller, Get, Post, Body, Patch, Param, Delete, UseFilters, HttpCode, HttpException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { HttpExceptionFilter } from 'src/middleware/http-exception.filter.ts';
import AuthModel from './models/auth.model';
import * as responseMessage from 'src/utils/response.message.json';
import { JoiValidationPipe } from 'src/middleware/validation-pipe';
import { CreateAuthValidator } from './validators/create-auth';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @UseFilters(new HttpExceptionFilter())
  @HttpCode(201)
  @Post('/local/signup')
  signUp(@Body(new JoiValidationPipe(CreateAuthValidator)) createAuthDto: CreateAuthDto): AuthModel<any> {
    try {
      return new AuthModel<any>(
        responseMessage.signup.success.en,
        this.authService.signUp(createAuthDto),
      );
    } catch (error) {
      throw new HttpException({
        status: error.status,
        error: error.error,
        message: error.message,
      }, error.status);
    }
  }

  @Post('/local/signin')
  signIn(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.signIn(createAuthDto);
  }

  @Post('/signout')
  signOut(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.signOut(createAuthDto);
  }

  @Post('/refresh')
  refreshToken(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.refreshToken(createAuthDto);
  }

  @Get()
  findAll() {
    return this.authService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
    return this.authService.update(+id, updateAuthDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authService.remove(+id);
  }
}
