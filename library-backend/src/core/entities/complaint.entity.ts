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
export class Complaint extends BaseEntity {
  @ManyToOne(() => Student, { nullable: true })
  student: Student;

  @Column()
  title: string;

  @Column('text')
  description: string;

  @Column({ default: 'open' })
  status: string; // open, in-progress, resolved

  @Column({ default: false })
  isAnonymous: boolean;

  @Column({ nullable: true })
  resolvedAt: Date;

  @ManyToOne(() => User, { nullable: true })
  resolvedBy: User;
}
