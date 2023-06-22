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
    let element = document.getElementById('loader')
    element.classList.add("show")
}

function hideLoader(){
    let element = document.getElementById('loader')
    element.classList.remove("show")
}
export {debounce, showLoader, hideLoader}