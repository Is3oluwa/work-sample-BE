import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './auth/jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { User } from 'src/models/user.entity';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { MailModule } from 'src/mail/mail.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), PassportModule, MailModule, JwtModule.register({
    secret: process.env.JSON_TOKEN_KEY,
    signOptions: { expiresIn: '2d'}
  })],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class UserModule {}
