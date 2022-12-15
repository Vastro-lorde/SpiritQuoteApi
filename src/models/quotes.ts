import mongoose from "mongoose";

const QuoteSchema = new mongoose.Schema({
    quote: {
        type: String,
        required: true,
    },
    picture_url: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    approved: {
        type: Boolean,
        default: false,
    },
    created: {
        type: Date,
        default: Date.now,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
});

const Quote = mongoose.model("Quote", QuoteSchema);
export default Quote;