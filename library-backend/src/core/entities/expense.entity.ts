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
export class ExpenseCategory extends BaseEntity {

  @Column()
  name: string;

  @ManyToOne(() => Branch)
  branch: Branch;
}

@Entity()
export class Expense extends BaseEntity {

  @ManyToOne(() => Branch)
  branch: Branch;

  @ManyToOne(() => ExpenseCategory)
  category: ExpenseCategory;

  @Column('decimal', { precision: 10, scale: 2 })
  amount: number;

  @Column()
  description: string;

  @Column('date')
  expenseDate: Date;

  @ManyToOne(() => User)
  addedBy: User;
}
