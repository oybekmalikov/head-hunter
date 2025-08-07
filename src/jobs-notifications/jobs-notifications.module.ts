import { Module } from '@nestjs/common';
import { JobsNotificationsService } from './jobs-notifications.service';
import { JobsNotificationsController } from './jobs-notifications.controller';

@Module({
  controllers: [JobsNotificationsController],
  providers: [JobsNotificationsService],
})
export class JobsNotificationsModule {}
