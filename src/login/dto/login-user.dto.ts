import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsStrongPassword } from 'class-validator';

export class LoginUserDto {


  @ApiProperty()
  @IsEmail({}, { message: 'Email must be a valid email address' })
  email: string;

  @ApiProperty()
  @IsStrongPassword({ minLength: 3, }, { message: 'Enter strong Password' })
  password: string;
}