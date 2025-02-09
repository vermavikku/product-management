import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id!: number; // Using "!" to tell TypeScript that this will be initialized by TypeORM

  @Column()
  sku!: string;

  @Column()
  name!: string;

  @Column("decimal")
  price!: number;

  @Column("text", { array: true })
  images!: string[];

  // Optional: Add a constructor if you prefer explicit initialization
  constructor(sku: string, name: string, price: number, images: string[]) {
    this.sku = sku;
    this.name = name;
    this.price = price;
    this.images = images;
  }
}
