const API_KEY="dea561aca792eca00c7ed3891bbbc280";
let input, btn;

document.addEventListener('DOMContentLoaded', function() {
    input = document.querySelector("#search");
    btn = document.querySelector("#btn");
    btn.addEventListener("click", fetchAPIDATA);
    input.addEventListener("keypress", function(e) {
        if (e.key === "Enter") fetchAPIDATA();
    });
});

async function fetchAPIDATA(){
    const city = input.value.trim().toLowerCase();
    
    if(city==""){
        alert("Please enter a city name");
        return;
    }
    try{
       const response=await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`)
       const data=await response.json()
       
       if(response.status!==200){
           document.querySelector("#result").innerHTML=`<p class="error">${data.message}</p>`
           return;
       }
       
       const now = new Date();
       document.querySelector("#update-time").textContent = now.toLocaleTimeString();
       
       document.querySelector("#result").innerHTML=`
       <div class="weather-main">
           <div class="weather-summary">
               <div class="location">${data.name}, ${data.sys.country}</div>
               <div class="temperature">${Math.round(data.main.temp)}°</div>
               <div class="condition">${data.weather[0].main}</div>
           </div>
       </div>
       <div class="details">
           <div class="detail-card">
               <span>Feels Like</span>
               <strong>${Math.round(data.main.feels_like)}°C</strong>
           </div>
           <div class="detail-card">
               <span>Humidity</span>
               <strong>${data.main.humidity}%</strong>
           </div>
           <div class="detail-card">
               <span>Wind Speed</span>
               <strong>${data.wind.speed} m/s</strong>
           </div>
           <div class="detail-card">
               <span>Pressure</span>
               <strong>${data.main.pressure} mb</strong>
           </div>
       </div>
       `;
    } catch (error) {
        document.querySelector("#result").innerHTML=`<p class="error">Unable to fetch weather data. Please try again.</p>`
        console.error("Error:", error)
    }
}