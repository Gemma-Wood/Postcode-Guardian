
const postcodeAPI = "https://api.postcodes.io/postcodes/";
//replica of Postcode API endpoint to serve crime API
const postcodeCrime = "https://api.postcodes.io/postcodes/<postcode>"
const crimeAPI = "https://data.police.uk/api/crimes-street/all-crime?lat=LAT_HERE&lng=LONG_HERE";

const mapAPI = "  https://www.google.com/maps/embed/v1/MAP_MODE?key=&parameters";
const mapAPIKey = "AIzaSyA0WfirPNmDBJrvF2nWI2vjgD2bxonAG7I";


function fetchPostcodeData() {
    const postcodeToQuery = document.getElementById('postcodeInput').value;
    if (!isValidUKPostcode(postcodeToQuery)) {
        displayErrorModal();
        return;
    }
    saveSearchToLocalStorage(postcodeToQuery);
    fetchPostcodeInfo(postcodeToQuery);
}

function isValidUKPostcode(postcode) {
    const postcodeRegex = /^(([A-Z]{1,2}[0-9][A-Z0-9]?|ASCN|STHL|TDCU|BBND|[BFS]IQQ|PCRN|TKCA) ?[0-9][A-Z]{2}|BFPO ?[0-9]{1,4}|(KY[0-9]|MSR|VG|AI)[ -]?[0-9]{4}|[A-Z]{2} ?[0-9]{2}|GE ?CX|GIR ?0A{2}|SAN ?TA1)$/i;
    return postcodeRegex.test(postcode);
}

function displayErrorModal() {
    const modal = new bootstrap.Modal(document.querySelector('.modal'));
    modal.show();
}

function fetchCrimeData(latitude, longitude) {
    const limit = 30;
    const crimeAPIURL = `https://data.police.uk/api/crimes-street/all-crime?lat=${latitude}&lng=${longitude}`;

    fetch(crimeAPIURL)
        .then(response => response.json())
        .then(crimeData => {
            console.log('Crime Data Response:', crimeData);

            console.log('All Categories of Crime:');
            crimeData.forEach(crime => {
                console.log(crime.category);
            });
            const limitedCrimeData = crimeData.slice(0, limit);
            document.getElementById('crimeData').innerHTML = formatCrimeData(limitedCrimeData);
        })
        .catch(error => {
            console.error('Error fetching crime data:', error);
        });
}

function formatCrimeData(crimeData) {
    let html = '<ul>';
    for (let i = 0; i < Math.min(30, crimeData.length); i++) {
        const crime = crimeData[i];
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

function generateMap(latitude, longitude) {
    const mapContainer = document.getElementById('mapContainer');

    const mapURL = `https://www.google.com/maps/embed/v1/view?key=${mapAPIKey}&center=${latitude},${longitude}&zoom=15&maptype=roadmap`;

    const mapIframe = document.createElement('iframe');
    mapIframe.setAttribute('width', '100%');
    mapIframe.setAttribute('height', '400');
    mapIframe.setAttribute('frameborder', '0');
    mapIframe.setAttribute('style', 'border:0');
    mapIframe.setAttribute('src', mapURL);

    mapContainer.innerHTML = '';
    mapContainer.appendChild(mapIframe);
}

function fetchPostcodeInfo(postcode) {
    fetch(`${postcodeAPI}${postcode}`)
        .then(response => response.json())
        .then(data => {
            console.log('API Response:', data);
            const postcodeInfo = data.result;
            if (postcodeInfo !== null && postcodeInfo !== undefined) {
                document.getElementById('regionData').innerHTML = `<strong>Region:</strong><br> ${postcodeInfo.region}`;
                document.getElementById('districtData').innerHTML = `<strong>Admin District:</strong><br> ${postcodeInfo.admin_district}`;
                document.getElementById('wardData').innerHTML = `<strong>Admin Ward:</strong><br> ${postcodeInfo.admin_ward}`;
                document.getElementById('parliamentData').innerHTML = `<strong>Parliamentary Constituency:</strong><br> ${postcodeInfo.parliamentary_constituency}`;
                generateMap(postcodeInfo.latitude, postcodeInfo.longitude);
                fetchCrimeData(postcodeInfo.latitude, postcodeInfo.longitude);
            } else {
                console.error('Postcode information is null or undefined.');
            }
        })
        .catch(error => {
            console.error('Error fetching postcode data:', error);
        });
}

document.getElementById('searchButton').addEventListener('click', fetchPostcodeData);