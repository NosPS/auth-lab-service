import { ApiProperty } from '@nestjs/swagger';

export class SignInDto {
    @ApiProperty({ type: String })
    username: string;
    @ApiProperty({ type: String })
    password: string;
}
