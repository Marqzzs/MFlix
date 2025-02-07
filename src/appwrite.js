// Importa as classes necessárias da biblioteca Appwrite
import { Client, Databases, Query, ID } from 'appwrite';

// Obtém as credenciais do projeto do Appwrite a partir das variáveis de ambiente
const PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID;
const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const COLLECTION_ID = import.meta.env.VITE_APPWRITE_COLLECTION_ID;

// Inicializa o cliente Appwrite e define o endpoint da API e o projeto associado
const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1') // Define o endpoint do Appwrite
    .setProject(PROJECT_ID); // Associa o cliente ao projeto específico

// Instancia o serviço de banco de dados do Appwrite utilizando o cliente configurado
const database = new Databases(client);

/**
 * Atualiza a contagem de pesquisas para um determinado termo de busca.
 * Se o termo já existir no banco de dados, incrementa a contagem.
 * Caso contrário, cria um novo documento.
 *
 * @param {string} searchTerm - O termo de busca utilizado pelo usuário.
 * @param {Object} movie - O objeto do filme associado à pesquisa.
 */
export const updateSearchCount = async (searchTerm, movie) => {
    try {
        // Busca documentos no banco de dados que correspondam ao termo de pesquisa
        const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
            Query.equal('searchTerm', searchTerm), // Filtra os documentos pelo campo 'searchTerm'
        ]);

        // Se já existir um registro para o termo pesquisado
        if (result.documents.length > 0) {
            const doc = result.documents[0]; // Obtém o primeiro documento encontrado

            // Atualiza o documento existente incrementando a contagem
            await database.updateDocument(DATABASE_ID, COLLECTION_ID, doc.$id, {
                count: doc.count + 1, // Incrementa a contagem de buscas para esse termo
            });
        } else {
            // Se o termo ainda não existe no banco, cria um novo documento
            await database.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), {
                searchTerm, // Armazena o termo de busca
                count: 1, // Define a contagem inicial como 1
                movie_id: movie.id, // Armazena o ID do filme associado à pesquisa
                poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`, // URL do pôster do filme
            });
        }
    } catch (error) {
        // Captura e exibe erros no console caso a atualização falhe
        console.log(`Error updating search count: ${error}`);
    }
};

/**
 * Obtém os filmes mais pesquisados no banco de dados.
 *
 * @returns {Array} - Retorna uma lista com os 10 filmes mais pesquisados.
 */
export const getTrendingMovies = async () => {
    try {
        // Busca os 10 filmes mais pesquisados no banco de dados
        const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
            Query.limit(10), // Limita a consulta a 10 registros
            Query.orderDesc('count'), // Ordena os registros de forma decrescente com base na contagem de pesquisas
        ]);

        return result.documents; // Retorna a lista de documentos encontrados
    } catch (error) {
        // Captura e exibe erros no console caso a busca falhe
        console.log(`Error getting trending movies from database: ${error}`);
    }
};
