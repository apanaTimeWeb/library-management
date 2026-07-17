export interface IdCardData {
  id: string; name: string; avatar: string; shift: string; bloodGroup: string; emergencyContact: string; validTill: string; qrCode: string;
}

export interface ManagerStudentsErrorBoundaryProps {
  children: React.ReactNode;
}

export interface ManagerStudentsErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}
