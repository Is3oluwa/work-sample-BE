import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsPhoneNumber, IsString, MinLength } from 'class-validator'
import { UserRole } from 'src/models/user.entity';

export class SignupDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsPhoneNumber("NG")
    phoneNo: string;

    @IsEmail()
    email: string;

    @IsString()
    @MinLength(5)
    password: string; 

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    productKey?: string;
}

export class SigninDto {
    @IsEmail()
    email: string;

    @IsString()
    @MinLength(5)
    password: string;
}
export class GeneratekeyDto {
    @IsEmail()
    email: string;

    @IsEnum(UserRole)
    userType: UserRole
}