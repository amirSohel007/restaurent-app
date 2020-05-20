//Storing DOM elements in varibales
const restaurants_wrapper = document.querySelector(".restaurent-listing")
const raiting = document.querySelector('#raiting')
const dishes = document.querySelector('#dishes')
const price = document.querySelector('#price')
const search = document.querySelector('#search')
let allRestaurents = []
let favRestaurents = []

  //Server calling for fetching restaurents 
async function fetchStores(){
    const responce = await fetch('https://raw.githubusercontent.com/amirSohel007/restaurent-app/master/restaurents.json')
    const data = await responce.json()
    //assign the data to allRestaurents array
    allRestaurents = data.restaurants;
    renderRestaurentCardsView(data.restaurants);
}

//Render HTML Source
function renderHTML(restro){
  restaurants_wrapper.insertAdjacentHTML(
    "afterbegin",
    `<div class="col-sm-4">
    <div class="restaurent-card mb-4 position-relative">
    <span class="badge badge-success">${restro.type}</span>
        <div class="img-wrapper position-relative">
        <h3 class="restaurent-title">${restro.name}</h3>
        <ul class="raiting p-0 m-0 list-unstyled d-flex">
         ${raitingStar(`${restro.raiting}`)} 
       </ul>
            <img class="w-100" src=${restro.photograph} alt="">
        </div>
        <div class="restaurent-info p-3 position-relative">
          <div class="add-fav"><i class="fa fa-heart-o" aria-hidden="true"></i></div>
            <p class="mb-0 location">${restro.location}</p>
            <p class="mb-1">${restro.address}</p>
            <p class="mb-0 price">${restro.price}</p>
        </div>
    </div>
</div>`)
}

//Loop on Restaurents Object for genrate HTML
function renderRestaurentCardsView(restaurants) {
  restaurants_wrapper.innerHTML = '';  //Make sure our container is empety
  restaurants.forEach(renderHTML)
}


//Sort By Raiting
raiting.addEventListener('change', sortByRaiting)

//Sort By Dishes
dishes.addEventListener('change', sortByDishes)

//Sort By Price
price.addEventListener('change', sortByPrice)

//Search by Keywords
search.addEventListener('input', searchRestaurents)


function sortByRaiting(e){
  const filteredbyRaiting = allRestaurents.filter(restro => (restro.raiting === parseInt(e.target.value)))
  filterdView(filteredbyRaiting)
}

function sortByDishes(e){
  const filteredbyDishes = allRestaurents.filter(restro => (restro.type === e.target.value))
  filterdView(filteredbyDishes)
}

function sortByPrice(e){
  const filteredbyPrice = allRestaurents.filter(restro => (restro.price < e.target.value))
  filterdView(filteredbyPrice)
}

function filterdView(filterdArray){
  filterdArray.length > 0 ? renderRestaurentCardsView(filterdArray) : restaurants_wrapper.innerHTML = `<p class="col-sm-12"> No result found !</p>`
}

function searchRestaurents() {
  const restaurantsTitle = document.querySelectorAll(".restaurent-title");
  const restroCards = [...restaurantsTitle];
  restroCards.forEach((restro) => {
    if (restro.innerHTML.toLowerCase().includes(search.value.toLowerCase()))
      restro.parentElement.parentNode.parentNode.style.display = "block";
    else restro.parentElement.parentNode.parentNode.style.display = "none";
  });
}

//Genrate start rating based on number argument
function raitingStar(raitingNumber) {
  let raiting_list = "";
  for (let i = 0; i < raitingNumber; i++) {
    raiting_list += `<li><i class="fa fa-star" aria-hidden="true"></i></li>`;
  }
  return raiting_list;
}

fetchStores()