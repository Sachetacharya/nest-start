import { Body, ConflictException, Controller, HttpException, HttpStatus, LoggerService, NotFoundException, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { LoginUserDto } from 'src/login/dto/login-user.dto';
import { LoginService } from 'src/login/service/login/login.service';
import { Response } from 'src/shared/models/response.mode';

@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) { }


  @Post()
  @UsePipes(new ValidationPipe())
  async login(@Body() loginUserDto: LoginUserDto): Promise<Response<boolean>> {
    try {
      await this.loginService.login(loginUserDto)
      return {
        message: 'Login successfully',
        data: true,
        statusCode: HttpStatus.OK
      }
    } catch (error) {
      return this.handleControllerError(error, 'failed to login')
    }
  }

  @Post('createPassword')
  @UsePipes(new ValidationPipe())
  async createLogin(@Body() loginUserDto: LoginUserDto): Promise<Response<boolean>> {
    try {
      await this.loginService.create(loginUserDto);
      return {
        message: 'Password set successfully',
        data: true,
        statusCode: HttpStatus.CREATED
      }
    } catch (error) {
      return this.handleControllerError(error, 'Failed to set password')
    }
  }



  private handleControllerError(error: any, message: string): never {
    if (error instanceof HttpException) {
      throw error;
    }
    if (error instanceof ConflictException) {
      throw new ConflictException({ message: error.message });
    }
    if (error instanceof NotFoundException) {
      throw new NotFoundException({ message: error.message });
    }
    throw new HttpException(
      { message, error: error.message || 'Internal Server Error' },
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}
