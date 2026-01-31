namespace Express {
    interface User {
        id?: number | undefined
        username: string
    }

    interface Request {
        sharedFolder?: Prisma.SharedFolder
        session: Session
        errorMessage: string
    }

    interface Session {
        messages?: string[]
        destroy(callback?: (err: Error) => void): void
    }
}
