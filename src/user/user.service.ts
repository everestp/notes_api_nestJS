import { Injectable } from '@nestjs/common';
import { RegistrerDto } from 'src/auth/dto/register.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UserService {
    constructor(private readonly prismaService:PrismaService){}
     async getUserByEmail(email:string){
        //call databases  and check the email 
       const user =   await  this.prismaService.user.findFirst({where :{email}})
        return user
    }


    async createuser(registerDto:RegistrerDto){
        return await this.prismaService.user.create({data:registerDto})    }
} 
