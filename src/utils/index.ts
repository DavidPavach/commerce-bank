//Calculate Savings Summary
export function calculateSavingsSummary(savingsArray: Savings[]) {
  return savingsArray.reduce(
    (acc, curr) => {
      const saved = Number(curr.savedAmount) || 0;
      const interest = Number(curr.totalInterestAccrued) || 0;

      acc.totalSaved += saved;
      acc.totalInterest += interest;

      return acc;
    },
    {
      totalSaved: 0,
      totalInterest: 0,
    }
  );
}
