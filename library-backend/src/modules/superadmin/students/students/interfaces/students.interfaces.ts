export interface StudentSubscriptionHistory {
  plan?: string;
  startDate?: Date;
  endDate?: Date;
  amount?: number;
  status?: string;
}

export interface StudentDetail {
  id: string;
  smartId: string;
  name: string;
  firstName: string;
  lastName: string;
  phone: string;
  email?: string;
  parentPhone?: string;
  college?: string;
  branch: string;
  shift: string;
  seat: string;
  plan: string;
  status: string;
  due: number;
  joined: string;
  history: StudentSubscriptionHistory[];
}

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
