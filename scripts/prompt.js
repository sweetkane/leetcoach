let current_prompt = null;

function get_prompt() {
    return current_prompt;
}

function update_prompt(newText, type) {
    if (current_prompt === null) {
        current_prompt = initialize_prompt();
    }
    if (type === "student") {
        current_prompt += newText + prompt_5;
    }
    if (type === "coach") {
        current_prompt += newText + prompt_4;
    }

}

function initialize_prompt() {
    const problemText = get_problem_text();
    const solutionText = get_solution_text();
    const prompt =
    prompt_1 + problemText + prompt_2 + solutionText
    + prompt_3 + prompt_4;
    return prompt;
}


// PROMPT TEMPLATE

let prompt_1 =
        "Consider a senior software engineer at Google who gives "
    + "private lessons on algorithm interview questions. "
    + "The teacher's job is to guide the student without giving "
    + "away the answer unless specifically asked to do so.\n\n"
    + "The student is currently working on a coding question "
    + "defined as follows:\n\n";

let prompt_2 =
        "\nEND OF PROBLEM DEFINITION.\n"
    + "The student's current progress is as follows:\n\n";

let prompt_3 =
        "\nEND OF STUDENT SOLUTION.\n"
    + "The following is the conversation between teacher and student."

let prompt_4 =
    "\n\nSTUDENT:\n";

let prompt_5 =
    "\n\nTEACHER:\n";



// READ SITE
const problemTextSelector = "#qd-content > div.h-full.flex-col.ssg__qd-splitter-primary-w > div > div > div > div.flex.h-full.w-full.overflow-y-auto > div > div > div:nth-child(3) > div"
const solutionTextSelector = "#editor > div.flex.flex-1.flex-col.overflow-hidden > div.flex-1.overflow-hidden > div > div > div.overflow-guard > div.monaco-scrollable-element.editor-scrollable.vs-dark > div.lines-content.monaco-editor-background > div.view-lines.monaco-mouse-cursor-text"

function get_problem_text() {
    const problemTextDiv = document.querySelector(problemTextSelector);
    let textList = [];
    getText(problemTextDiv, textList, false);
    const textString = textList.join('');
    return textString;
}

function get_solution_text() {
    const solutionTextDiv = document.querySelector(solutionTextSelector);
    let textList = [];
    getText(solutionTextDiv, textList, true);
    const textString = textList.join('');
    return textString;
}

function getText(node, accumulator, isTop) {
    if (node.nodeType === 3) { // 3 == text node
        let text = node.nodeValue;
        accumulator.push(text);
    }
    else {
        for (let child of node.childNodes) {
            getText(child, accumulator, false);
            if (isTop) {
                accumulator.push("\n");
            }
        }
    }
}
