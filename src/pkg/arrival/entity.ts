import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Arrivals implements Entities.Arrival {
  @PrimaryGeneratedColumn("uuid")
  id?: string

  // Includes timezone (tz)
  @Column({ type: 'timestamptz' })
  entryDate: Date;

  @Column("simple-array")
  productId?: string[]

  @Column()
  supplierId?: string

  @Column()
  aditionalNotes?: string
}
