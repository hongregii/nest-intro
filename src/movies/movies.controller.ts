import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { MoviesService } from './movies.service';
import { Movie } from './entities/movie.entity';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';

@ApiTags('movies')
@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get()
  getAll(): Promise<Movie[]> {
    return this.moviesService.getAll();
  }

  @Get('search')
  search(@Query('year') year: string) {
    return `We are searching for a movie with a title, year after ${year}`;
  } // 이놈이 아래 함수보다 밑에서 선언되면 "search" 가 path parameter의 id라고 판단함 ㅋㅋ

  @Get(':id') // path parameter!
  getOne(@Param('id') movieId: number): Promise<Movie> {
    // 기본 문법. @Param(path parameter) 변수명:형
    return this.moviesService.getOne(movieId);
  }

  @ApiBody({ type: CreateMovieDto })
  @Post()
  create(@Body() movieData: CreateMovieDto) {
    // console.log(' movieData : ', movieData);
    return this.moviesService.create(movieData);
  }

  @Delete(':id')
  remove(@Param('id') movieId: number) {
    return this.moviesService.deleteOne(movieId);
  }

  @Put('/:id')
  patch(@Param('id') movieId: number, @Body() updateData: UpdateMovieDto) {
    return this.moviesService.update(movieId, updateData);
  }
}
