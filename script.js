// Get display element
const display = document.getElementById('display');
let currentInput = '';
let resultDisplayed = false;

// Handle button clicks
document.querySelectorAll('.btn').forEach(button => {
  button.addEventListener('click', () => {
    const value = button.getAttribute('data-value');
    const action = button.getAttribute('data-action');

    if (action === 'clear') {
      currentInput = '';
      display.textContent = '0';
    } else if (action === 'backspace') {
      currentInput = currentInput.slice(0, -1);
      display.textContent = currentInput || '0';
    } else if (action === 'calculate') {
      try {
        // Evaluate expression using BODMAS
        const result = eval(currentInput);
        if (!isFinite(result)) throw Error('Math Error');
        display.textContent = result;
        currentInput = result.toString();
        resultDisplayed = true;
      } catch {
        display.textContent = 'Error';
        currentInput = '';
      }
    } else if (value) {
      if (resultDisplayed && '0123456789'.includes(value)) {
        currentInput = value; // Start new input after result
        resultDisplayed = false;
      } else {
        currentInput += value;
      }
      display.textContent = currentInput;
    }
  });
});

// Handle keyboard input
document.addEventListener('keydown', (e) => {
  const key = e.key;
  if ('0123456789.+-*/'.includes(key)) {
    currentInput += key;
    display.textContent = currentInput;
  } else if (key === 'Enter') {
    try {
      const result = eval(currentInput);
      if (!isFinite(result)) throw Error('Math Error');
      display.textContent = result;
      currentInput = result.toString();
    } catch {
      display.textContent = 'Error';
      currentInput = '';
    }
  } else if (key === 'Backspace') {
    currentInput = currentInput.slice(0, -1);
    display.textContent = currentInput || '0';
  } else if (key === 'Escape') {
    currentInput = '';
    display.textContent = '0';
  }
});
