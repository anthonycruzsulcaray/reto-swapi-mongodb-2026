import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';


export type FilmDocument = HydratedDocument<FilmMongo>;

@Schema({ collection: 'films' })
export class FilmMongo {
    @Prop()
    id: number

    @Prop()
    episode_id: number

    @Prop()
    title: string

    @Prop()
    opening_crawl: string

    @Prop()
    director: string

    @Prop()
    producer: string

    @Prop()
    release_date: string

    @Prop([String])
    characters: string[]

    @Prop([String])
    planets: string[]

    @Prop([String])
    starships: string[]

    @Prop([String])
    vehicles: string[]

    @Prop([String])
    species: string[]

    @Prop()
    created: string

    @Prop()
    edited: string
    
    @Prop()
    url: string
}

export const FilmShchema = SchemaFactory.createForClass(FilmMongo);
