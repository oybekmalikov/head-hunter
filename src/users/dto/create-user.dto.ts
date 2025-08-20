import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsOptional, IsPhoneNumber, IsString, IsStrongPassword } from "class-validator";

export class CreateUserDto {
  @ApiProperty({
    example: "Ali",
    description: "This is the user's first name",
  })
  @IsNotEmpty({ message: "First name is required!" })
  @IsString({message: "First name must be a string!"})
  firstName: string;

  @ApiProperty({
    example: "Aliyev",
    description: "This is the user's last name",
  })
  @IsNotEmpty({ message: "Last name is required!" })
  @IsString({message: "Last name must be a string!"})
  lastName: string;

  @ApiProperty({
    example: "example@gmail.com",
    description: "This user's email address",
  })
  @IsNotEmpty({ message: "Email is required!" })
  @IsEmail({}, { message: "Email not valid!" })
  email: string;

  @ApiProperty({
    example: "example1234!",
    description: "This user's password",
  })
  @IsNotEmpty({ message: "Password is required!" })
  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  })
  password: string;

  @ApiProperty({
    example: "example1234!",
    description: "This user's confirm password",
  })
  @IsNotEmpty({ message: "Confirm password is required!" })
  @IsString({message: "Confirm password must be a string!"})
  confirmPassword?: string;

  @ApiProperty({
    example: "+998901234567",
    description: "This user's phone number",
  })
  @IsNotEmpty({ message: "Phone number is required!" })
  @IsPhoneNumber("UZ", { message: "Phone number not valid!" })
  phone: string;

  @ApiProperty({
    example: "https://example.com/avatar.jpg Optional property",
    description: "This user's avatar url",
  })
  avatarUrl?: string;

  @ApiProperty({
    example: "1",
    description: "This user's role",
  })
  @IsOptional()
  @IsString({message: "Role must be a string!"})
  role?: string;
}
