import { User } from "../User/User";

export interface Attendant {
    id: number,
    userId: number,
    eventId: number,
    createdAt: string,
    updatedAt: string,
    User: User
}