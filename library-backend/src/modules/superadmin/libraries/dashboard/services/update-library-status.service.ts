import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Branch } from '@/core/entities/branch.entity';
import { UpdateLibraryStatusDto } from '@/modules/superadmin/dashboard/superadmin/dtos/update-library-status.dto';

@Injectable()
export class UpdateLibraryStatusService {
  constructor(
    @InjectRepository(Branch) private branchRepo: Repository<Branch>,
  ) {}

  async updateLibraryStatus(id: string, updateDto: UpdateLibraryStatusDto) {
    const branch = await this.branchRepo.findOne({ where: { id } });
    if (!branch) {
      throw new NotFoundException(`Library branch with ID ${id} not found`);
    }

    branch.isActive = updateDto.isActive;

    await this.branchRepo.save(branch);
    return { success: true, branch };
  }
}
