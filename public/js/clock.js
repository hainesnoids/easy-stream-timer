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

            changeNumberScroll( document.querySelectorAll('#hours .number-scroll')[0],   Number(hou[0]) );
            changeNumberScroll( document.querySelectorAll('#hours .number-scroll')[1],   Number(hou[1]) );
            changeNumberScroll( document.querySelectorAll('#minutes .number-scroll')[0], Number(min[0]) );
            changeNumberScroll( document.querySelectorAll('#minutes .number-scroll')[1], Number(min[1]) );
            changeNumberScroll( document.querySelectorAll('#seconds .number-scroll')[0], Number(sec[0]) );
            changeNumberScroll( document.querySelectorAll('#seconds .number-scroll')[1], Number(sec[1]) );
        }
    }
}

function changeNumberScroll(object, value) {
    const content = object.querySelector('.number-scroll-content');
    const oldValue = Number(object.getAttribute('data-value'));
    if (value === 0 && (oldValue === 9 || oldValue === 5)) {
        content.style.top = `-1000%`;
        setTimeout(() => {
            content.style.transition = 'top 0s ease-out';
            content.style.top = `-${value}00%`;
            setTimeout(() => {
                content.style.transition = '';
            }, 250);
        }, 500);
    } else {
        content.style.top = `-${value}00%`;
    }
    object.setAttribute('data-value', value);
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