import { ApiProperty } from '@nestjs/swagger';
import { Role } from 'src/auth/enums/role.enum';

export class UserInfoDto {
  @ApiProperty({
    example: 'testUsername',
    description: 'Unique username of the user',
  })
  username: string;

  @ApiProperty({
    example: 'testEmail@email.com',
    description: 'Email address of the user',
  })
  email: string;

  @ApiProperty({ example: 25, description: 'Age of the user' })
  age: number;

  @ApiProperty({
    example: '2024-06-01',
    description: 'Account creation date (YYYY-MM-DD format)',
  })
  createdAt: string;

  @ApiProperty({ example: 'USER', description: 'Role of the user' })
  role: Role;
}
