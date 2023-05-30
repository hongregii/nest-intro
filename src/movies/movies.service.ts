import { Injectable, NotFoundException } from '@nestjs/common';
import { Movie } from './entities/movie.entity';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getConnection } from 'typeorm';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movie)
    private moviesRepository: Repository<Movie>,
  ) {}

  getAll(): Promise<Movie[]> {
    return this.moviesRepository.find();
  }

  async getOne(id: number): Promise<Movie> {
    const movieRes = await this.moviesRepository.findOne({
      where: {
        id,
      },
    });
    console.log('movieRES : ', movieRes);
    if (!movieRes) {
      throw new NotFoundException(`Movie with id: ${id} Not Found.`);
    }
    return movieRes;
  }

  deleteOne(id: number): Promise<void> {
    this.getOne(id);
    this.moviesRepository.delete(id);
    return;
  }

  async create(movieData: CreateMovieDto): Promise<void> {
    await this.moviesRepository.save(movieData);
  }

  async update(id: number, updateData: UpdateMovieDto) {
    // const movieBefore = await this.getOne(id);
    // if (movieBefore) {
    //   const qb = await this.moviesRepository
    //     .createQueryBuilder('Movie')
    //     .update(Movie)
    //     .set({
    //       ...movieBefore,
    //       ...updateData,
    //     })
    //     .where('id = :id', { id });

    await this.getOne(id);
    await this.moviesRepository.update(id, updateData);
    // }
  }
}
