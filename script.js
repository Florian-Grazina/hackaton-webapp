// ----- Date -----

const date = new Date();
var day = date.getDate();
var month = date.getMonth();
var year = date.getFullYear();

function toMonthName(date){
    return date.toLocaleString("fr-FR",{
        month: "short",
    });
}

var monthName = toMonthName(date);
var currentDate = `${day} ${monthName}${year}`;

document.querySelector("#date").innerHTML = currentDate;


// ----- Alert -----

var alertBox = document.querySelector("#alert_box");

function showAlert(status){

    if (status == "OK" && (temperature - temperatureExt) > 10 && windowIsOpen){
        alertBox.style.backgroundColor = "rgb(255, 244, 186, 0.7)";
        document.querySelector("#alert").innerHTML = "Attention, votre fenêtre est ouverte et il est fait "+temperatureExt+" °c dehors. Pensez à fermer la fenêtre."
    }
    else if (status == "OK"){
        alertBox.style.backgroundColor = "rgb(186, 255, 186, 0.5)";
        document.querySelector("#alert").innerHTML = "Rien a signaler, profitez bien de cette journée. Il fait actuellement "+temperatureExt+"°C à Metz.";
    }
    else if (status == "NOK"){
        alertBox.style.backgroundColor = "rgb(255, 155, 155, 0.5)";
        document.querySelector("#alert").innerHTML = "ATTENTION! Votre chauffage est allumé et votre fenêtre est ouverte!";
    }
}


// ----- Arduino -----

var ip ="http://192.168.140.110"
var temperature;
var humidity;
var window;
var alertStatus;
var alertMessage;
var windowIsOpen;
var heaterIsOpen;

var divTemperature = document.querySelector("#temperature");
var divHumidity = document.querySelector("#humidite")
const loading = document.querySelectorAll(".lds-facebook");

function fetchData(){
    fetch(ip)
    .then((response) => {
        if (response.ok){
            return response.json();
        };
        throw new Error(error);
    })
    .then((data) => {
        console.log(data);
    
        temperature = Math.round(data.values.temperature*100)/100;
        divTemperature.innerHTML = temperature + " °C";
    
        humidity = data.values.humidity;
        divHumidity.innerHTML = humidity + " %";
    
        windowIsOpen = data.servos.window;
        showFenetre();
        heaterIsOpen = data.servos.heater;
        showThermostat();
        
        alertStatus = data.status;
        showAlert(alertStatus);

        for (let loads of loading){
            loads.style.visibility = "hidden";
            loads.style.width = "0px";
        };
    })
    .catch((error) => {
        document.querySelector("#alert").innerHTML = "Impossible de se connecter au serveur. Appuyez sur reset pour réessayer.";
        document.querySelector("#temperature").innerHTML = "None";
        document.querySelector("#humidite").innerHTML = "None";

        for (let loads of loading){
            loads.style.visibility = "hidden";
            loads.style.width = "0px";
        };
    });
}


// ----- Buttons windows / heater -----

let thermostat=document.querySelector('#thermostat');
let boutonThermostat=document.querySelector('#boutonThermostat');


let fenetre=document.querySelector('#fenetre');
let boutonFenetre=document.querySelector('#boutonFenetre');

let boutonGraphThermostat=document.querySelector('#historique');
    
boutonFenetre.addEventListener('click',(e)=>{
        //changer affichage
        modification(e)

    });

    // boutonFenetre.addEventListener('click',changeFenetre);
    // appel ici la fonction entière qui comprend l'évenements


boutonThermostat.addEventListener('click',(e)=>{
        //changer affichage
        modification(e)
    });

boutonGraphThermostat=document.addEventListener('click',()=>{
        //affichage Graph
    })


//true/false

function showFenetre() {
    
    
    //windows/open
    if(windowIsOpen){
        document.querySelector('#resultatFenetre').innerHTML="Ouvert";

        boutonFenetre.checked=true;

    }else if (!windowIsOpen){
        document.querySelector('#resultatFenetre').innerHTML="Fermé";

        boutonFenetre.checked=false;
    } 
    
}

function showThermostat() {
    
    if(heaterIsOpen){
        document.querySelector('#resultatThermostat').innerHTML="Ouvert";

        boutonThermostat.checked=true;

    }else if(!heaterIsOpen){
        document.querySelector('#resultatThermostat').innerHTML="Fermé";

        boutonThermostat.checked=false;
    } 
}

async function modification (e){

    if(e.target.checked){
        if (e.target==boutonThermostat){
            document.querySelector('#resultatThermostat').innerHTML="Ouvert";
            fetch(ip+'/heater/open');
        }else{
            document.querySelector('#resultatFenetre').innerHTML="Ouvert";
            fetch(ip+'/window/open');
        }
    }else{
        if(e.target==boutonThermostat){
            document.querySelector('#resultatThermostat').innerHTML="Fermé";

            fetch(ip+'/heater/close');
        }else{
            document.querySelector('#resultatFenetre').innerHTML="Fermé";

            fetch(ip+'/window/close');
        }
    }

    await new Promise(resolve => {
        setTimeout(() => {
            resolve('resolved');
        }, 500);
    });
    
    reset();
}


// ----- Reset -----

const buttonReset = document.querySelector("#reset");
buttonReset.addEventListener("click", reset);

function reset(){
    document.querySelector("#temperature").innerHTML = "";
    document.querySelector("#humidite").innerHTML = "";
    document.querySelector("#alert").innerHTML = "";

    for (let loads of loading){
        loads.style.visibility = "visible";
        loads.style.width = "80px";
    };
    fetchData();
};


// ----- Weather -----
var weatherUrl = "https://api.openweathermap.org/data/2.5/weather?lat=49.1193089&lon=6.1757156&appid=50ec15776b6ffbb8aa15e79cad0a6321"
var weather;
var temperatureExt;
const tempDiv = document.getElementById("temperature_ext");
const icon = document.getElementById("weatherIcon");

fetch(weatherUrl)
  .then((response) => response.json())
  .then((thisWeather) => main(thisWeather));

function main(thisWeather){
    console.log(thisWeather.main.temp);
    temperatureExt = Math.round((thisWeather.main.temp-273)*10)/10;
    tempDiv.textContent = temperatureExt+"C°";
    console.log(thisWeather);
    let iconURL= "http://openweathermap.org/img/wn/"+(thisWeather.weather[0].icon)+"@2x.png";
    fetch(iconURL)
     .then(icon.src=iconURL);
    
    fetchData();
}