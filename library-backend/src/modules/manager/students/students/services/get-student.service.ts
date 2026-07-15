import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from '../../../../../core/entities/student.entity';
import { StudentDetailItem } from '../interfaces/students.interfaces';
import { StudentNotFoundException } from '../exceptions/students.exceptions';
import { STUDENT_STATUS } from '../constants/students.constants';

@Injectable()
export class GetStudentService {
  constructor(
    @InjectRepository(Student)
    private readonly studentRepo: Repository<Student>,
  ) {}

  async findOne(id: string, branchId?: string): Promise<StudentDetailItem> {
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
      status: activeSub ? activeSub.status : STUDENT_STATUS.INACTIVE,
      due: activeSub?.dueAmount || 0,
      joined: s.joinDate ? s.joinDate.toLocaleDateString('en-IN') : 'N/A',
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
