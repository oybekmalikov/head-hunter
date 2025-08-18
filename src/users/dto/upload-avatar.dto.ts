import { ApiProperty } from "@nestjs/swagger";

export class UploadAvatarResponseDto {
  @ApiProperty({
    example: "Avatar uploaded successfully",
    description: "Success message for avatar upload",
  })
  message: string;

  @ApiProperty({
    example: { avatarUrl: "/assets/user-profile-images/abc123.jpg" },
    description: "Uploaded avatar data",
  })
  data: {
    avatarUrl: string;
  };

  @ApiProperty({
    example: true,
    description: "Success status",
  })
  success: boolean;
}

export class DeleteAvatarResponseDto {
  @ApiProperty({
    example: "Avatar deleted successfully",
    description: "Success message for avatar deletion",
  })
  message: string;

  @ApiProperty({
    example: true,
    description: "Success status",
  })
  success: boolean;
}
