import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from '../../../../../core/entities/student.entity';
import { Branch } from '../../../../../core/entities/branch.entity';
import { Shift } from '../../../../../core/entities/shift.entity';
import { Seat } from '../../../../../core/entities/seat.entity';
import { Locker } from '../../../../../core/entities/locker.entity';
import { Plan } from '../../../../../core/entities/plan.entity';
import { StudentSlot } from '../../../../../core/entities/student-slot.entity';
import { Subscription } from '../../../../../core/entities/subscription.entity';
import { Payment } from '../../../../../core/entities/payment.entity';
import { BranchNotFoundException } from '../exceptions/students.exceptions';
import { CreateStudentDto } from '../dto/create-student.dto';
import { STUDENT_CONSTANTS } from '../constants/students.constants';

@Injectable()
export class CreateStudentService {
  constructor(
    @InjectRepository(Student) private readonly studentRepo: Repository<Student>,
    @InjectRepository(Branch) private readonly branchRepo: Repository<Branch>,
    @InjectRepository(Shift) private readonly shiftRepo: Repository<Shift>,
    @InjectRepository(Seat) private readonly seatRepo: Repository<Seat>,
    @InjectRepository(Locker) private readonly lockerRepo: Repository<Locker>,
    @InjectRepository(Plan) private readonly planRepo: Repository<Plan>,
    @InjectRepository(StudentSlot) private readonly slotRepo: Repository<StudentSlot>,
    @InjectRepository(Subscription) private readonly subRepo: Repository<Subscription>,
    @InjectRepository(Payment) private readonly paymentRepo: Repository<Payment>,
  ) {}

  async create(branchId: string, data: CreateStudentDto) {
    const branch = await this.branchRepo.findOne({ where: { id: branchId } });
    if (!branch) throw new BranchNotFoundException();

    const totalStudents = await this.studentRepo.count({ where: { branch: { id: branchId } } });
    const smartId = `${STUDENT_CONSTANTS.ID_PREFIX}${String(totalStudents + 1).padStart(3, '0')}`;

    const student = this.studentRepo.create({
      smartId,
      name: data.fullName || data.name,
      phone: data.phone,
      parentPhone: data.parentPhone,
      email: data.email,
      college: data.college,
      branch: branch,
    });
    await this.studentRepo.save(student);

    const shiftStr = data.shift?.split(' ')[0];
    const shift = await this.shiftRepo.findOne({ where: { name: shiftStr, branch: { id: branchId } } });
    const seat = await this.seatRepo.findOne({ where: { seatNumber: data.seat, branch: { id: branchId } } });
    const plan = await this.planRepo.findOne({ where: { name: data.plan, branch: { id: branchId } } });
    
    if (shift && seat) {
      const slot = this.slotRepo.create({
        student,
        shift,
        seat,
        validFrom: new Date(),
        validTill: new Date(new Date().setMonth(new Date().getMonth() + (plan?.durationDays ? plan.durationDays / 30 : 1))),
      });
      await this.slotRepo.save(slot);
    }

    if (plan) {
      const sub = this.subRepo.create({
        student,
        plan,
        startDate: new Date(),
        endDate: new Date(new Date().setMonth(new Date().getMonth() + (plan.durationDays / 30))),
        baseAmount: plan.price,
        discountApplied: Number(data.manualDiscount) || 0,
        totalAmount: plan.price - (Number(data.manualDiscount) || 0),
        paidAmount: Number(data.amountPaid) || 0,
        dueAmount: (plan.price - (Number(data.manualDiscount) || 0)) - (Number(data.amountPaid) || 0),
      });
      await this.subRepo.save(sub);

      if (Number(data.amountPaid) > 0) {
        const payment = this.paymentRepo.create({
          student,
          subscription: sub,
          amount: Number(data.amountPaid),
          mode: data.paymentMode || 'UPI',
          transactionId: data.transactionId,
        });
        await this.paymentRepo.save(payment);
      }
    }

    return student;
  }
}
