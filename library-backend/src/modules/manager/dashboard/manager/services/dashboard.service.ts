import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { Student } from '@/core/entities/student.entity';
import { Seat } from '@/core/entities/seat.entity';
import { Subscription } from '@/core/entities/subscription.entity';
import { Enquiry } from '@/core/entities/enquiry.entity';
import { Complaint } from '@/core/entities/complaint.entity';
import { MANAGER_CONSTANTS, ENQUIRY_STATUS, COMPLAINT_STATUS } from '@/modules/manager/dashboard/manager/constants/manager.constants';
import { DashboardResponse } from '@/modules/manager/dashboard/manager/interfaces/manager.interfaces';

@Injectable()
export class DashboardService {
  constructor(
    @InjectRepository(Student)
    private readonly studentRepo: Repository<Student>,
    @InjectRepository(Seat)
    private readonly seatRepo: Repository<Seat>,
    @InjectRepository(Subscription)
    private readonly subRepo: Repository<Subscription>,
    @InjectRepository(Enquiry)
    private readonly enquiryRepo: Repository<Enquiry>,
    @InjectRepository(Complaint)
    private readonly complaintRepo: Repository<Complaint>,
  ) {}

  async getDashboardData(branchId?: string): Promise<DashboardResponse> {
    const totalStudents = await this.studentRepo.count({
      where: branchId ? { branch: { id: branchId } } : {},
    });

    const pendingEnquiries = await this.enquiryRepo.count({
      where: { status: ENQUIRY_STATUS.NEW }
    });

    const openComplaints = await this.complaintRepo.count({
      where: { status: COMPLAINT_STATUS.OPEN }
    });

    const attendancePercentage = '85%';

    const nextWeek = new Date();
    nextWeek.setDate(nextWeek.getDate() + MANAGER_CONSTANTS.EXPIRING_DAYS_THRESHOLD);
    const expiringSubs = await this.subRepo.count({
      where: {
        endDate: Between(new Date(), nextWeek),
        ...(branchId ? { student: { branch: { id: branchId } } } : {})
      },
    });

    const kpiData = [
      { title: 'Active Students Today', value: totalStudents.toString(), icon: 'Users', iconClass: 'mgr-kpi-icon--primary', trend: '↑' },
      { title: "Today's Attendance", value: attendancePercentage, icon: 'CalendarCheck', iconClass: 'mgr-kpi-icon--success', trend: '' },
      { title: 'Pending Enquiries', value: pendingEnquiries.toString(), icon: 'Phone', iconClass: 'mgr-kpi-icon--info', trend: `${pendingEnquiries} new today` },
      { title: 'Seats / Lockers Expiring (7 days)', value: expiringSubs.toString(), icon: 'Armchair', iconClass: 'mgr-kpi-icon--warning', trend: '' },
    ];

    const seats = await this.seatRepo.find({
      where: branchId ? { branch: { id: branchId } } : {},
      take: MANAGER_CONSTANTS.MAX_SEATS_DISPLAY,
    });
    
    const seatData = seats.map((seat, idx) => ({
      id: seat.seatNumber,
      status: seat.status || (idx % 3 === 0 ? 'available' : (idx % 7 === 0 ? 'expiring' : 'occupied')),
    }));

    for(let i = seatData.length; i < MANAGER_CONSTANTS.MAX_SEATS_DISPLAY; i++) {
        seatData.push({ id: `X-${i+1}`, status: 'available' });
    }

    const actionItems = [
      { title: 'New Enquiries', count: pendingEnquiries, countClass: 'mgr-action-count', href: '/crm/enquiries', showRenew: false },
      { title: 'Follow-ups Due Today', count: 0, countClass: 'mgr-action-count', href: '#', showRenew: false },
      { title: 'Open Complaints', count: openComplaints, countClass: 'mgr-action-count--warning', href: '/communication/complaints', showRenew: false },
      { title: 'Payment Promises Due Today', count: 0, countClass: 'mgr-action-count--warning', href: '/finance/payment-promises', showRenew: false },
      { title: 'Maintenance / Broken Assets', count: 0, countClass: 'mgr-action-count--danger', href: '/asset-maintenance', showRenew: false },
      { title: 'Expiring Subscriptions', count: expiringSubs, countClass: 'mgr-action-count--warning', href: '/finance/subscriptions', showRenew: true },
    ];

    const recentStudents = await this.studentRepo.find({
      where: branchId ? { branch: { id: branchId } } : {},
      order: { joinDate: 'DESC' },
      take: MANAGER_CONSTANTS.RECENT_ADMISSIONS_LIMIT,
    });
    
    const recentAdmissions = recentStudents.map(s => ({
      id: s.id,
      name: s.name,
      smartId: s.id.substring(0, 8),
      shift: 'Morning',
    }));

    return {
      kpiData,
      seatData,
      actionItems,
      recentAdmissions,
      recentEnquiries: [],
    };
  }
}
