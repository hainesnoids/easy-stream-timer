function startClock(len) {
    const timerElement = document.querySelector('#timer');
    const houDOM = document.querySelector('#hours');
    const minDOM = document.querySelector('#minutes');
    const secDOM = document.querySelector('#seconds');
    const thisSecond = new Date().getSeconds();
    let clockInterval;
    function startick() {
        const thatSecond = new Date().getSeconds();
        if (thisSecond !== thatSecond) {
            clockInterval = setInterval(tick, 1000)
        } else {
            window.requestAnimationFrame(startick);
        }
    }
    window.requestAnimationFrame(startick);
    function tick() {
        if (/* Temporal*/ false) { // if the browser supports the new Temporal API

            // PLEASE REMEMBER TO PROGRAM THIS LATER
            // LIKE REALLY DO, THE DATE API COULD GO DEPRECATED ANY WEEK NOW

        } else { // use the legacy Date API
            const date = new Date();

            const hou = String(date.getHours()).padStart(2,'0');
            const min = String(date.getMinutes()).padStart(2,'0');
            const sec = String(date.getSeconds()).padStart(2,'0');
            
            houDOM.innerHTML = hou;
            minDOM.innerHTML = min;
            secDOM.innerHTML = sec;
        }
    }
}



function timerEnded() {
    const timerElement = document.querySelector('#timer');
    timerElement.classList.add('ended');
    alarmAudio.loop = true;
    alarmAudio.play().then();
    setTimeout(() => { // reset timer after 30 seconds
        timerElement.classList.remove('ended');
        alarmAudio.pause();
        timerElement.classList.add('inactive');
    }, 30000)
}

document.addEventListener('DOMContentLoaded', () => {
    startClock();
});