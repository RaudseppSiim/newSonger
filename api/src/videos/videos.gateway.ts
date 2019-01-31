import { WebSocketServer, WebSocketGateway, SubscribeMessage } from '@nestjs/websockets'
import Room from 'src/models/room.model';
import Video from 'src/models/video.model';
import { RoomsService } from 'src/rooms/rooms.service';
import { VideosService } from './videos.service';
import { connect } from 'net';

@WebSocketGateway()
export class VideosGateway {
    @WebSocketServer() server;
    constructor(private readonly rooms: RoomsService, private readonly videos: VideosService){}

    @SubscribeMessage('connected')
    connect(){
        console.log('con')
    }

    @SubscribeMessage('start')
    onStartVideo(client: any, roomId: string){
        const room = this.rooms.getRoom(roomId)

        if(room) {
            room.currentVideo.paused = false
            return this.broadcastChannel(client, room)
        }
        return {success: false}
    }

    @SubscribeMessage('pause')
    onPauseVideo(client: any, roomId: string){
        const room = this.rooms.getRoom(roomId)

        if(room) {
            room.currentVideo.paused = true
            this.broadcastChannel(client, room)
        }
    }

    @SubscribeMessage('seek')
    onSeekVideo(client: any, {roomId, position}: {roomId: string, position: number}){
        const room = this.rooms.getRoom(roomId)

        if(room) {
            this.videos.setVideoPosition(room, room.currentVideo.id, position)
            this.broadcastUpdate(client, room)
        }
    }

    @SubscribeMessage('next')
    nextVideo(client: any, roomId: string){
        const room = this.rooms.getRoom(roomId)

        if(room) {
            this.videos.startNextVideo(room)
            this.broadcastUpdate(client, room)
        }
    }

    broadcastUpdate(client: any, room: Room) {
        client.broadcast.emit({ room })
        console.log('broadcast', room)

        return {room, success: true}
    }

    broadcastChannel(channel: String, room: Room) {
        this.server.emit(channel, room);

        console.log('broadcast', room)

        return {room, success: true}
        
    }

}