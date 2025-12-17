const searchBox = document.querySelector('.searchBox');
const searchBtn = document.querySelector('.searchBtn');
const recipeContainer = document.querySelector('.recipe-container');
const recipeDetailsContent = document.querySelector('.recipe-details-content');
const recipeCloseBtn = document.querySelector('.recipe-close-btn');


// function recipe 
const fetchRecipes = async (query) =>{
    recipeContainer.innerHTML="<h2>Fetching Recipe...</h2>";
    try{
     const data = await fetch(`http://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
    const response = await data.json();
    // return response;
    recipeContainer.innerHTML="";
    response.meals.forEach(meal =>{
        // console.log(meal);
        const recipeDiv = document.createElement('div');
        recipeDiv.classList.add('recipe');
        recipeDiv.innerHTML = `
        <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
        <h3>${meal.strMeal}</h3>
        <p><span>${meal.strArea}</span> Dish </p>
        <p>Belongs to <span>${meal.strCategory}</span> Category</p>

        `
        const button = document.createElement('button')
        button.textContent = "View Recipe";
        recipeDiv.appendChild(button);

        // adding addEventListener to recipe button 
        button.addEventListener('click', () => {
            openRecipePopup(meal);
            });



        recipeContainer.appendChild(recipeDiv);

    });
}
    catch(error){
        recipeContainer.innerHTML="<h2>Error in Fetching Recipes ,Try Again.... </h2>";
        // console.log(error);
        }
    // console.log(response.meals[0]);
}

// function to open recipe popup
const fetchIngredients =(meal) =>{
    // console.log(meal);
    let ingredentsList ="";
    for(let i=1; i<=20; i++){
        const ingredents = meal[`strIngredient${i}`];
        if(ingredents){
            const measure = meal[`strMeasure${i}`];
            ingredentsList += ` ${measure} - <li>${ingredents} </li>`
        }
        else{
            break;
        }
}
return ingredentsList;
}
const openRecipePopup=(meal)=>{
    recipeDetailsContent.innerHTML=`
    <h2 class="recipeName">${meal.strMeal}</h2>
    <h3 > Ingredents:</h3>
    <ul class="ingredientList"> ${fetchIngredients(meal)}</ul>
  
    <div class="recipeInstructions"  >
        <h3>Instructions:</h3>
        <p >${meal.strInstructions}</p>
    </div>
      `
    recipeDetailsContent.parentElement.style.display="block";
}

recipeCloseBtn.addEventListener('click' ,()=>{
    recipeDetailsContent.parentElement.style.display="none";
})


searchBtn.addEventListener('click' , (e) => {
    e.preventDefault(); // to prevent auto submit // 
    const searchInput = searchBox.value.trim();
    if(!searchInput){
        recipeContainer.innerHTML=`<h2>Type the meal in the search box.</h2>`;
        return;
    }
    
   


    fetchRecipes(searchInput);
    // console.log("Button Clicked");
   
      
});