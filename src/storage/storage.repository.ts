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

export const storage = {
    uploadFile
}
