import { ConflictException, Injectable, Logger } from '@nestjs/common';
import { RegistrerDto } from './dto/register.dto';
import { UserService } from 'src/user/user.service';
import bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
    private readonly logger = new Logger(AuthService.name)
    constructor(
        private readonly userService:UserService,
        private readonly jwtService:JwtService

    ){}
    async  register(registrerDto:RegistrerDto){
       const user =  await   this.userService.getUserByEmail(registrerDto.email)
       //check email  or username is already exist or not
       if(user){
        throw new ConflictException("Email already Taken ")
       }

       // hash the passowrd
  const saltRound = 10;
  const hashedPassword =  await bcrypt.hash(registrerDto.password ,saltRound);
     const newUser =   await  this.userService.createuser({...registrerDto ,password:hashedPassword})
     this.logger.log(`New user  is Created  :",${newUser.id}`)
     // generate JWt token

const payload = {sub:newUser.id ,email:newUser.email }
  const token = await  this.jwtService.signAsync(payload)
   return {token}

    }


    getUserByEmail(registrerDto:RegistrerDto){
        return this.userService.getUserByEmail(registrerDto.email)
    }

}
