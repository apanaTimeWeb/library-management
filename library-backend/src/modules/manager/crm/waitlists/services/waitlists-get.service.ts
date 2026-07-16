import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Waitlist } from '@/core/entities/waitlist.entity';
import { WaitlistNotFoundException } from '@/modules/manager/crm/waitlists/exceptions/waitlists.exceptions';

@Injectable()
export class WaitlistsGetService {
  constructor(
    @InjectRepository(Waitlist)
    private readonly repository: Repository<Waitlist>,
  ) {}

  async execute(id: string): Promise<Waitlist> {
    const existing = await this.repository.findOne({ where: { id } as any });
    if (!existing) throw new WaitlistNotFoundException();
    return existing;
  }
}
