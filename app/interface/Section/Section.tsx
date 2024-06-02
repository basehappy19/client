import { Attendant } from "../Attendant/Attendant";

export interface Section {
    id: number,
    name: string,
    limit: number,
    eventId: number,
    Attendants: Attendant[],
    attendantCount: number
}