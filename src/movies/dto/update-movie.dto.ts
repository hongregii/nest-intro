import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';
import { CreateMovieDto } from './create-movie.dto';

// 오버라이딩! 모든게 다 optional 됨!
export class UpdateMovieDto extends PartialType(CreateMovieDto) {
  // partialtype 상속하면 자동으로 모든 필드가 옵셔널하게 바뀌는데,
  // 스웨거에서 쓰려면 이렇게 일일이 써줘야됨 ㅋㅋ
  @IsString()
  @ApiProperty({ description: '제목', required: true })
  readonly title?: string;
  @IsNumber()
  @ApiProperty({ description: '년도', required: true })
  readonly year?: number;
  @IsString({ each: true })
  @ApiProperty({ description: '장르', required: true })
  readonly genres?: string;
}
