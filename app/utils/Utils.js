import totp from "totp-generator";
import * as OTPAuth from "url-otpauth";

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
