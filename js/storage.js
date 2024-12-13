export function savePseudocode() {
    const pseudocode = document.getElementById("pseudocode").value;
    const fileName = document.getElementById("fileName").value.trim();
    localStorage.setItem("savedPseudocode", pseudocode);
    localStorage.setItem("fileName", fileName);
}

export function loadPseudocode() {
    const savedPseudocode = localStorage.getItem("savedPseudocode");
    const savedFileName = localStorage.getItem("fileName");

    if (savedPseudocode) {
        document.getElementById("pseudocode").value = savedPseudocode;
    }

    if (savedFileName) {
        document.getElementById("fileName").value = savedFileName;
    }
}