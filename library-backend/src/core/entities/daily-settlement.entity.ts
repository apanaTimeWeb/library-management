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
export class DailySettlement extends BaseEntity {

  @ManyToOne(() => Branch)
  branch: Branch;

  @Column('date')
  settlementDate: Date;

  @Column('decimal', { precision: 10, scale: 2 })
  totalCashCollected: number;

  @Column('decimal', { precision: 10, scale: 2 })
  totalUPICollected: number;

  @Column('decimal', { precision: 10, scale: 2 })
  totalCardCollected: number;

  @Column('decimal', { precision: 10, scale: 2 })
  totalExpenses: number;

  @Column('decimal', { precision: 10, scale: 2 })
  netProfit: number;

  @ManyToOne(() => User)
  closedBy: User;
}
