import { initializeApp } from "firebase/app";
import { ParameterStore } from "../utils/Constant";

const config = {
    apiKey: ParameterStore.API_KEY,
    authDomain: ParameterStore.AUTH_DOMAIN,
    projectId: ParameterStore.PROJECT_ID,
    storageBucket: ParameterStore.STORAGE_BUCKET,
    messagingSenderId: ParameterStore.MESSAGING_SENDER_ID,
    appId: ParameterStore.APP_ID  
};

export const appFirebase = initializeApp(config);