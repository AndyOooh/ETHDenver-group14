import {NextPage} from 'next';

type BalanceProps = {
  text: string;
  value: number | null | string | undefined;
};

export const BalanceCard: NextPage<BalanceProps> = ({text, value}) => {
  return (
    <div className="card">
      <span>{text}</span> <span>{value}</span>{' '}
    </div>
  );
};
