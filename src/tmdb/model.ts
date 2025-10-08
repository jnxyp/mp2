type Movie = {
    id: number;
    title: string;
    popularity: number;
    vote_average: number;
    poster_path: string | null;
    genre_ids: number[];
};

type MovieDetails = Movie & {
    genre_ids: never;
    overview: string;
    release_date: string;
    genres: { id: number; name: string }[];
};

type Genre = {
    id: number;
    name: string;
};

export type { Movie, MovieDetails, Genre };