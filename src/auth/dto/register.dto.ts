import { IsEmail, IsEmpty, IsNotEmpty, IsString, IsStrongPassword, minLength } from "class-validator";

export class RegistrerDto {


    @IsNotEmpty()
    @IsString()
      name :string;


      @IsEmail()
      email:string;



      @IsNotEmpty()
@IsStrongPassword()
      password:string;
}