import { v4 as uuid } from "uuid";
import { Permission } from "./permission.entity";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
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

  @Column()
  version: string;

  @OneToMany(() => Permission, (permission) => permission.term)
  permissionsIncluded: Permission[];

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
