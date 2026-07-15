import { BaseEntity } from './base.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Branch } from './/branch.entity';

@Entity('tenants')
export class Tenant extends BaseEntity {
  @Column({ unique: true })
  name: string; // The library brand/organization name

  @Column({ nullable: true })
  ownerEmail: string;

  @Column({ default: true })
  isActive: boolean;

  @OneToMany(() => Branch, (branch) => branch.tenant)
  branches: Branch[];
}
