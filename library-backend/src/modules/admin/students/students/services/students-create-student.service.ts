import { BranchNotFoundException, ShiftNotFoundException, SeatNotFoundException, PlanNotFoundException,  } from '@/modules/admin/students/students/exceptions/students-students.exceptions';
import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Student } from '@/core/entities/student.entity';
import { Branch } from '@/core/entities/branch.entity';
import { Shift } from '@/core/entities/shift.entity';
import { Seat } from '@/core/entities/seat.entity';
import { Plan } from '@/core/entities/plan.entity';
import { StudentSlot } from '@/core/entities/student-slot.entity';
import { Subscription } from '@/core/entities/subscription.entity';
import { Payment } from '@/core/entities/payment.entity';
import { StudentsCreateStudentDto } from '@/modules/admin/students/students/dto/students-create-student.dto';
import { ADMIN_STUDENTS_CONSTANTS } from '@/modules/admin/students/students/constants/students.constants';

@Injectable()
export class StudentsCreateStudentService {
  constructor(private readonly dataSource: DataSource) {}

  async create(
    branchId: string | undefined,
    data: StudentsCreateStudentDto,
  ): Promise<Student> {
    return this.dataSource.transaction(async (manager) => {
      const targetBranchId =
        branchId || ADMIN_STUDENTS_CONSTANTS.TESTING_BRANCH_ID;
      const branch = await manager.findOne(Branch, {
        where: { id: targetBranchId },
      });
      if (!branch) throw new BranchNotFoundException();

      const totalStudents = await manager.count(Student, {
        where: { branch: { id: targetBranchId } },
      });
      const smartId = `LIB${String(totalStudents + 1).padStart(3, '0')}`;

      const student = manager.create(Student, {
        smartId,
        name: data.name,
        phone: data.phone,
        parentPhone: data.parentPhone,
        email: data.email,
        college: data.college,
        branch: branch,
      });
      await manager.save(Student, student);

      let shift: Shift | null = null;
      if (data.shift) {
        const shiftStr = data.shift.split(' ')[0];
        shift = await manager.findOne(Shift, {
          where: { name: shiftStr, branch: { id: targetBranchId } },
        });
        if (!shift) throw new ShiftNotFoundException();
      }

      let seat: Seat | null = null;
      if (data.seat) {
        seat = await manager.findOne(Seat, {
          where: { seatNumber: data.seat, branch: { id: targetBranchId } },
        });
        if (!seat) throw new SeatNotFoundException();
      }

      let plan: Plan | null = null;
      if (data.plan) {
        plan = await manager.findOne(Plan, {
          where: { name: data.plan, branch: { id: targetBranchId } },
        });
        if (!plan) throw new PlanNotFoundException();
      }

      if (shift && seat && plan) {
        const durationDays = plan.durationDays || 30;
        const validTill = new Date();
        validTill.setMonth(validTill.getMonth() + durationDays / 30);

        const slot = manager.create(StudentSlot, {
          student,
          shift,
          seat,
          validFrom: new Date(),
          validTill: validTill,
        });
        await manager.save(StudentSlot, slot);
      }

      if (plan) {
        const durationDays = plan.durationDays || 30;
        const endDate = new Date();
        endDate.setMonth(endDate.getMonth() + durationDays / 30);

        const manualDiscount = Number(data.manualDiscount) || 0;
        const amountPaid = Number(data.amountPaid) || 0;
        const totalAmount = plan.price - manualDiscount;
        const dueAmount = totalAmount - amountPaid;

        const sub = manager.create(Subscription, {
          student,
          plan,
          startDate: new Date(),
          endDate: endDate,
          baseAmount: plan.price,
          discountApplied: manualDiscount,
          totalAmount: totalAmount,
          paidAmount: amountPaid,
          dueAmount: dueAmount,
        });
        await manager.save(Subscription, sub);

        if (amountPaid > 0) {
          const payment = manager.create(Payment, {
            student,
            subscription: sub,
            amount: amountPaid,
            mode: data.paymentMode || 'UPI',
            transactionId: data.transactionId,
          });
          await manager.save(Payment, payment);
        }
      }

      return student;
    });
  }
}
