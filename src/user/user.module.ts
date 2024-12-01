import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../schemas/user.schema';
import { UserService } from './service/user/user.service';
import { UserController } from './controller/user/user.controller';
import { Login, LoginSchema } from 'src/schemas/login.schema';

@Module({

  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Login.name, schema: LoginSchema },
    ])
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {


}
