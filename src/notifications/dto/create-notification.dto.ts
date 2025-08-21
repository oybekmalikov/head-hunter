import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator"

export class CreateNotificationDto {
	@ApiProperty({
		example: "New employer created",
		description: "This is the notification title.",
	})
	@IsNotEmpty()
	@IsString()
	title: string;

	@ApiProperty({
		example: "A new employer request for verification",
		description: "This is the notification message.",
	})
	@IsNotEmpty()
	@IsString()
	message: string;

	@ApiProperty({
		example: 1,
		description: "This is the user ID number.",
	})
	@IsNotEmpty()
	@IsNumber()
	userId: number;

	@ApiProperty({
		example: true,
		description: "This is the notification viewed status.",
	})
	@IsOptional()
	@IsBoolean()
	isViewed?: boolean;
}
