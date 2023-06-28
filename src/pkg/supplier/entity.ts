import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Suppliers implements Entities.Supplier {
  @PrimaryGeneratedColumn("uuid")
  id?: string

  @Column()
  name?: string

  @Column()
  email?: string

  @Column()
  phone?: string
}
