import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from "typeorm";
import { User } from "./user.entity";

@Entity()
export class Goals {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "int", default: 0 })
  steps: number;

  @Column({ type: "int", default: 0 })
  runningkm: number;

  @Column({ type: "int", default: 0 })
  sleephours: number;

  @Column({ type: "int", default: 0 })
  targetweight: number;

  @Column({ type: "float", default: 0 })
  waterliters: number;

  @OneToOne(() => User, (user) => user.goals, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn({ name: "username", referencedColumnName: "username" })
  user: User;

  @Column()
  username: string;
}