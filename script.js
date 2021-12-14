const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes = [];

function loading(){
    loader.hidden = false;
    quoteContainer.hidden = true;
}

function complete(){
    loader.hidden = true;
    quoteContainer.hidden = false;
}

const newQuotes = function() {
    loading();
    // fetch a single quote dynamically
    const quotes = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    // check if author field is blank and replace with Unknown
   if(!quotes.author){
       authorText.textContent = 'Unknown';
   }else{
       authorText.textContent = quotes.author;
   }
//    check if length of quote is longer than 50 apply long style
if(quotes.text.length > 60){
 quoteText.classList.add('long-quote');
}else{
    quoteText.classList.remove('long-quote');
}
    quoteText.textContent = quotes.text;
    complete();
}

async function getQuotes(){
    loading();
    const apiURL = 'https://type.fit/api/quotes';
    try{
        // perform a function when it succeeds
        const response = await fetch(apiURL);
        apiQuotes = await response.json();
        newQuotes();
        // console.log(newQuotes());
    }
    catch(error){
        // catch any error here
    }
}

// on click of twitter button open a new window

function tweetQuote(){
    const twitterURL = `https://twitter.com/intent/tweet?${quoteText.textContent} - ${'authorText.textContent'}`;
    window.open(twitterURL, '_blank'); 
    // opens window in a new tab
}

// add event listener
newQuoteBtn.addEventListener('click', newQuotes);
twitterBtn.addEventListener('click', tweetQuote);

// when we run the page function call happens
getQuotes();

