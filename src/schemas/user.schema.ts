import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsNumber, Min } from 'class-validator';
import { HydratedDocument } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export type UserDocument = HydratedDocument<User>;

@Schema({
  toJSON: {
    transform: (_, ret) => {
      delete ret._id;
      delete ret.__v;
    },
  },
})
export class User {
  @Prop({
    unique: true,
    default: uuidv4,
  })
  id: string;

  @Prop({ required: true },)
  name: string;

  @Prop({ required: true },)
  @IsNumber()
  @Min(1, { message: 'Age must be greater than 0' })
  age: number;

  @Prop({ required: true })
  email: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
