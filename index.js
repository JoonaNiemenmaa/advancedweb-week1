const DOGS = 5;
const containers = document.getElementsByClassName("container");

async function create_wiki_item(container, breed) {
	const wiki_item = document.createElement("div");
	wiki_item.classList.add("wiki-item");

	container.appendChild(wiki_item);

	const header = document.createElement("h1");
	header.innerText = breed;
	header.classList.add("wiki-header");

	wiki_item.appendChild(header);

	const wiki_content = document.createElement("div");
	wiki_content.classList.add("wiki-content");

	wiki_item.appendChild(wiki_content);

	const paragraph = document.createElement("p");
	paragraph.innerText = "Some text about this breed.";
	paragraph.classList.add("wiki-text");

	wiki_content.appendChild(paragraph);

	const img_container = document.createElement("div");
	img_container.classList.add("img-container");

	wiki_content.appendChild(img_container);

	const url = `https://dog.ceo/api/breed/${breed}/images`;
	const response = await (await fetch(url)).json();
	const index = Math.round(Math.random() * (response.message.length - 1));
	const image = response.message[index];

	console.log(image);

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
		/*console.log(index);*/
		var breed = response_breeds[index];
		breeds.push(breed);
	}
	console.log(breeds);
	return breeds;
}

get_breeds().then((breeds) => {
	for (const container of containers) {
		for (const breed of breeds) {
			create_wiki_item(container, breed);
		}
	}
});
