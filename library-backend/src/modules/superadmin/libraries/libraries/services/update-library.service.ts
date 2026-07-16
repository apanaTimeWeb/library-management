import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Library } from '@/core/entities/library.entity';
import { UpdateLibraryDto } from '../dto/update-library.dto';
import { LibraryNotFoundException } from '../exceptions/libraries.exceptions';

@Injectable()
export class UpdateLibraryService {
  constructor(
    @InjectRepository(Library)
    private readonly repository: Repository<Library>,
  ) {}

  async execute(id: string, dto: UpdateLibraryDto): Promise<Library> {
    const existing = await this.repository.findOne({ where: { id } as any });
    if (!existing) throw new LibraryNotFoundException();
    Object.assign(existing, dto);
    return await this.repository.save(existing);
  }
}
