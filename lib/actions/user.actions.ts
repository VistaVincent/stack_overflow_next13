'use server'

import User, { IUser } from "@/database/user.model";
import { connectToDatabase } from "../mongoose";
import { GetUserByIdParams } from "./shared.types";


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