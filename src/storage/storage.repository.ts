import type {Readable} from "node:stream";
import supabase from "../db/supabaseClient";

const uploadFile = async (
    bucketName: string,
    filePath: string,
    bufferStream: Readable,
    options: { contentType: string; upsert: boolean; duplex: 'half' | 'full' }
) => {
    const {data, error} = await supabase.storage
        .from(bucketName)
        .upload(filePath, bufferStream, options)

    return {data, error}
}

const deleteFile = async (
    bucketName: string,
    filePath: string
) => {
    const {data, error} = await supabase.storage
        .from(bucketName)
        .remove([filePath])

    if (error) {
        console.log(error)
        return null
    }

    return data;
}

const getFileUrl = async (
    filePath: string,
    expiresIn: number,
    options: {download?: boolean} = {}
) => {
    const bucketName = process.env.SUPABASE_BUCKET as string;
    const {data, error} = await supabase.storage
        .from(bucketName)
        .createSignedUrl(filePath, expiresIn, options)

    if (error || !data.signedUrl) {
        console.log('Error creating signed URL', error)
        return null
    }
    
    return data.signedUrl;
}

export const storage = {
    uploadFile,
    getFileUrl,
    deleteFile
}
