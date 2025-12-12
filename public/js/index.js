let alarmAudio = new Audio('raw/alarm.wav');

function startTimer(len) {
    const timerElement = document.querySelector('#timer');
    timerElement.classList.remove('inactive');
    const houDOM = document.querySelector('#hours');
    const minDOM = document.querySelector('#minutes');
    const secDOM = document.querySelector('#seconds');
    let time = len;

    function tick() {
        const hou = Math.floor(time / 3600);
        const min = Math.floor((time % 3600) / 60);
        const sec = time % 60;
        const showHours = time >= 3600;

        if (showHours) {
            houDOM.removeAttribute('hidden');
            document.querySelector('#colon-1').removeAttribute('hidden');
        } else {
            houDOM.setAttribute('hidden','');
            document.querySelector('#colon-1').setAttribute('hidden','');
        }

        houDOM.textContent = String(hou).padStart(2, '0');
        minDOM.textContent = String(min).padStart(time < 600 ? 1 : 2, '0');
        secDOM.textContent = String(sec).padStart(2, '0');

        let alarmLoaded = false;
        if (time <= 10 && !alarmLoaded) {
            alarmAudio.load();
            alarmLoaded = true;
        }

        if (time <= 0) {
            clearInterval(interval);
            timerEnded();
        }

        time--;
    }

    const interval = setInterval(tick, 1000);
    tick();
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
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const len = Number(urlParams.get('len'));
    if (len) {
        startTimer(len);
    }
});