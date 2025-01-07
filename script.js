var countDownDate;
var translations;
var currentLanguage = 'en'; // Define currentLanguage before using it

// Load translations
fetch('translations.json')
    .then(response => response.json())
    .then(data => {
        translations = data;
        updateLanguage(currentLanguage); // Set default language to English
    })
    .catch(error => console.error('Error loading translations:', error));

// Set the initial countdown date to October 18, 2026
var defaultDate = new Date("2026-10-18");
countDownDate = defaultDate.getTime();

// Update the countdown every 1 second
var x = setInterval(function() {
    var now = new Date().getTime();
    var distance = countDownDate - now;

    // Check if the countdown date is valid
    if (isNaN(distance)) {
        document.getElementById("timer").innerHTML = translations[currentLanguage].invalidDate;
        return;
    }

    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Display the result in the element with id="timer"
    document.getElementById("timer").innerHTML = days + " " + translations[currentLanguage].days + " " + hours + " " + translations[currentLanguage].hours + " " + minutes + " " + translations[currentLanguage].minutes + " " + seconds + " " + translations[currentLanguage].seconds;

    // If the countdown is over, write some text
    if (distance < 0) {
        clearInterval(x);
        document.getElementById("timer").innerHTML = translations[currentLanguage].expired;
    }
}, 1000);

// Function to update the language
function updateLanguage(language) {
    currentLanguage = language;
    document.querySelector('h1').innerText = translations[language].title;
}