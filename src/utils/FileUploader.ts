import { getStorage, ref, uploadString, getDownloadURL, FirebaseStorage } from "firebase/storage";
import { appFirebase } from "../config/firebase";
import Logger from "./Logger";

type extension = "pdf" | "jpeg" | "png";

class FileUploader {
    private _storage: FirebaseStorage;
    constructor() {
        this._storage = getStorage(appFirebase);
    }

    async uploadAndGetUrl(file: { data: string, name: string, extension: extension, folder: string }): Promise<string> {
        try {
            const storageRef = ref(this._storage, `${file.folder}/${file.name}-${Date.now()}.${file.extension}`);
            const buffer = Buffer.from(file.data, 'base64');
            const uint8Array = new Uint8Array(buffer);
            await uploadString(storageRef, uint8Array.toString(), 'base64', { contentType: 'application/pdf' });
            const downloadUrl = await getDownloadURL(storageRef);
            return downloadUrl;
        } catch (error) {
            Logger.fatal(error);
            throw new Error("Error uploading file");
        }
    }
}

export default new FileUploader();