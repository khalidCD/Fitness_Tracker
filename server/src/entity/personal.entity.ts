import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from "typeorm";
import { User } from "./user.entity";

@Entity()
export class Personal {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: '' })
  fullname: string;

  @Column({ default: '' })
  location: string;

  @Column({ type: 'date', nullable: true })
  dob: Date | null;

  @Column({ type: "int", default: 0 })
  height: number;

  @Column({ type: "int", default: 0 })
  weight: number;

  @OneToOne(() => User, (user) => user.personal, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn({ name: "username", referencedColumnName: "username" })
  user: User;

  @Column()
  username: string;
}