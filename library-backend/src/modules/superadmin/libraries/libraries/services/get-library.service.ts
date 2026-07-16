import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Library } from '@/core/entities/library.entity';
import { LibraryNotFoundException } from '../exceptions/libraries.exceptions';

@Injectable()
export class GetLibraryService {
  constructor(
    @InjectRepository(Library)
    private readonly repository: Repository<Library>,
  ) {}

  async execute(id: string): Promise<Library> {
    const existing = await this.repository.findOne({ where: { id } as any });
    if (!existing) throw new LibraryNotFoundException();
    return existing;
  }
}
