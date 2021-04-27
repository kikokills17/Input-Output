// load the airtable library, call it "Airtable";
const Airtable = require("airtable");
// console.log(Airtable);

// use airtable library, connect to our base using API key
var base = new Airtable({ apiKey: 'keyxIm2nyltY1mcO7' }).base('appOl17Edtj6nr4P2');

// get our collection base, select all the records
// specify functions that will receive the data
base("Table 1")
  .select({})
  .eachPage(gotPageOfCakes, gotAllCakes);

// an empty array to hold our data
let cakes = [];

// callback function that receives our data
function gotPageOfCakes(records, fetchNextPage) {
  console.log("gotPageOfCakes() ---> 1");
  // add the records from this page to our array
  cakes.push(...records);
  // request more pages
  fetchNextPage();
}

// call back function that is called when all pages are loaded
function gotAllCakes(err) {
  console.log("gotAllCakes() ---> 2");

  // report an error, you'd want to do something better than this in production
  if (err) {
    console.log("error loading data");
    console.error(err);
    return;
  }

  // call functions to log and show the cakes
  // consoleLogCakes();
  // showCakes();
}

// just loop through the cakes and console.log them
function consoleLogCakes() {
  console.log("consoleLogCakes()");
  cakes.forEach(cake => {
    console.log("Cake:", cake);
  });
}

// look through our airtable data, create elements
function showCakes() {
  // display cakes in list
  cakes.forEach(cake => {
    // console.log(cake.fields);
  })
}

const input = document.getElementsByClassName('monthInput')[0];
const input2 = document.getElementsByClassName('monthInput2')[0];
const section = document.getElementsByTagName('section')[0];
const prompt = document.getElementsByClassName('prompt')[0];
const logs = document.getElementsByClassName('logs')[0];
const header = document.getElementsByTagName('header')[0];

(function focusInput() {
  setTimeout(function() {
    input.focus();
  }, 0)
})();

// handle the value that users type in the input box
function handleInputMonth(month) {
  if (!month) return;
  let res = month.toLowerCase();
  let first = res[0].toUpperCase();
  let rest = res.slice(1, 3);
  return first + rest;
}

// display the cake about itself month
function displayCake(cakeData) {
  // delete existing cake image box
  let existingImgBox = document.getElementsByClassName('img-box')[0];
  if(existingImgBox) {
    existingImgBox.remove();
  }
  // create new cake image box
  const imgBox = document.createElement('div');
  imgBox.classList.add('img-box');
  section.appendChild(imgBox);
  // create new img and insert the new cake image box
  const img = document.createElement('img');
  img.src = cakeData.Attachments[0].url;
  img.title = cakeData.Notes;
  img.alt = cakeData.Notes;
  imgBox.appendChild(img);
}

// add event listener
input.addEventListener('keydown', function (e) {
  if (e.key === 'Enter') {
    const inputMonth = handleInputMonth(this.value);
    
    const isExist = cakes.find(cake => {
      return inputMonth === cake.fields.month.slice(0, 3);
    })

    if (isExist) {
      displayCake(isExist.fields);
      header.classList.add('left');
      prompt.style.display = 'none';
      input.style.display = 'none';
      input2.style.display = 'inline-block';
      input2.focus();
      window.addEventListener('keydown', function () {
        input2.focus();
      })
      if (!logs.innerHTML) {
        logs.innerHTML += `${isExist.fields.month}`;
      } else {
        logs.innerHTML += `/${isExist.fields.month}`;
      }
    } else {
      console.log('month error!');
    }

    this.value = '';
  }
})

input2.addEventListener('keydown', function (e) {
  if (e.key === 'Enter') {
    const inputMonth = handleInputMonth(this.value);

    const isExist = cakes.find(cake => {
      return inputMonth === cake.fields.month.slice(0, 3);
    })
    if (isExist) {
      displayCake(isExist.fields);
      
      if (!logs.innerHTML) {
        logs.innerHTML += `${isExist.fields.month}`;
      } else {
        logs.innerHTML += `/${isExist.fields.month}`;
      }
      input.style.fontSize = '4.8rem';

    } else {
      console.log('month error!');
    }

    this.value = '';
  }
})