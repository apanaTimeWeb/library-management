// RESPONSIBILITY: Renders or handles logic for manager_documents_constants.ts.
import type { DocumentRecord } from '@/app/manager/manager_documents/manager_documents_types/manager_documents_types';

export const DOCUMENTS_DATA: DocumentRecord[] = [
  { id: 'DOC-101', name: 'Aadhar_Rahul_Sharma.pdf', type: 'PDF', size: '2.4 MB', uploadedBy: 'Rahul Sharma', date: '2026-06-01', category: 'ID Proof' },
  { id: 'DOC-102', name: 'Photo_Sneha.jpg', type: 'Image', size: '1.1 MB', uploadedBy: 'Sneha Gupta', date: '2026-06-02', category: 'Profile Photo' },
  { id: 'DOC-103', name: 'Fee_Receipt_Amit.pdf', type: 'PDF', size: '0.8 MB', uploadedBy: 'System', date: '2026-06-02', category: 'Finance' },
  { id: 'DOC-104', name: 'UPSC_Syllabus.docx', type: 'Document', size: '3.5 MB', uploadedBy: 'Manager', date: '2026-06-03', category: 'Study Material' },
];

