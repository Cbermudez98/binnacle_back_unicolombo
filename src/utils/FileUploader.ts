import { getStorage, ref, uploadString, getDownloadURL, FirebaseStorage, uploadBytes } from "firebase/storage";
import { appFirebase } from "../config/firebase";

type extension = "pdf" | "jpeg" | "png";

class FileUploader {
    private _storage: FirebaseStorage;
    constructor() {
        this._storage = getStorage(appFirebase);
    }

    async uploadAndGetUrl(file: { data: string, name: string, extension: extension, folder: string }): Promise<string> {
        try {
            const url = `${file.folder}/${file.name.trim().replace(/\s+/g, "_")}_${Date.now()}.${file.extension}`;
            const storageRef = ref(this._storage, url);
            const buffer = Buffer.from(file.data.split(",")[1], 'base64');
            await uploadBytes(storageRef, buffer);
            const downloadUrl = await getDownloadURL(storageRef);
            return downloadUrl;
        } catch (error) {
            throw new Error("Error uploading file");
        }
    }
}

export default new FileUploader();