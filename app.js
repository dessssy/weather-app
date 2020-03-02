window.addEventListener('load',()=> {
    let long;
    let lat;
    const temperatureDescription = document.querySelector('.temperature-description');
    const temperatureDegree = document.querySelector('.temperature-degree');
    const locationTimezone = document.querySelector('.location-timezone');
    let temperatureSection = document.querySelector('.degree-section');
    const temperatureSpan = document.querySelector('.degree-section span');


    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const proxy = `https://cors-anywhere.herokuapp.com/`;
            const api = `${proxy}https://api.darksky.net/forecast/cfec69b8a2d5ffa9920ea2663e866b74/${lat},${long}`;
        
        
            fetch(api)
                .then(response =>{
                    return response.json();
                })
                .then(data =>{
                    const {temperature, summary, icon} = data.currently;
                    // set DOM elems from API
                    temperatureDegree.textContent = temperature;
                    temperatureDescription.textContent = summary;
                    locationTimezone.textContent = data.timezone;
                        // formula for Celsius
                        let celsius = (temperature - 32)*(5/9);

                        //set Icon
                        setIcons(icon, document.querySelector('.icon'));

                    //change temperature to Celsius/Farenheit
                    temperatureSection.addEventListener('click', () =>{
                        if(temperatureSpan.textContent === "F"){
                            temperatureSpan.textContent = "C";
                            temperatureDegree.textContent = Math.floor(celsius);
                        }else {
                            temperatureSpan.textContent = "F";
                            temperatureDegree.textContent = temperature;
                        }
                    })


                });
        
        });

    }

    function setIcons(icon, iconID){
        const skycons = new Skycons({color: "#fff"});
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
        
    }

});