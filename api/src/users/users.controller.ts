import { Controller, HttpException, Get, Post, Body, Param, HttpStatus } from '@nestjs/common'
import Response from '../models/response.model'
import User from '../models/users.model'
import Room from '../models/room.model'
import { UsersService } from './users.service'

@Controller('/users')
export class UsersController {

    constructor(private readonly users: UsersService) { }

    @Get()
    listUsers(): Response<User[]> {
        const users = this.users.listUsers()

        return { payload: users }
    }

    @Get('/:roomId')
    getUser(@Param('roomId') roomId: string): Response<User> {
        const user = this.users.getUser(roomId)

        if (user) {
            return { payload: user }
        } else {
            throw new HttpException('Not Found', HttpStatus.NOT_FOUND)
        }
    }

    @Post('/:roomId/create')
    createUser(@Body() data: { name: string, room:Room }): Response<User> {
        const user = this.users.createUser(data.name, data.room)

        return { payload: user }
    }

}