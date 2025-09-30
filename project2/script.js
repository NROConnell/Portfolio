document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('display');
    const buttons = document.querySelectorAll('.buttons button, .scientific button');
    const historyList = document.getElementById('historyList');
    const toggleScientific = document.getElementById('toggleScientific');
    const scientificPanel = document.getElementById('scientificPanel');
    const toggleTheme = document.getElementById('toggleTheme');
    const easterMessage = document.getElementById('easterMessage');
    const calculator = document.getElementById('calculator');
    const clickSound = document.getElementById('clickSound');
    const evalSound = document.getElementById('evalSound');
    let currentInput = "";

    // Toggle scientific panel
    toggleScientific.addEventListener('click', () => {
        scientificPanel.classList.toggle('hidden');
    });

    // Toggle theme
    toggleTheme.addEventListener('click', () => {
        document.body.classList.toggle('light');
    });

    // Update display and trigger Easter egg
    function updateDisplay() {
        display.value = currentInput;
        if (currentInput.toLowerCase().includes("purpletech")) {
            easterMessage.classList.remove('hidden');
            setTimeout(() => easterMessage.classList.add('hidden'), 2000);
        }
    }

    // Add to history
    function addToHistory(expression, result) {
        const entry = document.createElement('div');
        entry.className = 'history-entry';
        entry.textContent = `${expression} = ${result}`;
        historyList.prepend(entry);
    }

    // Parse expression for scientific functions
    function parseExpression(expr) {
        return expr
            .replace(/sin/g, 'Math.sin')
            .replace(/cos/g, 'Math.cos')
            .replace(/tan/g, 'Math.tan')
            .replace(/log/g, 'Math.log')
            .replace(/sqrt/g, 'Math.sqrt')
            .replace(/(\d+)\^(\d+)/g, 'Math.pow($1,$2)');
    }

    // Evaluate expression
    function evaluateExpression() {
        try {
            const parsed = parseExpression(currentInput);
            const result = eval(parsed);
            addToHistory(currentInput, result);
            currentInput = result.toString();
            updateDisplay();
            evalSound.play();
        } catch {
            display.value = "Error";
            currentInput = "";
        }
    }

    // Button click handling
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const value = button.textContent;
            clickSound.play();

            if (value === '=') {
                evaluateExpression();
            } else if (value === 'C') {
                currentInput = "";
                updateDisplay();
            } else if (value === '←') {
                currentInput = currentInput.slice(0, -1);
                updateDisplay();
            } else {
                currentInput += value;
                updateDisplay();
            }
        });
    });

    // Manual input handling
    display.addEventListener('input', (e) => {
        currentInput = e.target.value;
        updateDisplay();
    });

    display.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            evaluateExpression();
        } else if (e.key === 'Backspace') {
            e.preventDefault();
            currentInput = currentInput.slice(0, -1);
            updateDisplay();
        } else if (e.key.toLowerCase() === 'c') {
            currentInput = "";
            updateDisplay();
        }
    });

    // Make calculator draggable
    let isDragging = false;
    let offsetX, offsetY;

    calculator.addEventListener('mousedown', (e) => {
        isDragging = true;
        offsetX = e.clientX - calculator.offsetLeft;
        offsetY = e.clientY - calculator.offsetTop;
    });

    document.addEventListener('mousemove', (e) => {
        if (isDragging) {
            calculator.style.left = `${e.clientX - offsetX}px`;
            calculator.style.top = `${e.clientY - offsetY}px`;
        }
    });

    document.addEventListener('mouseup', () => {
        isDragging = false;
    });
});
