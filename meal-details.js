const apiUrl = 'https://www.themealdb.com/api/json/v1/1/';
const mealId = new URLSearchParams(window.location.search).get('id');
fetch(`${apiUrl}lookup.php?i=${mealId}`)
    .then(response => response.json())
    .then(data => {
        const meal = data.meals[0];
        console.log(meal);
        const mealDetailElement = document.getElementsByClassName('meal-detail-container');
        const meal_name = document.getElementById('meal-name');
        const meal_img = document.getElementById('meal-image');
        const meal_instructions = document.getElementById('meal-instructions');
        meal_name.textContent = meal.strMeal;
        meal_img.src = meal.strMealThumb;
        meal_instructions.textContent = meal.strInstructions;
    })
    .catch(error => console.error(error));