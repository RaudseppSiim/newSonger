import Video from './video.model'

export default interface Room {
    id: string;
    name: String;
    videoQueue: Video[];
    currentVideo: Video;
}