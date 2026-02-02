namespace Express {
    interface User {
        id?: number | undefined
        username: string
    }

    interface Request {
        sharedFolder?: Prisma.SharedFolder
        sortBy?: Prisma.EntityOrderByWithRelationInput[]
        session: Session
        signUpFeedback: string
    }
   
    interface Session {
        messages?: string[]
        destroy(callback?: (err: Error) => void): void
    }
}
