import { Entity, PrimaryGeneratedColumn, Column, Unique, OneToOne } from "typeorm";
import { Personal } from "./personal.entity";
import { Goals } from "./goals.entity";

@Entity()
@Unique(["username"])
@Unique(["email"])
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100, unique: true })
  username: string;

  @Column({ length: 200, unique: true })
  email: string;

  @Column()
  password: string;

  @OneToOne(() => Personal, (personal) => personal.user)
  personal: Personal;

  @OneToOne(() => Goals, (goals) => goals.user)
  goals: Goals;
}