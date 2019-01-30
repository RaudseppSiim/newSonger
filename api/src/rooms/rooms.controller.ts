import { Controller, HttpException, Get, Post, Body, Param, HttpStatus } from '@nestjs/common'
import { RoomsService } from './rooms.service'
import Response from '../models/response.model'
import Room from '../models/room.model'

@Controller('/rooms')
export class RoomsController {

    constructor(private readonly rooms: RoomsService) { }

    @Get()
    listRooms(): Response<Room[]> {
        const rooms = this.rooms.listRooms()

        return { payload: rooms }
    }

    @Get('/:roomId')
    getRoom(@Param('roomId') roomId: string): Response<Room> {
        const room = this.rooms.getRoom(roomId)

        if (room) {
            return { payload: room }
        } else {
            throw new HttpException('Not Found', HttpStatus.NOT_FOUND)
        }
    }

    @Post()
    createRoom(@Body() data: { name: string, queue: string[] }): Response<Room> {
        const room = this.rooms.createRoom(data.name, data.queue)

        return { payload: room }
    }

}