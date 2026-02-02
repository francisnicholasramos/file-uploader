import type {Prisma} from "@prisma/client";

export const getOrderBy = (sortCriteria: Prisma.EntityOrderByWithRelationInput[] | undefined) => {
    return sortCriteria?.reduce((acc, curr) => Object.assign(acc, curr), {})
}
