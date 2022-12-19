import mongoose from "mongoose";
import bcrypt from "bcrypt";
import Role from "../_helpers/role.js";
const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        unique: true,
    },
    lastName: {
        type: String,
        required: true,
        unique: true,
    },
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
    modified: {
        type: Date,
        default: Date.now,
    },
});
UserSchema.pre('save', async function (next) {
    try {
        if (this.isNew) {
            // hash password
            const hashedPassword = await bcrypt.hash(this.password, 13);
            console.log(this.password);
            this.password = hashedPassword;
            if (this.email.toLowerCase() === process.env.ADMIN_EMAIL.toLowerCase()) {
                this.role = Role.Admin;
            }
        }
        next();
    }
    catch (error) {
        console.log(error);
        next();
    }
});
const User = mongoose.model("User", UserSchema);
export default User;
//# sourceMappingURL=user.js.map