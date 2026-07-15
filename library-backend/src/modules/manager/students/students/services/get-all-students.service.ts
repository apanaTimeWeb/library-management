import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm';
import { Student } from '@/core/entities/student.entity';
import { StudentListItem } from '@/modules/manager/students/students/interfaces/students.interfaces';
import { PaginationDto } from '../dto/pagination.dto';
import { PaginatedResponse } from '../interfaces/pagination.interface';
import { STUDENT_STATUS } from '@/modules/manager/students/students/constants/students.constants';

@Injectable()
export class GetAllStudentsService {
  constructor(
    @InjectRepository(Student)
    private readonly studentRepo: Repository<Student>,
  ) {}

  async findAll(
    branchId?: string,
    paginationDto?: PaginationDto,
  ): Promise<PaginatedResponse<StudentListItem>> {
    const {
      page = 1,
      limit = 10,
      search,
      sortBy,
      sortOrder = 'DESC',
    } = paginationDto || {};
    const skip = (page - 1) * limit;

    const where: any = branchId ? { branch: { id: branchId } } : {};
    if (search) {
      where.name = ILike(`%${search}%`);
    }

    const order: any = {};
    if (sortBy) {
      order[sortBy] = sortOrder;
    } else {
      order.createdAt = 'DESC';
    }

    const [students, total] = await this.studentRepo.findAndCount({
      where,
      relations: {
        branch: true,
        subscriptions: { plan: true },
        slots: { seat: true, shift: true },
      },
      order,
      skip,
      take: limit,
    });

    const data = students.map((s) => {
      const activeSub =
        s.subscriptions?.find((sub) => sub.status === 'active') ||
        s.subscriptions?.[0];
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
        joined: s.createdAt ? s.createdAt.toLocaleDateString('en-IN') : 'N/A',
        email: s.email,
        parentPhone: s.parentPhone,
        college: s.college,
      };
    });

    return {
      data,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }
}
