import {
  Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, Query, UsePipes, ValidationPipe
} from '@nestjs/common';
import { User } from 'src/schemas/user.schema';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserService } from 'src/user/service/user/user.service';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { Response } from 'src/shared/models/response.mode';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post('createUser')
  @UsePipes(new ValidationPipe())
  async createUser(@Body() createUserDto: CreateUserDto): Promise<Response<User>> {
    try {
      const createdUser = await this.userService.create(createUserDto);
      return {
        message: 'User created successfully',
        data: createdUser,
        statusCode: HttpStatus.CREATED,
      };
    } catch (error) {
      return this.handleControllerError(error, 'Failed to create user');
    }
  }

  @Get('/getUsers')
  @UsePipes(new ValidationPipe())
  async getAllUsers(): Promise<Response<User[]>> {
    try {
      const users = await this.userService.findAll();
      return {
        statusCode: HttpStatus.OK,
        message: 'Users fetched successfully',
        data: users.map(({ email, name, age, id }) => ({ email, name, age, id })),
      };
    } catch (error) {
      return this.handleControllerError(error, 'Failed to retrieve users');
    }
  }

  @Get('getUserById')
  @UsePipes(new ValidationPipe())
  async getUserById(@Query('id') id: string): Promise<Response<User>> {
    try {
      const user = await this.userService.getById(id);
      if (!user) {
        throw new NotFoundException(`User with ID "${id}" not found`);
      }
      return {
        statusCode: HttpStatus.OK,
        message: 'User fetched successfully',
        data: user,
      };
    } catch (error) {
      return this.handleControllerError(error, 'Failed to retrieve user');
    }
  }

  @Delete('/deleteAllUsers')
  @UsePipes(new ValidationPipe())
  async deleteAllUsers(): Promise<Response<null>> {
    try {
      await this.userService.deleteAll();
      return {
        statusCode: HttpStatus.OK,
        message: 'All users deleted successfully',
        data: null,
      };
    } catch (error) {
      return this.handleControllerError(error, 'Failed to delete all users');
    }
  }

  @Delete('deleteById')
  @UsePipes(new ValidationPipe())
  async deleteUserById(@Query('id') id: string): Promise<Response<boolean>> {
    try {
      const result = await this.userService.deleteById(id);
      if (!result) {
        throw new NotFoundException(`User with ID "${id}" not found`);
      }
      return {
        statusCode: HttpStatus.OK,
        message: 'User deleted successfully',
        data: true,
      };
    } catch (error) {
      return this.handleControllerError(error, 'Failed to delete user');
    }
  }

  @Put('/editUser/:id')
  @UsePipes(new ValidationPipe())
  async updateUserById(
    @Param('id') id: string,
    @Body() createUserDto: CreateUserDto,
  ): Promise<Response<User>> {
    try {
      const updatedUser = await this.userService.updateById(id, createUserDto);
      if (!updatedUser) {
        throw new NotFoundException(`User with ID "${id}" not found`);
      }
      return {
        statusCode: HttpStatus.OK,
        message: 'User updated successfully',
        data: updatedUser,
      };
    } catch (error) {
      return this.handleControllerError(error, 'Failed to update user');
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
