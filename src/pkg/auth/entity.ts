import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Auths implements Entities.Auth {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  token: string;

  @Column("uuid")
  userId: string;
}
