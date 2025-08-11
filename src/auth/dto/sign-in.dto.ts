import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsStrongPassword, Matches } from "class-validator";

export class SignInDto {

  @ApiProperty({
    example: "example@gmail.com",
    description: "This user's email address"
  })
  @IsEmail({}, {message: "Email not valid!"})
  @IsNotEmpty({message: "Email is required!"})
  readonly email: string;

  @ApiProperty({
    example: "example1234",
    description: "This user's password"
  })
  @IsNotEmpty({message: "Password is required!"})
  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1
  })
  readonly password: string;  
}
