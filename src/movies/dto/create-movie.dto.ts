import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateMovieDto {
  @IsString()
  @ApiProperty({ description: '제목', required: true })
  readonly title: string;

  @IsNumber()
  @ApiProperty({ description: '년도', required: true })
  readonly year: number;

  @IsString({ each: true })
  @IsOptional() // 미친거아냐?
  @ApiProperty({ description: '장르', required: true })
  readonly genres: string;
}
