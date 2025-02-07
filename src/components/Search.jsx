// Componente Search para buscar filmes
const Search = ({ searchTerm, setSearchTerm }) => {
    return (
        <div className="search">
            <div>
                {/* Ícone de busca */}
                <img src={"./search.svg"} alt="search icon" />
                {/* Campo de entrada para pesquisa de filmes */}
                <input
                    type="text"
                    placeholder={"Pesquise em milhares de filmes"}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
        </div>
    );
};

export default Search;
