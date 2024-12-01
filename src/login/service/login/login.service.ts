import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from 'src/login/dto/login-user.dto';
import { Login } from 'src/schemas/login.schema';
import { User } from 'src/schemas/user.schema';

@Injectable()
export class LoginService {
  constructor(
    @InjectModel(Login.name) private readonly loginModel: Model<Login>,
    @InjectModel(User.name) private readonly userModel: Model<User>
  ) { }

  async create(createUserDto: LoginUserDto): Promise<Login> {
    const { email, password } = createUserDto;

    const signUpEmail = await this.userModel.findOne({ email });
    if (signUpEmail) {
      const existingUser = await this.loginModel.findOne({ email });
      if (existingUser) {
        throw new ConflictException(`Password is already set for ${email}.`);
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const createdUser = new this.loginModel({ ...createUserDto, password: hashedPassword });

      return createdUser.save();
    } else {
      throw new ConflictException(`Email does not exist.`);
    }
  }



  async login(createUserDto: LoginUserDto): Promise<boolean> {
    const { email, password } = createUserDto;

    const user = await this.loginModel.findOne({ email });
    if (!user) {
      throw new NotFoundException('User not found.');
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      return true;
    } else {
      throw new NotFoundException('Password does not match.');
    }
  }
}
