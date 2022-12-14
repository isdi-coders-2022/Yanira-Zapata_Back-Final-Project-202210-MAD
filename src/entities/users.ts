import { model, Schema, Types } from 'mongoose';

export type ProtoUserI = {
    name?: string;
    email?: string;
    password?: string;
    role?: string;
    school?: string;
    grade?: string;
    resources?: Array<Types.ObjectId>;
    favorites?: Array<Types.ObjectId>;
    carts?: Array<Types.ObjectId>;
};

export type UserI = {
    name: string;
    email: string;
    password: string;
    role: string;
    school: string;
    grade: string;
    resources: Array<Types.ObjectId>;
    favorites: Array<Types.ObjectId>;
    carts?: Array<Types.ObjectId>;
    id: Types.ObjectId;
};

export type cart = {
    id: Types.ObjectId;
    owner: Types.ObjectId;
    resources: [{ productId: Types.ObjectId }];
};

export const userSchema = new Schema<UserI>({
    name: {
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
        unique: true,
    },
    role: String,
    school: String,
    grade: String,
    resources: [
        {
            type: Schema.Types.ObjectId,
            ref: 'resource',
        },
    ],
    favorites: [
        {
            type: Schema.Types.ObjectId,
            name: String,
            subject: String,
            grade: String,
            ref: 'resource',
        },
    ],
    carts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'resource',
        },
    ],
});

userSchema.set('toJSON', {
    transform: (_document, returnedObject) => {
        returnedObject.id = returnedObject._id;
        delete returnedObject.__v;
        delete returnedObject._id;
        delete returnedObject.password;
    },
});
export const UserModel = model<UserI>('user', userSchema, 'users');
