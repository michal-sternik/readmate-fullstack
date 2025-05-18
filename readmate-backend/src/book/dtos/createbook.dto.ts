import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsArray } from 'class-validator';

export class CreateBookDto {
  @IsString()
  @ApiProperty({ example: 'testId' })
  id: string;

  @IsString()
  @ApiProperty({ example: 'testTitle' })
  title: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ example: 'testDescription' })
  description?: string | null;

  @IsOptional()
  @ApiProperty({ example: '2025-05-14', type: 'string', format: 'date' })
  publishedDate?: string | null;

  @IsOptional()
  @ApiProperty({ example: 300 })
  pageCount?: number;

  @IsString()
  @ApiProperty({ example: '2025-05-14', type: 'string', format: 'date' })
  startDate: string;

  @IsOptional()
  @ApiProperty({ example: '2025-05-20', type: 'string', format: 'date' })
  endDate?: string | null;

  @IsArray()
  @IsOptional()
  @ApiProperty({ example: ['Author1', 'Author2'] })
  authors?: string[] | null;

  @IsArray()
  @IsOptional()
  @ApiProperty({ example: ['Category1', 'Category2'] })
  categories?: string[] | null;

  @IsOptional()
  @IsString()
  @ApiProperty({
    example: 'https://example.com',
    description: 'Link to the book',
  })
  link?: string | null;

  @IsOptional()
  @IsString()
  @ApiProperty({
    example: 'https://example.com/image.jpg',
    description: 'Link to the book image',
  })
  imageLink?: string | null;
}
