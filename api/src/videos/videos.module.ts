import { Module } from '@nestjs/common'

import { VideosController } from './videos.controller'
import { VideosService } from './videos.service'
import { RoomsModule } from 'src/rooms/rooms.module';
import { VideosGateway } from './videos.gateway';

@Module({
    imports: [RoomsModule],
    controllers: [VideosController],
    providers: [VideosService, VideosGateway],
    exports: [VideosService]
})
export class VideosModule { }