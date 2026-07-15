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
export class IDCard extends BaseEntity {

  @ManyToOne(() => Student)
  student: Student;

  @Column()
  cardNumber: string; // Unique ID card number

  @Column({ nullable: true })
  qrCode: string; // QR code data or URL

  @Column({ nullable: true })
  pdfUrl: string; // Generated PDF URL

  @Column({ default: false })
  isPrinted: boolean;

  @Column({ nullable: true })
  printedAt: Date;

  @ManyToOne(() => User)
  generatedBy: User;
}
