import { ApiProperty } from '@nestjs/swagger';

export class CreateAuthDto {
    @ApiProperty({ type: String })
    username: string;
    @ApiProperty({ type: String })
    password: string;
}
