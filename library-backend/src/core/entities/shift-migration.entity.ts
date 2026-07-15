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
import { Shift } from './/shift.entity';
import { Seat } from './/seat.entity';
import { User } from './/user.entity';

@Entity()
export class ShiftMigration extends BaseEntity {
  @ManyToOne(() => Student)
  student: Student;

  @ManyToOne(() => Shift)
  fromShift: Shift;

  @ManyToOne(() => Shift)
  toShift: Shift;

  @ManyToOne(() => Seat, { nullable: true })
  fromSeat: Seat;

  @ManyToOne(() => Seat, { nullable: true })
  toSeat: Seat;

  @Column('decimal', { precision: 10, scale: 2, default: 0 })
  feeAdjustment: number; // positive = student pays more, negative = refund

  @ManyToOne(() => User)
  processedBy: User;

  @CreateDateColumn()
  migratedAt: Date;
}
