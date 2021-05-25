/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/


/*
For assistance:
   Check out the "Project Resources" section of the Instructions tab: https://teamtreehouse.com/projects/data-pagination-and-filtering#instructions
   Reach out in your Slack community: https://treehouse-fsjs-102.slack.com/app_redirect?channel=unit-2
*/

let filteredList = [];
/*
Create the `showPage` function
This function will create and insert/append the elements needed to display a "page" of nine students
*/
/**
 * Shows a page of nine students
 * @param  {array} list
 * @param  {number} page
 */
function showPage(list, page) {
   const start = (page * 9) - 9;
   const end = page * 9;

   //Select the UL element with a class of student-list and assign its value to a variable.
   const ul = document.getElementsByClassName('student-list')[0];
   //Use the innerHTML property set the HTML content of the student-list variable you just created to an empty string. 
   //This will remove any students that might have previously been displayed.
   ul.innerHTML = '';
   if (list.length > 0) {
      //loop over the list parameter
      for (let i = 0; i < list.length; i++) {
         if (i >= start && i < end) {
            const name = `${list[i].name.first} ${list[i].name.last}`;
            const email = list[i].email;
            const picture = list[i].picture.large;
            const joined = list[i].registered.date;
            const li = createStudentLI(picture, name, email, joined);
            ul.insertAdjacentHTML('beforeend', li);
         }
      }
   } else {
      //display no results found
      ul.innerHTML = `<h3>No results found.</h3>`;
   }
   
   
}
/**
 * Creates a list item relevant to a student
 * @param  {string} picture
 * @param  {string} name
 * @param  {string} email
 * @param  {string} joined
 * @returns Returns a LI element for a student
 */
function createStudentLI(picture, name, email, joined) {
   const li = `
      <li class="student-item cf">
         <div class="student-details">
            <img class="avatar" src="${picture}" alt="Profile Picture">
            <h3>${name}</h3>
            <span class="email">${email}</span>
         </div>
         <div class="joined-details">
            <span class="date">Joined ${joined}</span>
         </div>
      </li>
   `;
   return li;
}

/*
Create the `addPagination` function
This function will create and insert/append the elements needed for the pagination buttons
*/
const ulLinkList = document.getElementsByClassName('link-list')[0];
/**
 * This function will create and insert/append the elements needed for the pagination buttons
 * @param  {array} list
 */
function addPagination(list) {
   const pages = Math.ceil(list.length / 9);

   ulLinkList.innerHTML = '';


   /**
    * Creates the LI item for the pagination button list.
    * @param  {number} pageNumber
    * @returns Returns a LI element for the pagination list
    */
   function createPageButton(pageNumber) {
      const button = `
      <li>
         <button type="button">${pageNumber}</button>
      </li>
      `
      return button;
   }

   //loop through the number of pages and create the buttons
   for (let i = 1; i <= pages; i++) {
      let li = createPageButton(i);
      ulLinkList.insertAdjacentHTML('beforeend', li);
   }

   //add the active class to the first item
   ulLinkList.firstElementChild.className = 'active';
}

//Adds a listener for when a page button is click to bring up the correct page
ulLinkList.addEventListener('click', (e) => {
   const el = e.target;
   if (el.nodeName === 'BUTTON') {
      const page = el.textContent;
      document.getElementsByClassName('active')[0].className = '';
      el.className = 'active';
      if (filteredList.length > 0) {
         showPage(filteredList, page);
      } else {
         showPage(data, page);
      }
   }
});

/**
 * 
 */
function addSearchBar() {
   const header = document.getElementsByClassName('header')[0];
   const html = `
      <label for="search" class="student-search">
         <span>Search by name</span>
         <input id="search" placeholder="Search by name...">
         <button type="button"><img src="img/icn-search.svg" alt="Search icon"></button>
      </label>
   `;

   header.innerHTML = header.innerHTML + html;
}
/**
 * Uses the search bar to filter the data
 * @param  {array} data
 * @param  {string} value
 * @returns Returns a filtered array of students
 */
function filterData(data, value) {
   value = value.toLowerCase();
   filteredList = [];
   for (let i = 0; i < data.length; i++) {
      let name = `${data[i].name.first} ${data[i].name.last}`;
      name = name.toLowerCase();
      console.log('name' + ': ' + value);
      if (name.search(value) >= 0) {
         filteredList.push(data[i]);
      }
   }
   return filteredList;
}



// Call functions
showPage(data, 1);
addPagination(data);
addSearchBar();

//Get search input element
const search = document.getElementById('search');
//Add event listener on keyup for the search input
search.addEventListener('keyup', (e) => {
   let value = e.target.value;
   if (value != '') {
      let list = filterData(data, value);
      //show the filtered list data
      showPage(list, 1);
      //show the page buttons
      addPagination(list);
   } else {
      //clear filtered list
      filteredList = [];
      //call data functions
      showPage(data, 1);
      addPagination(data);
   }
});