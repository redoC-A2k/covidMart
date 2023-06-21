export let showInfoToast = (text, timeOutInMilliSeconds=1500) =>{
    let elem = document.getElementById("toast");
    elem.classList.add("show")
    let span = document.querySelector("#toast span")
    span.innerHTML=text;
    elem.style.animation = `toastDown 0.4s`;
    elem.style.animationTimingFunction = 'cubic-bezier(0,0,.83,1.57)';
    setTimeout(()=>{
        elem.classList.remove("show")
        elem.style.animation = "";
    },timeOutInMilliSeconds)
}

export let showErrorToast = (text, timeOutInMilliSeconds=1500) => {
    let elem = document.getElementById("toast");
    elem.classList.add("show")
    elem.classList.add("error")
    let span = document.querySelector("#toast span")
    span.innerHTML=text;
    elem.style.animation = `toastDown 0.4s`;
    elem.style.animationTimingFunction = 'cubic-bezier(0,0,.83,1.57)';
    setTimeout(()=>{
        elem.classList.remove("show")
        elem.style.animation = "";
    },timeOutInMilliSeconds)
}