const search_input_ele = document.getElementById('searchTerm');
const menu_container_ele = document.getElementById('menu-container');
const apiUrl = 'https://www.themealdb.com/api/json/v1/1/';
let favouriteMeals = JSON.parse(localStorage.getItem('favouriteMeals')) || [];

search_input_ele.addEventListener('input', () => {
    const searchTerm = search_input_ele.value.trim();
    if (searchTerm) {
        fetch(`${apiUrl}search.php?s=${searchTerm}`)
            .then(response => response.json())
            .then(data => {
                displayMeals(data.meals);
            })
            .catch(error => console.error(error));
    } else {
        mealList.innerHTML = '';
    }
});

function displayMeals(meals) {
    menu_container_ele.innerHTML = '';
    meals.map(meal => {
        const mealElement = document.createElement('div');
        mealElement.classList = 'meal_items'
        mealElement.innerHTML = `
            <h2 class="item-name">${meal.strMeal}</h2>
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}" width="200" height="200">
            <button class="btn btn-primary favourite-btn" data-id="${meal.idMeal}"><i class="fa fa-heart" aria-hidden="true"></i>
</button>
        `;
        mealElement.addEventListener('click', () => {
            window.location.href = `meal-detail.html?id=${meal.idMeal}`;
        });
        menu_container_ele.appendChild(mealElement);
    });
    const favouriteBtns = document.querySelectorAll('.favourite-btn');
    favouriteBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const mealId = btn.getAttribute('data-id');
            if (!favouriteMeals.includes(mealId)) {
                favouriteMeals.push(mealId);
                localStorage.setItem('favouriteMeals', JSON.stringify(favouriteMeals));
                alert('Meal added to favourites!');
            }
        });
    });
}
