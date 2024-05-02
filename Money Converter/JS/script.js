document.getElementById("changerForm").addEventListener("submit", calculateChange);

function calculateChange(event) {
  event.preventDefault();

  const amount = parseInt(document.getElementById("amount").value);
  const denominations = [
    { value: 10000, type: "note", count: 0 },
    { value: 5000, type: "note", count: 0 },
    { value: 2000, type: "note", count: 0 },
    { value: 1000, type: "note", count: 0 },
    { value: 500, type: "note", count: 0 },
    { value: 100, type: "coin", count: 0 },
    { value: 50, type: "coin", count: 0 },
    { value: 25, type: "coin", count: 0 },
    { value: 10, type: "coin", count: 0 },
    { value: 5, type: "coin", count: 0 },
    { value: 1, type: "coin", count: 0 }
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

    if (denomination.count > 0 && value === 5000) {
      const remainingAmount = amount - denomination.count * value;
      const change = calculateChangeRecursive(remainingAmount, denominations, i + 1);

      if (remainingAmount === 0) {
        return { ...change, [value]: { count: denomination.count, type } };
      }
    } else if (denomination.count > 0 && value === 10000) {
      const remainingAmount = amount - denomination.count * value;
      const change = calculateChangeRecursive(remainingAmount, denominations, i + 1);

      if (remainingAmount >= 0) {
        const additionalChange = calculateChangeRecursive(remainingAmount, denominations, i + 1);

        if (additionalChange !== null) {
          additionalChange[value] = { count: denomination.count, type };
          return additionalChange;
        }
      }
    } else if (denomination.count > 0 && value === 500) {
      const remainingAmount = amount - denomination.count * value;
      const change = calculateChangeRecursive(remainingAmount, denominations, i + 1);

      if (remainingAmount >= 0) {
        const additionalChange = calculateChangeRecursive(remainingAmount, denominations, i + 1);

        if (additionalChange !== null) {
          additionalChange[value] = { count: denomination.count, type };
          return additionalChange;
        }
      }
    } else {
      const count = Math.floor(amount / value);

      if (count > 0) {
        const remainingAmount = amount - count * value;
        const change = calculateChangeRecursive(remainingAmount, denominations, i + 1);

        if (remainingAmount === 0) {
          return { ...change, [value]: { count, type } };
        }
      }
    }
  }

  return null;
}

function displayChange(change) {
  const resultDiv = document.getElementById("result");
  resultDiv.innerHTML = "";

  for (let value in change) {
    const { count, type } = change[value];
    const denominationText = count === 1 ? type : `${type}s`;
    const noteLine = `${count} XAF ${value} ${denominationText}<br>`;
    resultDiv.innerHTML += noteLine;
  }
}