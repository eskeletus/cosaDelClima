window.addEventListener('load', ()=> {
    //const skycons = require('./skycons.js');
    let long;
    let lat;
    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let locationTimezone = document.querySelector('.location-timezone');
    let degree = document.querySelector('.temperature');
    const degreeSpan = document.querySelector('.temperature span');
    
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position=>{
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const proxy = 'https://cors-anywhere.herokuapp.com/';
            const api = `${proxy}https://api.darksky.net/forecast/1b13005784c26b0e17da4bce4dc10f54/${lat},${long}`;

            fetch(api)
                .then(response =>{
                    return response.json();
                })
                .then(data =>{
                    console.log(data);
                    const {temperature, summary, icon} = data.currently;
                    //Set DOM elements from API
                    temperatureDegree.textContent = temperature;
                    temperatureDescription.textContent = summary;
                    locationTimezone.textContent = data.timezone.replace(/_/g, " ").replace(/\//g, ", ");
                    //Celcius
                    let celcius = (temperature - 32) * (5/9);
                    //Set icon
                    setIcons(icon, document.querySelector('.icon'));
                    //To Celcius
                    degree.addEventListener('click', () => {
                        if(degreeSpan.textContent==='F'){
                            degreeSpan.textContent = 'C';
                            temperatureDegree.textContent = Math.floor(celcius);
                        }else{
                            degreeSpan.textContent = 'F';
                            temperatureDegree.textContent = temperature;
                        }
                    }); 
                });
        });
    }

    function setIcons(icon, iconID){
        const skycons = new Skycons({"color": "white"});
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }
});