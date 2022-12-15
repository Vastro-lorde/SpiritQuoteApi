// Database connection function
import mongoose from "mongoose";
const DB = process.env.DATABASE_URL;
// creating connection options interface for mongoose
const db = async () => {
    try {
        await mongoose.connect(DB, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(`Database connection successful!`);
    }
    catch (err) {
        console.log(err);
    }
};
export default db;
//# sourceMappingURL=db.js.map