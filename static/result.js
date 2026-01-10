const data = document.getElementById("resultData");

const finalScore = parseInt(data.dataset.score);
const totalScore = parseInt(data.dataset.total);

let count = 0;
const scoreEl = document.getElementById("scoreCount");

const interval = setInterval(() => {
    count++;
    scoreEl.innerText = count;

    if (count >= finalScore) {
        clearInterval(interval);
        speakResult();
    }
}, 30);

function speakResult() {
    const percent = Math.round((finalScore / totalScore) * 100);

    const msg = new SpeechSynthesisUtterance(
        `Your interview score is ${finalScore}. Your performance percentage is ${percent} percent.`
    );
    msg.rate = 0.95;
    speechSynthesis.speak(msg);
}
