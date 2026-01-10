let questions = [
    "Tell me about yourself",
    "What is Python",
    "Explain object oriented programming",
    "What are your strengths",
    "Why should we hire you"
];

let i = 0;
let recognition;
let synth = window.speechSynthesis;

/* USER GESTURE ENTRY */
function initInterview() {
    document.getElementById("startOverlay").style.display = "none";
    synth.cancel();
    startInterview();
}

function startInterview() {
    speakQuestion();
}

function speakQuestion() {
    if (i >= questions.length) {
        endInterview();
        return;
    }

    updateStatus("AI speaking...");
    document.getElementById("questionText").innerText = questions[i];
    document.getElementById("answerText").innerText = "Listening...";
    document.getElementById("feedback").innerText = "";

    synth.cancel(); // CRITICAL

    let utter = new SpeechSynthesisUtterance(questions[i]);
    utter.rate = 0.9;

    utter.onend = () => {
        setTimeout(startListening, 600);
    };

    synth.speak(utter);
}

function startListening() {
    updateStatus("Listening...");

    const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;

    recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.start();

    recognition.onresult = (event) => {
        document.getElementById("answerText").innerText =
            event.results[0][0].transcript;
    };

    recognition.onspeechend = () => {
        recognition.stop();
        setTimeout(giveFeedback, 500);
    };

    recognition.onerror = () => {
        document.getElementById("feedback").innerText =
            "Could not hear properly.";
        nextQuestion();
    };
}

function giveFeedback() {
    let answer =
        document.getElementById("answerText").innerText.toLowerCase();

    let feedback =
        answer.length < 15
            ? "Your answer is short. Try to explain more."
            : "Good answer. Moving to next question.";

    updateStatus("AI responding...");
    document.getElementById("feedback").innerText = feedback;

    let msg = new SpeechSynthesisUtterance(feedback);
    msg.rate = 0.95;

    msg.onend = () => {
        nextQuestion();
    };

    synth.speak(msg);
}

function nextQuestion() {
    i++;
    setTimeout(speakQuestion, 800);
}

function endInterview() {
    updateStatus("Interview completed");

    synth.speak(
        new SpeechSynthesisUtterance(
            "Thank you. The interview has been completed."
        )
    );

    setTimeout(() => {
        window.location.href = "/result";
    }, 3000);
}

function updateStatus(text) {
    document.getElementById("status").innerText = text;
}
