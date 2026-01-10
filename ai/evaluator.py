def evaluate_answer(answer, keywords):
    score = 0
    answer = answer.lower()

    for word in keywords:
        if word in answer:
            score += 1

    if len(answer.split()) > 20:
        score += 2

    return min(score, 5)
