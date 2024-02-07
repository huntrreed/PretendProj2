document.addEventListener('DOMContentLoaded', () => {
  //Mock Dog Data for Example, can be changed/seeded from a library when that's up and running//
  const petsData = [
    {
      name: 'Buddy',
      age: '5 years',
      breed: 'Golden Retriever',
      description: 'Friendly and energetic, great with kids!',
      saved: false, // initial "saved" state
      energyLevel: "medium",
      goodwithkids: "Yes",
      goodwithotherdogs: "Yes",
      spayedneutered: "Yes",
      weight: "80 lbs",
      specialmedneeds: "No"
      },
      {
      name: "Misty",
      age: "3 years",
      breed: "Border Collie",
      description: "Loves to play fetch and is very intelligent.",
      saved: false,
      energyLevel: "high",
      goodwithkids: "Yes",
      goodwithotherdogs: "Yes",
      spayedneutered: "Yes",
      weight: "40 lbs",
      specialmedneeds: "No"
      },
      {
      name: "Whiskers",
      age: "2 years",
      breed: "Mix",
      description: "Curious and playful, always up for an adventure.",
      saved: false,
      energyLevel: "medium",
      goodwithkids: "Yes",
      goodwithotherdogs: "Yes",
      spayedneutered: "Yes",
      weight: "30 lbs",
      specialmedneeds: "Yes, mild skin allergies"
      },
      {
      name: "Wyoming",
      age: "9 years",
      breed: "Cattle Dog",
      description: "Hates sheep, loves people!",
      saved: false,
      temperament: "loyal",
      energyLevel: "medium",
      goodwithkids: "Yes",
      goodwithotherdogs: "No",
      spayedneutered: "Yes",
      weight: "50 lbs",
      specialmedneeds: "No"
      }
      ]

// Create an array that will hold pet name and associated breed
const petBreed = [];
// Loop through the petsData array and push the name and breed to the petBreed array
petsData.forEach((pet) => {
  petBreed.push({ name: pet.name, breed: pet.breed });
});

//Creating Cards
// Select the carousel content div
const carouselContent = document.querySelector('.carousel-content');
const savedPetsContainer = document.getElementById('saved-pets-container'); 
carouselContent.innerHTML = '';

// Function to create card
function createCard(pet) {
  const card = document.createElement('div');
  card.className = 'card';
  card.dataset.name = pet.name;
  card.innerHTML = `
      <header class="card-header">
        <p class="card-header-title">${pet.name}</p>
        <button class="heart-button ${pet.saved ? 'saved' : ''}">
          <i class="${pet.saved ? 'fas' : 'far'} fa-heart"></i> <!-- Font Awesome Heart Icon -->
        </button>
      </header>
      <div class="card-image">
        <figure class="image is-4by3">
          <img src="image.jpg" alt="Pet image for ${pet.name}">
        </figure>
      </div>
      <div class="card-content">
        <div class="content">
          <strong>Age:</strong> ${pet.age}<br>
          <strong>Breed:</strong> ${pet.breed}<br>
          <strong>Description:</strong> ${pet.description}
          <button class="button more-info" id="more-info-${pet.name}">More Info</button>
          <div class="additional-info is-hidden" id="additional-info-${pet.name}">
            <strong>Energy Level:</strong> ${pet.energyLevel}<br>
            <strong>Good with Kids?</strong> ${pet.goodwithkids}<br>
            <strong>Good with Other Dogs?</strong> ${pet.goodwithotherdogs}<br>
            <strong>Spayed/Neutered?</strong> ${pet.spayedneutered}<br>
            <strong>Weight:</strong> ${pet.weight}<br>
            <strong>Special Medical Needs?</strong> ${pet.specialmedneeds}<br>
          </div>
        </div>
      </div>
  `;

  
// Event listener on heart button to add it as saved and move it to the bottom saved section when clicked
const heartBtn = card.querySelector('.heart-button');
heartBtn.addEventListener('click', () => {
  pet.saved = !pet.saved; // Toggle to "saved" 
  heartBtn.classList.toggle('saved', pet.saved);
  heartBtn.innerHTML = pet.saved
    ? '<i class="fas fa-heart"></i>'
    : '<i class="far fa-heart"></i>';
  updateSavedPetsSection(card, pet); // pass card element and pet data
});
  
// Event listener to "More Info" button
const moreInfoBtn = card.querySelector('.more-info');
moreInfoBtn.addEventListener('click', (event) => {
  const additionalInfoDiv = card.querySelector(`#additional-info-${pet.name}`);
  additionalInfoDiv.classList.toggle('is-hidden');
  event.target.textContent = additionalInfoDiv.classList.contains('is-hidden') ? 'More Info' : 'Less Info';
});
  
// If pet is saved, it goes to the saved section
if(pet.saved) {
  savedPetsContainer.appendChild(card);
} else {
  carouselContent.appendChild(card);
}

return card;
}
  
// Function to update saved pets section and appends whole card to saved container
function updateSavedPetsSection(petCard, pet) {
  if (pet.saved) {
    savedPetsContainer.appendChild(petCard);
  } else {
    // Move the card back to the top carousel when the card is unsaved
    carouselContent.appendChild(petCard);
  }

  //hide the saved pets section if no saved pets 
  const savedPetsSection = document.getElementById('saved-pets-section');
  savedPetsSection.style.display = savedPetsContainer.children.length > 0 ? 'block' : 'none';
}
  
// Generate the cards for each pet
petsData.forEach(pet => {
  createCard(pet); // This will also handle placing the card in the correct section based on its saved status
});

//arrow functionality
const leftArrow = document.querySelector('.left-arrow');
const rightArrow = document.querySelector('.right-arrow');
const moreInfo = document.querySelector('.more-info'); // Evan's more info button
// When the more info button is created, it needs an id that matches the dog's name and a class of more-info
let currentIndex = 0;

//event listeners for right and left arrows
leftArrow.addEventListener('click', () => {
  currentIndex = Math.max(currentIndex - 1, 0);
  updateCarousel();
});
rightArrow.addEventListener('click', () => {
  currentIndex = Math.min(
    currentIndex + 1,
    carouselContent.children.length - 1
  );
  updateCarousel();
});

// Evan's more info button event listener 
moreInfo.addEventListener('click', () => {
  const dogName = event.target.id; // Gets the name of the specific dog
  // Gets the breed of the specific dog
  const breed = () => {
    for (let i = 0; i < petBreed.length; i++) {
      if (petBreed[i].name === dogName) {
        return petBreed[i].breed;
      }
    }
  };
  url = 'http://localhost:3001/api/dogInfo/'; // This is the route that will be created in the backend

    fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(breed),
    }).then((response) => {
      // Parse the response
      const breedInfo = {
        weight: response.weight,
        height: response.height,
        life_span: response.life_span,
        temperament: response.temperament,
      };

      // Create a drop down with breed info (added a header in here that should say breed info above breed info when the backend is connected)
      const breedInfoDiv = document.createElement('div');
      breedInfoDiv.className = 'breed-info-content';
      breedInfoDiv.innerHTML = `
            <h3 class="title is-4 has-text-centered">Breed Info</h3>
            <strong>Average Weight:</strong> ${breedInfo.weight}<br>
            <strong>Average Height:</strong> ${breedInfo.height}<br>
            <strong>Typical Life Span:</strong> ${breedInfo.life_span}<br>
            <strong>Temperament:</strong> ${breedInfo.temperament}
          </div>
        </div>
      `;
      //appending breed info to the card when the more info button is clicked
      const additionalInfoDiv = card.querySelector('.additional-info');
      additionalInfoDiv.appendChild(breedInfoDiv);

      const moreInfoBtn = card.querySelector('.more-info');
      moreInfoBtn.textContent = 'Less Info';

      additionalInfoDiv.classList.remove('is-hidden');
    })
    .catch(error => {
      console.error('Error fetching breed info:', error);
    });
    });
  });
      

//caruousel functionality 
function updateCarousel() {
  const cardWidth = document.querySelector('.card').offsetWidth;
  const newTransform = currentIndex * -(cardWidth + 20);
  carouselContent.style.transform = `translateX(${newTransform}px)`;

  // Update classes for centered card
  document
    .querySelectorAll('.carousel-content .card')
    .forEach((card, index) => {
      if (index === currentIndex) {
        card.classList.add('is-centered');
      } else {
        card.classList.remove('is-centered');
      }
    });
}

updateCarousel();
