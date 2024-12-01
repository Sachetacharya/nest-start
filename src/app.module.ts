import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { LoginModule } from './login/login.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://vanja:vanja123@cluster.nb7qd.mongodb.net/?retryWrites=true&w=majority'),
    UserModule,
    LoginModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
