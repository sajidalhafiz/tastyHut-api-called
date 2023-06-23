const loadMeals = async (searchText) => {
    if (!searchText) {
        return alert('type any meal you like');
    }
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`;
    try {
        const res = await fetch(url);
        const data = await res.json();
        displayMeals(data.meals)
    }
    catch (error) {
        console.log(error);
    }
}

function displayMeals(meals) {
    // console.log(meals)


    const showAllBtn = document.getElementById('show-all-btn');
    if (meals.length > 5) {
        //show all btn
        // showAll();
        showAllBtn.classList.remove('d-none');
        // meals = meals.slice(0, 6);
        showMeal(meals.slice(0, 6));
        document.getElementById('show-all-btn').addEventListener('click', function () {
            showMeal(meals);
            // showAllBtn.innerText = 'Show Less';
        });
        // console.log(meals);
    } else {
        showMeal(meals);
        showAllBtn.classList.add('d-none');

    }

}

const showMeal = (meals) => {

    const cardContainer = document.getElementById('card-container');
    cardContainer.textContent = '';
    meals.forEach(meal => {
        // console.log(meal.idMeal)
        const colDiv = document.createElement('div');
        colDiv.classList.add('col', 'card', 'mb-3');
        colDiv.style.maxWidth = 540 + 'px';
        colDiv.innerHTML = `
        <div class="row g-0">
            <div class="col-md-4">
                <img src="${meal.strMealThumb}"
                    class="img-fluid rounded-start" alt="...">
            </div>
            <div class="col-md-8">
                <div class="card-body">
                    <h5 class="card-title">${meal.strMeal}</h5>
                    <p class="card-text">This is a wider card with supporting text below as a natural
                        lead-in to
                        additional content. This content is a little bit longer.</p>
                    <div>
                        <button onclick="viewDetails(${meal.idMeal})" type="button" class="btn btn-warning" data-bs-toggle="modal"
                        data-bs-target="#details">
                        View Details
                        </button>
                    </div>
                </div>
            </div>
        </div>
        `
        cardContainer.appendChild(colDiv);

    })
}

const searchMeal = () => {
    const searchText = document.getElementById('search-input').value;
    loadMeals(searchText);
}

const viewDetails = async (idMeal) => {
    // console.log(idMeal)
    try {
        const res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`);
        const data = await res.json();
        showMealModal(data.meals[0]);
    }
    catch(error){
        console.log(error);
    }
}

function showMealModal(meal){
    console.log(meal.strMeal);
    document.getElementById('detailsLabel').innerText = meal.strMeal;
}

// const modalContainer = document.getElementById('details');
// console.log('model container before', modalContainer);
// const modalDiv = document.createElement('div');
// modalDiv.classList.add('modal-dialog', 'modal-dialog-centered');
// modalDiv.innerHTML = `
// <div class="modal-content">
//     <div class="modal-header">
//         <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
//         <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
//     </div>
//     <div class="modal-body">
//         ...
//     </div>
//     <div class="modal-footer">
//         <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Close</button>
//     </div>
// </div>
// `
// console.log(modalDiv)
// modalContainer.appendChild(modalDiv);
// console.log('model container after',modalContainer)