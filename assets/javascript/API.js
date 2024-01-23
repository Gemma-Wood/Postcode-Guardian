// JavaScript file dedicated only to API
// Insert endpoint URL
const postcodeAPI = "https://api.postcodes.io/postcodes/";
//we need a replica of the above API in order to serve the crime API, as the crime API is not specific enough.
const postcodeCrime = "https://api.postcodes.io/postcodes/<postcode>"
const crimeAPI = "https://data.police.uk/api/crimes-street/all-crime?lat=LAT_HERE&lng=LONG_HERE";

// Function to fetch postcode data
function fetchPostcodeData() {
    // Get the postcode from the input field
    const postcodeToQuery = document.getElementById('postcodeInput').value;

    // Make API call to fetch postcode data
    fetchPostcodeInfo(postcodeToQuery);
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

