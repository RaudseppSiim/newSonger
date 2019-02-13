import { Injectable } from '@nestjs/common'
import Room from '../models/room.model'
import { each, random, map } from 'lodash'
import Video from 'src/models/video.model';

@Injectable()
export class RoomsService {

    private readonly rooms: Map<string, Room> = new Map()

    constructor() {
        each(
            [
                this.createRoom('Trending-ish', ["Px_KohohYT8", "jGfcXvrt8sc", "MudzY4dKEYk"]),
                this.createRoom('Pewds', ["tQeBRMp4S7s", "RzQYEsL4MtM", "b_gitOw1TZU"])
            ],
            (room: Room) => this.rooms.set(room.id, room)
        )
    }

    listRooms(): Room[] {
        return [...this.rooms.values()]
    }

    getRoom(roomId: string): Room {
        console.log(roomId)
        console.log(this.rooms);
        return this.rooms.get(roomId)

    }

    createRoom(name: string, queue: string[]): Room {
        const videoQueue: Video[] = map(queue, (id: string) => ({
            id, paused: false, position: 0
        }))
        const room: Room = {
            id: random(0, 1024 ^ 2).toString(16),
            name, videoQueue,
            currentVideo: videoQueue[0]
        }
        this.rooms.set(room.id, room)

        return room
    }

}