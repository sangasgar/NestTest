import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/guards/jwt-guard';
import { CreateUserDTO } from 'src/user/dto';
import { AuthService } from './auth.service';
import { UserLoginDTO } from './dto';
import { AuthUserResponce } from './responce';

@Controller('auth')
export class AuthController {
  constructor(private readonly authSetvice: AuthService) {}
  @ApiTags('API')
  @ApiResponse({ status: 200, type: CreateUserDTO })
  @Post('register')
  register(@Body() dto: CreateUserDTO) {
    return this.authSetvice.registerUsers(dto);
  }
  @ApiTags('API')
  @ApiResponse({ status: 200, type: AuthUserResponce })
  @Post('login')
  login(@Body() dto: UserLoginDTO): Promise<AuthUserResponce> {
    return this.authSetvice.loginUser(dto);
  }
  @UseGuards(JwtAuthGuard)
  @Post('test')
  test() {
    return true;
  }
}
