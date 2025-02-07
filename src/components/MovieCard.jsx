
const MovieCard = ({movie:
    {title, vote_average, poster_path, release_date, original_language}
}) => {
    return (
        <div className="movie-card">
            {/* Exibe a imagem do pôster do filme, se disponível; caso contrário, mostra uma imagem padrão */}
            <img
                src={poster_path ? `https://image.tmdb.org/t/p/w500/${poster_path}` : "/no-movie.png"}
                alt={title}
            />

            <div className={"mt-4"}>
                {/* Exibe o título do filme */}
                <h3>{title}</h3>

                <div className={"content"}>
                    {/* Seção para exibir a avaliação do filme */}
                    <div className={"rating"}>
                        <img src={"star.svg"} alt={"Star icon"} />
                        {/* Exibe a nota do filme com uma casa decimal; caso não tenha nota, exibe "N/A" */}
                        <p>{vote_average ? vote_average.toFixed(1) : "N/A"}</p>
                    </div>

                    {/* Separador visual */}
                    <span>•</span>
                    {/* Exibe o idioma original do filme */}
                    <p className={"lang"}>{original_language}</p>

                    <span>•</span>
                    {/* Exibe o ano de lançamento do filme, extraindo apenas o ano da data completa */}
                    <p className={"year"}>{release_date ? release_date.split("-")[0] : "N/A"}</p>
                </div>
            </div>
        </div>
    );
};

export default MovieCard;
