const favouriteMealsEle = document.getElementById('favourite-meals-list');
let favouriteMeals = JSON.parse(localStorage.getItem('favouriteMeals')) || [];

//Display Favourites Meals
function loadFavouriteMealsList() {
    favouriteMealsEle.innerHTML = '';
    if (favouriteMeals.length === 0) {
        favouriteMealsEle.innerHTML = '<p>No favourite meals added</p>';
    } else {
        favouriteMeals.map(mealId => {
            fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    const meal = data.meals[0];
                    const mealEle = document.createElement('div');
                    mealEle.classList = 'meal_items'
                    mealEle.innerHTML = `
        <h2 class="item-name">${meal.strMeal}</h2>
        <img src="${meal.strMealThumb}" alt="${meal.strMeal}" width="200" height="200">
        <button style="display:block;" class="remove-favourites" data-id="${meal.idMeal}">Remove</button>
    `;
                    mealEle.addEventListener('click', () => {
                        window.location.href = `meal-detail.html?id=${meal.idMeal}`;
                    });

                    favouriteMealsEle.appendChild(mealEle);

                    const removeBtn = document.querySelectorAll('.remove-favourites');
                    removeBtn.forEach(btn => {
                        btn.addEventListener('click', (e) => {
                            e.stopPropagation();
                            const mealId = btn.getAttribute('data-id');
                            favouriteMeals = favouriteMeals.filter(id => id !== mealId);
                            localStorage.setItem('favouriteMeals', JSON.stringify(favouriteMeals));
                            alert('menu removed from favourites')
                            loadFavouriteMealsList();
                        });
                    });
                })
                .catch(error => console.error('Error fetching meal:', error));
        });
    }
}

//called function on onload to load favourites menus
window.onload = loadFavouriteMealsList;
