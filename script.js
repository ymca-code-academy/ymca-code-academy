const menuButton = document.getElementById("menu-button");
const navLinks = document.getElementById("nav-links");
const currentYear = document.getElementById("current-year");

if (menuButton && navLinks) {
    menuButton.addEventListener("click", () => {
        const menuIsOpen = navLinks.classList.toggle("open");

        menuButton.setAttribute(
            "aria-expanded",
            menuIsOpen.toString()
        );
    });
}

if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}

/* ======================================================
   LEARN PAGE LESSON FILTERS
====================================================== */

const lessonFilterButtons =
    document.querySelectorAll(".lesson-filter");

const lessonItems =
    document.querySelectorAll("[data-category]");

const filterEmptyMessage =
    document.getElementById("filter-empty");

if (lessonFilterButtons.length > 0 && lessonItems.length > 0) {
    lessonFilterButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const selectedFilter = button.dataset.filter;

            /*
             * Remove the active style from every filter button.
             * Then add it to the button that was clicked.
             */
            lessonFilterButtons.forEach((filterButton) => {
                filterButton.classList.remove("active-filter");
            });

            button.classList.add("active-filter");

            let visibleLessonCount = 0;

            lessonItems.forEach((lesson) => {
                const lessonCategory = lesson.dataset.category;

                const shouldShowLesson =
                    selectedFilter === "all" ||
                    selectedFilter === lessonCategory;

                if (shouldShowLesson) {
                    lesson.classList.remove("lesson-hidden");
                    visibleLessonCount++;
                } else {
                    lesson.classList.add("lesson-hidden");
                }
            });

            /*
             * This message only appears if a filter has
             * no matching lessons.
             */
            if (filterEmptyMessage) {
                filterEmptyMessage.hidden =
                    visibleLessonCount !== 0;
            }
        });
    });
}

/* ======================================================
   PYTHON LESSON 1 — INTERACTIVE FEATURES
====================================================== */

/* ------------------------------
   Try It Yourself:
   Print Statement Practice
------------------------------ */

const printPracticeInput =
    document.getElementById("print-practice-input");

const checkPrintAnswerButton =
    document.getElementById("check-print-answer");

const showPrintAnswerButton =
    document.getElementById("show-print-answer");

const printFeedback =
    document.getElementById("print-feedback");

const correctPrintAnswer =
    'print("I am learning Python!")';

function cleanCodeAnswer(answer) {
    return answer
        .trim()
        .replace(/\s+/g, " ")
        .replace(/\s*\(\s*/g, "(")
        .replace(/\s*\)\s*/g, ")")
        .toLowerCase();
}

if (
    printPracticeInput &&
    checkPrintAnswerButton &&
    printFeedback
) {
    checkPrintAnswerButton.addEventListener("click", () => {
        const studentAnswer =
            cleanCodeAnswer(printPracticeInput.value);

        const acceptedAnswers = [
            'print("i am learning python!")',
            "print('i am learning python!')"
        ];

        printFeedback.classList.remove(
            "feedback-correct",
            "feedback-incorrect"
        );

        if (studentAnswer === "") {
            printFeedback.textContent =
                "Type your code before checking your answer.";

            printFeedback.classList.add(
                "feedback-incorrect"
            );

            return;
        }

        if (acceptedAnswers.includes(studentAnswer)) {
            printFeedback.textContent =
                "Correct! Your print statement will display the message.";

            printFeedback.classList.add(
                "feedback-correct"
            );
        } else {
            printFeedback.textContent =
                "Not quite. Make sure you use print(), quotation marks, and parentheses.";

            printFeedback.classList.add(
                "feedback-incorrect"
            );
        }
    });
}

if (
    printPracticeInput &&
    showPrintAnswerButton &&
    printFeedback
) {
    showPrintAnswerButton.addEventListener("click", () => {
        printPracticeInput.value =
            correctPrintAnswer;

        printFeedback.textContent =
            "Here is one correct answer. Try typing it yourself before moving on.";

        printFeedback.classList.remove(
            "feedback-correct",
            "feedback-incorrect"
        );

        printFeedback.classList.add(
            "feedback-correct"
        );

        printPracticeInput.focus();
    });
}

/* ------------------------------
   Practice Quiz
------------------------------ */

const lessonOneQuiz =
    document.getElementById("lesson-one-quiz");

const quizResult =
    document.getElementById("quiz-result");

const lessonOneAnswers = {
    "question-1": "b",
    "question-2": "a",
    "question-3": "c",
    "question-4": "b"
};

if (lessonOneQuiz && quizResult) {
    lessonOneQuiz.addEventListener("submit", (event) => {
        event.preventDefault();

        let score = 0;
        let answeredQuestions = 0;

        Object.entries(lessonOneAnswers).forEach(
            ([questionName, correctAnswer]) => {
                const selectedAnswer =
                    lessonOneQuiz.querySelector(
                        `input[name="${questionName}"]:checked`
                    );

                if (selectedAnswer) {
                    answeredQuestions++;

                    if (
                        selectedAnswer.value ===
                        correctAnswer
                    ) {
                        score++;
                    }
                }
            }
        );

        quizResult.classList.remove(
            "quiz-success",
            "quiz-warning"
        );

        if (
            answeredQuestions <
            Object.keys(lessonOneAnswers).length
        ) {
            quizResult.textContent =
                "Please answer all four questions before checking your score.";

            quizResult.classList.add(
                "quiz-warning"
            );

            return;
        }

        if (score === 4) {
            quizResult.textContent =
                "4 out of 4 correct — excellent work!";

            quizResult.classList.add(
                "quiz-success"
            );
        } else if (score === 3) {
            quizResult.textContent =
                "3 out of 4 correct — great job! Review the question you missed.";

            quizResult.classList.add(
                "quiz-success"
            );
        } else if (score === 2) {
            quizResult.textContent =
                "2 out of 4 correct — good start. Review the examples and try again.";

            quizResult.classList.add(
                "quiz-warning"
            );
        } else {
            quizResult.textContent =
                `${score} out of 4 correct — review the lesson sections and try again.`;

            quizResult.classList.add(
                "quiz-warning"
            );
        }
    });
}

/* ------------------------------
   Mark Lesson Complete
------------------------------ */

const completeLessonButton =
    document.getElementById("complete-lesson-button");

const completionMessage =
    document.getElementById("completion-message");

function getLessonStorageKey() {
    const pageName =
        window.location.pathname
            .split("/")
            .pop()
            .toLowerCase();

    const lessonStorageKeys = {
        "python-lesson-1.html":
            "ymca-code-academy-python-lesson-1-complete",

        "python-lesson-2.html":
            "ymca-code-academy-python-lesson-2-complete",

        "python-lesson-3.html":
            "ymca-code-academy-python-lesson-3-complete",

        "python-lesson-4.html":
            "ymca-code-academy-python-lesson-4-complete",

        "python-lesson-5.html":
            "ymca-code-academy-python-lesson-5-complete",

        "python-lesson-6.html":
            "ymca-code-academy-python-lesson-6-complete",

        "scratch-lesson-1.html":
            "ymca-code-academy-scratch-lesson-1-complete",

        "scratch-lesson-2.html":
            "ymca-code-academy-scratch-lesson-2-complete",

        "scratch-lesson-3.html":
            "ymca-code-academy-scratch-lesson-3-complete"
    };

    return (
        lessonStorageKeys[pageName] ||
        "ymca-code-academy-python-lesson-1-complete"
    );
}

const lessonStorageKey =
    getLessonStorageKey();

function displayCompletedLesson() {
    if (!completeLessonButton || !completionMessage) {
        return;
    }

    completeLessonButton.textContent =
        "Lesson Completed ✓";

    completeLessonButton.classList.add(
        "lesson-button-complete"
    );

    completionMessage.textContent =
        "Your progress has been saved on this device.";
}

