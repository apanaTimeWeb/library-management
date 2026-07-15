import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Branch } from '@/core/entities/branch.entity';
import { LibraryItem } from '@/modules/superadmin/dashboard/superadmin/interfaces/superadmin.interfaces';

@Injectable()
export class GetLibrariesService {
  constructor(
    @InjectRepository(Branch) private branchRepo: Repository<Branch>,
  ) {}

  async getLibraries(): Promise<LibraryItem[]> {
    const branches = await this.branchRepo.find({ relations: { tenant: true } });
    return branches.map(b => ({
      id: b.id,
      initials: b.name.substring(0, 2).toUpperCase(),
      name: b.name,
      owner: b.tenant?.ownerEmail || 'Unknown',
      students: Math.floor(Math.random() * 500),
      status: b.isActive ? 'active' : 'inactive',
      plan: 'Pro',
      joinedAt: b.createdAt || new Date(),
    }));
  }
}
