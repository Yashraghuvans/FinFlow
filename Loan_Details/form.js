function calculateEMI() {
    
    const principal = parseFloat(document.getElementById('principal').value);
    const rate = parseFloat(document.getElementById('rate').value) / 100 / 12;
    const time = parseFloat(document.getElementById('time').value) * 12; 
    const emi = (principal * rate * Math.pow(1 + rate, time)) / (Math.pow(1 + rate, time) - 1);
    document.getElementById('result').innerHTML = `Monthly EMI: ${emi.toFixed(2)}`;
}