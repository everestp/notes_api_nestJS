import { ConflictException, Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { RegistrerDto } from './dto/register.dto';
import { UserService } from 'src/user/user.service';
import bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
@Injectable()
export class AuthService {
    private readonly logger = new Logger(AuthService.name)
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService

    ) { }
    async register(registrerDto: RegistrerDto) {
        const user = await this.userService.getUserByEmail(registrerDto.email)
        //check email  or username is already exist or not
        if (user) {
            throw new ConflictException("Email already Taken ")
        }

        // hash the passowrd
        const saltRound = 10;
        const hashedPassword = await bcrypt.hash(registrerDto.password, saltRound);
        const newUser = await this.userService.createuser({ ...registrerDto, password: hashedPassword })
        this.logger.log(`New user  is Created  :",${newUser.id}`)
        // generate JWt token

        const payload = { sub: newUser.id, email: newUser.email }
        const token = await this.jwtService.signAsync(payload)
        return { token }

    }


    async loginUser(loginDto: LoginDto) {
        /**
         * 
         *1. GEt the user from the db
         2 . Match the password with hash passwword
         3. Create JWT token
         4. Return JWT token
         */

        const user = await this.userService.getUserByEmail(loginDto.email)
        if (!user) {
            throw new UnauthorizedException("Email or password is incorrect")
        }
        const isMatch = await bcrypt.compare(loginDto.password, user.password)

        //DOn tell which one is in correct just tell genetic message every time that passwprd or email is incorecct dont say email not exist 
        if (!isMatch) {
            throw new UnauthorizedException("Email or password is incorrect")
        }
        const payload = { sub: user.id, email: user.email }
        const token = await this.jwtService.signAsync(payload)
        return {
            message: "Login Successfull",
            suscess: true,
            data: token

        }

    }





}
