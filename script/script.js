const cardContainer = document.querySelector(".card-container");

setTimeout(() => {
  getEpisodes();
}, 1000);

async function getEpisodes() {
  const res = await axios.get("https://api.tvmaze.com/shows/82/episodes");

  addCards(res.data);
}

const addCards = (episode) => {
  episode.forEach((ep) => {
    const divContainer = document.createElement("div");

    const img = document.createElement("img");

    const cardBody = document.createElement("div");

    const movieTitle = document.createElement("h2");

    const movieEp = document.createElement("p");

    const movieSummery = document.createElement("p");

    const link = document.createElement("a");

    divContainer.classList.add(
      "shadow-lg",
      "mb-3",
      "card",
      "text-bg-dark",
      "border-primary",
      "rounded"
    );

    img.classList.add("card-img-top");

    cardBody.classList.add("card-body");

    movieTitle.classList.add("card-title");

    movieEp.classList.add("card-subtitle", "mb-2", "badge", "text-bg-primary");

    movieSummery.classList.add("card-text", "summery");

    link.classList.add("btn", "btn-outline-primary");

    img.src = ep.image.medium;

    const season = `${ep.season}`;
    const episode = `${ep.number}`;

    const seasonPad = season.padStart(2, "0");
    const episodePad = episode.padStart(2, "0");

    const fullEp = `S${seasonPad}E${episodePad}`;

    movieTitle.textContent = ep.name;

    movieEp.textContent = fullEp;

    movieSummery.innerHTML = ep.summary;

    link.href = ep.url;
    link.textContent = "Episode Link";

    divContainer.appendChild(img);
    cardBody.appendChild(movieTitle);
    cardBody.appendChild(movieEp);
    cardBody.appendChild(movieSummery);
    cardBody.appendChild(link);
    divContainer.appendChild(cardBody);

    cardContainer.appendChild(divContainer);
  });
};
