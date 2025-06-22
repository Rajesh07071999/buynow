import axios from "axios";
import CryptoJS from 'crypto-js';
import { logOutRedirectCall } from '../common/RedirectPathManage.js';
import { REACT_APP_BASE_URL, REACT_APP_DUPLICATE_VALUE, REACT_APP_ERROR, REACT_APP_NOT_FOUND, REACT_APP_UNAUTHORIZED, REACT_APP_VALIDATION_ERROR } from "../app.config.jsx";

const key = CryptoJS.enc.Hex.parse(import.meta.env.VITE_API_ENC_KEY);
const iv = CryptoJS.enc.Hex.parse(import.meta.env.VITE_API_ENC_IV);

const showMessage = (msg) => {
    // console.log(msg)
}

const axiosClient = axios.create({
    baseURL: REACT_APP_BASE_URL,
    headers: {
        'api-key': CryptoJS.AES.encrypt(import.meta.env.VITE_API_KEY, key, { iv: iv }).toString(),
        'accept-language': 'en',
        'Content-Type': 'text/plain',
    }
});

axiosClient.interceptors.request.use(function (request) {
    request.data = bodyEncryption(request.data, true)
    const tokenData = localStorage.getItem(("token"))
    request.headers['token'] = (bodyEncryption(tokenData))
    return request;
});

axiosClient.interceptors.response.use(
    function (response) {
        response = bodyDecryption(response.data);
        if (response.code !== import.meta.env.VITE_SUCCESS) {
            showMessage(response.message)
        }
        return response;
    },
    function (error) {
         let res = error.response;
      let responseData = bodyDecryption(res?.data);


        if (res.status === REACT_APP_UNAUTHORIZED) {
            logOutRedirectCall()
        }
        return responseData

    }
);

function bodyEncryption(request, isStringify) {
    const req = (isStringify) ? JSON.stringify(request) : request;
    const encrypted = CryptoJS.AES.encrypt(req, key, { iv: iv });
    return encrypted.toString();
}

function bodyDecryption(request) {
    const decrypted = CryptoJS.AES.decrypt(request.toString(), key, { iv: iv });
    return decrypted.toString(CryptoJS.enc.Utf8);
}

export { axiosClient };
