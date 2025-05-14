import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class EditReadDatesDto {
  @IsOptional()
  @IsString()
  @ApiProperty({ example: '2025-05-14', type: 'string', format: 'date' })
  startDate: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ example: '2025-05-20', type: 'string', format: 'date' })
  endDate: string;
}
