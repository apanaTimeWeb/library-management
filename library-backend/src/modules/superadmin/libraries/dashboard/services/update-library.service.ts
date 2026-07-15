import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Branch } from '@/core/entities/branch.entity';
import { UpdateLibraryDto } from '@/modules/superadmin/dashboard/superadmin/dtos/update-library.dto';

@Injectable()
export class UpdateLibraryService {
  constructor(
    @InjectRepository(Branch) private branchRepo: Repository<Branch>,
  ) {}

  async updateLibrary(id: string, updateDto: UpdateLibraryDto) {
    const branch = await this.branchRepo.findOne({ where: { id } });
    if (!branch) {
      throw new NotFoundException(`Library branch with ID ${id} not found`);
    }

    branch.name = updateDto.name;
    if (updateDto.address) branch.address = updateDto.address;

    await this.branchRepo.save(branch);
    return { success: true, branch };
  }
}