if (completeLessonButton && completionMessage) {
    const lessonWasCompleted =
        localStorage.getItem(lessonStorageKey);

    if (lessonWasCompleted === "true") {
        displayCompletedLesson();
    }

    completeLessonButton.addEventListener(
        "click",
        () => {
            localStorage.setItem(
                lessonStorageKey,
                "true"
            );

            displayCompletedLesson();
        }
    );
}

/* ------------------------------
   Lesson Progress Navigation
------------------------------ */

const lessonProgressLinks =
    document.querySelectorAll(".progress-item");

function updateLessonProgress() {
    if (lessonProgressLinks.length === 0) {
        return;
    }

    const scrollPosition =
        window.scrollY + 190;

    let currentLink =
        lessonProgressLinks[0];

    lessonProgressLinks.forEach((link) => {
        const sectionId =
            link.getAttribute("href");

        if (!sectionId || !sectionId.startsWith("#")) {
            return;
        }

        const section =
            document.querySelector(sectionId);

        if (
            section &&
            section.offsetTop <= scrollPosition
        ) {
            currentLink = link;
        }
    });

    lessonProgressLinks.forEach((link) => {
        link.classList.remove("active-progress");
    });

    if (currentLink) {
        currentLink.classList.add(
            "active-progress"
        );
    }
}

if (lessonProgressLinks.length > 0) {
    window.addEventListener(
        "scroll",
        updateLessonProgress
    );

    updateLessonProgress();
}

/* ======================================================
   PYTHON LESSON 2 — INTERACTIVE FEATURES
====================================================== */

/* ------------------------------
   Input Function Practice
------------------------------ */

const inputPracticeInput =
    document.getElementById("input-practice-input");

const checkInputAnswerButton =
    document.getElementById("check-input-answer");

const showInputAnswerButton =
    document.getElementById("show-input-answer");

const inputFeedback =
    document.getElementById("input-feedback");

const correctInputAnswer =
    'input("What is your favorite food?")';

if (
    inputPracticeInput &&
    checkInputAnswerButton &&
    inputFeedback
) {
    checkInputAnswerButton.addEventListener("click", () => {
        const studentAnswer =
            cleanCodeAnswer(inputPracticeInput.value);

        const acceptedAnswers = [
            'input("what is your favorite food?")',
            "input('what is your favorite food?')",
            'input("what is your favorite food? ")',
            "input('what is your favorite food? ')"
        ];

        inputFeedback.classList.remove(
            "feedback-correct",
            "feedback-incorrect"
        );

        if (studentAnswer === "") {
            inputFeedback.textContent =
                "Type your code before checking your answer.";

            inputFeedback.classList.add(
                "feedback-incorrect"
            );

            return;
        }

        if (acceptedAnswers.includes(studentAnswer)) {
            inputFeedback.textContent =
                "Correct! This input statement asks the user a question.";

            inputFeedback.classList.add(
                "feedback-correct"
            );
        } else {
            inputFeedback.textContent =
                "Not quite. Use input(), quotation marks, and parentheses.";

            inputFeedback.classList.add(
                "feedback-incorrect"
            );
        }
    });
}

if (
    inputPracticeInput &&
    showInputAnswerButton &&
    inputFeedback
) {
    showInputAnswerButton.addEventListener("click", () => {
        inputPracticeInput.value =
            correctInputAnswer;

        inputFeedback.textContent =
            "Here is one correct answer. Try typing it yourself before continuing.";

        inputFeedback.classList.remove(
            "feedback-correct",
            "feedback-incorrect"
        );

        inputFeedback.classList.add(
            "feedback-correct"
        );

        inputPracticeInput.focus();
    });
}

/* ------------------------------
   Lesson 2 Practice Quiz
------------------------------ */

const lessonTwoQuiz =
    document.getElementById("lesson-two-quiz");

const lessonTwoQuizResult =
    document.getElementById("lesson-two-quiz-result");

const lessonTwoAnswers = {
    "lesson-two-question-1": "b",
    "lesson-two-question-2": "a",
    "lesson-two-question-3": "a",
    "lesson-two-question-4": "b"
};

if (lessonTwoQuiz && lessonTwoQuizResult) {
    lessonTwoQuiz.addEventListener("submit", (event) => {
        event.preventDefault();

        let score = 0;
        let answeredQuestions = 0;

        Object.entries(lessonTwoAnswers).forEach(
            ([questionName, correctAnswer]) => {
                const selectedAnswer =
                    lessonTwoQuiz.querySelector(
                        `input[name="${questionName}"]:checked`
                    );

                if (selectedAnswer) {
                    answeredQuestions++;

                    if (
                        selectedAnswer.value ===
                        correctAnswer
                    ) {
                        score++;
                    }
                }
            }
        );

        lessonTwoQuizResult.classList.remove(
            "quiz-success",
            "quiz-warning"
        );

        if (
            answeredQuestions <
            Object.keys(lessonTwoAnswers).length
        ) {
            lessonTwoQuizResult.textContent =
                "Please answer all four questions before checking your score.";

            lessonTwoQuizResult.classList.add(
                "quiz-warning"
            );

            return;
        }

        if (score === 4) {
            lessonTwoQuizResult.textContent =
                "4 out of 4 correct — excellent work!";

            lessonTwoQuizResult.classList.add(
                "quiz-success"
            );
        } else if (score === 3) {
            lessonTwoQuizResult.textContent =
                "3 out of 4 correct — great job! Review the question you missed.";

            lessonTwoQuizResult.classList.add(
                "quiz-success"
            );
        } else if (score === 2) {
            lessonTwoQuizResult.textContent =
                "2 out of 4 correct — good start. Review the examples and try again.";

            lessonTwoQuizResult.classList.add(
                "quiz-warning"
            );
        } else {
            lessonTwoQuizResult.textContent =
                `${score} out of 4 correct — review the lesson and try again.`;

            lessonTwoQuizResult.classList.add(
                "quiz-warning"
            );
        }
    });
}

/* ======================================================
   PYTHON LESSON 3 — INTERACTIVE FEATURES
====================================================== */

/* ------------------------------
   Conditional Statement Practice
------------------------------ */

const conditionalPracticeInput =
    document.getElementById(
        "conditional-practice-input"
    );

const checkConditionalAnswerButton =
    document.getElementById(
        "check-conditional-answer"
    );

const showConditionalAnswerButton =
    document.getElementById(
        "show-conditional-answer"
    );

const conditionalFeedback =
    document.getElementById(
        "conditional-feedback"
    );

const correctConditionalAnswer =
`if points >= 10:
    print("Level complete!")`;

function normalizeConditionalCode(code) {
    return code
        .trim()
        .replace(/\r\n/g, "\n")
        .replace(/\t/g, "    ")
        .replace(/[ ]+\n/g, "\n")
        .replace(/\n[ ]+/g, "\n")
        .replace(/\s+/g, " ")
        .replace(/\s*:\s*/g, ": ")
        .replace(/\s*\(\s*/g, "(")
        .replace(/\s*\)\s*/g, ")")
        .toLowerCase();
}

