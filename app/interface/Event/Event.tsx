import { Section } from "../Section/Section"
export interface Event {
    id: number,
    name: string,
    is_enabled: boolean,
    is_show: boolean,
    userId: number,
    User: {
        name: string 
    },
    Sections: Section[],
    createdAt: string,
    updatedAt: string
}