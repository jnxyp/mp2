import { Genre, Movie, MovieDetails } from "./model";
import axios from "axios";

const ENDPOINT = "https://api.themoviedb.org/3";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/";

const token = process.env.REACT_APP_TMDB_API_TOKEN;
const instance = axios.create({
    baseURL: ENDPOINT,
    headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json;charset=utf-8",
    },
});


const fetchPopularMovies = async (page: number = 1) => {
    const path = '/discover/movie';
    const params = {
        sort_by: 'popularity.desc',
        page: page,
        append_to_response: 'genres',
    };
    const response = await instance.get(path, { params });
    const movies: Movie[] = response.data.results;
    return movies;
};

const searchMovies = async (query: string, page: number = 1) => {
    const path = '/search/movie';
    const params = {
        query: query,
        page: page,
        append_to_response: 'genres',
    };
    const response = await instance.get(path, { params });
    const movies: Movie[] = response.data.results;
    return movies;
};

const getMovieDetails = async (movieId: number) => {
    const path = `/movie/${movieId}`;
    const response = await instance.get(path);
    const movie: MovieDetails = response.data;
    return movie;
};

const getImageUrl = (path: string, size: string = 'w200') => {
    return `${IMAGE_BASE_URL}${size}${path}`;
};

const getGenres = async (): Promise<Genre[]> => {
    const path = '/genre/movie/list';
    const response = await instance.get(path);
    return response.data.genres;
};

export { fetchPopularMovies, searchMovies, getImageUrl, getMovieDetails, getGenres };