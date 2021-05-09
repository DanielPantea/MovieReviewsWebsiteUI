import { Tag } from './tag.model';

export class Movie{

    movieId: number;
    movieTitle: string;
    movieDesc: string;
    posterImgUrl: string;
    releaseDate: Date;
    trailerUrl: string;
    lengthMinutes: number;
    movieDirectors: string;
    movieWriters: string;
    movieActors: string;
    movieTags: Tag[];
    
}