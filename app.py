from flask import Flask, render_template, request, redirect, session
import sqlite3
from ai.evaluator import evaluate_answer

app = Flask(__name__)
app.secret_key = "interviewbot"

questions = {
    "hr": [
        ("Tell me about yourself", ["developer", "skills", "experience"]),
        ("What are your strengths?", ["hardworking", "team", "learning"]),
        ("Why should we hire you?", ["company", "skills", "growth"])
    ],
    "python": [
        ("What is Python?", ["language", "interpreted", "object"]),
        ("Explain OOP", ["class", "object", "inheritance"]),
        ("List vs Tuple", ["mutable", "immutable"])
    ]
}

@app.route("/", methods=["GET", "POST"])
def login():
    if request.method == "POST":
        session["name"] = request.form["name"]
        session["type"] = request.form["type"]
        session["index"] = 0
        session["score"] = 0
        return redirect("/interview")
    return render_template("login.html")

@app.route("/interview", methods=["GET", "POST"])
def interview():
    qtype = session["type"]
    index = session["index"]

    if index >= len(questions[qtype]):
        return redirect("/result")

    question, keywords = questions[qtype][index]

    if request.method == "POST":
        answer = request.form["answer"]
        score = evaluate_answer(answer, keywords)
        session["score"] += score
        session["index"] += 1
        return redirect("/interview")

    return render_template("interview.html", question=question)

@app.route("/result")
def result():
    total = len(questions[session["type"]]) * 5
    return render_template(
        "result.html",
        name=session["name"],
        score=session["score"],
        total=total
    )

if __name__ == "__main__":
    app.run(debug=True)
