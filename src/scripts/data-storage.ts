export interface Meet {
	name: string;
	description?: string;
	url: string;

	uid: number;
}
export function getData() {
	const rawData = localStorage.getItem("meetings");
	let data: Meet[];

	if (rawData === "[]" || rawData === null) {
		data = [
			{
				name: "welcome",
				description:
					"Add your first meeting by clicking the add button in lower right of the screen",
				url: "",
				uid: 1,
			},
		];
	} else {
		data = JSON.parse(rawData);
	}
	return data;
}

export function saveData(data: Meet[]) {
	localStorage.setItem("meetings", JSON.stringify(data));
	console.log("saved");
}
