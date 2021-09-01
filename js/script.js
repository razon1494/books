const searchBook = () => {
    const inputField = document.getElementById('search-field');
    const inputText = inputField.value;
    inputField.value = '';
    //empty input handle
    if (inputText === '') {

    } else {
        const url = `http://openlibrary.org/search.json?q=${inputText}`;
        fetch(url)
            .then(res => res.json())
            .then(data => findResult(data))
    }

}

findResult = Allresults => {
    const numberOfResultsFound = Allresults.numFound;


    //first showing number of results found 
    const numberOfResult = document.getElementById('number-of-results');
    if (numberOfResultsFound === 0) {
        numberOfResult.innerHTML = `<h6>No Result Found</h6>`
    } else {
        numberOfResult.innerHTML = `<h6>${numberOfResultsFound} Books Found</h6>`;
        showResult(Allresults.docs);
    }
}

//trying to show results
showResult = books => {
    const parentDiv = document.getElementById('search-result');
    parentDiv.textContent = '';
    //working on all books (docs array) using foreach loop to show each book
    books.forEach(book => {
        //first check for cover
        let coverUrl = `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`;
        if (book.cover_i === undefined) {
            coverUrl = `notFound.png`;
        }
        //book name
        const bookName = book.title;

        //author name, publisher name, publisher years using destructuring (it can be found or not)
        let { author_name, publisher, first_publish_year } = book;
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
        //create child div of result to add
        const child = document.createElement('div');
        //class adding on the child div.(showing result)
        child.classList.add('card');
        child.classList.add('col-3');
        child.classList.add('mx-5');
        child.innerHTML = `
        <img src="${coverUrl}" class="card-img-top w-75 h-75 mt-2 rounded mx-auto" alt="Cover Not Available" >
        <div class="card-body">
                <h5 class="card-title">${bookName}</h5>
                <p class="card-text">Author Name: ${author_name}</p>
                <p class="card-text">Publisher: ${publisher}</p>
                <p class="card-text">First Publish: ${first_publish_year}</p>
        </div>
               
        `
        parentDiv.appendChild(child);
    });

}