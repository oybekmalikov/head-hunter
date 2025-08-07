import { ApiProperty } from '@nestjs/swagger';

export class CreateCompanyDto {
  @ApiProperty({ example: 'OpenAI', description: 'Kompaniya nomi' })
  name: string;

  @ApiProperty({ example: 'AI texnologiyalari bilan shug‘ullanadi', description: 'Kompaniya haqida qisqacha maʼlumot' })
  description: string;

  @ApiProperty({ example: 'Information Technology', description: 'Kompaniyaning sanoati (industry)' })
  industry: string;

  @ApiProperty({ example: '50-200', description: 'Kompaniyadagi xodimlar soni' })
  cmp_size: string;

  @ApiProperty({ example: 'https://openai.com', description: 'Rasmiy veb-sayt havolasi' })
  web_site_url: string;

  @ApiProperty({ example: 'https://openai.com/logo.png', description: 'Logo rasmi URL' })
  logo_url: string;

  @ApiProperty({ example: 2015, description: 'Tashkil topgan yil' })
  established_year: number;

  @ApiProperty({ example: 'San Francisco, CA', description: 'Manzil' })
  address: string;

  @ApiProperty({ example: '+998901234567', description: 'Telefon raqami' })
  call_number: string;

  @ApiProperty({ example: 'info@openai.com', description: 'Elektron pochta manzili' })
  email: string;

  @ApiProperty({ example: true, description: 'Kompaniya tasdiqlanganmi?', required: false })
  is_verified?: boolean;
}
