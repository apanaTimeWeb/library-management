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

@Entity()
export class Waitlist extends BaseEntity {

  @ManyToOne(() => Student)
  student: Student;

  @ManyToOne(() => Shift, { nullable: true })
  preferredShift: Shift;

  @Column({ type: 'jsonb', nullable: true })
  preferredSlots: { start: string; end: string }[];

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  addedAt: Date;
}
