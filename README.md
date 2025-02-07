<div align="center">
  <br />
      <img src="https://imgs.search.brave.com/FJQ1IwkInCVsenzVTEU0dKRrEy6h01sq4wNCY1z3NdU/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/ZXVyb3Bvc3RlcnMu/ZXUvaW1hZ2UvMzUw/L3Bvc3RlcnMvZHVu/YS1wYXJ0ZS0xLWkx/MjI4MTUuanBn" alt="Project Banner">
    </a>
  <br />
  
  <div>
    <img src="https://img.shields.io/badge/-React_JS-black?style=for-the-badge&logoColor=white&logo=react&color=61DAFB" alt="react.js" />
    <img src="https://img.shields.io/badge/-Appwrite-black?style=for-the-badge&logoColor=white&logo=appwrite&color=FD366E" alt="appwrite" />
    <img src="https://img.shields.io/badge/-Tailwind_CSS-black?style=for-the-badge&logoColor=white&logo=tailwindcss&color=06B6D4" alt="tailwindcss" />
  </div>

  <h3 align="center">Uma aplicação de filmes</h3>

   <div align="center">
     Projeto de uma aplicação de filmes com banco de dados externo
    </div>
</div>

## 📋 <a name="table">Table of Contents</a>

1. 🤖 [Introdução](#introduction)
2. ⚙️ [Tech Stack](#tech-stack)
3. 🔋 [Features](#features)
4. 🤸 [Quick Start](#quick-start)

## <a name="introduction">🤖 Introduction</a>

Construído com React.js para a interface do utilizador, Appwrite para o algoritmo Trending Movies e estilizado com TailwindCSS, o Mflix é um projeto de website. A plataforma oferece uma experiência elegante e moderna para navegar e descobrir filmes.

## <a name="tech-stack">⚙️ Tech Stack</a>

- React.js
- Appwrite
- Tailwind CSS

## <a name="features">🔋 Features</a>

👉 **Navegar em todos os filmes**: Explore uma ampla gama de filmes disponíveis na plataforma.

👉 **Pesquisar Filmes**: Pesquise facilmente filmes específicos usando uma função de pesquisa.

👉 **Algoritmo de Filmes Tendência**: Exibe filmes de tendências com base em um algoritmo dinâmico.

👉 **IU/UX moderna**: Uma interface elegante e fácil de usar projetada para uma ótima experiência.

👉 **Responsividade**: Design totalmente responsivo que funciona perfeitamente em todos os dispositivos.

e muito mais, incluindo arquitetura de código e reutilização

## <a name=“quick-start”>🤸 Quick Start</a>

Siga estes passos para configurar o projeto localmente na sua máquina.

**Pré-requisitos**

Certifique-se de que tem o seguinte instalado na sua máquina:

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/en)
- [npm](https://www.npmjs.com/) (Gerenciador de pacotes do Node)

**Clonando o Repositório**

```bash
git clone https://github.com/Marqzzs/mflix.git
cd mflix
```

**Instalação**

Instale as dependências do projeto usando o npm:

```bash
npm install
```

**Configurar variáveis de ambiente**

Crie um novo arquivo chamado `.env.local` na raiz do seu projeto e adicione o seguinte conteúdo:

```env
VITE_IMDB_API_KEY=

VITE_APPWRITE_PROJECT_ID=
VITE_APPWRITE_DATABASE_ID=
VITE_APPWRITE_COLLECTION_ID=
```

Substitua os valores do marcador de posição pelas suas credenciais reais **[TheMovieDatabase API](https://developer.themoviedb.org/reference/intro/getting-started)** e **[Appwrite](https://apwr.dev/JSM050)**. Pode obter estas credenciais inscrevendo-se no site [TheMovieDatabase](https://developer.themoviedb.org/reference/intro/getting-started) e criando um novo projeto no site [Appwrite](https://apwr.dev/JSM050)

**Executando o Projeto**

```bash
npm run dev
```

Abra [http://localhost:5173](http://localhost:5173) no seu navegador para ver o projeto.