if (
    conditionalPracticeInput &&
    checkConditionalAnswerButton &&
    conditionalFeedback
) {
    checkConditionalAnswerButton.addEventListener(
        "click",
        () => {
            const studentAnswer =
                normalizeConditionalCode(
                    conditionalPracticeInput.value
                );

            const acceptedAnswers = [
                'if points >= 10: print("level complete!")',
                "if points >= 10: print('level complete!')"
            ];

            conditionalFeedback.classList.remove(
                "feedback-correct",
                "feedback-incorrect"
            );

            if (studentAnswer === "") {
                conditionalFeedback.textContent =
                    "Type your code before checking your answer.";

                conditionalFeedback.classList.add(
                    "feedback-incorrect"
                );

                return;
            }

            const hasIfKeyword =
                /\bif\b/.test(studentAnswer);

            const hasPointsVariable =
                /\bpoints\b/.test(studentAnswer);

            const hasComparison =
                studentAnswer.includes(">= 10") ||
                studentAnswer.includes(">=10");

            const hasColon =
                studentAnswer.includes(":");

            const hasPrintStatement =
                studentAnswer.includes("print(");

            const hasCorrectMessage =
                studentAnswer.includes(
                    '"level complete!"'
                ) ||
                studentAnswer.includes(
                    "'level complete!'"
                );

            const answerIsCorrect =
                acceptedAnswers.includes(studentAnswer) ||
                (
                    hasIfKeyword &&
                    hasPointsVariable &&
                    hasComparison &&
                    hasColon &&
                    hasPrintStatement &&
                    hasCorrectMessage
                );

            if (answerIsCorrect) {
                conditionalFeedback.textContent =
                    "Correct! Your program checks the points and displays the message when the condition is true.";

                conditionalFeedback.classList.add(
                    "feedback-correct"
                );
            } else {
                conditionalFeedback.textContent =
                    'Not quite. Use if, check whether points >= 10, add a colon, and print "Level complete!".';

                conditionalFeedback.classList.add(
                    "feedback-incorrect"
                );
            }
        }
    );
}

if (
    conditionalPracticeInput &&
    showConditionalAnswerButton &&
    conditionalFeedback
) {
    showConditionalAnswerButton.addEventListener(
        "click",
        () => {
            conditionalPracticeInput.value =
                correctConditionalAnswer;

            conditionalFeedback.textContent =
                "Here is one correct answer. Notice the colon and the indentation before print().";

            conditionalFeedback.classList.remove(
                "feedback-correct",
                "feedback-incorrect"
            );

            conditionalFeedback.classList.add(
                "feedback-correct"
            );

            conditionalPracticeInput.focus();
        }
    );
}

/* ------------------------------
   Lesson 3 Practice Quiz
------------------------------ */

const lessonThreeQuiz =
    document.getElementById(
        "lesson-three-quiz"
    );

const lessonThreeQuizResult =
    document.getElementById(
        "lesson-three-quiz-result"
    );

const lessonThreeAnswers = {
    "lesson-three-question-1": "b",
    "lesson-three-question-2": "b",
    "lesson-three-question-3": "a",
    "lesson-three-question-4": "b"
};

if (
    lessonThreeQuiz &&
    lessonThreeQuizResult
) {
    lessonThreeQuiz.addEventListener(
        "submit",
        (event) => {
            event.preventDefault();

            let score = 0;
            let answeredQuestions = 0;

            Object.entries(
                lessonThreeAnswers
            ).forEach(
                ([questionName, correctAnswer]) => {
                    const selectedAnswer =
                        lessonThreeQuiz.querySelector(
                            `input[name="${questionName}"]:checked`
                        );

                    if (selectedAnswer) {
                        answeredQuestions++;

                        if (
                            selectedAnswer.value ===
                            correctAnswer
                        ) {
                            score++;
                        }
                    }
                }
            );

            lessonThreeQuizResult.classList.remove(
                "quiz-success",
                "quiz-warning"
            );

            if (
                answeredQuestions <
                Object.keys(
                    lessonThreeAnswers
                ).length
            ) {
                lessonThreeQuizResult.textContent =
                    "Please answer all four questions before checking your score.";

                lessonThreeQuizResult.classList.add(
                    "quiz-warning"
                );

                return;
            }

            if (score === 4) {
                lessonThreeQuizResult.textContent =
                    "4 out of 4 correct — excellent work!";

                lessonThreeQuizResult.classList.add(
                    "quiz-success"
                );
            } else if (score === 3) {
                lessonThreeQuizResult.textContent =
                    "3 out of 4 correct — great job! Review the question you missed.";

                lessonThreeQuizResult.classList.add(
                    "quiz-success"
                );
            } else if (score === 2) {
                lessonThreeQuizResult.textContent =
                    "2 out of 4 correct — good start. Review the conditional examples and try again.";

                lessonThreeQuizResult.classList.add(
                    "quiz-warning"
                );
            } else {
                lessonThreeQuizResult.textContent =
                    `${score} out of 4 correct — review if, elif, else, and comparison operators before trying again.`;

                lessonThreeQuizResult.classList.add(
                    "quiz-warning"
                );
            }
        }
    );
}

/* ======================================================
   PYTHON LESSON 4 — INTERACTIVE FEATURES
====================================================== */

/* ------------------------------
   For Loop Practice
------------------------------ */

const loopPracticeInput =
    document.getElementById(
        "loop-practice-input"
    );

const checkLoopAnswerButton =
    document.getElementById(
        "check-loop-answer"
    );

const showLoopAnswerButton =
    document.getElementById(
        "show-loop-answer"
    );

const loopFeedback =
    document.getElementById(
        "loop-feedback"
    );

const correctLoopAnswer =
`for number in range(4):
    print("I can use loops!")`;

function normalizeLoopCode(code) {
    return code
        .trim()
        .replace(/\r\n/g, "\n")
        .replace(/\t/g, "    ")
        .replace(/[ ]+\n/g, "\n")
        .replace(/\s+/g, " ")
        .replace(/\s*\(\s*/g, "(")
        .replace(/\s*\)\s*/g, ")")
        .replace(/\s*:\s*/g, ": ")
        .toLowerCase();
}

if (
    loopPracticeInput &&
    checkLoopAnswerButton &&
    loopFeedback
) {
    checkLoopAnswerButton.addEventListener(
        "click",
        () => {
            const studentAnswer =
                normalizeLoopCode(
                    loopPracticeInput.value
                );

            loopFeedback.classList.remove(
                "feedback-correct",
                "feedback-incorrect"
            );

            if (studentAnswer === "") {
                loopFeedback.textContent =
                    "Type your code before checking your answer.";

                loopFeedback.classList.add(
                    "feedback-incorrect"
                );

                return;
            }

            const hasForKeyword =
                /\bfor\b/.test(studentAnswer);

            const hasLoopVariable =
                /\bnumber\b/.test(studentAnswer) ||
                /\bi\b/.test(studentAnswer);

            const hasInKeyword =
                /\bin\b/.test(studentAnswer);

            const hasCorrectRange =
                studentAnswer.includes("range(4)");

            const hasColon =
                studentAnswer.includes(":");

            const hasPrintStatement =
                studentAnswer.includes("print(");

            const hasCorrectMessage =
                studentAnswer.includes(
                    '"i can use loops!"'
                ) ||
                studentAnswer.includes(
                    "'i can use loops!'"
                );

            const answerIsCorrect =
                hasForKeyword &&
                hasLoopVariable &&
                hasInKeyword &&
                hasCorrectRange &&
                hasColon &&
                hasPrintStatement &&
                hasCorrectMessage;

            if (answerIsCorrect) {
                loopFeedback.textContent =
                    "Correct! Your for loop repeats the message four times.";

                loopFeedback.classList.add(
                    "feedback-correct"
                );
            } else {
                loopFeedback.textContent =
                    'Not quite. Use a for loop with range(4), add a colon, and print "I can use loops!".';

                loopFeedback.classList.add(
                    "feedback-incorrect"
                );
            }
        }
    );
}

if (
    loopPracticeInput &&
    showLoopAnswerButton &&
    loopFeedback
) {
    showLoopAnswerButton.addEventListener(
        "click",
        () => {
            loopPracticeInput.value =
                correctLoopAnswer;

            loopFeedback.textContent =
                "Here is one correct answer. Notice the colon and the indentation before print().";

            loopFeedback.classList.remove(
                "feedback-correct",
                "feedback-incorrect"
            );

            loopFeedback.classList.add(
                "feedback-correct"
            );

            loopPracticeInput.focus();
        }
    );
}

