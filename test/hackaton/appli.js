
let thermostat=document.querySelector('#thermostat');
let boutonThermostat=document.querySelector('#boutonThermostat');

let fenetre=document.querySelector('#fenetre');
let boutonFenetre=document.querySelector('#boutonFenetre');

boutonFenetre.checked = true;

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

    window.addEventListener('load',showFenetre);

    true/false
    
    function showFenetre() {
        var windowIsOpen=true;
    
        //windows/open
        if(windowIsOpen){
            document.querySelector('#resultatFenetre').innerHTML="Ouvert";
    
            boutonFenetre.value
    
        }else (windowIsOpen){
            document.querySelector('#resultatFenetre').innerHTML="Fermer";
        } 
    
    }
    
    function servoControlThermostat() {
        let thermostatOuvert=fetch();
        let thermostatFermer=fecth();
    
        if(thermostatOuvert){
            document.querySelector('#resultatThermostat').innerHTML="Ouvert";
        }else if(thermostatFermer){
            document.querySelector('#resultatThermostat').innerHTML="Fermer";
        } else{
            document.querySelector('#resultatFenetre').innerHTML="Impossible de détecter le thermostat";
        }
    }
