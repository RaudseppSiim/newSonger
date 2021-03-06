import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RoomsModule } from './rooms/rooms.module';
import { VideosModule } from './videos/videos.module';
import { UsersModule } from './users/users.module'
import { MessagesModule } from './messages/messages.module';

@Module({
  imports: [RoomsModule, VideosModule, UsersModule, MessagesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
