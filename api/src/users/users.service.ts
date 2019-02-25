import { Injectable } from '@nestjs/common'
import User from '../models/users.model'
import { each, random, map, find } from 'lodash'
import Room from 'src/models/room.model';
import { finished } from 'stream';

@Injectable()
export class UsersService {

    private readonly users: Map<string, User> = new Map()

    constructor() {
        
    }

    listUsers(): User[] {
        return [...this.users.values()]
    }

    getUser(userId: string): User {
        return this.users.get(userId)

    }
    createUser(name:string, roomId:string): User {
        const user: User = {
            id: random(0, 1024 ^ 2).toString(16),
            name,
            room: roomId
        }        
        this.users.set(user.id,user)
        return user
    }

    getUsersInRoom(roomId:string):User[] {
        var users = [...this.users.values()];
        return users.filter(user => user.room === roomId)
    }

}