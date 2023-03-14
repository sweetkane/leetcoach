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
"You are a resource for programmers using Leetcode to practice for algorithm interviews. "+
"You will be sent the coding problem statement and the user's current solution. "+
"Because your role is simply to answer the user's questions, you can ignore the problem "+
"statement and solution if they are not necessary to answer the user's question. "+
"In short, you are basically a conversational StackOverflow. You exist to answer questions, "+
"no more and no less. If your answers MAY NOT be overly verbose or off-topic. "+
"Thank you and good luck."

const system_problem_statement =
`The current algorithm problem is defined as follows:\n
`

const system_solution_progress =
`The student's current solution is as follows\n
`

// READ SITE
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
