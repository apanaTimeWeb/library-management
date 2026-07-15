import { BaseEntity } from './base.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { Seat } from './/seat.entity';
import { Student } from './/student.entity';
import { Shift } from './/shift.entity';

@Entity()
export class SeatHistory extends BaseEntity {

  @ManyToOne(() => Seat)
  seat: Seat;

  @ManyToOne(() => Student)
  student: Student;

  @ManyToOne(() => Shift, { nullable: true })
  shift: Shift;

  @Column('date')
  occupiedFrom: Date;

  @Column('date', { nullable: true })
  occupiedTill: Date;

  @Column({ nullable: true })
  reason: string; // admission, shift_change, seat_change
}
