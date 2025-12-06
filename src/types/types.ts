import {Entity} from "@prisma/client"

export type PathSegmentEntity = Pick<Entity, 'id' | 'name' | 'parentId'> | null
