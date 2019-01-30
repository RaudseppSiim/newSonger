import { Controller, HttpException, Get, Post, Body, Param, HttpStatus } from '@nestjs/common'
import { VideosService } from './videos.service'
import { RoomsService } from '../rooms/rooms.service';
import Response from '../models/response.model'
import Room from '../models/room.model'
import Video from '../models/video.model'

@Controller('/videos')
export class VideosController {

    constructor(
        private readonly rooms: RoomsService,
        private readonly videos: VideosService,
    ) { }

    @Get('/:roomId/videos')
    listVideos(roomId: string): Response<Video[]> {
        const room = this.rooms.getRoom(roomId)

        if (room) {
            const videos = this.videos.getVideoQueue(room)

            return { payload: videos }
        } else {
            throw new HttpException('Not Found', HttpStatus.NOT_FOUND)
        }
    }

    @Get('/:roomId/videos/:videoId')
    getRoom(@Param('roomId') roomId: string, @Param('videoId') videoId: string): Response<Video> {
        const room = this.rooms.getRoom(roomId)

        if (!room) {
            throw new HttpException('Not Found', HttpStatus.NOT_FOUND)
        }

        const video = this.videos.getVideo(room, videoId)

        if(!video){
            throw new HttpException('Not Found', HttpStatus.NOT_FOUND)
        }

        return { payload: video }
    }

    @Post('/:roomId/videos')
    addVideoToQueue(@Param('roomId') roomId: string, @Body() {videoId}: { videoId: string }): Response<Video> {
        const room = this.rooms.getRoom(roomId)

        if (!room) {
            throw new HttpException('Not Found', HttpStatus.NOT_FOUND)
        }

        const video: Video = this.videos.addVideoToQueue(room, videoId)

        return { payload: video }
    }

}