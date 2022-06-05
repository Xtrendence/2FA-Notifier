import totp from "totp-generator";
import * as OTPAuth from "url-otpauth";
import Crypto from "./Crypto";

export function empty(value) {
	if(typeof value === "object" && value !== null && Object.keys(value).length === 0) {
		return true;
	}

	if(value === null || typeof value === "undefined" || value.toString().trim() === "") {
		return true;
	}

	return false;
}

export function validSecret(secret) {
	try {
		let code = parseInt(totp(secret));
		console.log(code);
		return { valid:true, code:code };
	} catch(error) {
		return { valid:false };
	}
}

export function wait(duration) {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve(null);
		}, duration);
	});
}

export function parseURI(uri) {
	return OTPAuth.parse(uri);
}

export function encryptObjectValues(password, object) {
	let encrypted = {};
	let keys = Object.keys(object);

	keys.map(key => {
		let value = object[key].toString();
		let ciphertext = Crypto.encryptAES(value, password);
		encrypted[key] = ciphertext;
	});

	return encrypted;
}

export function decryptObjectValues(password, object) {
	let decrypted = {};
	let keys = Object.keys(object);

	keys.map(key => {
		let value = object[key];

		try {
			let plaintext = Crypto.decryptAES(value, password);
			decrypted[key] = plaintext;
		} catch(error) {
			decrypted[key] = value;
		}
	});

	return decrypted;
}