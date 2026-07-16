import { Injectable } from '@nestjs/common';
import { CreatewhatsapptemplatesDto } from '../dto/create-whatsapp-templates.dto';
import { UpdatewhatsapptemplatesDto } from '../dto/update-whatsapp-templates.dto';

@Injectable()
export class whatsapptemplatesService {
  create(createDto: CreatewhatsapptemplatesDto) {
    return 'This action adds a new whatsapp-templates';
  }

  findAll() {
    return \This action returns all whatsapp-templates\;
  }

  findOne(id: string) {
    return \This action returns a #\ whatsapp-templates\;
  }

  update(id: string, updateDto: UpdatewhatsapptemplatesDto) {
    return \This action updates a #\ whatsapp-templates\;
  }

  remove(id: string) {
    return \This action removes a #\ whatsapp-templates\;
  }
}
