import { Injectable } from '@nestjs/common';
import { LoginDto } from 'src/auth/dto/login.dto';
import { RegistrerDto } from 'src/auth/dto/register.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UserService {
    constructor(private readonly prismaService:PrismaService){}


    async createuser(registerDto:RegistrerDto){
        return await this.prismaService.user.create({data:registerDto})  
    
        
    }
    async getUserByEmail(email:string){
        return this.prismaService.user.findFirst({where:{email}})
    }
} 
