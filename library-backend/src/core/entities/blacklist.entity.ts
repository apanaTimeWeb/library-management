import { BaseEntity } from './base.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { Branch } from './/branch.entity';
import { User } from './/user.entity';

@Entity()
export class Blacklist extends BaseEntity {

  @Column()
  phone: string;

  @Column({ nullable: true })
  name: string;

  @Column()
  reason: string;

  @ManyToOne(() => Branch)
  branch: Branch;

  @ManyToOne(() => User)
  addedBy: User;
}
