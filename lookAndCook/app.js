const submit = document.querySelector('form')
const searchField = document.querySelector('#searchField')
const ul = document.querySelector('ul')
const recipieName = document.querySelector('h2')
const instructions = document.querySelector('p')
const thumbnail = document.querySelector('img')

const food = async (name) => {
    try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`);
        const data = await response.json();
        recipieName.innerText = data.meals[0].strMeal;
        instructions.innerText = data.meals[0].strInstructions;
        thumbnail.src = data.meals[0].strMealThumb;
        console.log(data.meals[0]);
        return data.meals[0];
    } catch {
        console.log('Recipie not available :(');
        const li = document.createElement('li');
        recipieName.innerText = 'Recipie not available :(';
        thumbnail.src = '';
        thumbnail.alt = 'no picture';
        ul.appendChild(li);
        instructions.innerText = 'please search something else'
    }
}

const listing = async () => {
    const obj = await food(searchField.value)
    const keys = Object.keys(obj);

    let ingredients = [];
    let amount = [];
    let count = 1;
    for(let i of keys){
        if(i == `strIngredient${count}` && obj[`strIngredient${count}`] !== ''){
            ingredients.push(obj[`strIngredient${count}`]);
            amount.push(obj[`strMeasure${count}`]);
            count++;
        }
    }

    // count - 1 because array will count from 0
    count = count - 1;
    for(let i = 0; i < count; i++){
        const li = document.createElement('li');
        li.textContent = `${ingredients[i]} - ${amount[i]}`;

        ul.appendChild(li);
    }
}

submit.addEventListener('submit', (e) => {
    e.preventDefault();
    ul.textContent = '';
    //food(searchField.value);
    listing();
    
})

