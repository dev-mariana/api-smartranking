import * as mongoose from 'mongoose';

export const ChallengeSchema = new mongoose.Schema({

    dateTimeChallenge: Date,
    status: String,
    dateTimeRequest: Date,
    dateTimeResponse: Date,
    requester: { type: mongoose.Schema.Types.ObjectId, ref: "Player" },
    categories: String,
    players: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Player" 
    }], 
    match: { type: mongoose.Schema.Types.ObjectId, ref: "Match" },

}, { timestamps: true, collection: 'challenges' });