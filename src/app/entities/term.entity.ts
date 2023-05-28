import { v4 as uuid } from "uuid";
import { User } from "./user.entity";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  CreateDateColumn,
} from "typeorm";

@Entity("term")
export class Term {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @CreateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP(6)",
  })
  createdAt: Date;

  @Column()
  title: string;

  @Column()
  description: string;

  @ManyToMany(() => User, (user) => user.acceptedTerms)
  @JoinTable()
  usersWhoAccepted: User[];

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
