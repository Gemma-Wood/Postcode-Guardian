// JavaScript file dedicated only to API
// Insert endpoint URL
const postcodeAPI = "https://api.postcodes.io/postcodes/";
//the crime API at the moment extracts crime data froma specific location and date. Can change later if we want
const crimeAPI = "https://data.police.uk/api/crimes-street/all-crime?lat=52.629729&lng=-1.131592&date=2017-01";

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
                document.getElementById('regionData').innerHTML = `Region: ${postcodeInfo.region}`;
                document.getElementById('districtData').innerHTML = `Admin District: ${postcodeInfo.admin_district}`;
                document.getElementById('wardData').innerHTML = `Admin Ward: ${postcodeInfo.admin_ward}`;
                document.getElementById('parliamentData').innerHTML = `Parliamentary Constituency: ${postcodeInfo.parliamentary_constituency}`;
            } else {
                // Handle the case when 'postcodeInfo' is null or undefined
                console.error('Postcode information is null or undefined.');
            }
        })
        .catch(error => {
            console.error('Error fetching postcode data:', error);
            // You can handle errors here, e.g., display a message to the user
        });
}

// Attach the fetchPostcodeData function to the search button
document.getElementById('searchButton').addEventListener('click', fetchPostcodeData);

