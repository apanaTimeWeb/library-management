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
import { User } from './/user.entity';

@Entity()
export class Attendance extends BaseEntity {

  @ManyToOne(() => Student)
  student: Student;

  @Column('date')
  date: Date;

  @Column('time', { nullable: true })
  inTime: string;

  @Column('time', { nullable: true })
  outTime: string;

  @ManyToOne(() => User)
  markedBy: User;

  @Column({ default: 'present' })
  status: string; // present, absent, late
}
