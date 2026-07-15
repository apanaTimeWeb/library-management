import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from '@/core/entities/student.entity';
import { Payment } from '@/core/entities/payment.entity';
import { Seat } from '@/core/entities/seat.entity';
import { AdminDashboardData } from '@/modules/admin/dashboard/admin/interfaces/admin.interfaces';

@Injectable()
export class DashboardService {
  constructor(
    @InjectRepository(Student) private studentRepo: Repository<Student>,
    @InjectRepository(Payment) private paymentRepo: Repository<Payment>,
    @InjectRepository(Seat) private seatRepo: Repository<Seat>,
  ) {}

  async getDashboardData(): Promise<AdminDashboardData> {
    const totalStudents = await this.studentRepo.count();
    const payments = await this.paymentRepo.find({ relations: { student: true } });
    const todayCollection = payments.reduce((sum, p) => sum + Number(p.amount), 0);
    const seats = await this.seatRepo.find();
    
    const seatData = [
      { id: "S1",  shift: "Morning", status: "free",        fee: "Paid" },
      { id: "S2",  shift: "Morning", status: "occupied",    fee: "Due",  occupant: "Rohan Sharma",  expiry: "30/07/25", studentId: "2" },
      { id: "S3",  shift: "Evening", status: "occupied",    fee: "Paid", occupant: "Priya Mehta",   expiry: "05/08/25", studentId: "3" },
      { id: "S4",  shift: "Morning", status: "expiring",    fee: "Due",  occupant: "Amit Verma",    expiry: "28/07/25", studentId: "4" },
      { id: "S5",  shift: "Night",   status: "maintenance", fee: "Paid" },
      { id: "S6",  shift: "Evening", status: "occupied",    fee: "Due",  occupant: "Sneha Rao",     expiry: "10/08/25", studentId: "6" },
      { id: "S7",  shift: "Morning", status: "free",        fee: "Paid" },
      { id: "S8",  shift: "Night",   status: "free",        fee: "Paid" },
      { id: "S9",  shift: "Evening", status: "free",        fee: "Paid" },
      { id: "S10", shift: "Morning", status: "occupied",    fee: "Due",  occupant: "Karan Singh",   expiry: "01/08/25", studentId: "10" },
      { id: "S11", shift: "Night",   status: "expiring",    fee: "Due",  occupant: "Divya Nair",    expiry: "27/07/25", studentId: "11" },
      { id: "S12", shift: "Evening", status: "occupied",    fee: "Paid", occupant: "Rahul Gupta",   expiry: "15/08/25", studentId: "12" },
      { id: "S13", shift: "Morning", status: "free",        fee: "Paid" },
      { id: "S14", shift: "Night",   status: "free",        fee: "Paid" },
      { id: "S15", shift: "Evening", status: "maintenance", fee: "Paid" },
      { id: "S16", shift: "Morning", status: "occupied",    fee: "Due",  occupant: "Pooja Sharma",  expiry: "03/08/25", studentId: "16" },
      { id: "S17", shift: "Morning", status: "free",        fee: "Paid" },
      { id: "S18", shift: "Evening", status: "occupied",    fee: "Paid", occupant: "Nikhil Joshi",  expiry: "20/08/25", studentId: "18" },
      { id: "S19", shift: "Night",   status: "occupied",    fee: "Paid", occupant: "Ananya Das",    expiry: "12/08/25", studentId: "19" },
      { id: "S20", shift: "Morning", status: "expiring",    fee: "Due",  occupant: "Vikram Patel",  expiry: "29/07/25", studentId: "20" },
      { id: "S21", shift: "Evening", status: "free",        fee: "Paid" },
      { id: "S22", shift: "Morning", status: "occupied",    fee: "Paid", occupant: "Sanya Dua",     expiry: "18/08/25", studentId: "22" },
      { id: "S23", shift: "Night",   status: "free",        fee: "Paid" },
      { id: "S24", shift: "Evening", status: "expiring",    fee: "Due",  occupant: "Mohit Arya",    expiry: "26/07/25", studentId: "24" }
    ];

    const recentPayments = payments.map(p => ({
      name: p.student?.name || 'Unknown',
      initials: (p.student?.name || 'U').substring(0, 2).toUpperCase(),
      amount: `₹${p.amount}`,
      mode: p.mode,
      timeAgo: "2m ago",
      studentId: p.student?.id || "1"
    }));

    if (recentPayments.length === 0) {
      recentPayments.push(
        { name: "Arjun Sharma",  initials: "AS", amount: "₹1,500", mode: "UPI",          timeAgo: "2m ago",  studentId: "1"  },
        { name: "Riya Kapoor",   initials: "RK", amount: "₹2,200", mode: "Cash",         timeAgo: "15m ago", studentId: "3"  },
        { name: "Vikram Verma",  initials: "VV", amount: "₹1,500", mode: "UPI",          timeAgo: "1h ago",  studentId: "4"  },
        { name: "Sanya Dua",     initials: "SD", amount: "₹3,500", mode: "Card",         timeAgo: "3h ago",  studentId: "22" },
        { name: "Mohit Arya",    initials: "MA", amount: "₹1,500", mode: "Bank Transfer",timeAgo: "5h ago",  studentId: "24" }
      );
    }

    return {
      kpiCards: [
        { label: "Active Students", value: totalStudents > 0 ? totalStudents.toString() : "1,248", trend: { value: "12% vs last month", up: true }, sub: "Total enrolled" },
        { label: "Today's Collection", value: todayCollection > 0 ? `₹${todayCollection}` : "₹42,500", trend: { value: "8% vs yesterday", up: true }, sub: "Gross revenue today" },
        { label: "Occupied Seats", value: `${seats.length > 0 ? seats.length : "48"} / 60`, trend: { value: "3% vs last week", up: false }, sub: "80% occupancy rate" },
        { label: "Pending Actions", value: "11", trend: { value: "2 new today", up: false }, sub: "Dues + Enquiries + Complaints" }
      ],
      seats: seatData,
      shifts: ["Morning", "Evening", "Night"],
      actionItems: [
        { label: "Fee Renewals Due",   count: 5, type: "danger",  href: "/finance/renewals"         },
        { label: "New Enquiries",      count: 2, type: "warning", href: "/crm/enquiries"             },
        { label: "Complaint Open",     count: 1, type: "danger",  href: "/communication/complaints"  },
        { label: "PTP Dates Today",    count: 3, type: "warning", href: "/finance/payment-promises"  }
      ],
      recentPayments
    };
  }
}
