import mongoose, { Schema } from "mongoose";
import { ITek } from "../interfaces/tek";

// Build schema for Tek interface
export var TekSchema: Schema = new Schema({
    user_name: { type: String, required: true, unique: true },
    first_name: { type: String, required: true },
    last_name: { type: String, required: true }
})

// Use non depreceated mongoose api
mongoose.set('useCreateIndex', true);

//Export the model and return your Tek interface
export default mongoose.model<ITek>('Tek', TekSchema);