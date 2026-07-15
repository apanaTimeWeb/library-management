import { Injectable } from '@nestjs/common';
import { StudentNotFoundException } from '@/modules/superadmin/students/students/exceptions/students.exceptions';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from '@/core/entities/student.entity';
import { StudentDetail } from '@/modules/superadmin/students/students/interfaces/students.interfaces';

@Injectable()
export class GetStudentService {
  constructor(
    @InjectRepository(Student) private readonly studentRepo: Repository<Student>,
  ) {}

  async findOne(id: string, branchId?: string): Promise<StudentDetail> {
    const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id);
    
    const whereClause = isUuid 
      ? { id, ...(branchId ? { branch: { id: branchId } } : {}) }
      : { smartId: id, ...(branchId ? { branch: { id: branchId } } : {}) };

    const s = await this.studentRepo.findOne({
      where: whereClause,
      relations: {
        branch: true,
        subscriptions: { plan: true },
        slots: { seat: true, shift: true }
      }
    });

    if (!s) {
      throw new StudentNotFoundException();
    }

    const activeSub = s.subscriptions?.find(sub => sub.status === 'active') || s.subscriptions?.[0];
    const activeSlot = s.slots?.[0];

    return {
      id: s.id,
      smartId: s.id.substring(0, 8).toUpperCase(),
      name: s.name,
      firstName: s.name.split(' ')[0] || '',
      lastName: s.name.split(' ')[1] || '',
      phone: s.phone,
      email: s.email,
      parentPhone: s.parentPhone,
      college: s.college,
      branch: s.branch?.name || 'N/A',
      shift: activeSlot?.shift?.name || 'N/A',
      seat: activeSlot?.seat?.seatNumber || 'N/A',
      plan: activeSub?.plan?.name || 'N/A',
      status: activeSub ? activeSub.status : 'Inactive',
      due: activeSub?.dueAmount || 0,
      joined: s.createdAt ? s.createdAt.toLocaleDateString('en-IN') : 'N/A',
      history: s.subscriptions?.map(sub => ({
          plan: sub.plan?.name,
          startDate: sub.startDate,
          endDate: sub.endDate,
          amount: sub.totalAmount,
          status: sub.status
      })) || [],
    };
  }
}
