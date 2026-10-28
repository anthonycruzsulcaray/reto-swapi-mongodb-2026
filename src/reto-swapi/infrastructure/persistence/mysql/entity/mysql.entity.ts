export interface OkPacket {
    fieldCount?: number;
    affectedRows?: number;
    insertId?: number;
    serverStatus?: number;
    warningCount?: number;
    message?: string;
    protocol41?: boolean;
    changedRows?: number;
}

export class Film {
    id: number
    episode_id: number
    title: string
    opening_crawl: string
    director: string
    producer: string
    release_date: string
    created: string
    edited: string
    url: string
}

export class Characters {
    id: number
    value: string
    id_film: string
}

export class Planets {
    id: number
    value: string
    id_film: string
}

export class Starships {
    id: number
    value: string
    id_film: string
}

export class Vehicles {
    id: number
    value: string
    id_film: string
}

export class Species {
    id: number
    value: string
    id_film: string
}
