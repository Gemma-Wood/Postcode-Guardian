//Javascipt file dedicated only to API
//inset endpoint URL
//general postcode endpoint, need to amend if we want to extract more information 
const postcodeAPI = "https://api.postcodes.io/postcodes/";
//the crime API at the moment extracts crime data froma specific location and date. Can change later if we want
const crimeAPI = "https://data.police.uk/api/crimes-street/all-crime?lat=52.629729&lng=-1.131592&date=2017-01";

//i think we should have an input field, where the user can put in the postcode they want and both results are generated and the postcode is saved to local data on the aside (if possible)
//this makes it so the user does not have to input their data twice and it is easy to return to the same postcode if they want to
//make a clear storage button which clears local storage 
//when local storage is cleared, a modal appears to confirm if the user would like to clear history
//input section should have a submit button which triggers the API calls 
