import { ConflictException, HttpException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User, UserRole } from 'src/models/user.entity';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken'
import { SigninDto, SignupDto } from 'src/dtos/auth.dto';
import { MailService } from 'src/mail/mail.service';

interface SignupParams {
    email: string;
    password: string;
    name: string;
    phone: string;
}

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
        private mailService: MailService){}

    async signup(user: SignupDto, userType: UserRole) {
        const userExists =  await this.userRepository.findOne({
            where: {email: user.email}
        })

        if(userExists) {
            throw new ConflictException()
        }

        const User = this.userRepository.create(user);
        User.password = await bcrypt.hash(user.password, 10);

        const newUser =  await this.userRepository.save(User);

        return this.generateJWT(newUser.name, newUser.id)

    }

    async signin(user: SigninDto){
        const loggedUser = await this.userRepository.findOne({
            where: {email: user.email}
        });

        if(!loggedUser) {
            throw new HttpException("Invalid login credentials", 400)
        }

        const hashedPassword = loggedUser.password;

        const isPasswordValid = await bcrypt.compare(user.password, hashedPassword);

        if(!isPasswordValid) {
            throw new HttpException('Invalid Credentials', 400);
        }

        const token = this.generateJWT(loggedUser.name,loggedUser.id)

        return token
    }


    private generateJWT(name: string, id: number) {
        return jwt.sign({
            name,
            id,
        },process.env.JSON_TOKEN_KEY, {
            expiresIn: 360000
        })
    }

    generateProductKey(email: string, userType: UserRole) {
        const string  = `${email}-${userType}-${process.env.PRODUCT_KEY_SECRET}`

        return bcrypt.hash(string, 10);
    }

}