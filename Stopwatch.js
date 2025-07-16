let isNight = localStorage.getItem("mode") === "night";
console.log(`IsNight = ${isNight}`)

const Toggle = document.getElementsByClassName("circle")[0];
const Button = document.getElementsByClassName("toggle")[0];
const container = document.querySelector(".container");


if (isNight) {
    Button.classList.add("bg_night");
    Toggle.classList.add("animate_night");
    document.body.style.backgroundColor = "#000000"

    document.querySelectorAll("*:not(.buttons):not(.buttons *)").forEach(el => {
        el.style.color = "black"
    })
    container.style.border = "2px solid white";
    document.querySelector(".title").style.color: "white"
} else {
    Button.classList.add("bg_day");
    document.body.style.backgroundColor = "rgba(255, 255, 255, 1)"
    Toggle.classList.add("animate_day");
    document.querySelectorAll("*:not(.buttons):not(.buttons *)").forEach(el => {
        el.style.color = "black"
    })

    container.style.border = "2px solid rgba(255, 255, 255, 1)";
    document.querySelector(".title").style.color : "black"
}
Button.addEventListener("click", function () {
    isNight = localStorage.getItem("mode") === "night";

    if (isNight) {
        container.style.border = "2px solid rgba(255, 255, 255, 1)";
        document.body.style.backgroundColor = "rgba(255, 255, 255, 1)"
        document.querySelector(".title").style.color = "black"
    
        Button.classList.remove("bg_night");
        Toggle.classList.remove("animate_night");
        Button.classList.add("bg_day");
        Toggle.classList.add("animate_day");
        localStorage.setItem("mode", "day");
    } else {

        container.style.border = "2px solid white";
        document.body.style.backgroundColor = "#000000"
        document.querySelector(".title").style.color = "white"
        Button.classList.remove("bg_day");
        Toggle.classList.remove("animate_day");
        Button.classList.add("bg_night");
        Toggle.classList.add("animate_night");
        localStorage.setItem("mode", "night");
    }

    isNight = !isNight;
});

let hour = 0
let minute = 0
let seconds = 0
let milliseconds = 0
let isRunning = false
function getsUpdated() {
    isRunning = true;
    Interval = setInterval(() => {
        milliseconds++;
        if (milliseconds > 99) {
            milliseconds = 0;
            seconds++;
        }
        if (seconds > 59) {
            seconds = 0;
            minute++;
        }
        if (minute > 59) {
            minute = 0;
            hour++;
        }
        if (hour > 23) {
            hour = 0;
        }

        document.getElementsByClassName("milliseconds")[0].innerHTML = milliseconds < 10 ? `0${milliseconds}` : `${milliseconds}`;
        document.getElementsByClassName("seconds")[0].innerHTML = seconds < 10 ? `0${seconds}` : `${seconds}`;
        document.getElementsByClassName("minute")[0].innerHTML = minute < 10 ? `0${minute}` : `${minute}`;
        document.getElementsByClassName("hour")[0].innerHTML = hour < 10 ? `0${hour}` : `${hour}`;
    }, 10);
}


document.getElementsByClassName("start")[0].addEventListener("click", function () {
    console.log("Start :", isRunning)
    console.log(hour, minute, seconds, milliseconds)
    if (hour == 0 && minute == 0 && seconds == 0 && milliseconds == 0) {
        getsUpdated()
    }
    else if (!isRunning) {
        const getItem = JSON.parse(localStorage.getItem("time"))
        hour = getItem.hour
        minute = getItem.min
        seconds = getItem.sec
        milliseconds = getItem.mill
        getsUpdated()

    }
})

document.getElementsByClassName("stop")[0].addEventListener("click", function () {
    console.log("Stop :", isRunning)
    clearInterval(Interval)
    const h = hour
    const m = minute
    const s = seconds
    const ms = milliseconds
    const setTime = { mill: ms, sec: s, min: m, hour: h };
    localStorage.setItem("time", JSON.stringify(setTime));

    isRunning = false
})

document.getElementsByClassName("reset")[0].addEventListener("click", function () {
    isRunning = false
    console.log("Reset", isRunning)
    const setItem = { mill: 0, sec: 0, min: 0, hour: 0 }
    localStorage.setItem("time", JSON.stringify(setItem))

    hour = 0; minute = 0; seconds = 0; milliseconds = 0
    document.getElementsByClassName("hour")[0].innerHTML = `0${0}`
    document.getElementsByClassName("minute")[0].innerHTML = `0${0}`
    document.getElementsByClassName("seconds")[0].innerHTML = `0${0}`
    document.getElementsByClassName("milliseconds")[0].innerHTML = `0${0}`
    clearInterval(Interval)
})
