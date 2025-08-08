import { Module } from '@nestjs/common';
import { JobsNotificationsService } from './jobs-notifications.service';
import { JobsNotificationsController } from './jobs-notifications.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobsNotification } from './entities/jobs-notification.entity';

@Module({
  imports: [TypeOrmModule.forFeature([JobsNotification])],
  controllers: [JobsNotificationsController],
  providers: [JobsNotificationsService],
})
export class JobsNotificationsModule {}
