const fs = require('fs');
const path = require('path');

const [,, domain, subdomain, moduleName, entityFile, entityName] = process.argv;

if (!domain || !moduleName || !entityFile || !entityName) {
  console.error('Usage: node scaffold-module.js <domain> <subdomain> <moduleName> <entityFile> <entityName>');
  console.error('Example: node scaffold-module.js admin expenses expenses expense.entity Expense');
  process.exit(1);
}

const moduleDir = subdomain && subdomain !== moduleName
  ? path.join(__dirname, `../src/modules/${domain}/${subdomain}/${moduleName}`)
  : path.join(__dirname, `../src/modules/${domain}/${moduleName}/${moduleName}`);

console.log(`Scaffolding module in: ${moduleDir}`);

const dirs = [
  'constants',
  'controllers',
  'dto',
  'exceptions',
  'interfaces',
  'services'
];

dirs.forEach(d => fs.mkdirSync(path.join(moduleDir, d), { recursive: true }));

const toKebab = (s) => s.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
const toPascal = (s) => s.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join('');

const singularKebab = toKebab(entityName);
const Sing = entityName;
const Plural = entityName.endsWith('y') ? entityName.slice(0, -1) + 'ies' : entityName + 's';
const moduleClassPrefix = toPascal(domain) + toPascal(subdomain === moduleName ? '' : subdomain) + toPascal(moduleName);
const constName = `${moduleName.replace(/-/g, '_').toUpperCase()}_CONSTANTS`;

// 1. Constants
fs.writeFileSync(path.join(moduleDir, `constants/${moduleName}.constants.ts`), `export const ${constName} = {
  MODULE_NAME: '${domain.toUpperCase()}_${moduleName.replace(/-/g, '_').toUpperCase()}',
  ERRORS: {
    ${singularKebab.replace(/-/g, '_').toUpperCase()}_NOT_FOUND: '${Sing} not found.',
  },
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 20,
};
`);

// 2. Interfaces
fs.writeFileSync(path.join(moduleDir, `interfaces/${moduleName}.interfaces.ts`), `export interface I${Sing}Record {
  id: string;
}

export interface I${Plural}PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}
`);

// 3. Exceptions
fs.writeFileSync(path.join(moduleDir, `exceptions/${moduleName}.exceptions.ts`), `import { HttpException, HttpStatus } from '@nestjs/common';
import { ${constName} } from '../constants/${moduleName}.constants';

export class ${Sing}NotFoundException extends HttpException {
  constructor(message: string = ${constName}.ERRORS.${singularKebab.replace(/-/g, '_').toUpperCase()}_NOT_FOUND) {
    super(message, HttpStatus.NOT_FOUND);
  }
}
`);

// 4. DTOs
fs.writeFileSync(path.join(moduleDir, `dto/create-${singularKebab}.dto.ts`), `export class Create${Sing}Dto {}
`);

fs.writeFileSync(path.join(moduleDir, `dto/update-${singularKebab}.dto.ts`), `import { PartialType } from '@nestjs/mapped-types';
import { Create${Sing}Dto } from './create-${singularKebab}.dto';

export class Update${Sing}Dto extends PartialType(Create${Sing}Dto) {}
`);

fs.writeFileSync(path.join(moduleDir, `dto/get-${moduleName}-query.dto.ts`), `import { IsOptional, IsInt, Min, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { ${constName} } from '../constants/${moduleName}.constants';

export class Get${Plural}QueryDto {
  @IsOptional()
  @IsInt()
  @Min(1)
  @Type(() => Number)
  page?: number = ${constName}.DEFAULT_PAGE;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Type(() => Number)
  limit?: number = ${constName}.DEFAULT_LIMIT;

  @IsOptional()
  @IsString()
  search?: string;
}
`);

// 5. Services
fs.writeFileSync(path.join(moduleDir, `services/create-${singularKebab}.service.ts`), `import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ${entityName} } from '@/core/entities/${entityFile}';
import { Create${Sing}Dto } from '../dto/create-${singularKebab}.dto';

@Injectable()
export class Create${Sing}Service {
  constructor(
    @InjectRepository(${entityName})
    private readonly repository: Repository<${entityName}>,
  ) {}

  async execute(dto: Create${Sing}Dto): Promise<${entityName}> {
    const entity = this.repository.create(dto);
    return await this.repository.save(entity);
  }
}
`);