/* ------------------------------
   Lesson 4 Practice Quiz
------------------------------ */

const lessonFourQuiz =
    document.getElementById(
        "lesson-four-quiz"
    );

const lessonFourQuizResult =
    document.getElementById(
        "lesson-four-quiz-result"
    );

const lessonFourAnswers = {
    "lesson-four-question-1": "a",
    "lesson-four-question-2": "b",
    "lesson-four-question-3": "b",
    "lesson-four-question-4": "a"
};

if (
    lessonFourQuiz &&
    lessonFourQuizResult
) {
    lessonFourQuiz.addEventListener(
        "submit",
        (event) => {
            event.preventDefault();

            let score = 0;
            let answeredQuestions = 0;

            Object.entries(
                lessonFourAnswers
            ).forEach(
                ([questionName, correctAnswer]) => {
                    const selectedAnswer =
                        lessonFourQuiz.querySelector(
                            `input[name="${questionName}"]:checked`
                        );

                    if (selectedAnswer) {
                        answeredQuestions++;

                        if (
                            selectedAnswer.value ===
                            correctAnswer
                        ) {
                            score++;
                        }
                    }
                }
            );

            lessonFourQuizResult.classList.remove(
                "quiz-success",
                "quiz-warning"
            );

            if (
                answeredQuestions <
                Object.keys(
                    lessonFourAnswers
                ).length
            ) {
                lessonFourQuizResult.textContent =
                    "Please answer all four questions before checking your score.";

                lessonFourQuizResult.classList.add(
                    "quiz-warning"
                );

                return;
            }

            if (score === 4) {
                lessonFourQuizResult.textContent =
                    "4 out of 4 correct — excellent work!";

                lessonFourQuizResult.classList.add(
                    "quiz-success"
                );
            } else if (score === 3) {
                lessonFourQuizResult.textContent =
                    "3 out of 4 correct — great job! Review the question you missed.";

                lessonFourQuizResult.classList.add(
                    "quiz-success"
                );
            } else if (score === 2) {
                lessonFourQuizResult.textContent =
                    "2 out of 4 correct — good start. Review the loop examples and try again.";

                lessonFourQuizResult.classList.add(
                    "quiz-warning"
                );
            } else {
                lessonFourQuizResult.textContent =
                    `${score} out of 4 correct — review for loops, while loops, and range() before trying again.`;

                lessonFourQuizResult.classList.add(
                    "quiz-warning"
                );
            }
        }
    );
}

/* ======================================================
   PYTHON LESSON 5 — INTERACTIVE FEATURES
====================================================== */

/* ------------------------------
   List Creation Practice
------------------------------ */

const listPracticeInput =
    document.getElementById(
        "list-practice-input"
    );

const checkListAnswerButton =
    document.getElementById(
        "check-list-answer"
    );

const showListAnswerButton =
    document.getElementById(
        "show-list-answer"
    );

const listFeedback =
    document.getElementById(
        "list-feedback"
    );

const correctListAnswer =
    'hobbies = ["coding", "drawing", "sports"]';

function normalizeListCode(code) {
    return code
        .trim()
        .replace(/\r\n/g, "\n")
        .replace(/\s+/g, " ")
        .replace(/\s*=\s*/g, "=")
        .replace(/\s*\[\s*/g, "[")
        .replace(/\s*\]\s*/g, "]")
        .replace(/\s*,\s*/g, ",")
        .toLowerCase();
}

if (
    listPracticeInput &&
    checkListAnswerButton &&
    listFeedback
) {
    checkListAnswerButton.addEventListener(
        "click",
        () => {
            const studentAnswer =
                normalizeListCode(
                    listPracticeInput.value
                );

            listFeedback.classList.remove(
                "feedback-correct",
                "feedback-incorrect"
            );

            if (studentAnswer === "") {
                listFeedback.textContent =
                    "Type your code before checking your answer.";

                listFeedback.classList.add(
                    "feedback-incorrect"
                );

                return;
            }

            const acceptedAnswers = [
                'hobbies=["coding","drawing","sports"]',
                "hobbies=['coding','drawing','sports']"
            ];

            const hasVariableName =
                studentAnswer.startsWith("hobbies=");

            const hasSquareBrackets =
                studentAnswer.includes("[") &&
                studentAnswer.includes("]");

            const hasCoding =
                studentAnswer.includes('"coding"') ||
                studentAnswer.includes("'coding'");

            const hasDrawing =
                studentAnswer.includes('"drawing"') ||
                studentAnswer.includes("'drawing'");

            const hasSports =
                studentAnswer.includes('"sports"') ||
                studentAnswer.includes("'sports'");

            const hasTwoCommas =
                (
                    studentAnswer.match(/,/g) || []
                ).length === 2;

            const answerIsCorrect =
                acceptedAnswers.includes(studentAnswer) ||
                (
                    hasVariableName &&
                    hasSquareBrackets &&
                    hasCoding &&
                    hasDrawing &&
                    hasSports &&
                    hasTwoCommas
                );

            if (answerIsCorrect) {
                listFeedback.textContent =
                    "Correct! You created a list containing three string items.";

                listFeedback.classList.add(
                    "feedback-correct"
                );
            } else {
                listFeedback.textContent =
                    'Not quite. Name the variable hobbies, use square brackets, and include "coding", "drawing", and "sports" separated by commas.';

                listFeedback.classList.add(
                    "feedback-incorrect"
                );
            }
        }
    );
}

if (
    listPracticeInput &&
    showListAnswerButton &&
    listFeedback
) {
    showListAnswerButton.addEventListener(
        "click",
        () => {
            listPracticeInput.value =
                correctListAnswer;

            listFeedback.textContent =
                "Here is one correct answer. Notice the square brackets, quotation marks, and commas.";

            listFeedback.classList.remove(
                "feedback-correct",
                "feedback-incorrect"
            );

            listFeedback.classList.add(
                "feedback-correct"
            );

            listPracticeInput.focus();
        }
    );
}

/* ------------------------------
   Lesson 5 Practice Quiz
------------------------------ */

const lessonFiveQuiz =
    document.getElementById(
        "lesson-five-quiz"
    );

const lessonFiveQuizResult =
    document.getElementById(
        "lesson-five-quiz-result"
    );

const lessonFiveAnswers = {
    "lesson-five-question-1": "b",
    "lesson-five-question-2": "a",
    "lesson-five-question-3": "c",
    "lesson-five-question-4": "a"
};

if (
    lessonFiveQuiz &&
    lessonFiveQuizResult
) {
    lessonFiveQuiz.addEventListener(
        "submit",
        (event) => {
            event.preventDefault();

            let score = 0;
            let answeredQuestions = 0;

            Object.entries(
                lessonFiveAnswers
            ).forEach(
                ([questionName, correctAnswer]) => {
                    const selectedAnswer =
                        lessonFiveQuiz.querySelector(
                            `input[name="${questionName}"]:checked`
                        );

                    if (selectedAnswer) {
                        answeredQuestions++;

                        if (
                            selectedAnswer.value ===
                            correctAnswer
                        ) {
                            score++;
                        }
                    }
                }
            );

            lessonFiveQuizResult.classList.remove(
                "quiz-success",
                "quiz-warning"
            );

            if (
                answeredQuestions <
                Object.keys(
                    lessonFiveAnswers
                ).length
            ) {
                lessonFiveQuizResult.textContent =
                    "Please answer all four questions before checking your score.";

                lessonFiveQuizResult.classList.add(
                    "quiz-warning"
                );

                return;
            }

            if (score === 4) {
                lessonFiveQuizResult.textContent =
                    "4 out of 4 correct — excellent work!";

                lessonFiveQuizResult.classList.add(
                    "quiz-success"
                );
            } else if (score === 3) {
                lessonFiveQuizResult.textContent =
                    "3 out of 4 correct — great job! Review the question you missed.";

                lessonFiveQuizResult.classList.add(
                    "quiz-success"
                );
            } else if (score === 2) {
                lessonFiveQuizResult.textContent =
                    "2 out of 4 correct — good start. Review indexes and append() before trying again.";

                lessonFiveQuizResult.classList.add(
                    "quiz-warning"
                );
            } else {
                lessonFiveQuizResult.textContent =
                    `${score} out of 4 correct — review list creation, indexes, append(), and loops before trying again.`;

                lessonFiveQuizResult.classList.add(
                    "quiz-warning"
                );
            }
        }
    );
}

