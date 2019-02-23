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

    @Get('/:userId')
    getUser(@Param('userId') userId: string): Response<User> {
        const user = this.users.getUser(userId)

        if (user) {
            return { payload: user }
        } else {
            throw new HttpException('Not Found', HttpStatus.NOT_FOUND)
        }
    }

    @Post('/:roomId/create')
    createUser(@Param('roomId') roomId:string,@Body() data: { name: string}): Response<User> {
        console.log(data)
        const user = this.users.createUser(data.name, roomId)

        return { payload: user }
    }

}