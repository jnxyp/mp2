import './Search.css';

import { useEffect, useState } from 'react';
import { Movie } from '../tmdb/model';
import { searchMovies, getImageUrl } from '../tmdb/api';
import { Link } from 'react-router';

function Search(props: { setMovieIds: (ids: { id: number }[]) => void }) {
    const { setMovieIds } = props;
    const [query, setQuery] = useState('');
    const [movies, setMovies] = useState<Movie[]>([]);
    const [sortedBy, setSortedBy] = useState<'popularity' | 'rating'>('popularity');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
    const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);

    useEffect(() => {
        const loadMovies = async () => {
            const searchResults = await searchMovies(query);
            setMovies(searchResults);
            setMovieIds(searchResults.map(m => ({ id: m.id })))
        };
        const timeoutId = setTimeout(() => {
            if (query) {
                loadMovies();
            } else {
                setMovies([]);
            }
        }, 500);

        return () => clearTimeout(timeoutId);
    }, [query, setMovieIds]);

    useEffect(() => {
        let sortedMovies = [...movies];
        if (sortedBy === 'popularity') {
            sortedMovies.sort((a, b) => sortOrder === 'asc' ? a.popularity - b.popularity : b.popularity - a.popularity);
        } else {
            sortedMovies.sort((a, b) => sortOrder === 'asc' ? a.vote_average - b.vote_average : b.vote_average - a.vote_average);
        }
        setFilteredMovies(sortedMovies);
    }, [sortedBy, sortOrder, movies]);

    return (
        <div className="search">
            <div className="search-bar">
                <input
                    className="search-input"
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search for movies..."
                />
            </div>
            <div className="sort-controls">
                <div className="sort-by">
                    <span>Sort by: </span>
                    <select value={sortedBy} onChange={(e) => setSortedBy(e.target.value as 'popularity' | 'rating')}>
                        <option value="popularity">Popularity</option>
                        <option value="rating">Rating</option>
                    </select>
                </div>
                <div className="order">
                    <span>Order: </span>
                    <label><input type="radio" name="order" value="asc" checked={sortOrder === 'asc'} onChange={() => setSortOrder('asc')} /> Ascending</label>
                    <label><input type="radio" name="order" value="desc" checked={sortOrder === 'desc'} onChange={() => setSortOrder('desc')} /> Descending</label>
                </div>
            </div>
            <div className="movie-list">
                {filteredMovies.map((movie) => (
                    <Link to={`/detail/${movie.id}`} key={movie.id} className="movie-search-item">
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
                        <div className="movie-info">
                            <Link to={`/detail/${movie.id}`} className="movie-title">
                                <h3 className="movie-title">{movie.title}</h3>
                            </Link>
                            <p className="movie-rating">Rating: {movie.vote_average} / 10</p>
                            <p className="movie-popularity">Popularity: {movie.popularity}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default Search;