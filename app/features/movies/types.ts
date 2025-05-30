export interface IMovie {
    id: string;
    title: string;
    year: number;
    studio: string;
    rating?: number;
    watched: boolean;
}