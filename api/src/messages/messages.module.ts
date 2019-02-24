import { Module } from '@nestjs/common'
import { MessagesController } from './messages.controller'
import { MessagesService } from './messages.service'
import { MessagesGateway } from './messages.gateway';
import { RoomsModule } from 'src/rooms/rooms.module';

@Module({
    imports: [RoomsModule],
    controllers: [MessagesController],
    providers: [MessagesService, MessagesGateway],
    exports: [MessagesService]
})
export class MessagesModule { }