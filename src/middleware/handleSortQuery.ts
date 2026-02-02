import type { Prisma } from '@prisma/client'
import type { RequestHandler } from 'express'

export const handleSortQuery: RequestHandler = (req, res, next) => {
    const defaultSort = [{ type: 'asc' as 'asc' | 'desc' }]
    const sortQuery = req.query.sort // name

    if (!sortQuery) {
        req.sortBy = defaultSort
        return next() // default sort
    }
    const sortCriteria: Prisma.EntityOrderByWithRelationInput[] = defaultSort

    if (typeof sortQuery === 'string') {
        const getSortCriteria = (searchParams: string) =>
            searchParams
            .split(',')
            .map((item) => {
                // formats e.g. = name_asc, name_desc
                if (!item.includes('_')) {
                    throw new Error(`Invalid sort format: ${item}`)
                }

                // get orderBy clause values e.g = 'asc' & 'desc'
                const [property, orderBy] = item.split('_')

                if (!['asc', 'desc'].includes(orderBy)) {
                    throw new Error(`Must be 'asc' or 'desc': ${orderBy}. Must be 'asc' or 'desc'`)
                }

                return { [property]: orderBy }
            })
        const nextSortMethod = getSortCriteria(sortQuery)
        sortCriteria.push(...nextSortMethod)
    }

    req.sortBy = sortCriteria
    next()
}
