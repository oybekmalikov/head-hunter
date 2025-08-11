import { ApiProperty } from '@nestjs/swagger'
import { IsBoolean, IsEmail, IsNumber, IsString } from "class-validator"

export class CreateCompanyDto {
  @ApiProperty({ example: 'OpenAI', description: 'Company name' })
  @IsString({message: 'Company name must be a string'})
  name: string;

  @ApiProperty({ example: 'An AI company', description: 'Information about the company' })
  @IsString({message: 'Description must be a string'})
  description: string;

  @ApiProperty({ example: 'Information Technology', description: 'Company industry' })
  @IsString({message: 'Industry must be a string'})
  industry: string;

  @ApiProperty({ example: '50-200', description: 'Company size' })
  @IsString({message: 'Company size must be a string'})
  companySize: string;

  @ApiProperty({ example: 'https://openai.com', description: 'Companys website' })
  @IsString({message: 'Website URL must be a string'})
  webSiteUrl: string;

  @ApiProperty({ example: 'https://openai.com/logo.png', description: 'Logo URL' })
  @IsString({message: 'Logo URL must be a string'})
  logoUrl: string;

  @ApiProperty({ example: 2015, description: 'Established year' })
  @IsNumber({},{message: 'Established year must be a number'})
  establishedYear: number;

  @ApiProperty({ example: 'San Francisco, CA', description: 'Address' })
  @IsString({message: 'Address must be a string'})
  address: string;

  @ApiProperty({ example: '+998901234567', description: 'Companys phone number' })
  @IsString({message: 'Phone number must be a string'})
  callNumber: string;

  @ApiProperty({ example: 'info@openai.com', description: 'Comanys email' })
  @IsEmail({},{message: 'Email must be a valid email'})
  email: string;

  @ApiProperty({ example: true, description: 'Is the company verified', required: false })
  isVerified?: boolean;
}
