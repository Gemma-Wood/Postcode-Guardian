// JavaScript file dedicated only to API
// Insert endpoint URL
const postcodeAPI = "https://api.postcodes.io/postcodes/";

//we need a replica of the above API in order to serve the crime API, as the crime API is not specific enough.
const postcodeCrime = "https://api.postcodes.io/postcodes/<postcode>"
const crimeAPI = "https://data.police.uk/api/crimes-street/all-crime?lat=LAT_HERE&lng=LONG_HERE";

function fetchPostcodeData() {
    const postcodeToQuery = document.getElementById('postcodeInput').value;

    // Validate the postcode format
    if (!isValidUKPostcode(postcodeToQuery)) {
        // Display the error modal
        displayErrorModal();
        return;
    }

    // Save the search to local storage
    saveSearchToLocalStorage(postcodeToQuery);

    // Fetch postcode information
    fetchPostcodeInfo(postcodeToQuery);
}

// Function to validate UK postcode format
function isValidUKPostcode(postcode) {
    // Regular expression for UK postcode format
    const postcodeRegex = /^[A-Z]{1,2}\d[A-Z\d]? \d[A-Z]{2}$/i;
    return postcodeRegex.test(postcode);
}

//modal js here
// Function to display the error modal
function displayErrorModal() {
    const modal = new bootstrap.Modal(document.querySelector('.modal'));
    modal.show();
}

// Function to fetch postcode information from the Postcodes API
function fetchPostcodeInfo(postcode) {
    // Make API call using fetch
    fetch(`${postcodeAPI}${postcode}`)
        .then(response => response.json())
        .then(data => {
            // Log the API response
            console.log('API Response:', data);

            // Assuming 'result' is an object with postcode information
            const postcodeInfo = data.result;

            // Check if 'postcodeInfo' is not null or undefined before updating the HTML
            if (postcodeInfo !== null && postcodeInfo !== undefined) {
                // Update the HTML with the fetched data
                document.getElementById('regionData').innerHTML = `<strong>Region:</strong><br> ${postcodeInfo.region}`;
                document.getElementById('districtData').innerHTML = `<strong>Admin District:</strong><br> ${postcodeInfo.admin_district}`;
                document.getElementById('wardData').innerHTML = `<strong>Admin Ward:</strong><br> ${postcodeInfo.admin_ward}`;
                document.getElementById('parliamentData').innerHTML = `<strong>Parliamentary Constituency:</strong><br> ${postcodeInfo.parliamentary_constituency}`;

                // Fetch crime data using the obtained latitude and longitude
                fetchCrimeData(postcodeInfo.latitude, postcodeInfo.longitude);
            } else {
                // Handle the case when 'postcodeInfo' is null or undefined
                console.error('Postcode information is null or undefined.');
            }
        })
        .catch(error => {
            console.error('Error fetching postcode data:', error);
        });
}

// Function to fetch crime data using latitude and longitude
function fetchCrimeData(latitude, longitude) {
    // Set the limit to 30 results
    const limit = 30;

    // Make API call using fetch with the limit parameter
    const crimeAPIURL = `https://data.police.uk/api/crimes-street/all-crime?lat=${latitude}&lng=${longitude}&limit=${limit}`;
    fetch(crimeAPIURL)
        .then(response => response.json())
        .then(crimeData => {
            // Log the crime data response
            console.log('Crime Data Response:', crimeData);

            // Log all categories of crime
            console.log('All Categories of Crime:');
            crimeData.forEach(crime => {
                console.log(crime.category);
            });

            // Update the HTML with the fetched crime data
            document.getElementById('crimeData').innerHTML = formatCrimeData(crimeData);
        })
        .catch(error => {
            console.error('Error fetching crime data:', error);
        });
}

// Function to format and create HTML representation of crime data
function formatCrimeData(crimeData) {
    let html = '<ul>';

    // Limit the loop to the first 30 results
    for (let i = 0; i < Math.min(30, crimeData.length); i++) {
        const crime = crimeData[i];

        // Format the month and year using day.js
        const formattedMonthYear = dayjs(crime.month).format('MMMM, YYYY');

        html += `<li>
            <strong>Category:</strong> ${crime.category}<br>
            <strong>Location:</strong> ${crime.location.street.name}<br>
            <strong>Month:</strong> ${formattedMonthYear}<br>
        </li>`;
    }

    html += '</ul>';

    return html;
}

// Attach the fetchPostcodeData function to the search button
document.getElementById('searchButton').addEventListener('click', fetchPostcodeData);