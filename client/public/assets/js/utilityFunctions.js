let timeout;

function debounce(cb,delay) {
    return (...args)=>{
        clearTimeout(timeout);
        timeout = setTimeout(()=>{
            cb(...args)
        },delay)
    }
}

export {debounce}