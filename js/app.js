const restaurants_wrapper = document.querySelector(".restaurent-listing")
const raiting = document.querySelector('#raiting')
const dishes = document.querySelector('#dishes')
const price = document.querySelector('#price')

let allRestaurents = []

  //Server calling for fetching data 
async function fetchStores(){
    const responce = await fetch('https://raw.githubusercontent.com/amirSohel007/restaurent-app/master/restaurents.json')
    const data = await responce.json()
    //assign the data to allRestaurents array
    allRestaurents = data.restaurants;
    renderRestaurentCardsView(data.restaurants);
}

//Sort By Raiting
raiting.addEventListener('change', sortByRaiting)

//Sort By Dishes
dishes.addEventListener('change', sortByDishes)

//Sort By Price
price.addEventListener('change', sortByPrice)


function filterdView(array){
  array.length > 0 ? renderRestaurentCardsView(array) : restaurants_wrapper.innerHTML = `<p class="col-sm-12"> No result found !</p>`
}

function sortByRaiting(e){
  let filteredbyRaiting = allRestaurents.filter(restro => (restro.raiting === parseInt(e.target.value)))
  filterdView(filteredbyRaiting)
}

function sortByDishes(e){
  let filteredbyDishes = allRestaurents.filter(restro => (restro.type === e.target.value))
  filterdView(filteredbyDishes)
}

function sortByPrice(e){
  let filteredbyPrice = allRestaurents.filter(restro => (restro.price < e.target.value))
  filterdView(filteredbyPrice)
}

//Genrate start rating based on number argument
function raitingStar(raitingNumber) {
  let raiting_list = "";
  for (let i = 0; i < raitingNumber; i++) {
    raiting_list += `<li><i class="fa fa-star" aria-hidden="true"></i></li>`;
  }
  return raiting_list;
}

//Genrate HTML Cars based on restaurants objects
function renderRestaurentCardsView(restaurants) {
  restaurants_wrapper.innerHTML = '';   //Make sure our container is empety
  restaurants.forEach((shop) => {
    restaurants_wrapper.insertAdjacentHTML(
      "afterbegin",
      `<div class="col-sm-4">
      <div class="restaurent-card mb-4 position-relative">
      <span class="badge badge-success">${shop.type}</span>
          <div class="img-wrapper position-relative">
          <h3 class="restaurent-title">${shop.name}</h3>
          <ul class="raiting p-0 m-0 list-unstyled d-flex">
           ${raitingStar(`${shop.raiting}`)} 
         </ul>
              <img class="w-100" src=${shop.photograph} alt="">
          </div>
          <div class="restaurent-info p-3">
              <p class="mb-0 location">${shop.location}</p>
              <p class="mb-1">${shop.address}</p>
              <p class="mb-0 price">${shop.price}</p>
          </div>
      </div>
  </div>`
    );
  });
}

fetchStores()