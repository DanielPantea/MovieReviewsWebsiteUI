import { Movie } from './movie.model';
export interface User {

    reviewId: number;
    reviewText: string;
    postDate: Date;
    movie: Movie;
    user: User;
}