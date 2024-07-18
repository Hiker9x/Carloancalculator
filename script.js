function calculateLoan() {
  // Check if any input field is empty except for additional charges
  const inputs = document.querySelectorAll('input[type="number"]:not(#additionalCharges)');
  for (let input of inputs) {
    if (!input.value.trim()) {
      alert("Please input values");
      return;
    }
  }

  // Visitor Count
  let visitorCount = localStorage.getItem('visitorCount') || 0;
  visitorCount++;
  localStorage.setItem('visitorCount', visitorCount);
  document.getElementById('visitorCount').textContent = visitorCount;

  // Loan Calculation
  const vehiclePrice = parseFloat(document.getElementById("vehiclePrice").value);
  const downpayment = parseFloat(document.getElementById("downpayment").value);
  const loanTenure = parseFloat(document.getElementById("loanTenure").value);
  const interestRate = parseFloat(document.getElementById("interestRate").value);
  const installmentPaid = parseFloat(document.getElementById("installmentPaid").value);
  const additionalCharges = parseFloat(document.getElementById("additionalCharges").value || 0);

  const loanAmount = vehiclePrice - downpayment;
  const totalInterest = ((vehiclePrice - downpayment) * (loanTenure / 12) * (interestRate / 100));
  const monthlyInstallment = (loanAmount + totalInterest) / loanTenure;
  const remainingInstallments = loanTenure - installmentPaid;
  const interestRebate = ((remainingInstallments * (remainingInstallments + 1)) / (loanTenure * (loanTenure + 1))) * totalInterest * 0.8;
  const fullSettlementAmount = loanAmount + totalInterest - (installmentPaid * monthlyInstallment) - interestRebate + additionalCharges;

  const currentDate = new Date();
  
  const formattedDate = `${currentDate.getDate()} ${currentDate.toLocaleString('default', { month: 'short' })} ${currentDate.getFullYear()}`;

  const resultsDiv = document.getElementById("results");
  resultsDiv.innerHTML = `
    <div class="output">
      <h2>${formattedDate}</h2>
      <p><strong>Loan Amount:</strong> $<span class="number">${loanAmount.toFixed(2)}</span></p>
      <p><strong>Monthly Installment:</strong> $<span class="number">${monthlyInstallment.toFixed(2)}</span></p>
      <p><strong>Total Interest:</strong> $<span class="number">${totalInterest.toFixed(2)}</span></p>
      <p><strong>Interest Rebate:</strong> $<span class="number">${interestRebate.toFixed(2)}</span></p>
      <p><strong>Total paid for the car:</strong> $<span class="number">${(downpayment + (installmentPaid * monthlyInstallment)).toFixed(2)}</span></p>
      <p><strong>Full Settlement Amount:</strong> $<span class="number">${fullSettlementAmount.toFixed(2)}</span></p>
    </div>
  `;
}

