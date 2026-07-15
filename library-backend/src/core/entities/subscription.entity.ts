import { BaseEntity } from './base.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { Student } from './/student.entity';
import { Plan } from './/plan.entity';
import { Coupon } from './/coupon.entity';

@Entity()
export class Subscription extends BaseEntity {
  @ManyToOne(() => Student, (student) => student.subscriptions)
  student: Student;

  @ManyToOne(() => Plan)
  plan: Plan;

  @Column('date')
  startDate: Date;

  @Column('date')
  endDate: Date;

  @Column('decimal', { precision: 10, scale: 2 })
  baseAmount: number;

  @Column('decimal', { precision: 10, scale: 2, default: 0 })
  discountApplied: number;

  @Column('decimal', { precision: 10, scale: 2, default: 0 })
  lateFeeAdded: number;

  @Column('decimal', { precision: 10, scale: 2 })
  totalAmount: number;

  @Column('decimal', { precision: 10, scale: 2, default: 0 })
  paidAmount: number;

  @Column('decimal', { precision: 10, scale: 2, default: 0 })
  dueAmount: number;

  @Column({ default: 'active' })
  status: string; // active, expired, suspended, cancelled

  @ManyToOne(() => Coupon, { nullable: true })
  couponUsed: Coupon;

  @Column({ default: false })
  isGroupDiscount: boolean;

  @Column({ nullable: true })
  groupAdmissionId: string;
}