fs.writeFileSync(path.join(moduleDir, `services/update-${singularKebab}.service.ts`), `import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ${entityName} } from '@/core/entities/${entityFile}';
import { Update${Sing}Dto } from '../dto/update-${singularKebab}.dto';
import { ${Sing}NotFoundException } from '../exceptions/${moduleName}.exceptions';

@Injectable()
export class Update${Sing}Service {
  constructor(
    @InjectRepository(${entityName})
    private readonly repository: Repository<${entityName}>,
  ) {}

  async execute(id: string, dto: Update${Sing}Dto): Promise<${entityName}> {
    const existing = await this.repository.findOne({ where: { id } as any });
    if (!existing) throw new ${Sing}NotFoundException();
    Object.assign(existing, dto);
    return await this.repository.save(existing);
  }
}
`);

fs.writeFileSync(path.join(moduleDir, `services/delete-${singularKebab}.service.ts`), `import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ${entityName} } from '@/core/entities/${entityFile}';
import { ${Sing}NotFoundException } from '../exceptions/${moduleName}.exceptions';

@Injectable()
export class Delete${Sing}Service {
  constructor(
    @InjectRepository(${entityName})
    private readonly repository: Repository<${entityName}>,
  ) {}

  async execute(id: string): Promise<void> {
    const existing = await this.repository.findOne({ where: { id } as any });
    if (!existing) throw new ${Sing}NotFoundException();
    await this.repository.remove(existing);
  }
}
`);

fs.writeFileSync(path.join(moduleDir, `services/get-all-${moduleName}.service.ts`), `import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOptionsWhere, ILike } from 'typeorm';
import { ${entityName} } from '@/core/entities/${entityFile}';
import { Get${Plural}QueryDto } from '../dto/get-${moduleName}-query.dto';

@Injectable()
export class GetAll${Plural}Service {
  constructor(
    @InjectRepository(${entityName})
    private readonly repository: Repository<${entityName}>,
  ) {}

  async execute(queryDto: Get${Plural}QueryDto): Promise<{ items: ${entityName}[]; total: number }> {
    const { page = 1, limit = 20, search } = queryDto;
    const where: FindOptionsWhere<${entityName}> = {};
    
    const [items, total] = await this.repository.findAndCount({
      where,
      order: { createdAt: 'DESC' } as any,
      skip: (page - 1) * limit,
      take: limit,
    });
    return { items, total };
  }
}
`);

fs.writeFileSync(path.join(moduleDir, `services/get-${singularKebab}.service.ts`), `import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ${entityName} } from '@/core/entities/${entityFile}';
import { ${Sing}NotFoundException } from '../exceptions/${moduleName}.exceptions';

@Injectable()
export class Get${Sing}Service {
  constructor(
    @InjectRepository(${entityName})
    private readonly repository: Repository<${entityName}>,
  ) {}

  async execute(id: string): Promise<${entityName}> {
    const existing = await this.repository.findOne({ where: { id } as any });
    if (!existing) throw new ${Sing}NotFoundException();
    return existing;
  }
}
`);

// 6. Controllers
const routePrefix = `api/v1/${domain}/${moduleName}`;
fs.writeFileSync(path.join(moduleDir, `controllers/create-${singularKebab}.controller.ts`), `import { Controller, Post, Body } from '@nestjs/common';
import { Create${Sing}Service } from '../services/create-${singularKebab}.service';
import { Create${Sing}Dto } from '../dto/create-${singularKebab}.dto';

@Controller('${routePrefix}')
export class Create${Sing}Controller {
  constructor(private readonly service: Create${Sing}Service) {}

  @Post()
  async handle(@Body() dto: Create${Sing}Dto) {
    const data = await this.service.execute(dto);
    return { success: true, message: '${Sing} created successfully', data };
  }
}
`);

fs.writeFileSync(path.join(moduleDir, `controllers/update-${singularKebab}.controller.ts`), `import { Controller, Patch, Param, Body } from '@nestjs/common';
import { Update${Sing}Service } from '../services/update-${singularKebab}.service';
import { Update${Sing}Dto } from '../dto/update-${singularKebab}.dto';

@Controller('${routePrefix}')
export class Update${Sing}Controller {
  constructor(private readonly service: Update${Sing}Service) {}

  @Patch(':id')
  async handle(@Param('id') id: string, @Body() dto: Update${Sing}Dto) {
    const data = await this.service.execute(id, dto);
    return { success: true, message: '${Sing} updated successfully', data };
  }
}
`);

