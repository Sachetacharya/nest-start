import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Login } from 'src/schemas/login.schema';
import { User } from 'src/schemas/user.schema';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    @InjectModel(Login.name) private readonly loginModel: Model<Login>,
  ) { }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { email } = createUserDto;
    const existingUser = await this.userModel.findOne({ email });
    if (existingUser) {
      throw new ConflictException(`User with email ${email} already exists`);
    }
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }


  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async getById(id: string): Promise<User> {
    const user = await this.userModel.findOne({ id }).exec();
    if (!user) {
      throw new NotFoundException(`User with ID "${id}" not found`);
    }
    return user;
  }

  async deleteById(id: string): Promise<boolean> {
    const result = await this.userModel.deleteOne({ id }).exec();
    if (result.deletedCount === 0) {
      throw new NotFoundException(`User with ID "${id}" not found`);
    }
    return true;
  }

  async deleteAll(): Promise<void> {
    await this.userModel.deleteMany().exec();
  }

  async updateById(id: string, updateData: CreateUserDto): Promise<User> {
    const user = await this.userModel.findOneAndUpdate({ id }, updateData, { new: true }).exec();
    if (!user) {
      throw new NotFoundException(`User with ID "${id}" not found`);
    }
    return user;
  }
}
