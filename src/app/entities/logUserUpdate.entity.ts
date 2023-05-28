import { v4 as uuid } from "uuid";
import { User } from "./user.entity";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
} from "typeorm";

@Entity("logUserUpdate")
export class LogUserUpdate {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @CreateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP(6)",
  })
  date: Date;

  @Column()
  attribute: string;

  @Column()
  oldValue: string;

  @Column()
  newValue: string;

  @ManyToOne(() => User)
  user: User;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
