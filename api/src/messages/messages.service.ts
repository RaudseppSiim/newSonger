import { Injectable } from '@nestjs/common'
import { each, random, map } from 'lodash'
import Video from 'src/models/video.model';
import Message from '../models/message.model';

@Injectable()
export class MessagesService {

    private readonly messages: Map<string,Message> = new Map()

    constructor() {
        each(
            [
                
            ],
            (message: Message) => this.messages.set(message.id,message)
        )
    }

    listMessages(): Message[] {
        return [...this.messages.values()]
    }

    getMessages(messageId: string): Message {
        return this.messages.get(messageId)

    }

    createMessage(messageText: string, roomId: string): Message {
        
        const message: Message = {
            id: random(0, 1024 ^ 2).toString(16),
            sender:null,
            roomId: roomId,
            message: messageText,
            time: Date.now(),


        }        
        this.messages.set(message.id,message)
        return message
    }

}