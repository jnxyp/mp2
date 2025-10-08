import './Detail.css';

import { useEffect, useState } from 'react';
import { MovieDetails } from '../tmdb/model';
import { getImageUrl, getMovieDetails } from '../tmdb/api';
import { Link, useParams } from 'react-router';


function Detail(props: { movieIds: { id: number }[] }) {
    const { movieIds } = props;
    const { id } = useParams<{ id: string }>();

    const movieId = parseInt(id ?? '1', 10);
    const [movieDetail, setMovieDetail] = useState<MovieDetails | null>(null);

    const movieIndex = movieIds.findIndex(m => m.id === movieId);
    const prevMovieId = movieIndex > 0 ? movieIds[movieIndex - 1].id : null;
    const nextMovieId = movieIndex < movieIds.length - 1 ? movieIds[movieIndex + 1].id : null;

    useEffect(() => {
        const loadMovieDetail = async () => {
            const detail = await getMovieDetails(movieId);
            setMovieDetail(detail);
        };
        loadMovieDetail();
    }, [movieId]);

    if (!movieDetail) {
        return <div>Loading...</div>;
    }

    return (
        <div className='detail'>
            <div className="movie-navigation">
                {prevMovieId ? <Link to={`/detail/${prevMovieId}`} className="nav-link" id="prev-link">&lt; Previous</Link> : <span />}
                {nextMovieId ? <Link to={`/detail/${nextMovieId}`} className="nav-link" id="next-link">Next &gt;</Link> : <span />}
            </div>
            <div className="movie-detail-card">
                {movieDetail.poster_path ? (
                    <img
                        src={getImageUrl(movieDetail.poster_path)}
                        alt={movieDetail.title}
                        className="movie-poster"
                    />
                ) : (
                    <div className="no-poster">No Image</div>
                )}
                <div className="movie-info">
                    <h3 className="movie-title">{movieDetail.title}</h3>
                    <p className="movie-rating">Rating: {movieDetail.vote_average} / 10</p>
                    <p className="movie-popularity">Popularity: {movieDetail.popularity}</p>
                    <p className="movie-release-date">Release Date: {movieDetail.release_date}</p>
                    <p className="movie-overview">{movieDetail.overview}</p>
                </div>
            </div>
        </div>
    );
}

export default Detail;