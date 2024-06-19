//Display Meal details
const mealName = document.getElementById('meal-name');
const mealImg = document.getElementById('meal-image');
const mealInstruction = document.getElementById('meal-instructions');
const apiUrl = 'https://www.themealdb.com/api/json/v1/1/';
const mealId = new URLSearchParams(window.location.search).get('id');
fetch(`${apiUrl}lookup.php?i=${mealId}`)
    .then(response => response.json())
    .then(data => {
        const meal = data.meals[0];
        mealName.textContent = meal.strMeal;
        mealImg.src = meal.strMealThumb;
        mealInstruction.textContent = meal.strInstructions;
    })
    .catch(error => console.error(error));
