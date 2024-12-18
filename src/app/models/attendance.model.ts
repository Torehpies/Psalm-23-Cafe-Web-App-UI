import { User } from "./user.model";

export interface Attendance {
    _id?: string;
    userId: User['_id'];
    Date: Date;
    TimeIn: Date;
    TimeOut?: Date; // Make TimeOut required
}
