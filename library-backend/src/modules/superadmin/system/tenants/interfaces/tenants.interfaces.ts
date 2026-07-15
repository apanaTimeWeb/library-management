export interface TenantResponse {
  id: string;
  name: string;
  domain: string;
  email: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateTenantPayload {
  name: string;
  domain: string;
  email: string;
  phone?: string;
  address?: string;
}
