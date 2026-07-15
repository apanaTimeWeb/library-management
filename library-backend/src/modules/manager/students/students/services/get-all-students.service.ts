import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from '@/core/entities/student.entity';
import { StudentListItem } from '@/modules/manager/students/students/interfaces/students.interfaces';
import { STUDENT_STATUS } from '@/modules/manager/students/students/constants/students.constants';

@Injectable()
export class GetAllStudentsService {
  constructor(
    @InjectRepository(Student)
    private readonly studentRepo: Repository<Student>,
  ) {}

  async findAll(branchId?: string): Promise<StudentListItem[]> {
    const students = await this.studentRepo.find({
      where: branchId ? { branch: { id: branchId } } : {},
      relations: {
        branch: true,
        subscriptions: { plan: true },
        slots: { seat: true, shift: true }
      },
      order: { joinDate: 'DESC' }
    });

    return students.map(s => {
      const activeSub = s.subscriptions?.find(sub => sub.status === 'active') || s.subscriptions?.[0];
      const activeSlot = s.slots?.[0];

      return {
        id: s.id,
        smartId: s.id.substring(0, 8).toUpperCase(),
        name: s.name,
        phone: s.phone,
        branch: s.branch?.name || 'N/A',
        shift: activeSlot?.shift?.name || 'N/A',
        seat: activeSlot?.seat?.seatNumber || 'N/A',
        plan: activeSub?.plan?.name || 'N/A',
        status: activeSub ? activeSub.status : STUDENT_STATUS.INACTIVE,
        due: activeSub?.dueAmount || 0,
        joined: s.joinDate ? s.joinDate.toLocaleDateString('en-IN') : 'N/A',
        email: s.email,
        parentPhone: s.parentPhone,
        college: s.college,
      };
    });
  }
}
