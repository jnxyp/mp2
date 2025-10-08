import './Gallery.css';

import { useEffect, useState } from 'react';
import { Genre, Movie } from '../tmdb/model';
import { fetchPopularMovies, getGenres, getImageUrl } from '../tmdb/api';
import { Link } from 'react-router';

function Gallery(props: { setMovieIds: (ids: { id: number }[]) => void }) {
    const { setMovieIds } = props;
    const [movies, setMovies] = useState<Movie[]>([]);
    const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);
    const [currentGenre, setCurrentGenre] = useState<number | null>(null);
    const [genres, setGenres] = useState<Genre[]>([]);

    useEffect(() => {
        const loadGenres = async () => {
            const genreList = await getGenres();
            setGenres(genreList);
        };
        loadGenres();
    }, []);

    useEffect(() => {
        const loadMovies = async () => {
            const popularMovies = await fetchPopularMovies(1);
            const popularMovies2 = await fetchPopularMovies(2);
            const allPopularMovies = popularMovies.concat(popularMovies2);
            setMovies(allPopularMovies);
            setMovieIds(allPopularMovies.map(m => ({ id: m.id })));
        };
        loadMovies();
    }, [setMovieIds]);

    useEffect(() => {
        if (currentGenre === null) {
            setFilteredMovies(movies);
        } else {
            const filtered = movies.filter(movie => movie.genre_ids.includes(currentGenre));
            setFilteredMovies(filtered);
        }
    }, [currentGenre, movies]);

    const handleGenreClick = (genreId: number) => {
        if (currentGenre === genreId) {
            setCurrentGenre(null); // Deselect if already selected
        } else {
            setCurrentGenre(genreId);
        }
    };

    return (
        <div className="gallery">
            <div className="genre-list">
                {genres.map((genre) => (
                    <div key={genre.id} className={`genre-item ${currentGenre === genre.id ? 'selected' : ''}`}>
                        <h4 className="genre-title" onClick={() => handleGenreClick(genre.id)}>
                            {genre.name}
                        </h4>
                    </div>
                ))}
            </div>
            <div className="movie-grid">
                {!filteredMovies.length ? <div>No Movies Found</div> : filteredMovies.map((movie) => (
                    <div key={movie.id} className="movie-card">
                        {movie.poster_path ? (
                            <Link to={`/detail/${movie.id}`} className="movie-poster">
                                <img
                                    src={getImageUrl(movie.poster_path)}
                                    alt={movie.title}
                                    className="movie-poster"
                                />
                            </Link>
                        ) : (
                            <div className="no-poster">No Image</div>
                        )}
                        {/* <div className="movie-info">
                            <Link to={`/detail/${movie.id}`} className="movie-title">
                                <h3 className="movie-title">{movie.title}</h3>
                            </Link>
                            <p className="movie-rating">Rating: {movie.vote_average}</p>
                            <p className="movie-popularity">Popularity: {movie.popularity}</p>
                        </div> */}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Gallery;