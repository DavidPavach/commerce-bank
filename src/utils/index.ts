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

//User Payload
export function buildPayload<T extends Record<string, boolean | string | number>, K extends keyof T>(
  formData: T,
  updatedFields: Set<K>
): Partial<T> {
  const payload = {} as Partial<T>;
  updatedFields.forEach((field) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (payload as any)[field] = formData[field];
  });
  return payload;
}
