

const getData = () => {

    const apiKey = '5ae2e3f221c38a28845f05b60a876f1b21b89d50884061e43dcb35a0';

    const location = document.getElementById("location").value;

    location !== "" ? fetchLocation(location, apiKey) : fetchError("Warning: Please enter city!");

}

// Fetch Latitude and Longitude

const fetchLocation = (location, apiKey) => {

    document.getElementById("location").innerHTML = location.toUpperCase();

    let urlForLocation = "https://api.opentripmap.com/0.1/en/places/geoname?name="+ location +"&apikey="+ apiKey;

    fetch(urlForLocation)
    .then( (response) => response.ok ? response.json() : fetchError("Error: Location not Found!"))
    .then( (data) =>  { 
        data.partial_match === true ? fetchError("Error: Location not Found!") : fetchData(data.lat, data.lon, apiKey)
    });

}

// Fetch Tourist Places

const fetchData = (lat, lon, apiKey) => {

    let urlForDetais = `https://api.opentripmap.com/0.1/en/places/radius?radius=100000&limit=10&offset=0&lon=${lon}&lat=${lat}&apikey=${apiKey}`;

    fetch(urlForDetais)
    .then( (response) => response.json())
    .then( (data) => {
        var count = 0;
        data.features.forEach(item => {
            document.getElementById("location" + count++).innerHTML = item.properties.name;
        });
    })
    .catch( () => fetchError("Error: No Details Found!") );

}

// Show Error Messages

const fetchError = (err) => {

    clearData();
    document.getElementById("location1").innerHTML = err;

}

// Clear all Locations

const clearData = () => {

    document.getElementById("location").value = null;
    document.getElementById("location").innerHTML = null;

    for(var count = 0; count <= 10; count++) {
        document.getElementById("location" + count).innerHTML = null;
    }

}

// Set Copyright Year

const setCurrentYear = () => {

    document.getElementById("cpy").innerHTML = new Date().getFullYear();
}