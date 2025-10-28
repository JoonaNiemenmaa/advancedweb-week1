const DOGS = 5;
const containers = document.getElementsByClassName("container");

/*async function find_dog_link(body) {
	let html = "";
	for await (const chunk of body) {
		for (const byte of chunk) {
			html += String.fromCharCode(byte);
		}
	}

	const base = document.createElement("html");

	base.innerHTML = html;

	const links = base.getElementsByTagName("a");

	for (const link of links) {
		console.log(link.href);
		console.log(link.innerText);
	}
}*/

async function create_wiki_item(container, breed) {
	const wiki_item = document.createElement("div");
	wiki_item.classList.add("wiki-item");

	container.appendChild(wiki_item);

	const header = document.createElement("h1");
	const header_text = breed[0].toUpperCase() + breed.slice(1);
	header.innerText = header_text;
	header.classList.add("wiki-header");

	wiki_item.appendChild(header);

	const wiki_content = document.createElement("div");
	wiki_content.classList.add("wiki-content");

	wiki_item.appendChild(wiki_content);

	const summary_url = `https://en.wikipedia.org/api/rest_v1/page/summary/${breed}`;
	const json = await (await fetch(summary_url)).json();

	/*if (json.type == "disambiguation") {
		const html_url = `https://en.wikipedia.org/api/rest_v1/page/html/${breed}`;
		const response = await fetch(html_url);
		await find_dog_link(response.body);
	}*/

	const summary = json.extract;

	const paragraph = document.createElement("p");
	paragraph.innerText = summary ? summary : "Some text about this breed.";
	paragraph.classList.add("wiki-text");

	wiki_content.appendChild(paragraph);

	const img_container = document.createElement("div");
	img_container.classList.add("img-container");

	wiki_content.appendChild(img_container);

	const image_url = `https://dog.ceo/api/breed/${breed}/images`;
	const response = await (await fetch(image_url)).json();
	const index = Math.round(Math.random() * (response.message.length - 1));
	const image = response.message[index];

	const wiki_img = document.createElement("img");
	wiki_img.classList.add("wiki-img");
	wiki_img.src = image;
	img_container.appendChild(wiki_img);
}

async function get_breeds() {
	const url = "https://dog.ceo/api/breeds/list/all";
	const json = await (await fetch(url)).json();
	const response_breeds = Object.keys(json.message);
	const breeds = [];
	for (var i = 0; i < DOGS; i++) {
		var index = Math.round(Math.random() * (response_breeds.length - 1));
		var breed = response_breeds[index];
		breeds.push(breed);
	}
	return breeds;
}

const breeds = ["dingo", "beagle", "saluki", "basenji", "briard"];

for (const container of containers) {
	for (const breed of breeds) {
		create_wiki_item(container, breed);
	}
}

/*get_breeds().then((breeds) => {
	for (const container of containers) {
		for (const breed of breeds) {
			create_wiki_item(container, breed);
		}
	}
});*/
