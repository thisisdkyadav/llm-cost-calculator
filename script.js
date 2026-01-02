document.addEventListener('DOMContentLoaded', () => {
    // Select all inputs
    const inputCostPerM = document.getElementById('inputCostPerM');
    const outputCostPerM = document.getElementById('outputCostPerM');
    const inputTokens = document.getElementById('inputTokens');
    const outputTokens = document.getElementById('outputTokens');

    // Select display elements
    const totalCostDisplay = document.getElementById('totalCost');
    const inputCostResult = document.getElementById('inputCostResult');
    const outputCostResult = document.getElementById('outputCostResult');
    const requestsPerDollarDisplay = document.getElementById('requestsPerDollar');

    function calculate() {
        // Parse values
        const inCostPerM = parseFloat(inputCostPerM.value) || 0;
        const outCostPerM = parseFloat(outputCostPerM.value) || 0;
        const inTokens = parseInt(inputTokens.value) || 0;
        const outTokens = parseInt(outputTokens.value) || 0;

        // Calculate individual costs
        const inputOverallCost = (inTokens / 1000000) * inCostPerM;
        const outputOverallCost = (outTokens / 1000000) * outCostPerM;
        const totalOverallCost = inputOverallCost + outputOverallCost;

        // Calculate requests per dollar
        const requestsPerDollar = totalOverallCost > 0 ? 1 / totalOverallCost : 0;

        // Format and update UI
        updateUI(totalOverallCost, inputOverallCost, outputOverallCost, requestsPerDollar);
    }

    function updateUI(total, input, output, rpd) {
        // Determine precision based on value size
        const formatOptions = (val) => {
            if (val === 0) return '$0.00';
            if (val < 0.01) return '$' + val.toFixed(6);
            return '$' + val.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 4 });
        };

        totalCostDisplay.textContent = formatOptions(total);
        inputCostResult.textContent = formatOptions(input);
        outputCostResult.textContent = formatOptions(output);
        
        requestsPerDollarDisplay.textContent = rpd > 0 
            ? Math.floor(rpd).toLocaleString() 
            : '0';

        // Add a subtle "pulse" animation to the total cost on change
        totalCostDisplay.style.animation = 'none';
        totalCostDisplay.offsetHeight; // trigger reflow
        totalCostDisplay.style.animation = 'pulse-text 0.3s ease-out';
    }

    // Add event listeners to all inputs
    [inputCostPerM, outputCostPerM, inputTokens, outputTokens].forEach(input => {
        input.addEventListener('input', calculate);
    });

    // Initial calculation
    calculate();
});

// Add keyframes for animation in JS to keep CSS clean if needed, 
// but it's better in CSS. Let's add it to the style.css via replace.
