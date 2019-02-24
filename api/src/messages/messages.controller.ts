import { Controller, HttpException, Get, Post, Body, Param, HttpStatus } from '@nestjs/common'
import { MessagesService } from './messages.service'
import Response from '../models/response.model'
import Message from '../models/message.model'

@Controller('/messages')
export class MessagesController {

    constructor(private readonly messages: MessagesService) { }

    @Get()
    listMessages(): Response<Message[]> {
        const messages = this.messages.listMessages()

        return { payload: messages }
    }

}