export interface StudentListItem {
  id: string;
  smartId: string;
  name: string;
  phone: string;
  branch: string;
  shift: string;
  seat: string;
  plan: string;
  status: string;
  due: number;
  joined: string;
  email?: string;
  parentPhone?: string;
  college?: string;
}

export interface StudentDetailItem extends StudentListItem {
  firstName: string;
  lastName: string;
  history: Array<{
    plan: string;
    startDate: Date;
    endDate: Date;
    amount: number;
    status: string;
  }>;
}
