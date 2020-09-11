export interface Meet {
	name: string;
	url: string;
	uid: number;
}
export function getData() {
	const rawData = localStorage.getItem("meetings");
	let data: Meet[];
	if (rawData !== null) {
		data = JSON.parse(rawData);
	} else {
		data = [{ name: "welcome", url: "", uid: 1 }];
	}
	return data;
}

export function saveData(data: Meet[]) {
	localStorage.setItem("meetings", JSON.stringify(data));
	console.log("saved");
}
