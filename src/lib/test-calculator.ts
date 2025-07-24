export const testCalculatorHTML = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Working Test Calculator</title>
    <style>
        body {
            margin: 0;
            padding: 20px;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .calculator {
            background: white;
            border-radius: 20px;
            padding: 30px;
            box-shadow: 0 20px 40px rgba(0,0,0,0.3);
            max-width: 350px;
            width: 100%;
        }
        .display {
            width: 100%;
            height: 80px;
            font-size: 32px;
            text-align: right;
            padding: 0 20px;
            border: 2px solid #e0e0e0;
            border-radius: 12px;
            margin-bottom: 25px;
            background: #f9f9f9;
            box-sizing: border-box;
            font-weight: 500;
        }
        .buttons {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 12px;
        }
        button {
            height: 70px;
            border: none;
            border-radius: 12px;
            font-size: 20px;
            font-weight: bold;
            cursor: pointer;
            transition: all 0.2s ease;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }
        button:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        }
        button:active {
            transform: translateY(0);
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .number, .decimal {
            background: linear-gradient(145deg, #f5f5f5, #e8e8e8);
            color: #333;
        }
        .operator {
            background: linear-gradient(145deg, #ff9500, #e8860a);
            color: white;
        }
        .equals {
            background: linear-gradient(145deg, #007AFF, #0056CC);
            color: white;
            grid-column: span 2;
        }
        .clear {
            background: linear-gradient(145deg, #FF3B30, #D70015);
            color: white;
        }
        .debug-info {
            position: fixed;
            top: 10px;
            left: 10px;
            background: rgba(0,0,0,0.8);
            color: white;
            padding: 10px;
            border-radius: 8px;
            font-size: 12px;
            max-width: 300px;
            z-index: 1000;
        }
    </style>
</head>
<body>
    <div id="debug" class="debug-info">Calculator Loading...</div>
    
    <div class="calculator">
        <input type="text" class="display" id="calculatorDisplay" readonly value="0">
        <div class="buttons">
            <button class="clear" id="clearBtn">C</button>
            <button class="clear" id="deleteBtn">⌫</button>
            <button class="operator" id="divideBtn">÷</button>
            <button class="operator" id="multiplyBtn">×</button>
            
            <button class="number" id="btn7">7</button>
            <button class="number" id="btn8">8</button>
            <button class="number" id="btn9">9</button>
            <button class="operator" id="subtractBtn">-</button>
            
            <button class="number" id="btn4">4</button>
            <button class="number" id="btn5">5</button>
            <button class="number" id="btn6">6</button>
            <button class="operator" id="addBtn">+</button>
            
            <button class="number" id="btn1">1</button>
            <button class="number" id="btn2">2</button>
            <button class="number" id="btn3">3</button>
            <button class="equals" id="equalsBtn">=</button>
            
            <button class="number" id="btn0" style="grid-column: span 2;">0</button>
            <button class="decimal" id="decimalBtn">.</button>
        </div>
    </div>

    <script>
        console.log('=== CALCULATOR SCRIPT START ===');
        
        let currentInput = '0';
        let shouldResetDisplay = false;
        
        function updateDebug(message) {
            const debugEl = document.getElementById('debug');
            if (debugEl) {
                debugEl.textContent = message;
            }
            console.log('DEBUG:', message);
        }
        
        function updateDisplay() {
            const display = document.getElementById('calculatorDisplay');
            if (display) {
                display.value = currentInput;
                updateDebug('Display updated: ' + currentInput);
            } else {
                console.error('Display element not found!');
            }
        }
        
        function appendToDisplay(value) {
            console.log('appendToDisplay called with:', value);
            
            if (shouldResetDisplay || currentInput === '0') {
                currentInput = value;
                shouldResetDisplay = false;
            } else {
                currentInput += value;
            }
            
            updateDisplay();
        }
        
        function clearDisplay() {
            console.log('clearDisplay called');
            currentInput = '0';
            shouldResetDisplay = false;
            updateDisplay();
        }
        
        function deleteLast() {
            console.log('deleteLast called');
            if (currentInput.length > 1) {
                currentInput = currentInput.slice(0, -1);
            } else {
                currentInput = '0';
            }
            updateDisplay();
        }
        
        function calculate() {
            console.log('calculate called with expression:', currentInput);
            try {
                // Replace display symbols with math operators
                let expression = currentInput
                    .replace(/×/g, '*')
                    .replace(/÷/g, '/');
                
                console.log('Processed expression:', expression);
                
                // Basic validation
                if (!/^[0-9+\-*/().\\s]+$/.test(expression)) {
                    throw new Error('Invalid characters in expression');
                }
                
                const result = eval(expression);
                console.log('Calculation result:', result);
                
                if (!isFinite(result)) {
                    throw new Error('Result is not finite');
                }
                
                currentInput = result.toString();
                shouldResetDisplay = true;
                updateDisplay();
                
            } catch (error) {
                console.error('Calculation error:', error);
                currentInput = 'Error';
                shouldResetDisplay = true;
                updateDisplay();
                updateDebug('Error: ' + error.message);
            }
        }
        
        // Wait for DOM to be ready
        document.addEventListener('DOMContentLoaded', function() {
            console.log('=== DOM CONTENT LOADED ===');
            updateDebug('DOM Ready - Setting up event listeners...');
            
            // Number buttons
            ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'].forEach(num => {
                const btn = document.getElementById('btn' + num);
                if (btn) {
                    btn.addEventListener('click', () => appendToDisplay(num));
                    console.log('Added listener for button:', num);
                } else {
                    console.error('Button not found:', num);
                }
            });
            
            // Operator buttons
            const operators = [
                { id: 'addBtn', value: '+' },
                { id: 'subtractBtn', value: '-' },
                { id: 'multiplyBtn', value: '×' },
                { id: 'divideBtn', value: '÷' },
                { id: 'decimalBtn', value: '.' }
            ];
            
            operators.forEach(op => {
                const btn = document.getElementById(op.id);
                if (btn) {
                    btn.addEventListener('click', () => appendToDisplay(op.value));
                    console.log('Added listener for operator:', op.value);
                } else {
                    console.error('Operator button not found:', op.id);
                }
            });
            
            // Special buttons
            const clearBtn = document.getElementById('clearBtn');
            if (clearBtn) {
                clearBtn.addEventListener('click', clearDisplay);
                console.log('Added listener for clear button');
            }
            
            const deleteBtn = document.getElementById('deleteBtn');
            if (deleteBtn) {
                deleteBtn.addEventListener('click', deleteLast);
                console.log('Added listener for delete button');
            }
            
            const equalsBtn = document.getElementById('equalsBtn');
            if (equalsBtn) {
                equalsBtn.addEventListener('click', calculate);
                console.log('Added listener for equals button');
            }
            
            updateDebug('Calculator ready! All event listeners attached.');
            console.log('=== CALCULATOR SETUP COMPLETE ===');
        });
        
        // Immediate initialization
        updateDebug('Calculator script loaded');
        console.log('=== CALCULATOR SCRIPT END ===');
    </script>
</body>
</html>` 