/* ======================================================
   PYTHON LESSON 6 — INTERACTIVE FEATURES
====================================================== */

/* ------------------------------
   Function Creation Practice
------------------------------ */

const functionPracticeInput =
    document.getElementById(
        "function-practice-input"
    );

const checkFunctionAnswerButton =
    document.getElementById(
        "check-function-answer"
    );

const showFunctionAnswerButton =
    document.getElementById(
        "show-function-answer"
    );

const functionFeedback =
    document.getElementById(
        "function-feedback"
    );

const correctFunctionAnswer =
`def motivate():
    print("You can build this!")`;

function normalizeFunctionCode(code) {
    return code
        .trim()
        .replace(/\r\n/g, "\n")
        .replace(/\t/g, "    ")
        .replace(/[ ]+\n/g, "\n")
        .replace(/\n[ ]+/g, "\n")
        .replace(/\s+/g, " ")
        .replace(/\s*\(\s*/g, "(")
        .replace(/\s*\)\s*/g, ")")
        .replace(/\s*:\s*/g, ": ")
        .toLowerCase();
}

if (
    functionPracticeInput &&
    checkFunctionAnswerButton &&
    functionFeedback
) {
    checkFunctionAnswerButton.addEventListener(
        "click",
        () => {
            const originalAnswer =
                functionPracticeInput.value.trim();

            const studentAnswer =
                normalizeFunctionCode(
                    originalAnswer
                );

            functionFeedback.classList.remove(
                "feedback-correct",
                "feedback-incorrect"
            );

            if (studentAnswer === "") {
                functionFeedback.textContent =
                    "Type your code before checking your answer.";

                functionFeedback.classList.add(
                    "feedback-incorrect"
                );

                return;
            }

            const acceptedAnswers = [
                'def motivate(): print("you can build this!")',
                "def motivate(): print('you can build this!')"
            ];

            const lines =
                originalAnswer
                    .replace(/\r\n/g, "\n")
                    .split("\n");

            const firstLine =
                lines[0]
                    ? lines[0].trim().toLowerCase()
                    : "";

            const secondLine =
                lines[1]
                    ? lines[1]
                    : "";

            const hasDefinition =
                firstLine === "def motivate():";

            const hasIndentedSecondLine =
                /^( {4}|\t)/.test(secondLine);

            const hasPrintStatement =
                studentAnswer.includes("print(");

            const hasCorrectMessage =
                studentAnswer.includes(
                    '"you can build this!"'
                ) ||
                studentAnswer.includes(
                    "'you can build this!'"
                );

            const answerIsCorrect =
                acceptedAnswers.includes(studentAnswer) ||
                (
                    hasDefinition &&
                    hasIndentedSecondLine &&
                    hasPrintStatement &&
                    hasCorrectMessage
                );

            if (answerIsCorrect) {
                functionFeedback.textContent =
                    "Correct! You defined the motivate function and placed the print statement inside it.";

                functionFeedback.classList.add(
                    "feedback-correct"
                );
            } else if (
                hasDefinition &&
                hasPrintStatement &&
                hasCorrectMessage &&
                !hasIndentedSecondLine
            ) {
                functionFeedback.textContent =
                    "Almost correct. Indent the print statement so Python knows it belongs inside the function.";

                functionFeedback.classList.add(
                    "feedback-incorrect"
                );
            } else {
                functionFeedback.textContent =
                    'Not quite. Use def motivate(): and indent a print statement that displays "You can build this!".';

                functionFeedback.classList.add(
                    "feedback-incorrect"
                );
            }
        }
    );
}

if (
    functionPracticeInput &&
    showFunctionAnswerButton &&
    functionFeedback
) {
    showFunctionAnswerButton.addEventListener(
        "click",
        () => {
            functionPracticeInput.value =
                correctFunctionAnswer;

            functionFeedback.textContent =
                "Here is one correct answer. Notice the parentheses, colon, and indentation.";

            functionFeedback.classList.remove(
                "feedback-correct",
                "feedback-incorrect"
            );

            functionFeedback.classList.add(
                "feedback-correct"
            );

            functionPracticeInput.focus();
        }
    );
}

/* ------------------------------
   Lesson 6 Practice Quiz
------------------------------ */

const lessonSixQuiz =
    document.getElementById(
        "lesson-six-quiz"
    );

const lessonSixQuizResult =
    document.getElementById(
        "lesson-six-quiz-result"
    );

const lessonSixAnswers = {
    "lesson-six-question-1": "b",
    "lesson-six-question-2": "a",
    "lesson-six-question-3": "a",
    "lesson-six-question-4": "b"
};

if (
    lessonSixQuiz &&
    lessonSixQuizResult
) {
    lessonSixQuiz.addEventListener(
        "submit",
        (event) => {
            event.preventDefault();

            let score = 0;
            let answeredQuestions = 0;

            Object.entries(
                lessonSixAnswers
            ).forEach(
                ([questionName, correctAnswer]) => {
                    const selectedAnswer =
                        lessonSixQuiz.querySelector(
                            `input[name="${questionName}"]:checked`
                        );

                    if (selectedAnswer) {
                        answeredQuestions++;

                        if (
                            selectedAnswer.value ===
                            correctAnswer
                        ) {
                            score++;
                        }
                    }
                }
            );

            lessonSixQuizResult.classList.remove(
                "quiz-success",
                "quiz-warning"
            );

            if (
                answeredQuestions <
                Object.keys(
                    lessonSixAnswers
                ).length
            ) {
                lessonSixQuizResult.textContent =
                    "Please answer all four questions before checking your score.";

                lessonSixQuizResult.classList.add(
                    "quiz-warning"
                );

                return;
            }

            if (score === 4) {
                lessonSixQuizResult.textContent =
                    "4 out of 4 correct — excellent work!";

                lessonSixQuizResult.classList.add(
                    "quiz-success"
                );
            } else if (score === 3) {
                lessonSixQuizResult.textContent =
                    "3 out of 4 correct — great job! Review the question you missed.";

                lessonSixQuizResult.classList.add(
                    "quiz-success"
                );
            } else if (score === 2) {
                lessonSixQuizResult.textContent =
                    "2 out of 4 correct — good start. Review function definitions, calls, and parameters.";

                lessonSixQuizResult.classList.add(
                    "quiz-warning"
                );
            } else {
                lessonSixQuizResult.textContent =
                    `${score} out of 4 correct — review the function examples and try again.`;

                lessonSixQuizResult.classList.add(
                    "quiz-warning"
                );
            }
        }
    );
}

/* ======================================================
   SCRATCH LESSON 1 — INTERACTIVE FEATURES
====================================================== */

/* ------------------------------
   Block Order Practice
------------------------------ */

const scratchOrderInput =
    document.getElementById(
        "scratch-order-input"
    );

const checkScratchOrderButton =
    document.getElementById(
        "check-scratch-order"
    );

const showScratchOrderButton =
    document.getElementById(
        "show-scratch-order"
    );

const scratchOrderFeedback =
    document.getElementById(
        "scratch-order-feedback"
    );

const correctScratchOrder =
    "2, 1, 3";

