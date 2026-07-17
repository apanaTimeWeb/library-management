export interface StudentListItem {
  id: string;
  fullName: string;
  phone: string;
  email: string;
  status: 'ACTIVE' | 'INACTIVE' | 'SUSPENDED';
  branchId: string;
  enrolledAt: string;
  currentPlanId?: string;
  seatId?: string;
}

export interface StudentDetailItem extends StudentListItem {
  address: string;
  emergencyContact: string;
  bloodGroup: string;
  history: Record<string, unknown>[]; // Placeholder for detailed history
}

export interface CreateStudentDto {
  fullName: string;
  phone: string;
  email: string;
  branchId: string;
}

export interface UpdateStudentDto extends Partial<CreateStudentDto> {
  status?: 'ACTIVE' | 'INACTIVE' | 'SUSPENDED';
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface AdminStudentsData {}

