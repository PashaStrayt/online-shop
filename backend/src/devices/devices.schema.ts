import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { Brand } from "src/brands/brands.schema";
import { Category } from "src/categories/categories.schema";
import { PropertyType } from './types/property.type';
import { ReviewType } from './types/review.type';

export type DeviceDocument = HydratedDocument<Device>;

@Schema()
export class Device {
  _id: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  price: number;

  @Prop()
  images: string[];

  @Prop()
  properties: PropertyType[];

  @Prop()
  reviews: ReviewType[];

  @Prop({required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Category'})
  category: Category;

  @Prop({required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Brand'})
  brand: Brand;
}

export const DeviceSchema = SchemaFactory.createForClass(Device);