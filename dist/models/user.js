import mongoose from "mongoose";
import Role from "../_helpers/role.js";
const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
        default: Role.User,
    },
    created: {
        type: Date,
        default: Date.now,
    },
});
const User = mongoose.model("User", UserSchema);
export default User;
//# sourceMappingURL=user.js.map