function normalizeScratchOrder(answer) {
    return answer
        .trim()
        .replace(/\s+/g, "")
        .replace(/-/g, ",");
}

if (
    scratchOrderInput &&
    checkScratchOrderButton &&
    scratchOrderFeedback
) {
    checkScratchOrderButton.addEventListener(
        "click",
        () => {
            const studentAnswer =
                normalizeScratchOrder(
                    scratchOrderInput.value
                );

            scratchOrderFeedback.classList.remove(
                "feedback-correct",
                "feedback-incorrect"
            );

            if (studentAnswer === "") {
                scratchOrderFeedback.textContent =
                    "Type the block order before checking your answer.";

                scratchOrderFeedback.classList.add(
                    "feedback-incorrect"
                );

                return;
            }

            const acceptedAnswers = [
                "2,1,3",
                "213"
            ];

            if (
                acceptedAnswers.includes(
                    studentAnswer
                )
            ) {
                scratchOrderFeedback.textContent =
                    "Correct! The green flag starts the script, the sprite moves, and then it says the message.";

                scratchOrderFeedback.classList.add(
                    "feedback-correct"
                );
            } else {
                scratchOrderFeedback.textContent =
                    "Not quite. Begin with the event block, then move the sprite, and finish with the speech block.";

                scratchOrderFeedback.classList.add(
                    "feedback-incorrect"
                );
            }
        }
    );
}

if (
    scratchOrderInput &&
    showScratchOrderButton &&
    scratchOrderFeedback
) {
    showScratchOrderButton.addEventListener(
        "click",
        () => {
            scratchOrderInput.value =
                correctScratchOrder;

            scratchOrderFeedback.textContent =
                "The correct order is 2, 1, 3. A Scratch script usually begins with an event block.";

            scratchOrderFeedback.classList.remove(
                "feedback-correct",
                "feedback-incorrect"
            );

            scratchOrderFeedback.classList.add(
                "feedback-correct"
            );

            scratchOrderInput.focus();
        }
    );
}

/* ------------------------------
   Scratch Lesson 1 Practice Quiz
------------------------------ */

const scratchLessonOneQuiz =
    document.getElementById(
        "scratch-lesson-one-quiz"
    );

const scratchLessonOneQuizResult =
    document.getElementById(
        "scratch-lesson-one-quiz-result"
    );

const scratchLessonOneAnswers = {
    "scratch-one-question-1": "a",
    "scratch-one-question-2": "b",
    "scratch-one-question-3": "a",
    "scratch-one-question-4": "b"
};

if (
    scratchLessonOneQuiz &&
    scratchLessonOneQuizResult
) {
    scratchLessonOneQuiz.addEventListener(
        "submit",
        (event) => {
            event.preventDefault();

            let score = 0;
            let answeredQuestions = 0;

            Object.entries(
                scratchLessonOneAnswers
            ).forEach(
                ([questionName, correctAnswer]) => {
                    const selectedAnswer =
                        scratchLessonOneQuiz.querySelector(
                            `input[name="${questionName}"]:checked`
                        );

                    if (selectedAnswer) {
                        answeredQuestions++;

                        if (
                            selectedAnswer.value ===
                            correctAnswer
                        ) {
                            score++;
                        }
                    }
                }
            );

            scratchLessonOneQuizResult.classList.remove(
                "quiz-success",
                "quiz-warning"
            );

            if (
                answeredQuestions <
                Object.keys(
                    scratchLessonOneAnswers
                ).length
            ) {
                scratchLessonOneQuizResult.textContent =
                    "Please answer all four questions before checking your score.";

                scratchLessonOneQuizResult.classList.add(
                    "quiz-warning"
                );

                return;
            }

            if (score === 4) {
                scratchLessonOneQuizResult.textContent =
                    "4 out of 4 correct — excellent work!";

                scratchLessonOneQuizResult.classList.add(
                    "quiz-success"
                );
            } else if (score === 3) {
                scratchLessonOneQuizResult.textContent =
                    "3 out of 4 correct — great job! Review the question you missed.";

                scratchLessonOneQuizResult.classList.add(
                    "quiz-success"
                );
            } else if (score === 2) {
                scratchLessonOneQuizResult.textContent =
                    "2 out of 4 correct — good start. Review sprites, events, the stage, and costumes.";

                scratchLessonOneQuizResult.classList.add(
                    "quiz-warning"
                );
            } else {
                scratchLessonOneQuizResult.textContent =
                    `${score} out of 4 correct — review the Scratch examples and try again.`;

                scratchLessonOneQuizResult.classList.add(
                    "quiz-warning"
                );
            }
        }
    );
}

/* ======================================================
   SCRATCH LESSON 2 — INTERACTIVE FEATURES
====================================================== */

/* ------------------------------
   Clicker Game Block Order
------------------------------ */

const scratchTwoOrderInput =
    document.getElementById(
        "scratch-two-order-input"
    );

const checkScratchTwoOrderButton =
    document.getElementById(
        "check-scratch-two-order"
    );

const showScratchTwoOrderButton =
    document.getElementById(
        "show-scratch-two-order"
    );

const scratchTwoOrderFeedback =
    document.getElementById(
        "scratch-two-order-feedback"
    );

const correctScratchTwoOrder =
    "2, 3, 4, 1";

function normalizeScratchTwoOrder(answer) {
    return answer
        .trim()
        .replace(/\s+/g, "")
        .replace(/-/g, ",");
}

if (
    scratchTwoOrderInput &&
    checkScratchTwoOrderButton &&
    scratchTwoOrderFeedback
) {
    checkScratchTwoOrderButton.addEventListener(
        "click",
        () => {
            const studentAnswer =
                normalizeScratchTwoOrder(
                    scratchTwoOrderInput.value
                );

            scratchTwoOrderFeedback.classList.remove(
                "feedback-correct",
                "feedback-incorrect"
            );

            if (studentAnswer === "") {
                scratchTwoOrderFeedback.textContent =
                    "Type the block order before checking your answer.";

                scratchTwoOrderFeedback.classList.add(
                    "feedback-incorrect"
                );

                return;
            }

            const acceptedAnswers = [
                "2,3,4,1",
                "2341"
            ];

            if (
                acceptedAnswers.includes(
                    studentAnswer
                )
            ) {
                scratchTwoOrderFeedback.textContent =
                    "Correct! The click event starts the script, the score increases, the sound plays, and then the target moves.";

                scratchTwoOrderFeedback.classList.add(
                    "feedback-correct"
                );
            } else {
                scratchTwoOrderFeedback.textContent =
                    "Not quite. Begin with the click event, award the point, play the sound, and then move the target.";

                scratchTwoOrderFeedback.classList.add(
                    "feedback-incorrect"
                );
            }
        }
    );
}

if (
    scratchTwoOrderInput &&
    showScratchTwoOrderButton &&
    scratchTwoOrderFeedback
) {
    showScratchTwoOrderButton.addEventListener(
        "click",
        () => {
            scratchTwoOrderInput.value =
                correctScratchTwoOrder;

            scratchTwoOrderFeedback.textContent =
                "The correct order is 2, 3, 4, 1. The event begins the script before the game actions run.";

            scratchTwoOrderFeedback.classList.remove(
                "feedback-correct",
                "feedback-incorrect"
            );

            scratchTwoOrderFeedback.classList.add(
                "feedback-correct"
            );

            scratchTwoOrderInput.focus();
        }
    );
}

/* ------------------------------
   Scratch Lesson 2 Practice Quiz
------------------------------ */

const scratchLessonTwoQuiz =
    document.getElementById(
        "scratch-two-quiz"
    );

const scratchLessonTwoQuizResult =
    document.getElementById(
        "scratch-two-quiz-result"
    );

const scratchLessonTwoAnswers = {
    "scratch-two-question-1": "b",
    "scratch-two-question-2": "a",
    "scratch-two-question-3": "c",
    "scratch-two-question-4": "a"
};

