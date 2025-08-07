import { PartialType } from '@nestjs/swagger';
import { CreateJobsNotificationDto } from './create-jobs-notification.dto';

export class UpdateJobsNotificationDto extends PartialType(CreateJobsNotificationDto) {}
