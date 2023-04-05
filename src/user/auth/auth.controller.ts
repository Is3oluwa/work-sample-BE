import {
  Body,
  Controller,
  Param,
  ParseEnumPipe,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { GeneratekeyDto, SigninDto, SignupDto } from 'src/dtos/auth.dto';
import { UserRole } from 'src/models/user.entity';
import { AuthService } from './auth.service';
import * as bcrypt from 'bcrypt';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup/:userType')
  async signup(
    @Body() body: SignupDto,
    @Param('userType', new ParseEnumPipe(UserRole)) userType: UserRole.USER,
  ) {
    if (userType !== UserRole.USER) {
      if (!body.productKey) {
        throw new UnauthorizedException();
      }

      const validProductKey = `${body.email}-${userType}-${process.env.PRODUCT_KEY_SECRET}`;

      const isValidProductKey = await bcrypt.compare(
        validProductKey,
        body.productKey,
      );

      if (!isValidProductKey) {
        if (!body.productKey) {
          throw new UnauthorizedException();
        }
      }
    }
    const jwt = await this.authService.signup(body, userType);
    return { jwt }
  }

  @Post('/signin')
  signin(@Body() body: SigninDto) {
    return this.authService.signin(body);
  }

  @Post('/key')
  generateProductKey(@Body() { email, userType }: GeneratekeyDto) {
    return this.authService.generateProductKey(email, userType);
  }
}
