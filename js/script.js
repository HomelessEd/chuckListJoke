const API = 'https://api.chucknorris.io/jokes/random';
const joke = document.getElementById('fetchJoke');
const deleteAll= document.getElementById('clearAll');
let jokeList = JSON.parse(localStorage.getItem('jokes')) || [];

  function printJokes() {
    const cardElement = document.getElementById('jokeList');
    cardElement.innerHTML= '';

    function deleteJoke(index){
      jokeList.splice(index, 1);
      localStorage.setItem('jokes', JSON.stringify(jokeList));
      printJokes()
   }

   function deleteAll() {
    jokeList = [];
    localStorage.removeItem('jokes');
    printJokes(); 
   }

    jokeList.forEach((joke,index) => {
      const card = document.createElement('div');
      card.className = 'joke-card';
      card.textContent = joke;

      const deleteBtn = document.createElement('button');
      deleteBtn.className ='Delete Button'
      deleteBtn.textContent = 'Delete';
      deleteBtn.onclick = () => deleteJoke(index);
      
      card.appendChild(deleteBtn);
      cardElement.appendChild(card);
    });
   }


joke.addEventListener('click', async () => {
   try {const response = await fetch (API);
   const data = await response.json();
   jokeList.push(data.value);
   localStorage.setItem('jokes',JSON.stringify(jokeList));
   printJokes();
   console.log(data.value);
   console.log(jokeList);
   } catch (error){
    console.error('Couldn´t fetch joke', error);
   } 
   }); 

   printJokes();