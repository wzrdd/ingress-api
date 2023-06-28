import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Products implements Entities.Product {
  @PrimaryGeneratedColumn("uuid")
  id?: string

  @Column()
  name?: string

  @Column()
  quantityUnit?: string

  @Column()
  productType?: string

  @Column()
  quantityValue?: number

  @Column()
  description?: string
}
