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

@Entity()
export class WhatsAppMessage extends BaseEntity {

  @ManyToOne(() => Student, { nullable: true })
  student: Student;

  @Column()
  phoneNumber: string;

  @Column()
  messageType: string; // welcome, fee_reminder, renewal_alert, receipt, notice

  @Column('text')
  messageContent: string;

  @Column({ default: 'pending' })
  status: string; // pending, sent, failed, delivered

  @Column({ nullable: true })
  externalMessageId: string; // WhatsApp API message ID

  @Column({ nullable: true })
  errorMessage: string;

  @CreateDateColumn()
  sentAt: Date;
}
