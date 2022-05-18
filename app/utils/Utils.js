export function empty(value) {
	if(typeof value === "object" && value !== null && Object.keys(value).length === 0) {
		return true;
	}

	if(value === null || typeof value === "undefined" || value.toString().trim() === "") {
		return true;
	}

	return false;
}

export function wait(duration) {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve(null);
		}, duration);
	});
}

export function parseURI(uri) {
	if(typeof uri !== "string" || uri.length < 7) {
		return null;
	}

	let parts = /otpauth:\/\/([A-Za-z]+)\/([^?]+)\??(.*)?/i.exec(uri);

	if(!parts || parts.length < 3) { 
		return null; 
	}

	let [fullUri, type, fullLabel] = parts;

	if(!type || !fullLabel) { 
		return null; 
	}

	let account = decodeURIComponent(fullLabel);

	let labelParts = account.split(/: ?/);

	let label = labelParts && labelParts.length === 2 ? { issuer:labelParts[0], account:labelParts[1] } : { issuer:"", account:account };

	let queryString = parts[3] ? new URLSearchParams(parts[3]) : [];

	let query = [...queryString].reduce((info, [key, value]) => {
		info[key] = value;
		return info;
	}, {});

	return { type:type.toLowerCase(), label, query };
}
