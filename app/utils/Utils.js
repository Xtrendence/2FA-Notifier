import React, { useCallback } from "react";
import { BackHandler } from "react-native";
import totp from "totp-generator";
import * as OTPAuth from "url-otpauth";
import Crypto from "./Crypto";

export function handleBackPress(navigation) {
	return useCallback(() => {
		function onBackPress() {
			let routes = navigation.getState()?.routes;
			let previous = routes[routes.length - 2];
				
			if(previous?.name === "Login") {
				BackHandler.exitApp();
				return true;
			}

			return false;
		}

		BackHandler.addEventListener("hardwareBackPress", onBackPress);

		return () => BackHandler.removeEventListener("hardwareBackPress", onBackPress);
	}, []);
}

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