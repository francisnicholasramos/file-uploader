import {Readable} from "node:stream";
import {createFile} from "../entities.repository";
import {storage} from "../../storage/storage.repository";

export const uploadFile = async (
    userId: number,
    parentId: number | null,
    file?: Express.Multer.File
) => {
    if (!file) {
        return {data: null, error: new Error("No file provided") }
    }

    const { originalname, mimetype, size, buffer } = file

    const bucketName = process.env.SUPABASE_BUCKET as string;

    const bucketFileName = crypto.randomUUID();

    const options = {
        contentType: mimetype,
        upsert: false,
        duplex: 'half' as 'half' | 'full',
    }

    const filePath = `${userId}/${bucketFileName}`

    const bufferStream = new Readable()
    bufferStream.push(buffer)
    bufferStream.push(null) // end of stream

    const {data, error} = await storage.uploadFile(bucketName, filePath, bufferStream, options)

    if (error) {
        console.log("Bucket error", error)
        if ('statusCode' in error) {
            // duplicate or maximum size exceeded
            if (error.statusCode === 409 || error.statusCode === 413) {
                return { 
                    data: null,
                    error: new Error(error.message)
                }
            }
        }

        return {
            data: null,
        }
    }

    // send metadata to database
    await createFile(originalname, bucketFileName, mimetype, size, userId, parentId)

    return {
        data,
        error: null
    }
}
