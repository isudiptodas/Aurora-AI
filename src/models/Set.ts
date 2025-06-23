import mongoose from "mongoose";

const setSchema = new mongoose.Schema({
    setName: String,
    userEmail: String,
    setType: String,
    vectorCollectionName: String,
    dateCreated: String,
    original: String
});

export const Set = mongoose.models.Set || mongoose.model('Set', setSchema);