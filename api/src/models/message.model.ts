import User from './users.model'

export default interface Message {
    id:string,
    sender: User;
    roomId: string;
    message: string;
    time: number;
}