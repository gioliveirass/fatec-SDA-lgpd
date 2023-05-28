import { v4 as uuid } from "uuid";
import { Term } from "./term.entity";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  CreateDateColumn,
} from "typeorm";

@Entity("user")
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @CreateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP(6)",
  })
  createdAt: Date;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  cellphone: string;

  @Column()
  passwordHash: string;

  @ManyToMany(() => Term, (term) => term.usersWhoAccepted)
  @JoinTable()
  acceptedTerms: Term[];

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
