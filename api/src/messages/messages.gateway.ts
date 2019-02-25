import { WebSocketServer, WebSocketGateway, SubscribeMessage } from '@nestjs/websockets'
import Message from 'src/models/message.model';
import { RoomsService } from 'src/rooms/rooms.service';
import { MessagesService } from 'src/messages/messages.service';
import { UsersService } from 'src/users/users.service'
import { connect } from 'net';

@WebSocketGateway()
export class MessagesGateway {
    @WebSocketServer() server;
    constructor(private readonly rooms: RoomsService, private readonly messages: MessagesService){}

    @SubscribeMessage('connected')
    connect(){
        console.log('con')
    }

    @SubscribeMessage('send')
    onSendMessage(client: any, data: any){
        console.log(data)
        const message = this.messages.createMessage(data[0],data[1],data[2])

        if(message) {
            return this.broadcastChannel('receive', message)
        }
        return {success: false}
    }

    broadcastChannel(channel: String, message: any) {
        this.server.emit(channel, message);

        return {message, success: true}
        
    }

}