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
export class Blacklist {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  phone: string;

  @Column({ nullable: true })
  name: string;

  @Column()
  reason: string;

  @ManyToOne(() => Branch)
  branch: Branch;

  @ManyToOne(() => User)
  addedBy: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
