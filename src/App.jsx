import Search from "./components/Search.jsx"; // Importa o componente de pesquisa
import { useEffect, useState } from "react"; // Importa os hooks useState e useEffect do React
import Spinner from "./components/Spinner.jsx"; // Importa o componente de carregamento (spinner)
import MovieCard from "./components/MovieCard.jsx"; // Importa o componente que exibe os filmes
import { useDebounce } from "react-use"; // Importa o hook useDebounce da biblioteca react-use
import { getTrendingMovies, updateSearchCount } from "./appwrite.js"; // Importa funções para buscar filmes em alta e atualizar contagem de pesquisa

// Define a URL base da API do TMDb
const API_BASE_URL = "https://api.themoviedb.org/3";

// Obtém a chave da API do arquivo de ambiente
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

// Configuração padrão para requisições na API do TMDb
const API_OPTIONS = {
    method: "GET",
    headers: {
        accept: "application/json",
        authorization: `Bearer ${API_KEY}`, // Autenticação com chave da API
    }
};

const App = () => {
    // Estado para armazenar o termo de pesquisa
    const [searchTerm, setSearchTerm] = useState("");
    // Estado para armazenar mensagens de erro
    const [errorMessage, setErrorMessage] = useState("");
    // Estado para armazenar a lista de filmes buscados
    const [movieList, setMovieList] = useState([]);
    // Estado para indicar se está a carregar os filmes
    const [isLoading, setIsLoading] = useState(false);
    // Estado para armazenar a versão "debounced" do termo de pesquisa
    const [debounceSearchTerm, setDebounceSearchTerm] = useState("");
    // Estado para armazenar a lista de filmes em alta
    const [trendingMovies, setTrendingMovies] = useState([]);

    // Atualiza debounceSearchTerm com um atraso de 500ms quando searchTerm muda
    useDebounce(() => setDebounceSearchTerm(searchTerm), 500, [searchTerm]);

    // Função assíncrona para buscar filmes
    const fetchMovies = async (query = '') => {
        setIsLoading(true); // Define estado de carregamento como verdadeiro
        setErrorMessage(""); // Limpa mensagens de erro anteriores

        try {
            // Define o endpoint da API: se houver uma query, faz uma busca, senão pega filmes populares
            const endpoint = query
                ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
                : `${API_BASE_URL}/discover/movie?api_key=${API_KEY}&sort_by=popularity.desc`;

            // Faz a requisição à API
            const response = await fetch(endpoint, API_OPTIONS);

            // Verifica se houve erro na requisição
            if (!response.ok) {
                throw new Error("Erro ao buscar filmes");
            }

            // Converte a resposta para JSON
            const data = await response.json();

            // Verifica se não há resultados na busca
            if (!data.results || data.results.length === 0) {
                setErrorMessage("Nenhum filme encontrado");
                setMovieList([]);
                return;
            }

            // Atualiza a lista de filmes com os resultados da API
            setMovieList(data.results);

            // Se houver uma busca e resultados, atualiza a contagem de pesquisa no banco
            if (query) {
                await updateSearchCount(query, data.results[0]);
            }
        } catch (error) {
            console.log(`Erro ao buscar filmes: ${error}`);
            setErrorMessage("Erro ao buscar filmes, tente novamente mais tarde");
        } finally {
            setIsLoading(false); // Define estado de carregamento como falso
        }
    };

    // Função assíncrona para carregar os filmes em alta do banco de dados
    const loadingTrendingMovies = async () => {
        try {
            const movies = await getTrendingMovies(); // Busca os filmes populares no banco de dados
            setTrendingMovies(movies); // Atualiza o estado com os filmes em alta
        } catch (e) {
            console.log(`Erro ao buscar filmes em alta do banco de dados: ${e}`);
        }
    };

    // Executa a busca de filmes sempre que debounceSearchTerm mudar
    useEffect(() => {
        fetchMovies(debounceSearchTerm);
    }, [debounceSearchTerm]);

    // Carrega os filmes em alta apenas quando o componente for montado
    useEffect(() => {
        loadingTrendingMovies();
    }, []);

    return (
        <main>
            <div className="pattern" />
            <div className="wrapper">
                <header>
                    <img src={"./hero.png"} alt="Hero" /> {/* Imagem do banner */}
                    <h1>
                        Encontre <span className="text-gradient">Filmes</span> Que Você Ama
                    </h1>
                    <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} /> {/* Campo de busca */}
                </header>

                {/* Se houver filmes em alta, exibe-os */}
                {trendingMovies.length > 0 && (
                    <section className="trending">
                        <h2>Em alta</h2>
                        <ul>
                            {trendingMovies.map((movie, index) => (
                                <li key={movie.$id}>
                                    <p>{index + 1}</p>
                                    <img src={movie.poster_url} alt={movie.title} />
                                </li>
                            ))}
                        </ul>
                    </section>
                )}

                {/* Seção para exibir os filmes pesquisados ou populares */}
                <section className="all-movies">
                    <h2 className="mt-[40px]">Populares</h2>
                    {/* Se estiver a carregar, exibe o spinner; se houver erro, exibe a mensagem; senão, exibe os filmes */}
                    {isLoading ? (
                        <Spinner />
                    ) : errorMessage ? (
                        <p className="text-red-500">{errorMessage}</p>
                    ) : (
                        <ul>
                            {movieList.map((movie) => (
                                <MovieCard key={movie.id} movie={movie} />
                            ))}
                        </ul>
                    )}
                </section>
            </div>
        </main>
    );
};

export default App;
