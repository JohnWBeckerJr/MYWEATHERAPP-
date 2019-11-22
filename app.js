window.addEventListener('load', ()=>{
    let long;
    let lat; 
    let temperatureDescription =  document.querySelector('.temperature-description'); 
    let temperatureDegree =  document.querySelector('.temperature-degree');
    let locationTimezone =  document.querySelector('.location-timezone'); 
    let temperatureSection = document.querySelector('.temperature'); 
    const temperatureSpan = document.querySelector('.temperature span ');     
    
    if(navigator.geolocation){
         navigator.geolocation.getCurrentPosition(position => {
             long =  position.coords.longitude;
             lat = position.coords.latitude;  
             
             const proxy = `https://cors-anywhere.herokuapp.com/`; 
             const api = `${proxy}https://api.darksky.net/forecast/1dc64fc1b7fbea963afa630ba12e3f3b/${lat},${long}`;
             
            fetch(api)
            .then(data => {
                 return data.json();
             })
             .then(data => {
                 console.log(data);
                 const {temperature, summary, icon} = data.currently; 
                 
                 //Set DOM elements from API 
                 temperatureDegree.textContent = temperature;
                 temperatureDescription.textContent = summary;
                 locationTimezone.textContent = data.timezone;
                 temperatureDegree.textContent = Math.floor(temperature); 
                 //Formula for Celsius 
                 let Celsius = (temperature - 32)*(5/9);  
                 //Set Icon 
                 setIcons(icon, document.querySelector(".icon"));
                 
                 //Change temperature from Farenheit/Celsius 
                temperatureSection.addEventListener('click', () => {
                 if(temperatureSpan.textContent === "F"){
                     temperatureSpan.textContent = "C";
                     temperatureDegree.textContent = Math.floor(Celsius);
                 }else{ 
                     temperatureSpan.textContent = "F";
                     temperatureDegree.textContent = temperature; 
                     temperatureDegree.textContent = Math.floor(temperature); 
                 }
                 });
                });
            }); 
    }else{
        h1.textContent = "DIS SHIT DONT WORK CUZ U STUPID"
    }
   function setIcons(icon, iconID){
       const skycons = new Skycons({color: "white"});
       const currentIcon = icon.replace(/-/g, "_").toUpperCase();
       skycons.play();
       return skycons.set(iconID, Skycons[currentIcon]);
   } 
});  