if (
    scratchLessonTwoQuiz &&
    scratchLessonTwoQuizResult
) {
    scratchLessonTwoQuiz.addEventListener(
        "submit",
        (event) => {
            event.preventDefault();

            let score = 0;
            let answeredQuestions = 0;

            Object.entries(
                scratchLessonTwoAnswers
            ).forEach(
                ([questionName, correctAnswer]) => {
                    const selectedAnswer =
                        scratchLessonTwoQuiz.querySelector(
                            `input[name="${questionName}"]:checked`
                        );

                    if (selectedAnswer) {
                        answeredQuestions++;

                        if (
                            selectedAnswer.value ===
                            correctAnswer
                        ) {
                            score++;
                        }
                    }
                }
            );

            scratchLessonTwoQuizResult.classList.remove(
                "quiz-success",
                "quiz-warning"
            );

            if (
                answeredQuestions <
                Object.keys(
                    scratchLessonTwoAnswers
                ).length
            ) {
                scratchLessonTwoQuizResult.textContent =
                    "Please answer all four questions before checking your score.";

                scratchLessonTwoQuizResult.classList.add(
                    "quiz-warning"
                );

                return;
            }

            if (score === 4) {
                scratchLessonTwoQuizResult.textContent =
                    "4 out of 4 correct — excellent work!";

                scratchLessonTwoQuizResult.classList.add(
                    "quiz-success"
                );
            } else if (score === 3) {
                scratchLessonTwoQuizResult.textContent =
                    "3 out of 4 correct — great job! Review the question you missed.";

                scratchLessonTwoQuizResult.classList.add(
                    "quiz-success"
                );
            } else if (score === 2) {
                scratchLessonTwoQuizResult.textContent =
                    "2 out of 4 correct — good start. Review click events, scoring, and target movement.";

                scratchLessonTwoQuizResult.classList.add(
                    "quiz-warning"
                );
            } else {
                scratchLessonTwoQuizResult.textContent =
                    `${score} out of 4 correct — review the clicker-game examples and try again.`;

                scratchLessonTwoQuizResult.classList.add(
                    "quiz-warning"
                );
            }
        }
    );
}

/* ======================================================
   SCRATCH LESSON 3 — INTERACTIVE FEATURES
====================================================== */

/* ------------------------------
   Story Sequence Activity
------------------------------ */

const scratchThreeOrderInput =
    document.getElementById(
        "scratch-three-order-input"
    );

const checkScratchThreeOrderButton =
    document.getElementById(
        "check-scratch-three-order"
    );

const showScratchThreeOrderButton =
    document.getElementById(
        "show-scratch-three-order"
    );

const scratchThreeOrderFeedback =
    document.getElementById(
        "scratch-three-order-feedback"
    );

const correctScratchThreeOrder =
    "2, 3, 4, 1";

function normalizeScratchThreeOrder(answer) {
    return answer
        .trim()
        .replace(/\s+/g, "")
        .replace(/-/g, ",");
}

if (
    scratchThreeOrderInput &&
    checkScratchThreeOrderButton &&
    scratchThreeOrderFeedback
) {
    checkScratchThreeOrderButton.addEventListener(
        "click",
        () => {
            const studentAnswer =
                normalizeScratchThreeOrder(
                    scratchThreeOrderInput.value
                );

            scratchThreeOrderFeedback.classList.remove(
                "feedback-correct",
                "feedback-incorrect"
            );

            if (studentAnswer === "") {
                scratchThreeOrderFeedback.textContent =
                    "Type the story order before checking your answer.";

                scratchThreeOrderFeedback.classList.add(
                    "feedback-incorrect"
                );

                return;
            }

            const acceptedAnswers = [
                "2,3,4,1",
                "2341"
            ];

            if (
                acceptedAnswers.includes(
                    studentAnswer
                )
            ) {
                scratchThreeOrderFeedback.textContent =
                    "Correct! The broadcast begins the scene, the backdrop changes, the character appears, and then the dialogue begins.";

                scratchThreeOrderFeedback.classList.add(
                    "feedback-correct"
                );
            } else {
                scratchThreeOrderFeedback.textContent =
                    "Not quite. Begin by receiving the broadcast, prepare the setting, position the character, and then start the dialogue.";

                scratchThreeOrderFeedback.classList.add(
                    "feedback-incorrect"
                );
            }
        }
    );
}

if (
    scratchThreeOrderInput &&
    showScratchThreeOrderButton &&
    scratchThreeOrderFeedback
) {
    showScratchThreeOrderButton.addEventListener(
        "click",
        () => {
            scratchThreeOrderInput.value =
                correctScratchThreeOrder;

            scratchThreeOrderFeedback.textContent =
                "The correct order is 2, 3, 4, 1. The scene must be prepared before the character begins speaking.";

            scratchThreeOrderFeedback.classList.remove(
                "feedback-correct",
                "feedback-incorrect"
            );

            scratchThreeOrderFeedback.classList.add(
                "feedback-correct"
            );

            scratchThreeOrderInput.focus();
        }
    );
}

/* ------------------------------
   Scratch Lesson 3 Practice Quiz
------------------------------ */

const scratchLessonThreeQuiz =
    document.getElementById(
        "scratch-three-quiz"
    );

const scratchLessonThreeQuizResult =
    document.getElementById(
        "scratch-three-quiz-result"
    );

const scratchLessonThreeAnswers = {
    "scratch-three-question-1": "a",
    "scratch-three-question-2": "b",
    "scratch-three-question-3": "c",
    "scratch-three-question-4": "b"
};

if (
    scratchLessonThreeQuiz &&
    scratchLessonThreeQuizResult
) {
    scratchLessonThreeQuiz.addEventListener(
        "submit",
        (event) => {
            event.preventDefault();

            let score = 0;
            let answeredQuestions = 0;

            Object.entries(
                scratchLessonThreeAnswers
            ).forEach(
                ([questionName, correctAnswer]) => {
                    const selectedAnswer =
                        scratchLessonThreeQuiz.querySelector(
                            `input[name="${questionName}"]:checked`
                        );

                    if (selectedAnswer) {
                        answeredQuestions++;

                        if (
                            selectedAnswer.value ===
                            correctAnswer
                        ) {
                            score++;
                        }
                    }
                }
            );

            scratchLessonThreeQuizResult.classList.remove(
                "quiz-success",
                "quiz-warning"
            );

            if (
                answeredQuestions <
                Object.keys(
                    scratchLessonThreeAnswers
                ).length
            ) {
                scratchLessonThreeQuizResult.textContent =
                    "Please answer all four questions before checking your score.";

                scratchLessonThreeQuizResult.classList.add(
                    "quiz-warning"
                );

                return;
            }

            if (score === 4) {
                scratchLessonThreeQuizResult.textContent =
                    "4 out of 4 correct — excellent work!";

                scratchLessonThreeQuizResult.classList.add(
                    "quiz-success"
                );
            } else if (score === 3) {
                scratchLessonThreeQuizResult.textContent =
                    "3 out of 4 correct — great job! Review the question you missed.";

                scratchLessonThreeQuizResult.classList.add(
                    "quiz-success"
                );
            } else if (score === 2) {
                scratchLessonThreeQuizResult.textContent =
                    "2 out of 4 correct — good start. Review backdrops, broadcasts, timing, and story structure.";

                scratchLessonThreeQuizResult.classList.add(
                    "quiz-warning"
                );
            } else {
                scratchLessonThreeQuizResult.textContent =
                    `${score} out of 4 correct — review the story examples and try again.`;

                scratchLessonThreeQuizResult.classList.add(
                    "quiz-warning"
                );
            }
        }
    );
}

/* ======================================================
   RHINO SURVIVAL — INTERACTIVE PROJECT
====================================================== */

