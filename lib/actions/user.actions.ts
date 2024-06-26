'use server'

import User, { IUser } from "@/database/user.model";
import { connectToDatabase } from "../mongoose";
import { CreateUserParams, DeleteUserParams, GetUserByIdParams, UpdateUserParams } from "./shared.types";
import { revalidatePath } from "next/cache";
import Question from "@/database/question.model";


export async function getUserById(params:GetUserByIdParams): Promise<IUser> {
    try{
        connectToDatabase();

        const { userId } = params;
        const user = await User.findOne(
            { clerkId: userId }
        );

        return user;
    }catch(error){
        console.log(error);
        throw error;
    }

}

export async function createUser(userData: CreateUserParams){
    try{
        connectToDatabase();
        const newUser = await User.create(userData);
        return newUser;
    }catch(error){
        console.log(error);
        throw error;
    }

}

export async function updateUser(params: UpdateUserParams){
    try{
        connectToDatabase();
        const {clerkId, updateData, path } = params;
        
        await User.findOneAndUpdate({clerkId}, updateData, {new: true});
        revalidatePath(path);

    }catch(error){
        console.log(error);
        throw error;
    }

}

export async function deleteUser(params: DeleteUserParams){
    try{
        connectToDatabase();
        const { clerkId } = params;
        
        const user = await User.findOneAndDelete({clerkId});

        if(!user){
            throw new Error('User not found');
        }

        // Delete user details from database
        // questions, ansewers, comments, etc.

        // get user question ids-- to be used to delete answers comments etc.
        // const userQuestionIds = await Question.find({author:user._id}).distinct('_id');

        // delete user Questions
        await Question.deleteMany({ author: user._id });

        // TODO: delete user answers, comments, etc.

        const deletedUser = await User.findByIdAndDelete(user._id)

        return deletedUser;

    }catch(error){
        console.log(error);
        throw error;
    }

}