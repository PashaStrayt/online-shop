import { PropertyType } from "../types/property.type";

export class CreateDeviceDto {
  readonly name: string;
  readonly description: string;
  readonly price: number;
  readonly properties: PropertyType[];
  readonly category_id: string;
  readonly brand_id: string;
}