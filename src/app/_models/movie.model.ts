import { Tag } from "./tag.model";

export interface Movie{

    movieId: number;
    movieTitle: string;
    movieDesc: string;
    posterImgUrl: string;
    posterImg: any;
    releaseDate: Date;
    trailerUrl: string;
    lengthMinutes: number;
    movieDirectors: string;
    movieWriters: string;
    movieActors: string;
    isEnabled: boolean;
    movieTags: Tag[];
}