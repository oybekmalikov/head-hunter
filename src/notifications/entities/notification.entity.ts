import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../../users/entities/user.entity"
import { ApiProperty } from "@nestjs/swagger";

//Notifications for Admins
@Entity({ name: "notifications" })
export class Notification {
	@ApiProperty({
		example: 1,
		description: "This is the notification ID number.",
	})
	@PrimaryGeneratedColumn()
	id: number;

	@ApiProperty({
		example: "New employer created",
		description: "This is the notification title.",
	})
	@Column()
	title: string;

	@ApiProperty({
		example: "A new employer request for verification",
		description: "This is the notification message.",
	})
	@Column()
	message: string;

	@ApiProperty({
		example: 1,
		description: "This is the user ID number.",
	})
	@Column()
	userId: number;

	@ApiProperty({
		example: true,
		description: "This is the notification viewed status.",
	})
	@Column({ default: false })
	isViewed: boolean;

	@ManyToOne(() => User, (user) => user.notifications)
	user: User;
}
