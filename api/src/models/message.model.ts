import User from './users.model'

export default interface Message {
    id:string,
    sender: string;
    roomId: string;
    message: string;
    time: number;
}