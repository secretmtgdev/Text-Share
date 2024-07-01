import axios from "axios";

import { ILogData } from "./Types";
import { LOGS_ENDPOINT } from "./Endpoints";

export const isValidEmail = (email: string) => {
    const pattern = /^[a-zA-Z]+([\.-_]?\w+)*@\w+([\.-]?w+)*(\.\w{2,3})+$/
    return pattern.test(email);
}

export const sendLog = async (logData: ILogData) => {
    if (!logData) {
        return;
    }
    
    try {
        const response = await axios.post(LOGS_ENDPOINT, logData, 
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );

        if (response.status === 200) {
            console.error('Successfully posted log to backend');
        }
    } catch (error) {
        console.error(error);
    }
};
