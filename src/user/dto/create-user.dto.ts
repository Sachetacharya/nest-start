import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsNumber, IsString, Max, Min } from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'Name is a required field' })
  @IsString()
  name: string;

  @ApiProperty()
  @IsNumber()
  @Max(99, {
    message: 'Age must be less than 100',
  })
  @Min(1, {
    message: 'Age must be more than 1',
  })
  age: number;

  @ApiProperty()
  @IsEmail({}, { message: 'Email must be a valid email address' })
  email: string;
}