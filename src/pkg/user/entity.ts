import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Users implements Entities.User {
  @PrimaryGeneratedColumn("uuid")
  id?: string

  @Column()
  name?: string

  @Column()
  lastName?: string

  @Column()
  rut?: string

  @Column({ unique: true })
  email?: string

  @Column()
  phone?: string

  @Column()
  password?: string
}
