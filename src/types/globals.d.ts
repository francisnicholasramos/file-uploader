namespace Express {
    interface User {
        id?: number | undefined
        username: string
    }

    interface Request {
        sharedFolder?: Prisma.SharedFolder
    }
}
