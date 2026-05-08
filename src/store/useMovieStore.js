import { create } from "zustand";

const initialMovies = [
  {
    id: "movie-1",
    title: "Interstellar",
    director: "Christopher Nolan",
    genre: "Sci-Fi",
    year: 2014,
    rating: 8.7,
    description:
      "Seorang mantan pilot NASA bergabung dalam misi melewati lubang cacing untuk mencari planet baru yang bisa ditinggali manusia.",
    poster: "https://placehold.co/200x300/1a1a2e/white?text=Interstellar",
    isWatched: true,
  },
  {
    id: "movie-2",
    title: "Parasite",
    director: "Bong Joon-ho",
    genre: "Thriller",
    year: 2019,
    rating: 8.5,
    description:
      "Keluarga miskin yang perlahan menyusup ke dalam kehidupan keluarga kaya raya dengan cara yang mengejutkan.",
    poster: "https://placehold.co/200x300/2d6a4f/white?text=Parasite",
    isWatched: true,
  },
  {
    id: "movie-3",
    title: "Dune",
    director: "Denis Villeneuve",
    genre: "Sci-Fi",
    year: 2021,
    rating: 8.0,
    description:
      "Seorang pemuda berbakat lahir dengan takdir melampaui pemahamannya, harus melakukan perjalanan ke planet paling berbahaya di alam semesta.",
    poster: "https://placehold.co/200x300/c77dff/white?text=Dune",
    isWatched: false,
  },
  {
    id: "movie-4",
    title: "The Dark Knight",
    director: "Christopher Nolan",
    genre: "Action",
    year: 2008,
    rating: 9.0,
    description:
      "Batman menghadapi musuh terbesarnya, Joker, seorang kriminal jenius yang memporak-porandakan Gotham City.",
    poster: "https://placehold.co/200x300/212529/white?text=Dark+Knight",
    isWatched: true,
  },
  {
    id: "movie-5",
    title: "Everything Everywhere",
    director: "Daniel Kwan",
    genre: "Drama",
    year: 2022,
    rating: 7.8,
    description:
      "Seorang wanita paruh baya harus menjelajahi multiverse untuk menyelamatkan dunia dari kehancuran.",
    poster: "https://placehold.co/200x300/e63946/white?text=Everything",
    isWatched: false,
  },
];

const useMovieStore = create((set, get) => ({
  movies: initialMovies,

  addMovie: (movieData) => {
    const newMovie = {
      ...movieData,
      id: `movie-${Date.now()}`,
      isWatched: false,
      poster: `https://placehold.co/200x300/6366f1/white?text=${encodeURIComponent(
        movieData.title,
      )}`,
    };
    set((state) => ({ movies: [...state.movies, newMovie] }));
  },

  deleteMovie: (id) => {
    set((state) => ({
      movies: state.movies.filter((movie) => movie.id !== id),
    }));
  },

  editMovie: (id, updatedData) => {
    set((state) => ({
      movies: state.movies.map((movie) =>
        movie.id === id ? { ...movie, ...updatedData } : movie,
      ),
    }));
  },

  toggleWatched: (id) => {
    set((state) => ({
      movies: state.movies.map((movie) =>
        movie.id === id ? { ...movie, isWatched: !movie.isWatched } : movie,
      ),
    }));
  },

  getMovieById: (id) => {
    return get().movies.find((movie) => movie.id === id);
  },
}));

export default useMovieStore;
