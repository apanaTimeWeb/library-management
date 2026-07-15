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
export class Attendance {
  @PrimaryGeneratedColumn('uuid')
  id: string;

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

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
