import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsArray } from 'class-validator';
import { Dayjs } from 'dayjs';

export class CreateBookDto {
  @IsString()
  @ApiProperty({ example: 'testTitle' })
  title: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ example: 'testDescription' })
  description?: string;

  @IsOptional()
  @ApiProperty({ example: '2025-05-14', type: 'string', format: 'date' })
  publishedDate?: Dayjs | null;

  @IsOptional()
  @ApiProperty({ example: 300 })
  pageCount?: number;

  @ApiProperty({ example: '2025-05-14', type: 'string', format: 'date' })
  startDate: Dayjs;

  @IsOptional()
  @ApiProperty({ example: '2025-05-20', type: 'string', format: 'date' })
  endDate?: Dayjs | null;

  @IsArray()
  @ApiProperty({ example: ['Author1', 'Author2'] })
  authors: string[];

  @IsArray()
  @ApiProperty({ example: ['Category1', 'Category2'] })
  categories: string[];
}
