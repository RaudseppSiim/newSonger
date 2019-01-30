import { Injectable } from '@nestjs/common'
import { random, map, find } from 'lodash'

import Video from '../models/video.model'
import Room from '../models/room.model'

@Injectable()
export class VideosService {

    getVideoQueue(room: Room): Video[] {
        return [...room.videoQueue]
    }

    getVideo(room: Room, videoId: string): Video {
        return find(room.videoQueue, { id: videoId })
    }

    addVideoToQueue(room: Room, videoId: string): Video {
        const video: Video = { id: videoId, paused: false, position: 0 }

        room.videoQueue.push(video)

        return video
    }

    startVideo(room: Room, videoId: string) {
        const video = this.getVideo(room, videoId)

        if (video) {
            video.paused = false
        }
    }

    startNextVideo(room: Room) {
        room.currentVideo = room.videoQueue.shift()
        room.currentVideo.paused = false
    }

    setVideoPosition(room: Room, videoId: string, position: number) {
        const video = this.getVideo(room, videoId)

        if (video) {
            video.position = position
        }
    }

}