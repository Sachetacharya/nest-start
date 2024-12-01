import { Module } from '@nestjs/common';
import { LoginService } from './service/login/login.service';
import { LoginController } from './controller/login/login.controller';
import { Login, LoginSchema } from 'src/schemas/login.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/schemas/user.schema';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    UserModule,
    MongooseModule.forFeature([
      { name: Login.name, schema: LoginSchema },
      { name: User.name, schema: UserSchema },
    ]),

  ],
  providers: [LoginService],
  controllers: [LoginController]
})
export class LoginModule { }
