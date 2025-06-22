
import CryptoJS from 'crypto-js';
const key = CryptoJS.enc.Hex.parse(import.meta.env.VITE_API_ENC_KEY);
const iv = CryptoJS.enc.Hex.parse(import.meta.env.VITE_API_ENC_IV);

export function loginRedirectCall() {
  let path = window.location.protocol + "//" + window.location.host + "/login"
  window.location.href = path;
}

export function logOutRedirectCall() {
  const keysToRemove = [
    "token"
  ];

  keysToRemove.forEach(removeData);
  loginRedirectCall();
}

export function removeData(key) {
  const encryptedKey = bodyEncryption(key);
  localStorage.removeItem(encryptedKey);
}

export function loginStoreData(data) {

  setData("token", data.token);

  // loginRedirectCall()
}

export function setData(key, value) {
  const encryptedKey = bodyEncryption(key);
  const encryptedValue = bodyEncryption(value);
  localStorage.setItem(encryptedKey, encryptedValue);
}

export function bodyEncryption(request, isStringify) {
  // console.log("Encryption Request", request)

  const req = (isStringify) ? JSON.stringify(request) : request;
  const encrypted = CryptoJS.AES.encrypt(req, key, { iv: iv });
  return encrypted.toString();
}

export function bodyDecryption(request) {
  const decrypted = CryptoJS.AES.decrypt(request.toString(), key, { iv: iv });
  // console.log("Decrypt Data", decrypted)

  return decrypted.toString(CryptoJS.enc.Utf8);
}
