import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type LoginDocument = HydratedDocument<Login>;

@Schema({
  toJSON: {
    transform: (_, ret) => {
      delete ret._id;
      delete ret.__v;
    },
  },
})
export class Login {
  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string
}

export const LoginSchema = SchemaFactory.createForClass(Login);
