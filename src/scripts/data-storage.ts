export interface Meet {
	name: string;
	url: string;
}
export function readData() {
	return [
		{ name: "a", url: "https://google.com" },
		{ name: "b", url: "https://google.com" },
		{ name: "c", url: "https://google.com" },
		{ name: "d", url: "https://google.com" },
		{ name: "e", url: "https://google.com" },
		{ name: "f", url: "https://google.com" },
		{ name: "g", url: "https://google.com" },
		{ name: "h", url: "https://google.com" },
		{ name: "i", url: "https://google.com" },
		{ name: "j", url: "https://google.com" },
		{ name: "k", url: "https://google.com" },
		{ name: "l", url: "https://google.com" },
		{ name: "m", url: "https://google.com" },
		{ name: "n", url: "https://google.com" },
		{ name: "o", url: "https://google.com" },
		{ name: "p", url: "https://google.com" },
		{ name: "q", url: "https://google.com" },
		{ name: "r", url: "https://google.com" },
		{ name: "s", url: "https://google.com" },
		{ name: "t", url: "https://google.com" },
		{ name: "a", url: "https://google.com" },
	];
}

export function writeData(data: Meet) {
	console.log(data);
}
