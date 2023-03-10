const cardContainer = document.querySelector(".card-container");
const searchInput = document.querySelector("#search");
const alertDialog = document.querySelector(".alert");
const loading = document.querySelector(".loading");
const searchP = document.querySelector(".search-count");
const selectForm = document.querySelector(".form-select");
let movieTags;

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
    searchInput.style.display = "inline";
    selectForm.style.display = "block";
    addCards(res.data);
    movieTags = document.querySelectorAll(".card-body");
    console.log(movieTags.children);
  } catch (error) {
    selectForm.style.display = "none";
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

selectForm.addEventListener("change", (option) => {
  const value = option.target.value;
  movieTags.forEach((movie) => {
    const ep = movie.children[1].textContent;
    if (value === "All Episode") {
      $(movie.parentElement).show(500);
    } else if (!ep.includes(value)) {
      $(movie.parentElement).hide(500);
    } else {
      $(movie.parentElement).show(500);
    }
  });
});

searchInput.addEventListener("input", () => {
  selectForm.setAttribute("disabled", "disabled");
  selectForm.value = "All Episode";
  let count = 0;
  movieTags.forEach((movie) => {
    const titleOfEp = movie.children[0].textContent.toLowerCase();
    const summaryOfEp = movie.children[2].textContent.toLowerCase();
    if (
      !titleOfEp.includes(searchInput.value.toLowerCase()) &&
      !summaryOfEp.includes(searchInput.value.toLowerCase())
    ) {
      $(movie.parentElement).hide(500);
    } else {
      $(movie.parentElement).show(500);
      count++;
    }
  });
  if (searchInput.value == "") {
    searchP.style.display = "none";
    selectForm.removeAttribute("disabled");
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

    const option = document.createElement("option");
    option.value = fullEp;
    option.textContent = `${fullEp} - ${ep.name}`;

    selectForm.appendChild(option);
    divContainer.appendChild(img);
    cardBody.appendChild(movieTitle);
    cardBody.appendChild(movieEp);
    cardBody.appendChild(movieSummery);
    cardBody.appendChild(link);
    divContainer.appendChild(cardBody);
    cardContainer.appendChild(divContainer);
  });
};
