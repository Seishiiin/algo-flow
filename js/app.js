import { savePseudocode, loadPseudocode } from "./storage.js";
import { updateLineNumbers, synchronizeScroll } from "./ui.js";
import { executePseudocode } from "./execution.js";

document.getElementById("exportButton").addEventListener("click", exportPseudocode);
document.getElementById("importFileInput").addEventListener("change", importPseudocode);

function exportPseudocode() {
    const pseudocode = document.getElementById("pseudocode").value;
    let fileName = document.getElementById("fileName").value.trim();
    localStorage.setItem("savedPseudocode", pseudocode);
    localStorage.setItem("fileName", fileName);

    if (!fileName) {
        const now = new Date();
        fileName = `pseudocode_${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}_${String(now.getHours()).padStart(2, "0")}-${String(now.getMinutes()).padStart(2, "0")}-${String(now.getSeconds()).padStart(2, "0")}`;
        document.getElementById("fileName").value = fileName;
    }

    fileName = fileName.replace(/[^a-zA-Z0-9-_]/g, "");

    if (!fileName.endsWith(".algof")) {
        fileName += ".algof";
    }

    const blob = new Blob([pseudocode], { type: "text/plain" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = fileName;
    a.click();
    URL.revokeObjectURL(a.href);
}


function importPseudocode(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById("pseudocode").value = e.target.result;
            updateLineNumbers();
            savePseudocode();
        };
        reader.readAsText(file);
    }
}

loadPseudocode();
updateLineNumbers();

document.getElementById("pseudocode").addEventListener("input", () => {
    savePseudocode();
    updateLineNumbers();
});

document.getElementById("pseudocode").addEventListener("scroll", synchronizeScroll);
document.getElementById("lineNumber").addEventListener("scroll", synchronizeScroll);

document.getElementById("executeButton").addEventListener("click", () => {
    executePseudocode();
    savePseudocode();
});