const rhinoGameScreen =
    document.getElementById("rhino-game-screen");

const rhinoStoryHeading =
    document.getElementById("rhino-story-heading");

const rhinoStoryText =
    document.getElementById("rhino-story-text");

const rhinoChoiceButtons =
    document.getElementById("rhino-choice-buttons");

const rhinoGameResult =
    document.getElementById("rhino-game-result");

const startRhinoGameButton =
    document.getElementById("start-rhino-game");

const resetRhinoGameButton =
    document.getElementById("reset-rhino-game");

const copyRhinoCodeButton =
    document.getElementById("copy-rhino-code");

const rhinoPythonCode =
    document.getElementById("rhino-python-code");

const rhinoPoachers = [
    "Sniper",
    "Bombers",
    "K. Danny",
    "John Cena"
];

function chooseRandomRhinoPoacher() {
    const randomIndex =
        Math.floor(
            Math.random() * rhinoPoachers.length
        );

    return rhinoPoachers[randomIndex];
}

function clearRhinoScreenClasses() {
    if (!rhinoGameScreen) {
        return;
    }

    rhinoGameScreen.classList.remove(
        "rhino-screen-running",
        "rhino-screen-safe",
        "rhino-screen-caught"
    );
}

function setRhinoChoices(choices) {
    if (!rhinoChoiceButtons) {
        return;
    }

    rhinoChoiceButtons.innerHTML = "";

    choices.forEach((choice) => {
        const button =
            document.createElement("button");

        button.type = "button";
        button.className =
            "rhino-choice-button";

        if (choice.primary) {
            button.classList.add(
                "primary-choice"
            );
        }

        button.textContent =
            choice.label;

        button.addEventListener(
            "click",
            choice.action
        );

        rhinoChoiceButtons.appendChild(
            button
        );
    });
}

function beginRhinoAdventure() {
    if (
        !rhinoStoryHeading ||
        !rhinoStoryText ||
        !rhinoGameResult
    ) {
        return;
    }

    clearRhinoScreenClasses();

    rhinoStoryHeading.textContent =
        "Poachers are approaching.";

    rhinoStoryText.textContent =
        "You hear movement nearby. You need to make a decision quickly. Will you run through the rainforest or hide?";

    rhinoGameResult.textContent = "";

    rhinoGameResult.classList.remove(
        "rhino-result-success",
        "rhino-result-warning"
    );

    setRhinoChoices([
        {
            label: "Run",
            primary: true,
            action: () => {
                makeFirstRhinoChoice("run");
            }
        },
        {
            label: "Hide",
            primary: false,
            action: () => {
                makeFirstRhinoChoice("hide");
            }
        }
    ]);
}

function makeFirstRhinoChoice(choice) {
    if (
        !rhinoStoryHeading ||
        !rhinoStoryText ||
        !rhinoGameResult
    ) {
        return;
    }

    const rhinoEscapes =
        Math.random() >= 0.5;

    clearRhinoScreenClasses();

    if (choice === "run") {
        rhinoGameScreen.classList.add(
            "rhino-screen-running"
        );
    }

    if (!rhinoEscapes) {
        const selectedPoacher =
            chooseRandomRhinoPoacher();

        rhinoGameScreen.classList.add(
            "rhino-screen-caught"
        );

        rhinoStoryHeading.textContent =
            "The poacher found you.";

        rhinoStoryText.textContent =
            `${selectedPoacher} catches the rhino before it can reach safety.`;

        rhinoGameResult.textContent =
            "The rhino did not survive this attempt. Try another path.";

        rhinoGameResult.classList.remove(
            "rhino-result-success"
        );

        rhinoGameResult.classList.add(
            "rhino-result-warning"
        );

        setRhinoChoices([
            {
                label: "Try Again",
                primary: true,
                action: beginRhinoAdventure
            }
        ]);

        return;
    }

    rhinoGameScreen.classList.add(
        "rhino-screen-safe"
    );

    rhinoStoryHeading.textContent =
        "You found Banana Bo!";

    rhinoStoryText.textContent =
        "Banana Bo knows a possible route to safety. Should you travel with him to the river, or hide again?";

    rhinoGameResult.textContent =
        choice === "run"
            ? "Running worked this time."
            : "Your hiding place kept you safe.";

    rhinoGameResult.classList.remove(
        "rhino-result-warning"
    );

    rhinoGameResult.classList.add(
        "rhino-result-success"
    );

    setRhinoChoices([
        {
            label: "Go to the River",
            primary: true,
            action: () => {
                finishRhinoAdventure("river");
            }
        },
        {
            label: "Hide Again",
            primary: false,
            action: () => {
                finishRhinoAdventure("hide");
            }
        }
    ]);
}

function finishRhinoAdventure(choice) {
    if (
        !rhinoStoryHeading ||
        !rhinoStoryText ||
        !rhinoGameResult
    ) {
        return;
    }

    clearRhinoScreenClasses();

    if (choice === "river") {
        rhinoGameScreen.classList.add(
            "rhino-screen-safe"
        );

        rhinoStoryHeading.textContent =
            "You reached safety!";

        rhinoStoryText.textContent =
            "The rhino travels to the river with Banana Bo and escapes the poachers.";

        rhinoGameResult.textContent =
            "YOU SURVIVED! The rhino completed the journey.";

        rhinoGameResult.classList.remove(
            "rhino-result-warning"
        );

        rhinoGameResult.classList.add(
            "rhino-result-success"
        );
    } else {
        const selectedPoacher =
            chooseRandomRhinoPoacher();

        rhinoGameScreen.classList.add(
            "rhino-screen-caught"
        );

        rhinoStoryHeading.textContent =
            "The hiding place was discovered.";

        rhinoStoryText.textContent =
            `${selectedPoacher} finds the rhino and sends it to the zoo.`;

        rhinoGameResult.textContent =
            "The rhino escaped the immediate danger but did not remain free.";

        rhinoGameResult.classList.remove(
            "rhino-result-success"
        );

        rhinoGameResult.classList.add(
            "rhino-result-warning"
        );
    }

    setRhinoChoices([
        {
            label: "Play Again",
            primary: true,
            action: beginRhinoAdventure
        }
    ]);
}

function resetRhinoAdventure() {
    if (
        !rhinoStoryHeading ||
        !rhinoStoryText ||
        !rhinoGameResult
    ) {
        return;
    }

    clearRhinoScreenClasses();

    rhinoStoryHeading.textContent =
        "Your journey is about to begin.";

    rhinoStoryText.textContent =
        "You are a rhino living in the rainforest. Poachers are nearby, and you must make careful choices to reach safety.";

    rhinoGameResult.textContent = "";

    rhinoGameResult.classList.remove(
        "rhino-result-success",
        "rhino-result-warning"
    );

    setRhinoChoices([
        {
            label: "Start Game",
            primary: true,
            action: beginRhinoAdventure
        }
    ]);
}

if (startRhinoGameButton) {
    startRhinoGameButton.addEventListener(
        "click",
        beginRhinoAdventure
    );
}

if (resetRhinoGameButton) {
    resetRhinoGameButton.addEventListener(
        "click",
        resetRhinoAdventure
    );
}

if (
    copyRhinoCodeButton &&
    rhinoPythonCode
) {
    copyRhinoCodeButton.addEventListener(
        "click",
        async () => {
            const codeText =
                rhinoPythonCode.textContent;

            try {
                await navigator.clipboard.writeText(
                    codeText
                );

                copyRhinoCodeButton.textContent =
                    "Code Copied ✓";
            } catch (error) {
                copyRhinoCodeButton.textContent =
                    "Select and Copy Code";
            }

            window.setTimeout(() => {
                copyRhinoCodeButton.textContent =
                    "Copy Code";
            }, 2200);
        }
    );
}