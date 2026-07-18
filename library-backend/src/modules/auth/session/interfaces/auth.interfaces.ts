export interface JwtPayload {
  sub: string;
  phone: string;
  name: string;
  role?: string;
  tenantId?: string;
  branchId: string | null;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface AuthUserResponse {
  id: string;
  name: string;
  phone: string;
  email: string | null;
  role: string | undefined;
  tenantId: string | undefined;
  branchId: string | undefined;
  lastLoginAt?: Date | null;
}

export interface LoginResponse extends AuthTokens {
  user: AuthUserResponse;
}
