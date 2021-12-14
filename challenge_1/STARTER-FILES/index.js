let start = document.getElementsByClassName('start')[0];
let timer = document.getElementsByClassName('timer')[0]
let settings = document.getElementsByClassName('settings')[0]
let minutes = document.getElementsByClassName('minutes')[0].childNodes[1];
let seconds = document.getElementsByClassName('seconds')[0].childNodes[1];
let ring = document.getElementsByClassName('ring')[0];

let current_m = minutes.value;
let current_s = seconds.value;

let inSetting = false;
let state = false;
let running = true;

for(let i = 0; i < timer.childNodes.length-1; i++){
    timer.childNodes[i].addEventListener('change',()=>{
        if(isNaN(seconds.value) || isNaN(minutes.value))
        {
            running = false;
            window.alert("Only numbers are accepted")
            minutes.value = 11;
            seconds.value = 11;

        }else{
            running = true; 

        } 
    })
}




let counting = setInterval( () =>{
    
    for(let i = 0; i < timer.childNodes.length-1; i++){
        timer.childNodes[i].addEventListener('change',()=>{
            if(isNaN(seconds.value) || isNaN(minutes.value))
            {
                running = false;
                window.alert("Only numbers are accepted")
                
            }else{
                running = true;

            } 
        })
    }
    console.log(running,inSetting,state)
    if(setStates()){
        countDowwn();
    }
    
    
}
,1000)

start.addEventListener('click', ()=>{
    state = !state;
    startState(!state);
});


settings.addEventListener('click', () => {
    minutes.disabled = !minutes.disabled;
    seconds.disabled = !seconds.disabled;
    inSetting = !inSetting;
    start.disabled = !start.disabled;
    
    if(start.disabled === true){
        start.style.opacity = ".5";
    }else{
        start.removeAttribute("style")
    }
    
    setTimer()
    
    
});



function startState(bool){
    if(bool === false){
        start.childNodes[0].nodeValue= "STOP"
    }else{
        start.childNodes[0].nodeValue= "START"
    }
    
}


function setTimer(){ 
    current_m = minutes.value;
    current_s = seconds.value;
    if(current_m > 0 || current_s> 0){
        running = true;
    }

    
}

function countDowwn(){
    seconds.value = parseInt(current_s);
    minutes.value = parseInt(current_m);
    
    if(minutes.value < 0){
        minutes.value = 60
        minutes.value = current_m;
    } 
    if(seconds.value < 0){
        seconds.value = 60
        seconds.value = current_s;
        
    } 
    
    

    
    if(minutes.value <= 0 && seconds.value <= 0){
        ring.style.stroke = '#900A0A'
        minutes.value = "00"
        seconds.value = "00"
        startState(true);
        running= false;
        window.alert("Timer Finish")
    }else{
        ring.style.stroke = '#09A65A'
        running = true;
        if(seconds.value == "0")
        {
            minutes.value= minutes.value-1;
            seconds.value = "60"
        }
        
        seconds.value = seconds.value -1;
        minutes.value = minutes.value;
        current_s = parseInt(seconds.value)
        current_m = parseInt(minutes.value)
        if(seconds.value < 10) seconds.value= `0${current_s}`
        if(minutes.value < 10) minutes.value= `0${current_m}`
        
    }
    
}
    
function setStates(){
    if(running && state && !inSetting)
    {
        return true
    }
    else{
        return false
    }
}