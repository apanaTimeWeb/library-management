import { z } from 'zod';
import { SUPERADMIN_LIBRARIES_PLANS, SUPERADMIN_LIBRARIES_STATUSES } from '@/app/superadmin/superadmin_libraries/superadmin_libraries_constants/SuperadminLibrariesConstants';
import { SuperadminLibrariesGridProps, SuperadminLibrariesPanelProps, SuperadminLibrariesErrorBoundaryProps, SuperadminLibrary, SuperadminLibraryPanelMode, SuperadminLibrariesFetchState } from "./SuperadminLibrariesTypes_types";

export const superadminLibrarySchema = z.object({
  id: z.string(),
  name: z.string().min(2, 'Name must be at least 2 characters'),
  location: z.string().min(2, 'Location is required'),
  seats: z.number().min(1, 'Must have at least 1 seat'),
  occupied: z.number().min(0),
  status: z.enum(SUPERADMIN_LIBRARIES_STATUSES),
  plan: z.enum(SUPERADMIN_LIBRARIES_PLANS),
  owner: z.string().min(2, 'Owner name is required'),
  phone: z.string().min(10, 'Valid phone required'),
  joined: z.string()
});
