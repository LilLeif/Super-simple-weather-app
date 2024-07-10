document.addEventListener("DOMContentLoaded", () =>{
    const inputBox = document.getElementById("city-input");
    const searchButton = document.getElementById("search-button");
    searchButton.addEventListener("click", retrieveText);
    async function retrieveText(){
        
        const city = inputBox.value.trim()
        if(city === ""){
            alert("Please enter a city name");
            return;
        }


        const windSpeedBox = document.getElementById("wind-speed");
        const url = "http://api.weatherapi.com/v1/current.json?key=266507c5e6284c3ab8f124145241007&q=" + city + "&aqi=no";
        data = await fetchData(url);

        if (!data){
            return;
        }
        const cityHeading = document.getElementById("city-heading");
        cityHeading.textContent = city;
        cityHeading.classList.remove("initial-city")


        document.getElementById("temp-text").textContent = "Temperature: " + data.current.temp_c + "°C";

        document.getElementById("uv-text").textContent = "UV index: " + data.current.uv;

        document.getElementById("wind-dir-text").textContent = "Wind direction: " + data.current.wind_dir;

        document.getElementById("wind-text").textContent = "Wind speed: " + data.current.wind_kph + " km/h";

        document.getElementById("description-text").textContent = "Description: " + data.current.condition.text;
        document.getElementById("desc-icon").src = data.current.condition.icon;

        inputBox.value="";
        
    }
})




async function fetchData(url) {
    try {
        const response = await fetch(url);
        if (!response.ok){
            throw new Error("Network response was not ok");
        }
        const data = await response.json();
        if(data.error){
            alert(data.error.message);
            return;
        }
        console.log(data);
        return data;
    }
    
    catch (error) {
        alert("Please type a city. Check your spelling.");
        console.error("Error:", error);
        return;
    }
    
}


