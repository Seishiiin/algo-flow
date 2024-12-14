let variables = {};
let skipLines = false;

export function executePseudocode() {
    const pseudocode = document.getElementById("pseudocode").value.trim();
    const outputConsole = document.getElementById("outputConsole");

    variables = {};
    skipLines = false;

    outputConsole.textContent = "";

    try {
        const lines = pseudocode.split("\n");

        lines.forEach(line => {
            line = line.trim();

            if (!line) return;
            if (line.startsWith("//")) return;

            if (line.startsWith("/%")) {
                if (line.endsWith("%/")) {
                    return;
                } else {
                    skipLines = true;
                    return;
                }
            } else if (line.endsWith("%/")) {
                skipLines = false;
                return;
            }

            if (skipLines) return;

            if (line.startsWith("SHOW(\"")) {
                const content = line.slice("SHOW".length).trim();
                const text = content.slice(2, -2).trim();
                outputConsole.textContent += text + "\n";
            } else if (line.startsWith("SHOW(")) {
                const content = line.slice("SHOW".length).trim();
                const variableName = content.slice(1, -1).trim();
                if (variableName in variables) {
                    outputConsole.textContent += variables[variableName] + "\n";
                } else {
                    throw new Error(`Variable inconnue : ${variableName}`);
                }
            } else if (line.startsWith("SET ")) {
                const [key, value] = line.slice("SET".length).trim().split("=");
                if (!key || value === undefined) {
                    throw new Error("Syntaxe invalide dans 'SET'");
                }
                const variableKey = key.trim();
                let variableValue = value.trim();

                if (variableValue.startsWith("\"") && variableValue.endsWith("\"")) {
                    variableValue = variableValue.slice(1, -1);
                }

                variables[variableKey] = variableValue;
            }
        });
    } catch (error) {
        outputConsole.textContent += `Erreur: ${error.message}\n`;
    }
}