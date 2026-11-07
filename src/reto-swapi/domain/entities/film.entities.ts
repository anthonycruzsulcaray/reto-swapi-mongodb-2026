
export class ApiFilmPagedEnglish {
    count: number
    next: string | null
    previous: string | null
    results: FilmBodyEnglish[]
}

export class PagedFilms {
  count: number;
  films: FilmBodyEnglish[];
}

export class FilmBodyPaged {
    count: number
    pages: number
    results: FilmBodyEnglish[]
}

export class FilmBodyEnglish {
    id: number
    episode_id: number
    title: string
    opening_crawl: string
    director: string
    producer: string
    release_date: string
    characters: string[]
    planets: string[]
    starships: string[]
    vehicles: string[]
    species: string[]
    created: string
    edited: string
    url: string
}
