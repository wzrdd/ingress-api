import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Contacts implements Entities.Contact {
  @PrimaryGeneratedColumn("uuid")
  id?: string

  @Column()
  email?: string

  @Column()
  message?: string

  @Column()
  status?: string
}
