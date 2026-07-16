const { execSync } = require('child_process');

const modulesToProcess = [
  { domain: 'superadmin', subdomain: 'accounting', name: 'daily-settlements', entityFile: 'daily-settlement.entity.ts', entityName: 'DailySettlement' },
  { domain: 'superadmin', subdomain: 'audit-logs', name: 'audit-logs', entityFile: 'audit-log.entity.ts', entityName: 'AuditLog' },
  { domain: 'superadmin', subdomain: 'billing', name: 'billing', entityFile: 'billing.entity.ts', entityName: 'Billing' },
  { domain: 'superadmin', subdomain: 'blacklist', name: 'blacklist', entityFile: 'blacklist.entity.ts', entityName: 'Blacklist' },
  { domain: 'superadmin', subdomain: 'branches', name: 'branches', entityFile: 'branch.entity.ts', entityName: 'Branch' },
  { domain: 'superadmin', subdomain: 'communication', name: 'whatsapp-logs', entityFile: 'whatsapp-message.entity.ts', entityName: 'WhatsAppMessage' },
  { domain: 'superadmin', subdomain: 'communication', name: 'whatsapp-templates', entityFile: 'whatsapp-template.entity.ts', entityName: 'WhatsAppTemplate' },
  { domain: 'superadmin', subdomain: 'crm', name: 'waitlists', entityFile: 'waitlist.entity.ts', entityName: 'Waitlist' },
  { domain: 'superadmin', subdomain: 'engagement', name: 'notices', entityFile: 'notice.entity.ts', entityName: 'Notice' },
  { domain: 'superadmin', subdomain: 'finance', name: 'expenses', entityFile: 'expense.entity.ts', entityName: 'Expense' },
  { domain: 'superadmin', subdomain: 'finance', name: 'payments', entityFile: 'payment.entity.ts', entityName: 'Payment' },
  { domain: 'superadmin', subdomain: 'finance', name: 'security-deposits', entityFile: 'security-deposit.entity.ts', entityName: 'SecurityDeposit' },
  { domain: 'superadmin', subdomain: 'libraries', name: 'libraries', entityFile: 'library.entity.ts', entityName: 'Library' },
  { domain: 'superadmin', subdomain: 'seats_shifts_lockers', name: 'lockers', entityFile: 'locker.entity.ts', entityName: 'Locker' },
  { domain: 'superadmin', subdomain: 'seats_shifts_lockers', name: 'seat-history', entityFile: 'seat-history.entity.ts', entityName: 'SeatHistory' },
  { domain: 'superadmin', subdomain: 'seats_shifts_lockers', name: 'seats', entityFile: 'seat.entity.ts', entityName: 'Seat' },
  { domain: 'superadmin', subdomain: 'seats_shifts_lockers', name: 'shift-migrations', entityFile: 'shift-migration.entity.ts', entityName: 'ShiftMigration' },
  { domain: 'superadmin', subdomain: 'seats_shifts_lockers', name: 'shifts', entityFile: 'shift.entity.ts', entityName: 'Shift' },
  { domain: 'superadmin', subdomain: 'seats_shifts_lockers', name: 'student-slots', entityFile: 'student-slot.entity.ts', entityName: 'StudentSlot' },
  { domain: 'superadmin', subdomain: 'setup-wizard', name: 'setup-wizard', entityFile: 'setup-wizard.entity.ts', entityName: 'SetupWizard' },
  { domain: 'superadmin', subdomain: 'staff-users', name: 'permissions', entityFile: 'permission.entity.ts', entityName: 'Permission' },
  { domain: 'superadmin', subdomain: 'staff-users', name: 'roles', entityFile: 'role.entity.ts', entityName: 'Role' },
  { domain: 'superadmin', subdomain: 'staff-users', name: 'users', entityFile: 'user.entity.ts', entityName: 'User' },
  { domain: 'superadmin', subdomain: 'subscriptions', name: 'plans', entityFile: 'plan.entity.ts', entityName: 'Plan' },
  { domain: 'superadmin', subdomain: 'subscriptions', name: 'subscriptions', entityFile: 'subscription.entity.ts', entityName: 'Subscription' },
  { domain: 'superadmin', subdomain: 'support-tickets', name: 'complaints', entityFile: 'complaint.entity.ts', entityName: 'Complaint' },
  { domain: 'superadmin', subdomain: 'system', name: 'bulk-imports', entityFile: 'bulk-import.entity.ts', entityName: 'BulkImport' },
  { domain: 'superadmin', subdomain: 'system', name: 'tenants', entityFile: 'tenant.entity.ts', entityName: 'Tenant' },
];

for (const mod of modulesToProcess) {
  const { domain, subdomain, name, entityFile, entityName } = mod;
  const path = subdomain === name ? `${domain}/${name}` : `${domain}/${subdomain}/${name}`;
  console.log(`Processing ${path}...`);
  
  try {
    execSync(`powershell -Command "Remove-Item -Path 'src/modules/${path}/*' -Recurse -Force"`, { stdio: 'inherit' });
  } catch (e) {}

  execSync(`node scripts/scaffold-module.js ${domain} ${subdomain} ${name} ${entityFile} ${entityName}`, { stdio: 'inherit' });
  
  try {
    execSync(`powershell -Command "Get-ChildItem -Path 'src/modules/${path}' -Recurse -Include *.ts | ForEach-Object { (Get-Content $_.FullName) -replace '.entity.ts', '.entity' | Set-Content $_.FullName }"`, { stdio: 'inherit' });
  } catch(e) {}
  
  try {
    const toPascal = (s) => s.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join('');
    const subPascal = toPascal(subdomain);
    if (subdomain !== name) {
       execSync(`powershell -Command "Get-ChildItem -Path 'src/modules/${path}' -Recurse -Include *.module.ts | ForEach-Object { (Get-Content $_.FullName) -replace 'Superadmin${subPascal}', 'Superadmin' | Set-Content $_.FullName }"`, { stdio: 'inherit' });
    }
  } catch(e) {}
}

console.log('Batch processing complete!');
