//////////// messages for "api/v1/chat/completions" //////////////
class chatmessages {
    constructor() {
        this.isnull = true;
    }
    init() {
        this.isnull = false;
        this.problem_statement = system_problem_statement + get_problem_text();
        this.solution_progress = null;
        this.messages = [
            {"role": "system", "content": system_intro},
            {"role": "system", "content": this.problem_statement},
            // {"role": "system", "content": this.solution_progress}
        ]
    }

    add_user_message(message) {
        this.messages.push({"role": "user", "content": message})
    }

    add_assistant_message(message) {
        this.messages.push({"role": "assistant", "content": message})
    }

    update_solution_progress() {
        const new_progress = system_solution_progress + get_solution_text();
        if (new_progress != this.solution_progress) {
            this.solution_progress = new_progress;
            this.messages.push({"role": "system", "content": this.solution_progress});
            return true;
        }
        else return false;
    }
}

const system_intro =
`You are a highly knowledgeable senior software engineer from Google
who gives private lessons on algorithm interview questions. You are an
expert on all topics related to the coding interview. Your job
is to CONCISELY guide the student in the problem they're working on without ever just
giving away the answer. The user you will talk to is the student."
`

const system_problem_statement =
`The current algorithm question is defined as follows:\n
`

const system_solution_progress =
`The student's current solution is as follows\n
`

// READ SITE
const problemTextSelector = "#qd-content > div.h-full.flex-col.ssg__qd-splitter-primary-w > div > div > div > div.flex.h-full.w-full.overflow-y-auto > div > div > div:nth-child(3) > div"
const solutionTextSelector = "#editor > div.flex.flex-1.flex-col.overflow-hidden > div.flex-1.overflow-hidden > div > div > div.overflow-guard > div.monaco-scrollable-element.editor-scrollable.vs-dark > div.lines-content.monaco-editor-background > div.view-lines.monaco-mouse-cursor-text"
const solutionTextSelector2 = "#editor > div.flex.flex-1.flex-col.overflow-hidden > div.flex-1.overflow-hidden > div > div > div.overflow-guard > div.monaco-scrollable-element.editor-scrollable.vs > div.lines-content.monaco-editor-background > div.view-lines.monaco-mouse-cursor-text"

function get_problem_text() {
    const problemTextDiv = document.querySelector(problemTextSelector);
    let textList = [];
    getText(problemTextDiv, textList, false);
    const textString = textList.join('');
    return textString;
}

function get_solution_text() {
    let solutionTextDiv = document.querySelector(solutionTextSelector);
    if (solutionTextDiv === null) {
        solutionTextDiv = document.querySelector(solutionTextSelector2);
    }
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
