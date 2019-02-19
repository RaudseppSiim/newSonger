import { Injectable } from '@nestjs/common'
import User from '../models/users.model'
import { each, random, map } from 'lodash'
import Room from 'src/models/room.model';

@Injectable()
export class UsersService {

    private readonly users: Map<string, User> = new Map()

    constructor() {
        
    }

    listUsers(): User[] {
        return [...this.users.values()]
    }

    getUser(roomId: string): User {
        return this.users.get(roomId)

    }
    createUser(name:string, room:Room): User {
        const user: User = {
            id: random(0, 1024 ^ 2).toString(16),
            name,
            room: room.id
        }        
        return user
    }

}