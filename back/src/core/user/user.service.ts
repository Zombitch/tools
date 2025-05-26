import { Injectable } from '@nestjs/common';
import { User, UserDocument } from './user'
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UserService{

    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

    // Find all users
    async findAll(): Promise<UserDocument[]> {
        return this.userModel.find().exec();
    }

    // Find one user by ID
    async findOneById(id: string): Promise<UserDocument | null> {
        return this.userModel.findById(id).exec();
    }

    // Find one user by email
    async findOneByEmail(email: string): Promise<UserDocument | null> {
        return this.userModel.findOne({ email: email }).exec();
    }

    // Find one user by email
    async findOneByUsername(username: string): Promise<UserDocument | null> {
        return this.userModel.findOne({ username: username }).exec();
    }

    async insert(usr: User): Promise<User> {
        const createdUser = new this.userModel(usr);
        return createdUser.save();
    }

    async update(usr: UserDocument, update: Partial<User>): Promise<User | null> {
        return this.userModel.findByIdAndUpdate(usr.id, update, { new: true }).exec();
    }

    async upsert(usr: UserDocument, update: Partial<User>): Promise<User> {
        return this.userModel.findByIdAndUpdate(
            usr.id,
            update,
            { new: true, upsert: true }
        ).exec();
    }     

    async delete(usr: UserDocument): Promise<UserDocument | null> {
        return this.userModel.findByIdAndDelete(usr.id).exec();
    }  
}
