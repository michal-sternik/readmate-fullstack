import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, Matches, MaxLength, MinLength } from 'class-validator';

export class RegisterDto {
  @ApiProperty({
    description: 'username - must be unique',
    example: 'testUser123',
  })
  @MinLength(2)
  @MaxLength(20)
  username: string;

  @ApiProperty({
    description: 'email - must be unique',
    example: 'testUser123@testMail.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Password - must be strong - minLength: 8',
    example: 'YourPassword!',
  })
  @MinLength(8)
  password: string;

  @ApiProperty({
    description: 'Confirm password - must be equal to password',
    example: 'YourPassword!',
  })
  @MinLength(8)
  confirmPassword: string;

  @ApiProperty({
    description: 'Date of birth - must be in the format YYYY-MM-DD',
    example: '1990-01-01',
  })
  @Matches(/^\d{4}-\d{2}-\d{2}$/, {
    message: 'birthDate must be in format YYYY-MM-DD',
  })
  birthDate: string;
}
