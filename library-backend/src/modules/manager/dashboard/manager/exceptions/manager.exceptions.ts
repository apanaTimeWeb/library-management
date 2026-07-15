import { HttpException, HttpStatus } from '@nestjs/common';

export class DashboardDataNotFoundException extends HttpException {
  constructor() {
    super('Dashboard data not found', HttpStatus.NOT_FOUND);
  }
}
