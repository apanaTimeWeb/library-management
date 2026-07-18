const { execSync } = require('child_process');

const modulesToProcess = [
  { domain: 'manager', subdomain: 'accounting', name: 'assets', entityFile: 'asset.entity.ts', entityName: 'Asset' },
  { domain: 'manager', subdomain: 'communication', name: 'whatsapp-logs', entityFile: 'whatsapp-log.entity.ts', entityName: 'WhatsappLog' },
  { domain: 'manager', subdomain: 'crm', name: 'enquiries', entityFile: 'enquiry.entity.ts', entityName: 'Enquiry' },
  { domain: 'manager', subdomain: 'crm', name: 'waitlists', entityFile: 'waitlist.entity.ts', entityName: 'Waitlist' },
  { domain: 'manager', subdomain: 'documents', name: 'documents', entityFile: 'document.entity.ts', entityName: 'Document' },
  { domain: 'manager', subdomain: 'engagement', name: 'notices', entityFile: 'notice.entity.ts', entityName: 'Notice' },
  { domain: 'manager', subdomain: 'finance', name: 'expenses', entityFile: 'expense.entity.ts', entityName: 'Expense' },
  { domain: 'manager', subdomain: 'finance', name: 'payments', entityFile: 'payment.entity.ts', entityName: 'Payment' },
  { domain: 'manager', subdomain: 'finance', name: 'security-deposits', entityFile: 'security-deposit.entity.ts', entityName: 'SecurityDeposit' },
  { domain: 'manager', subdomain: 'settings', name: 'holidays', entityFile: 'holiday.entity.ts', entityName: 'Holiday' },
  { domain: 'manager', subdomain: 'students', name: 'attendance', entityFile: 'attendance.entity.ts', entityName: 'Attendance' },
  { domain: 'manager', subdomain: 'students', name: 'id-cards', entityFile: 'id-card.entity.ts', entityName: 'IDCard' },
  { domain: 'manager', subdomain: 'students', name: 'students', entityFile: 'student.entity.ts', entityName: 'Student' },
  { domain: 'manager', subdomain: 'support-tickets', name: 'complaints', entityFile: 'complaint.entity.ts', entityName: 'Complaint' },
  
  // seats_shifts_lockers
  { domain: 'manager', subdomain: 'seats_shifts_lockers', name: 'lockers', entityFile: 'locker.entity.ts', entityName: 'Locker' },
  { domain: 'manager', subdomain: 'seats_shifts_lockers', name: 'seat-history', entityFile: 'seat-history.entity.ts', entityName: 'SeatHistory' },
  { domain: 'manager', subdomain: 'seats_shifts_lockers', name: 'seats', entityFile: 'seat.entity.ts', entityName: 'Seat' },
  { domain: 'manager', subdomain: 'seats_shifts_lockers', name: 'shift-migrations', entityFile: 'shift-migration.entity.ts', entityName: 'ShiftMigration' },
  { domain: 'manager', subdomain: 'seats_shifts_lockers', name: 'shifts', entityFile: 'shift.entity.ts', entityName: 'Shift' },
  { domain: 'manager', subdomain: 'seats_shifts_lockers', name: 'student-slots', entityFile: 'student-slot.entity.ts', entityName: 'StudentSlot' },
];

for (const mod of modulesToProcess) {
  const { domain, subdomain, name, entityFile, entityName } = mod;
  const path = subdomain === name ? `${domain}/${name}` : `${domain}/${subdomain}/${name}`;
  console.log(`Processing ${path}...`);
  
  try {
    // 1. Remove old files (excluding module if we were being careful, but let's just wipe everything and let scaffold recreate it)
    execSync(`powershell -Command "Remove-Item -Path 'src/modules/${path}/*' -Recurse -Force"`, { stdio: 'inherit' });
  } catch (e) {
    // Ignore error if it doesn't exist
  }

  // 2. Scaffold
  execSync(`node scripts/scaffold-module.js ${domain} ${subdomain} ${name} ${entityFile} ${entityName}`, { stdio: 'inherit' });
  
  // 3. Fix .entity.ts imports
  try {
    execSync(`powershell -Command "Get-ChildItem -Path 'src/modules/${path}' -Recurse -Include *.ts | ForEach-Object { (Get-Content $_.FullName) -replace '.entity.ts', '.entity' | Set-Content $_.FullName }"`, { stdio: 'inherit' });
  } catch(e) {}
  
  // 4. Fix module names (scaffold produces ManagerSubdomainNameModule, but usually it's just ManagerNameModule)
  // E.g. ManagerSeats_shifts_lockersLockersModule -> ManagerLockersModule
  // ManagerFinanceExpensesModule -> ManagerExpensesModule
  try {
    const toPascal = (s) => s.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join('');
    const subPascal = toPascal(subdomain);
    // Replace 'Manager' + subPascal with 'Manager' in the module files
    if (subdomain !== name) {
       execSync(`powershell -Command "Get-ChildItem -Path 'src/modules/${path}' -Recurse -Include *.module.ts | ForEach-Object { (Get-Content $_.FullName) -replace 'Manager${subPascal}', 'Manager' | Set-Content $_.FullName }"`, { stdio: 'inherit' });
    }
  } catch(e) {}
}

console.log('Batch processing complete!');
