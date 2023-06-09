import { v4 as uuid } from "uuid";
import { User } from "./user.entity";
import { Term } from "./term.entity";
import { Permission } from "./permission.entity";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
} from "typeorm";

@Entity("logPermissionAcceptance")
export class LogPermissionAcceptance {
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
  termVersion: string;

  @ManyToOne(() => Permission)
  permission: Permission;

  @Column()
  accept: boolean;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
