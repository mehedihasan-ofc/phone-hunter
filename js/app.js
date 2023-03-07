const loadPhones = async (searchText, dataLimit) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    const res = await fetch(url);
    const data = await res.json();
    displayPhones(data.data, dataLimit);
};

const displayPhones = (phones, dataLimit) => {

    const phonesContainer = document.getElementById("phones-container");
    phonesContainer.textContent = "";

    //========================>>
    const showAll = document.getElementById("show-all");

    if (dataLimit && phones.length > 6) {
        // display 6 phones only
        phones = phones.slice(0, 6);
        showAll.classList.remove("d-none");
    }
    else {
        showAll.classList.add("d-none");
    }

    // display no phones found
    const noPhone = document.getElementById("no-found-message");
    if (phones.length === 0) {
        noPhone.classList.remove("d-none");
    }
    else {
        noPhone.classList.add("d-none");
    }

    phones.forEach(phone => {
        console.log(phone);
        const phoneDiv = document.createElement("div");
        phoneDiv.classList.add("col");

        phoneDiv.innerHTML = `
        <div class="card h-100 p-4">
            <img src="${phone.image}" class="card-img-top img-fluid" alt="...">
            <div class="card-body">
                <h5 class="card-title">${phone.phone_name}</h5>
                <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                
                <button onclick="loadPhoneDetails('${phone.slug}')" type="button" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#phoneDetailModal">Show Details</button>
    
            </div>
        </div>
        `;
        phonesContainer.appendChild(phoneDiv);
    });

    // Stop spinner
    toggleSpinner(false);
};

//============================>>
const processSearch = (dataLimit) => {
    // Star spinner
    toggleSpinner(true);

    const searchField = document.getElementById("search-field");
    const searchText = searchField.value;
    loadPhones(searchText, dataLimit);

    // searchField.value = "";
};

// handle search button click
document.getElementById("btn-search").addEventListener("click", function () {

    processSearch(6);
});

// search input field enter key handler
document.getElementById('search-field').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        processSearch(6);
    }
});

const toggleSpinner = isLoading => {
    const spinnerDiv = document.getElementById("spinner");

    if (isLoading === true) {
        spinnerDiv.classList.remove("d-none");
    }
    else {
        spinnerDiv.classList.add("d-none");
    }
};

// not the best way to load show all
document.getElementById("btn-show-all").addEventListener("click", function () {
    processSearch();
});

const loadPhoneDetails = async id => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    modalShowDetails(data.data);
};

const modalShowDetails = phone => {
    console.log(phone);

    const modalTitle = document.getElementById("phoneDetailModalLabel");
    modalTitle.innerText = phone.name;

    const phoneDetails = document.getElementById("phone-details-body");
    phoneDetails.innerHTML = `
        <h5>Release Date: ${phone.releaseDate ? phone.releaseDate : "No Release Date Found"}</h5>
        <h6>Main Features:</h6>
        <p>ChipSet: ${phone.mainFeatures.chipSet ? phone.mainFeatures.chipSet : "Not Found"}</p>
        <p>Display Size: ${phone.mainFeatures.displaySize ? phone.mainFeatures.displaySize : "Not Found"}</p>
        <p>Memory: ${phone.mainFeatures.memory ? phone.mainFeatures.memory : "Not Found"}</p>
        <p>Storage: ${phone.mainFeatures.storage ? phone.mainFeatures.storage : "Not Found"}</p>
        <p>Others: ${phone.others ? phone.others.Bluetooth : "Not Found"}</p>
    `
};

loadPhones("iphone", 6);