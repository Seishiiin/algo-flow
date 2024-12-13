export function updateLineNumbers() {
    const pseudocodeArea = document.getElementById("pseudocode");
    const lineNumberArea = document.getElementById("lineNumber");
    const lines = pseudocodeArea.value.split("\n").length;
    let lineNumbers = "";
    for (let i = 1; i <= lines; i++) {
        lineNumbers += i + ".\n";
    }
    lineNumberArea.value = lineNumbers;
}

export function synchronizeScroll() {
    const pseudocodeArea = document.getElementById("pseudocode");
    const lineNumberArea = document.getElementById("lineNumber");
    lineNumberArea.scrollTop = pseudocodeArea.scrollTop;
}