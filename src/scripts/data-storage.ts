export interface Meet {
	name: string;
	url: string;
}
export function readData() {
	return [
		{ name: "a", url: "https://meet.google.com" },
		{ name: "b", url: "https://meet.google.com" },
		{ name: "c", url: "https://meet.google.com" },
		{ name: "d", url: "https://meet.google.com" },
		{ name: "e", url: "https://meet.google.com" },
		{ name: "f", url: "https://meet.google.com" },
		{ name: "g", url: "https://meet.google.com" },
		{ name: "h", url: "https://meet.google.com" },
		{ name: "i", url: "https://meet.google.com" },
		{ name: "j", url: "https://meet.google.com" },
		{ name: "k", url: "https://meet.google.com" },
		{ name: "l", url: "https://meet.google.com" },
		{ name: "m", url: "https://meet.google.com" },
		{ name: "n", url: "https://meet.google.com" },
		{ name: "o", url: "https://meet.google.com" },
		{ name: "p", url: "https://meet.google.com" },
		{ name: "q", url: "https://meet.google.com" },
		{ name: "r", url: "https://meet.google.com" },
		{ name: "s", url: "https://meet.google.com" },
		{ name: "t", url: "https://meet.google.com" },
		{ name: "a", url: "https://meet.google.com" },
	];
}

export function writeData(data: Meet) {
	console.log(data);
}
