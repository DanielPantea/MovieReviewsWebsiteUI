import { User } from './user.model';
import { Movie } from './movie.model';
export interface Review {

    reviewId: number;
    reviewText: string;
    postDate: Date;
    movie: Movie;
    user: User;
}