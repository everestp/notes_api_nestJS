import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from 'src/user/user.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { jwtConstants } from './constants';

@Module({
  
  imports:[UserModule , JwtModule.register({
    global:true,
    secret:jwtConstants.secret,
    signOptions:{expiresIn:"7d"}
  }) ],
  controllers: [AuthController],
  providers: [AuthService ]
})
export class AuthModule {}
