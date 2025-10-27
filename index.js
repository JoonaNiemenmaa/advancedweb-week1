const containers = document.getElementsByClassName("container");

function create_wiki_item(container) {
	const wiki_item = document.createElement("div");
	wiki_item.classList.add("wiki-item");

	container.appendChild(wiki_item);

	const header = document.createElement("h1");
	header.innerText = "Breed X";
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

	const wiki_img = document.createElement("img");
	wiki_img.classList.add("wiki-img");
	wiki_img.src = "";

	img_container.appendChild(wiki_img);
}

for (const container of containers) {
	for (var i = 0; i < 5; i++) {
		create_wiki_item(container);
	}
}
