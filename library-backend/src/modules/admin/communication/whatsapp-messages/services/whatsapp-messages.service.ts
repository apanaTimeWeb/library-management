import { Injectable } from '@nestjs/common';
import { CreatewhatsappmessagesDto } from '../dto/create-whatsapp-messages.dto';
import { UpdatewhatsappmessagesDto } from '../dto/update-whatsapp-messages.dto';

@Injectable()
export class whatsappmessagesService {
  create(createDto: CreatewhatsappmessagesDto) {
    return 'This action adds a new whatsapp-messages';
  }

  findAll() {
    return \This action returns all whatsapp-messages\;
  }

  findOne(id: string) {
    return \This action returns a #\ whatsapp-messages\;
  }

  update(id: string, updateDto: UpdatewhatsappmessagesDto) {
    return \This action updates a #\ whatsapp-messages\;
  }

  remove(id: string) {
    return \This action removes a #\ whatsapp-messages\;
  }
}
