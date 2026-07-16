import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Waitlist } from '@/core/entities/waitlist.entity';
import { UpdateWaitlistDto } from '@/modules/manager/crm/waitlists/dto/update-waitlist.dto';
import { WaitlistNotFoundException } from '@/modules/manager/crm/waitlists/exceptions/waitlists.exceptions';

@Injectable()
export class WaitlistsUpdateService {
  constructor(
    @InjectRepository(Waitlist)
    private readonly repository: Repository<Waitlist>,
  ) {}

  async execute(id: string, dto: UpdateWaitlistDto): Promise<Waitlist> {
    const existing = await this.repository.findOne({ where: { id } as any });
    if (!existing) throw new WaitlistNotFoundException();
    Object.assign(existing, dto);
    return await this.repository.save(existing);
  }
}
