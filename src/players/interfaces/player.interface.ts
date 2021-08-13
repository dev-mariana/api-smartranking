import { Document } from "mongoose";

export class Player extends Document {
    readonly _id: string;
    readonly phoneNumber: string;
    readonly email: string;
    name: string;
    ranking: string;
    rankingPosition: number;
    urlPhotoPlayer: string; 
}