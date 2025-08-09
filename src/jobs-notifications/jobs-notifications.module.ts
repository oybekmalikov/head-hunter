import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { JobsNotification } from "./entities/jobs-notification.entity";
import { JobsNotificationsController } from "./jobs-notifications.controller";
import { JobsNotificationsService } from "./jobs-notifications.service";

@Module({
  imports: [TypeOrmModule.forFeature([JobsNotification])],
  controllers: [JobsNotificationsController],
  providers: [JobsNotificationsService],
  exports: [JobsNotificationsService],
})
export class JobsNotificationsModule {}
