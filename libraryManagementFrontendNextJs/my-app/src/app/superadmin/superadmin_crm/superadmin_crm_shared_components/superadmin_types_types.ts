import React from 'react';
import { z } from 'zod';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type anyType = any;
export interface FollowUp {
  id: string;
  date: string;
  time: string;
  by: string;
  remark: string;
}
export interface Enquiry {
  id: string;
  name: string;
  phone: string;
  shift: string;
  status: EnquiryStatus;
  addedDate: string;
  source: EnquirySource | string;
  handledBy: string;
  enquiryDate: string;
  preferredBranch: string;
  avatar: string;
  followUps: FollowUp[];
  isOverdue?: boolean;
  isToday?: boolean;
  isUpcoming?: boolean;
  convertedDate?: string;
}
export interface KanbanColumn {
  id: EnquiryStatus;
  label: string;
  colorClass: string;
  dotColor: string;
  cardClass: string;
  badgeClass: string;
}
export type EnquiryStatus = 'New' | 'Visited' | 'Interested' | 'Converted' | 'Lost';
export type EnquirySource =
  | 'Walk-in'
  | 'WhatsApp'
  | 'Referral'
  | 'Social Media'
  | 'Phone Call'
  | 'Google Ads'
  | 'Instagram'
  | 'Facebook'
  | 'Other';
