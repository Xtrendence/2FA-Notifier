const CryptoJS = require("react-native-crypto-js");

import Aes from "react-native-aes-crypto";

/**
 * A class with static methods to simplify the use of cryptographic functions throughout the application.
 */
export default class Crypto {
	/**
	 * @param {ArrayBuffer} data - The file data as an ArrayBuffer.
	 * @returns {string} - An encoded string version of the file data.
	 */
	static encode(data) {
		return String.fromCharCode.apply(null, new Uint8Array(data));
	}

	/**
	 * @param {string} plaintext - The string to encrypt.
	 * @param {string} password - The encryption password.
	 * @returns {string} - The ciphertext.
	 */
	static encryptAES(plaintext, password) {
		let encrypted = CryptoJS.AES.encrypt(plaintext, password);
		return encrypted.toString();
	}

	/**
	 * @param {string} ciphertext - The string to decrypt.
	 * @param {string} password - The decryption password.
	 * @returns {string} - The plaintext.
	 */
	static decryptAES(ciphertext, password) {
		let decrypted = CryptoJS.AES.decrypt(ciphertext, password);
		return decrypted.toString(CryptoJS.enc.Utf8);
	}

	/**
	 * Generates a random password, and a cryptographically random salt, from which a 256-bit AES key is derived.
	 * @returns {Promise} - The AES key.
	 */
	static async generateAESKey() {
		return new Promise((resolve, reject) => {
			try {
				let result = "";
				let characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
				let charactersLength = characters.length;

				for(let i = 0; i < charactersLength; i++) {
					result += characters.charAt(Math.floor(Math.random() * charactersLength));
				}

				let salt = result;

				Aes.pbkdf2(result, salt, 20000, 256).then(result => {
					resolve(result);
				}).catch(error => {
					reject(error);
				});
			} catch(error) {
				reject(error);
			}
		});
	}
}