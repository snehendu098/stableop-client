export const lendFunds = async ({
  address,
  amount,
}: {
  address: string;
  amount: number;
}) => {
  return `Lend amount ${amount} at ${address}`;
};
