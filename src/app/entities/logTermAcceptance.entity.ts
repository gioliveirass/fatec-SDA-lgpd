import { v4 as uuid } from "uuid";
import { User } from "./user.entity";
import { Term } from "./term.entity";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
} from "typeorm";

@Entity("logTermAcceptance")
export class LogTermAcceptance {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @CreateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP(6)",
  })
  date: Date;

  @ManyToOne(() => User)
  user: User;

  @ManyToOne(() => Term)
  term: Term;

  @Column()
  accept: boolean;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
