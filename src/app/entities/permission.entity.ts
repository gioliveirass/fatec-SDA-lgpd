import { v4 as uuid } from "uuid";
import { User } from "./user.entity";
import { Term } from "./term.entity";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  CreateDateColumn,
  ManyToOne,
} from "typeorm";

@Entity("permission")
export class Permission {
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

  @ManyToMany(() => User, (user) => user.acceptedPermissions)
  usersWhoAccepted: User[];

  @ManyToOne(() => Term, (term) => term.permissionsIncluded)
  term: Term;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
