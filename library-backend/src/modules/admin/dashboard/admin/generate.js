const fs = require('fs');
const path = require('path');

const endpoints = [
  'audit-logs', 'blacklist', 'branches', 'coupons', 
  'expense-categories', 'expenses', 'permissions', 
  'plans', 'staff-users', 'students'
];

const basePath = path.join(__dirname, 'services');
const controllersPath = path.join(__dirname, 'controllers');

if (!fs.existsSync(basePath)) fs.mkdirSync(basePath, { recursive: true });
if (!fs.existsSync(controllersPath)) fs.mkdirSync(controllersPath, { recursive: true });

endpoints.forEach(ep => {
  const className = ep.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join('');
  
  // Service
  const serviceContent = `import { Injectable } from '@nestjs/common';
import { ADMIN_CONSTANTS } from '../constants/admin.constants';

@Injectable()
export class ${className}Service {
  async get${className}() {
    return ADMIN_CONSTANTS.EMPTY_ARRAY;
  }
}
`;
  fs.writeFileSync(path.join(basePath, ep + '.service.ts'), serviceContent);

  // Controller
  const controllerContent = `import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { ${className}Service } from '../services/${ep}.service';
import { Roles } from '../../../../auth/auth/decorators/roles.decorator';
import { JwtAuthGuard } from '../../../../auth/auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../../../auth/auth/guards/roles.guard';
import { TenantGuard } from '../../../../auth/auth/guards/tenant.guard';

@ApiTags('Admin')
@ApiBearerAuth()
@Controller('api/admin/dashboard')
@UseGuards(JwtAuthGuard, RolesGuard, TenantGuard)
@Roles('superadmin', 'admin')
export class ${className}Controller {
  constructor(private readonly ${ep.replace(/-./g, x => x[1].toUpperCase())}Service: ${className}Service) {}

  @Get('${ep}')
  @ApiOperation({ summary: 'Get ${ep.replace('-', ' ')}' })
  async get${className}() {
    return this.${ep.replace(/-./g, x => x[1].toUpperCase())}Service.get${className}();
  }
}
`;
  fs.writeFileSync(path.join(controllersPath, ep + '.controller.ts'), controllerContent);
});

console.log('Generated 10 services and controllers');
