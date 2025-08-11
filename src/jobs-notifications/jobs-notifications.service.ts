import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateJobsNotificationDto } from "./dto/create-jobs-notification.dto";
import { UpdateJobsNotificationDto } from "./dto/update-jobs-notification.dto";
import { JobsNotification } from "./entities/jobs-notification.entity";

@Injectable()
export class JobsNotificationsService {
	constructor(
		@InjectRepository(JobsNotification)
		private jobNotificationRepo: Repository<JobsNotification>
	) {}
	async create(createJobsNotificationDto: CreateJobsNotificationDto) {
		const newJobsNotification = await this.jobNotificationRepo.save(
			createJobsNotificationDto
		);
		return {
			message: "Job notification created successfully",
			data: newJobsNotification,
			success: true,
		};
	}

	async findAll() {
		const jobsNotifications = await this.jobNotificationRepo.find({
			relations: ["jobPosting", "jobSeeker"],
		});
		if (!jobsNotifications || jobsNotifications.length === 0) {
			return {
				message: "No job notifications found",
				data: [],
				success: false,
			};
		}
		return {
			message: "Job notifications retrieved successfully",
			data: jobsNotifications,
			success: true,
		};
	}

	async findOne(id: number) {
		const jobNotification = await this.jobNotificationRepo.findOne({
			where: { id },
			relations: ["jobPosting", "jobSeeker"],
		});
		if (!jobNotification) {
			return {
				message: `Job notification with id ${id} not found`,
				data: null,
				success: false,
			};
		}
		return {
			message: `Job notification with id ${id} retrieved successfully`,
			data: jobNotification,
			success: true,
		};
	}

	async update(
		id: number,
		updateJobsNotificationDto: UpdateJobsNotificationDto
	) {
		const updateJobsNotification = await this.jobNotificationRepo.preload({
			id,
			...updateJobsNotificationDto,
		});
		if (!updateJobsNotification) {
			return {
				message: `Job notification with id ${id} not found`,
				data: null,
				success: false,
			};
		}
		return {
			message: `Job notification with id ${id} updated successfully`,
			data: await this.jobNotificationRepo.save(updateJobsNotification),
			success: true,
		};
	}

	async remove(id: number) {
		const jobNotification = await this.jobNotificationRepo.delete(id);
		if (jobNotification.affected === 0) {
			return {
				message: `Job notification with id ${id} not found`,
				success: false,
			};
		}
		return {
			message: `Job notification with id ${id} removed successfully`,
			data: { affected: jobNotification.affected },
			success: true,
		};
	}
}
