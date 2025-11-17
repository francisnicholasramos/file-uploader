import prisma from "../db/prismaClient";

export const createUser = async (username:string, password:string) => 
    prisma.user.create({
        data: {
            username,
            password
        }
    })
