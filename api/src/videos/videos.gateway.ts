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
            return this.broadcastChannel('start', room)
        }
        return {success: false}
    }

    @SubscribeMessage('pause')
    onPauseVideo(client: any, roomId: string){
        const room = this.rooms.getRoom(roomId)
        if(room) {
            room.currentVideo.paused = true
            this.broadcastChannel('pause', room)
        }
    }

    @SubscribeMessage('seek')
    onSeekVideo(client: any, data:any){
        console.log(data)
        const room = this.rooms.getRoom(data[0])
        console.log(data[1]);
        if(room) {
            
            let positsion = this.videos.setVideoPosition(room, room.currentVideo.id, data[1])
            this.broadcastChannel('seek', [room,positsion])
        }
    }

    @SubscribeMessage('next')
    nextVideo(client: any, roomId: string){
        const room = this.rooms.getRoom(roomId)

        if(room) {
            this.videos.startNextVideo(room)
            this.broadcastChannel('next', room)
        }
    }

    broadcastUpdate(client: any, room: Room) {
        client.broadcast.emit({ room })
        
        return {room, success: true}
    }

    broadcastChannel(channel: String, room: any) {
        this.server.emit(channel, room);

        return {room, success: true}
        
    }

}