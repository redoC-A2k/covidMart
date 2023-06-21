let timeout;

function debounce(cb,delay) {
    return (...args)=>{
        clearTimeout(timeout);
        timeout = setTimeout(()=>{
            cb(...args)
        },delay)
    }
}

function showLoader(){
    let element = document.getElementById('spinner')
    element.classList.add("show")
}

function hideLoader(){
    let element = document.getElementById('spinner')
    element.classList.remove("show")
}
export {debounce, showLoader, hideLoader}