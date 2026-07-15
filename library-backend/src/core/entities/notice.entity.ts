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
export class Notice extends BaseEntity {
  @Column()
  title: string;

  @Column('text')
  message: string;

  @Column('date')
  validTill: Date;

  @ManyToOne(() => Branch)
  branch: Branch;

  @ManyToOne(() => User)
  createdBy: User;
}
