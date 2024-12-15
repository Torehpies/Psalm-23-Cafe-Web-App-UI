import { User } from "./user.model";

export interface Attendance {
    _id?: string;
    userId: User['_id'];
    Date: Date;
    TimeIn: string;
    Timeout: string; // Make TimeOut required
}
