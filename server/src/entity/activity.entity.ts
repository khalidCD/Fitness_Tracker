import { Entity, PrimaryGeneratedColumn, Column, Unique } from "typeorm";

@Entity()
@Unique(["username"])
export class Activity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column({ type: "int", default: 0 })
  steps: number;

  @Column({ type: "float", default: 0 })
  water: number;
}