const favouriteMealsEle = document.getElementById('favourite-meals-list');
let favouriteMeals = JSON.parse(localStorage.getItem('favouriteMeals')) || [];

function loadFavouriteMeals() {
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
                    const mealElement = document.createElement('div');
                    mealElement.classList = 'meal_items'
                    mealElement.innerHTML = `
        <h2 class="item-name">${meal.strMeal}</h2>
        <img src="${meal.strMealThumb}" alt="${meal.strMeal}" width="200" height="200">
        <button style="display:block;" class="remove-favourites" data-id="${meal.idMeal}">Remove</button>
    `;
                    mealElement.addEventListener('click', () => {
                        window.location.href = `meal-detail.html?id=${meal.idMeal}`;
                    });

                    favouriteMealsEle.appendChild(mealElement);

                    const removeBtn = document.querySelectorAll('.remove-favourites');
                    removeBtn.forEach(btn => {
                        btn.addEventListener('click', (e) => {
                            e.stopPropagation();
                            const mealId = btn.getAttribute('data-id');
                            favouriteMeals = favouriteMeals.filter(id => id !== mealId);
                            localStorage.setItem('favouriteMeals', JSON.stringify(favouriteMeals));
                            alert('menu removed from favourites')
                            console.log(favouriteMeals);
                            loadFavouriteMeals();
                        });
                    });
                })
                .catch(error => console.error('Error fetching meal:', error));
        });
    }
}


// function removeFromFavourites(mealId) {
//     favouriteMeals = favouriteMeals.filter(id => id !== mealId);
//     console.log
//     localStorage.setItem('favouriteMeals', JSON.stringify(favouriteMeals));
//     loadFavouriteMeals();
// }

window.onload = loadFavouriteMeals;