document.getElementById('changerForm').addEventListener('submit', calculateChange);

function calculateChange(event) {
  event.preventDefault();
  
  const amount = parseInt(document.getElementById('amount').value);
  const denominations = [
    { value: 10000, type: 'note' },
    { value: 5000, type: 'note' },
    { value: 2000, type: 'note' },
    { value: 1000, type: 'note' },
    { value: 500, type: 'note' },
    { value: 100, type: 'coin' },
    { value: 50, type: 'coin' },
    { value: 25, type: 'coin' },
    { value: 10, type: 'coin' },
    { value: 5, type: 'coin' },
    { value: 1, type: 'coin' }
  ];

  const change = calculateChangeRecursive(amount, denominations);

  displayChange(change);
}

function calculateChangeRecursive(amount, denominations, startIndex = 0) {
  if (amount === 0) {
    return {};
  }

  for (let i = startIndex; i < denominations.length; i++) {
    const denomination = denominations[i];
    const value = denomination.value;
    const type = denomination.type;

    if (amount >= value) {
      const count = Math.floor(amount / value);

      if ((value === 5000 || value === 500) && count > 1) {
        continue;
      }

      const remainingAmount = amount % value;
      const change = calculateChangeRecursive(remainingAmount, denominations, i + 1);

      if (count > 0) {
        change[value] = { count, type };
      }

      return change;
    }
  }

  return {};
}

function displayChange(change) {
  const resultDiv = document.getElementById('result');
  resultDiv.innerHTML = '';

  for (let value in change) {
    const { count, type } = change[value];
    const denominationText = count === 1 ? type : `${type}s`;
    const denominationLine = `${count} XAF ${value} ${denominationText}<br>`;
    resultDiv.innerHTML += denominationLine;
  }
}