fs.writeFileSync(path.join(moduleDir, `controllers/delete-${singularKebab}.controller.ts`), `import { Controller, Delete, Param } from '@nestjs/common';
import { Delete${Sing}Service } from '../services/delete-${singularKebab}.service';

@Controller('${routePrefix}')
export class Delete${Sing}Controller {
  constructor(private readonly service: Delete${Sing}Service) {}

  @Delete(':id')
  async handle(@Param('id') id: string) {
    await this.service.execute(id);
    return { success: true, message: '${Sing} deleted successfully', data: null };
  }
}
`);

fs.writeFileSync(path.join(moduleDir, `controllers/get-all-${moduleName}.controller.ts`), `import { Controller, Get, Query } from '@nestjs/common';
import { GetAll${Plural}Service } from '../services/get-all-${moduleName}.service';
import { Get${Plural}QueryDto } from '../dto/get-${moduleName}-query.dto';

@Controller('${routePrefix}')
export class GetAll${Plural}Controller {
  constructor(private readonly service: GetAll${Plural}Service) {}

  @Get()
  async handle(@Query() query: Get${Plural}QueryDto) {
    const { items, total } = await this.service.execute(query);
    return {
      success: true,
      message: '${Plural} retrieved successfully',
      data: items,
      meta: { total, page: query.page, limit: query.limit },
    };
  }
}
`);

fs.writeFileSync(path.join(moduleDir, `controllers/get-${singularKebab}.controller.ts`), `import { Controller, Get, Param } from '@nestjs/common';
import { Get${Sing}Service } from '../services/get-${singularKebab}.service';

@Controller('${routePrefix}')
export class Get${Sing}Controller {
  constructor(private readonly service: Get${Sing}Service) {}

  @Get(':id')
  async handle(@Param('id') id: string) {
    const data = await this.service.execute(id);
    return { success: true, message: '${Sing} retrieved successfully', data };
  }
}
`);

// 7. Module
fs.writeFileSync(path.join(moduleDir, `${moduleName}.module.ts`), `import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ${entityName} } from '@/core/entities/${entityFile}';

import { Create${Sing}Controller } from './controllers/create-${singularKebab}.controller';
import { Update${Sing}Controller } from './controllers/update-${singularKebab}.controller';
import { Delete${Sing}Controller } from './controllers/delete-${singularKebab}.controller';
import { GetAll${Plural}Controller } from './controllers/get-all-${moduleName}.controller';
import { Get${Sing}Controller } from './controllers/get-${singularKebab}.controller';

import { Create${Sing}Service } from './services/create-${singularKebab}.service';
import { Update${Sing}Service } from './services/update-${singularKebab}.service';
import { Delete${Sing}Service } from './services/delete-${singularKebab}.service';
import { GetAll${Plural}Service } from './services/get-all-${moduleName}.service';
import { Get${Sing}Service } from './services/get-${singularKebab}.service';

@Module({
  imports: [TypeOrmModule.forFeature([${entityName}])],
  controllers: [
    Create${Sing}Controller,
    Update${Sing}Controller,
    Delete${Sing}Controller,
    GetAll${Plural}Controller,
    Get${Sing}Controller,
  ],
  providers: [
    Create${Sing}Service,
    Update${Sing}Service,
    Delete${Sing}Service,
    GetAll${Plural}Service,
    Get${Sing}Service,
  ],
  exports: [Get${Sing}Service],
})
export class ${moduleClassPrefix}Module {}
`);

// 8. Metadata
fs.writeFileSync(path.join(moduleDir, `${moduleName}_backend_feature.md`), `# ${Plural} Module\n\n## Responsibility\nManages ${moduleName}.\n\n## Architecture\n- CQRS-lite\n- Micro-Modularized\n`);
fs.writeFileSync(path.join(moduleDir, `${moduleName}_collection.json`), `{\n  "name": "${moduleName}",\n  "description": "Postman Collection for ${moduleName}"\n}\n`);
fs.writeFileSync(path.join(moduleDir, `${moduleName}_dependencies.md`), `# Dependencies\n- TypeOrmModule\n- ${entityName}\n`);

console.log('Scaffolding complete!');
