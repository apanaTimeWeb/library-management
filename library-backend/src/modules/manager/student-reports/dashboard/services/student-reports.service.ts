import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from '@/core/entities/student.entity';
import { Complaint } from '@/core/entities/complaint.entity';
import { COMPLAINT_STATUS } from '@/modules/manager/dashboard/manager/constants/manager.constants';
import { StudentReportsResponse } from '@/modules/manager/dashboard/manager/interfaces/manager.interfaces';

@Injectable()
export class StudentReportsService {
  constructor(
    @InjectRepository(Student)
    private readonly studentRepo: Repository<Student>,
    @InjectRepository(Complaint)
    private readonly complaintRepo: Repository<Complaint>,
  ) {}

  async getStudentReportsData(): Promise<StudentReportsResponse> {
    const totalStudents = await this.studentRepo.count();
    const activeStudents = await this.studentRepo.count({ where: { status: 'Active' } });
    
    let totalComplaints = await this.complaintRepo.count();
    if (totalComplaints === 0) {
      await this.complaintRepo.save([
        this.complaintRepo.create({ title: 'Internet slow', description: 'Wi-Fi is very slow in Hall A', status: COMPLAINT_STATUS.OPEN, isAnonymous: false }),
        this.complaintRepo.create({ title: 'AC not working', description: 'AC unit 2 is broken', status: COMPLAINT_STATUS.OPEN, isAnonymous: true }),
        this.complaintRepo.create({ title: 'Cleanliness', description: 'Restrooms need cleaning', status: COMPLAINT_STATUS.RESOLVED, isAnonymous: false }),
        this.complaintRepo.create({ title: 'Noise issue', description: 'People talking in quiet zone', status: COMPLAINT_STATUS.RESOLVED, isAnonymous: true }),
        this.complaintRepo.create({ title: 'Chair broken', description: 'Chair 45 is broken', status: COMPLAINT_STATUS.RESOLVED, isAnonymous: false })
      ]);
    }

    const openComplaints = await this.complaintRepo.count({ where: { status: COMPLAINT_STATUS.OPEN } });
    const resolvedComplaints = await this.complaintRepo.count({ where: { status: COMPLAINT_STATUS.RESOLVED } });

    return {
      kpiCards: [
        { title: 'Total Students', value: totalStudents.toString(), icon: 'Users', color: '#6366f1', trend: '+12% from last month' },
        { title: 'Active Students', value: activeStudents.toString(), icon: 'Users', color: '#10b981', trend: '+5% from last month' },
        { title: 'New Admissions', value: '24', icon: 'UserPlus', color: '#f59e0b', trend: 'This month' },
        { title: 'Open Complaints', value: openComplaints.toString(), icon: 'Phone', color: '#ef4444', trend: 'Needs attention' },
      ],
      shiftOccupancyData: [
        { name: 'Morning', occupancy: 85 },
        { name: 'Afternoon', occupancy: 40 },
        { name: 'Evening', occupancy: 95 },
        { name: 'Night', occupancy: 30 },
      ],
      studentGrowthData: [
        { date: 'Week 1', joined: 10, exited: 2 },
        { date: 'Week 2', joined: 15, exited: 1 },
        { date: 'Week 3', joined: 8, exited: 3 },
        { date: 'Week 4', joined: 12, exited: 0 },
      ],
      attendanceTrendData: [
        { date: 'Mon', attendance: 85 },
        { date: 'Tue', attendance: 88 },
        { date: 'Wed', attendance: 82 },
        { date: 'Thu', attendance: 90 },
        { date: 'Fri', attendance: 87 },
      ],
      topAbsenteesData: [
        { name: 'Rahul K.', absent: 4 },
        { name: 'Amit M.', absent: 3 },
      ],
      complaintStatusData: [
        { name: 'Open', value: openComplaints },
        { name: 'Resolved', value: resolvedComplaints },
      ],
      absenteeReportData: [
        { id: 1, name: 'Rahul K.', smartId: 'ST-001', daysAbsent: 4, lastPresent: '2026-07-10', shift: 'Morning' },
        { id: 2, name: 'Amit M.', smartId: 'ST-002', daysAbsent: 3, lastPresent: '2026-07-11', shift: 'Evening' },
      ],
      enquiryConversionData: [
        { id: 1, month: 'January', new: 150, converted: 45 },
        { id: 2, month: 'February', new: 180, converted: 75 },
      ],
      seatUtilizationData: [
        { id: 1, shift: 'Morning', utilization: 85, occupancy: 85, total: 100 },
        { id: 2, shift: 'Evening', utilization: 95, occupancy: 95, total: 100 },
      ],
      lockerUtilizationData: [
        { id: 1, type: 'Standard', occupied: 45, total: 50, pct: '90%' },
        { id: 2, type: 'Large', occupied: 18, total: 20, pct: '90%' },
      ],
      maintenanceData: [
        { id: 1, item: 'AC Unit 1', location: 'Hall A', reported: '2026-07-12', priority: 'High' },
        { id: 2, item: 'Chair #45', location: 'Hall B', reported: '2026-07-10', priority: 'Medium' },
      ]
    };
  }
}
