import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Roles implements Entities.Role {
  @PrimaryGeneratedColumn("uuid")
  id?: string

  @Column()
  name?: string
}
