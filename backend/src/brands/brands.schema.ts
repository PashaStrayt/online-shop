import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type BrandDocument = HydratedDocument<Brand>;

@Schema()
export class Brand {
  _id: string;

  @Prop({ required: true, unique: true })
  name: string;
}

export const BrandSchema = SchemaFactory.createForClass(Brand);