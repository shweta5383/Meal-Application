const searchInputEle = document.getElementById('searchTerm');
const menuContainerEle = document.getElementById('menu-container');
const apiUrl = 'https://www.themealdb.com/api/json/v1/1/';
let favouriteMeals = JSON.parse(localStorage.getItem('favouriteMeals')) || [];

searchInputEle.addEventListener('input', () => {
    const searchTerm = searchInputEle.value.trim();
    if (searchTerm) {
        fetch(`${apiUrl}search.php?s=${searchTerm}`)
            .then(response => response.json())
            .then(data => {
                displayMealsList(data.meals);
            })
            .catch(error => console.error(error));
    } else {
        mealList.innerHTML = '';
    }
});

function displayMealsList(meals) {
    menuContainerEle.innerHTML = '';
    meals.map(meal => {
        const mealEle = document.createElement('div');
        mealEle.classList = 'meal_items'
        mealEle.innerHTML = `
            <h2 class="item-name">${meal.strMeal}</h2>
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}" width="200" height="200">
            <button class="favourite-btn" data-id="${meal.idMeal}">Favourites <i class="fa fa-heart" aria-hidden="true"></i>
</button>
        `;
        mealEle.addEventListener('click', () => {
            window.location.href = `meal-detail.html?id=${meal.idMeal}`;
        });
        menuContainerEle.appendChild(mealEle);
    });
    const favouriteButtons = document.querySelectorAll('.favourite-btn');
    favouriteButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const mealId = btn.getAttribute('data-id');
            if (!favouriteMeals.includes(mealId)) {
                favouriteMeals.push(mealId);
                localStorage.setItem('favouriteMeals', JSON.stringify(favouriteMeals));
                alert('Meal added to favourites!');
            } else {
                alert('Meal already added to favourites!');
            }
        });
    });
}
