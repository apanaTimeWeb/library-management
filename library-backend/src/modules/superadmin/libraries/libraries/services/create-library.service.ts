import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Library } from '@/core/entities/library.entity';
import { CreateLibraryDto } from '../dto/create-library.dto';

@Injectable()
export class CreateLibraryService {
  constructor(
    @InjectRepository(Library)
    private readonly repository: Repository<Library>,
  ) {}

  async execute(dto: CreateLibraryDto): Promise<Library> {
    const entity = this.repository.create(dto);
    return await this.repository.save(entity);
  }
}
