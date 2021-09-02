//function for getElementById
const getElement = id => {
        return document.getElementById(`${id}`);
    }
    //function for loading animation
const toggleSpinner = displayStyle => {
        getElement('spinner').style.display = displayStyle;
    }
    //button clickhandler for searching books
const searchBook = () => {
    const inputField = getElement('search-field');
    const inputText = inputField.value;
    //clearing screen
    inputField.value = '';
    getElement('number-of-results').innerHTML = '';
    getElement('search-result').innerHTML = '';
    //spinner show
    toggleSpinner('block');
    //empty input error handle
    if (inputText === '') {
        getElement('number-of-results').innerHTML = `<h3>You Have Not Write Anything. Search again.</h3>`;
        toggleSpinner('none');
    } else {
        //API call and pass to find data
        const url = `https://openlibrary.org/search.json?q=${inputText}`;
        fetch(url)
            .then(res => res.json())
            .then(data => findResult(data))
    }

}

const findResult = Allresults => {
    const numberOfResultsFound = Allresults.numFound;
    //first showing number of results found 
    const numberOfResult = getElement('number-of-results');
    if (numberOfResultsFound === 0) {
        numberOfResult.innerHTML = `<h3>No Result Found</h3>`
        toggleSpinner('none');
    } else {
        //number of book line display and pass for showing results
        numberOfResult.innerHTML = `<h3 class="fw-bold mb-3 py-3">Total ${numberOfResultsFound} Books Found</h3>`;
        showResult(Allresults.docs);
    }
}

//trying to show results
const showResult = books => {
    const parentDiv = getElement('search-result');
    //working on all books (docs array) using foreach loop to show each book
    books.forEach(book => {
        //first check for cover
        let coverUrl = `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`;
        //if image not found  error handle
        if (book.cover_i === undefined) {
            coverUrl = `images/notFound.png`;
        }

        /*  book title, author name, publisher name, publisher years using destructuring */
        let { title, author_name, publisher, first_publish_year } = book;

        // Check author is found or not
        if (author_name === undefined) {
            author_name = 'Author Not Found'
        } else {
            author_name = author_name[0];
        }

        // check publisher is found or not
        if (publisher === undefined) {
            publisher = 'publisher Not Found'
        } else {
            publisher = publisher[0];
        }
        //checking first publication year is found or not
        if (first_publish_year === undefined) {
            first_publish_year = 'Not Found'
        }
        //create child div of result to show
        const child = document.createElement('div');
        //class adding on the child div.(showing result)
        child.classList.add('card');
        child.classList.add('col-3');
        child.classList.add('mx-5');
        child.classList.add('single-book');
        child.innerHTML = `
        <img src="${coverUrl}" class="card-img-top w-75 h-75 mt-2 rounded mx-auto" alt="Cover Not Available" >
        <div class="card-body">
                <h5 class="card-title">${title}</h5>
                <p class="card-text">Author Name: ${author_name}</p>
                <p class="card-text">Publisher: ${publisher}</p>
                <p class="card-text">First Publish: ${first_publish_year}</p>
        </div>
               
        `
        parentDiv.appendChild(child);
    });
    //spinner off
    toggleSpinner('none');
}