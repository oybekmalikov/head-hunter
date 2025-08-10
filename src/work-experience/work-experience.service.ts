import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateWorkExperienceDto } from "./dto/create-work-experience.dto";
import { UpdateWorkExperienceDto } from "./dto/update-work-experience.dto";
import { WorkExperience } from "./entities/work-experience.entity";

@Injectable()
export class WorkExperienceService {
	constructor(
		@InjectRepository(WorkExperience)
		private workExperienceRepo: Repository<WorkExperience>
	) {}
	async create(createWorkExperienceDto: CreateWorkExperienceDto) {
		const workExperience =await this.workExperienceRepo.save(
			createWorkExperienceDto
		);
		return {
			message: "Work experience created successfully",
			data: workExperience,
			success: true,
		};
	}

	async findAll() {
		const workExperiences = await this.workExperienceRepo.find({
			relations: ["jobSeeker"],
		});
		if (workExperiences.length === 0) {
			return {
				message: "No work experiences found",
				data: [],
				success: true,
			};
		}
		return {
			message: "Work experiences retrieved successfully",
			data: workExperiences,
			success: true,
		};
	}

	async findOne(id: number) {
		const workExperience = await this.workExperienceRepo.findOne({
			where: { id },
			relations: ["jobSeeker"],
		});
		if (!workExperience) {
			return {
				message: `Work experience with id ${id} not found`,
				success: false,
			};
		}
		return {
			message: "Work experience retrieved successfully",
			data: workExperience,
			success: true,
		};
	}

	async update(id: number, updateWorkExperienceDto: UpdateWorkExperienceDto) {
		const updateResult = await this.workExperienceRepo.preload({
			id,
			...updateWorkExperienceDto,
		});
		if (!updateResult) {
			return {
				message: `Work experience with id ${id} not found`,
				success: false,
			};
		}
		return {
			message: "Work experience updated successfully",
			data: this.workExperienceRepo.save(updateResult),
			success: true,
		};
	}

	async remove(id: number) {
		const removeResult = await this.workExperienceRepo.delete(id);
		if (removeResult.affected === 0) {
			return {
				message: `Work experience with id ${id} not found`,
				success: false,
			};
		}
		return {
			message: "Work experience removed successfully",
			success: true,
		};
	}
}
