import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsEmpty, IsNotEmpty, IsString, IsStrongPassword, minLength } from "class-validator";

export class RegistrerDto {


    @IsNotEmpty()
    @IsString()
    @ApiProperty()
      name :string;


      @IsEmail()
      email:string;



      @IsNotEmpty()
@IsStrongPassword()
      password:string;
}