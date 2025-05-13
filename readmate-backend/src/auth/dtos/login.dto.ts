//only for Swagger purposes. currently we're using passport strategy, and this dto won't be used in the logic. it's only to display swagger request body

import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({
    description: 'email - your email',
    example: 'testUser123@testMail.com',
  })
  email: string;

  @ApiProperty({
    description: 'password, your password',
    example: 'YourPassword!',
  })
  password: string;
}
