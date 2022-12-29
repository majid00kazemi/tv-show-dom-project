const cardContainer = document.querySelector(".card-container");
const searchInput = document.querySelector("#search");
const alertDialog = document.querySelector(".alert");
const loading = document.querySelector(".loading");
const searchP = document.querySelector(".search-count");
let movieTags;

let episodesDetail = {};

setTimeout(() => {
  getEpisodes();
}, 1000);

async function getEpisodes() {
  try {
    $(".loading").fadeIn(1000);
    loading.style.display = "flex";
    alertDialog.style.display = "none";
    const res = await axios.get("https://api.tvmaze.com/shows/82/episodes");
    loading.style.display = "none";
    // $(".loading").fadeOut();
    searchInput.style.display = "inline";
    addCards(res.data);
    movieTags = document.querySelectorAll(".card-body");
    console.log(episodesDetail);
  } catch (error) {
    loading.style.display = "none";
    $(".alert").fadeIn(1000);
    // alertDialog.style.display = "block";
    console.log(error.message);
    alertDialog.textContent = `${error.message}. Please Refresh`;
    setTimeout(() => {
      $(".alert").fadeOut(1000);
    }, 5000);
  }
}

searchInput.addEventListener("input", () => {
  let count = 0;
  movieTags.forEach((movie) => {
    movie.parentElement.classList.add("show");
    const texts = movie.textContent.toLowerCase();
    if (!texts.includes(searchInput.value.toLowerCase())) {
      // movie.parentElement.style.display = "none";
      $(movie.parentElement).fadeOut();
    } else {
      // movie.parentElement.style.display = "block";
      $(movie.parentElement).fadeIn();
      count++;
    }
  });
  if (searchInput.value == "") {
    searchP.style.display = "none";
  } else {
    searchP.style.display = "block";
    searchP.textContent =
      count > 1 ? `${count} episodes found!` : `${count} episode found!`;
  }
});

const addCards = (episode) => {
  episode.forEach((ep, index) => {
    const divContainer = document.createElement("div");
    const img = document.createElement("img");
    const cardBody = document.createElement("div");
    const movieTitle = document.createElement("h2");
    const movieEp = document.createElement("p");
    const movieSummery = document.createElement("p");
    const link = document.createElement("a");

    divContainer.classList.add(
      "shadow",
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

    // episodesDetail.assign({ index: { season: ep.season, episode: ep.number } });
    episodesDetail[index] = ep.name;
    episodesDetail[index]["season"] = "ep.season";

    divContainer.appendChild(img);
    cardBody.appendChild(movieTitle);
    cardBody.appendChild(movieEp);
    cardBody.appendChild(movieSummery);
    cardBody.appendChild(link);
    divContainer.appendChild(cardBody);
    cardContainer.appendChild(divContainer);
  });
};
