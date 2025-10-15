import { Body, Controller, Get, Post  } from '@nestjs/common';
import { RegistrerDto } from './dto/register.dto';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {

  constructor(private readonly authService: AuthService) { }
  @Post("/register")
  async register(@Body() registrerDto: RegistrerDto ) {

    return this.authService.register(registrerDto)

  }



  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.loginUser(loginDto)

  }





}
