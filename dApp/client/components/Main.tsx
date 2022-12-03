import {ReactNode} from 'react';

type Props = {
  children?: ReactNode;
  title: string;
  subtitle: string;
};

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const Main = ({children, title, subtitle}: Props) => {
  return (
    <main className="main-height flex justify-center w-full flex-col items-center">
      <div className="flex flex-col gap-4 text-center mt-8">
        <h1 className="text-7xl font-bold text-slate-50">{title} </h1>
        <p className="text-2xl font-semibold text-yellow-200 mb-3">{subtitle} </p>
      </div>
      {children && (
        <div className="h-full flex w-full flex-col items-center justify-center gap-2">
          {children}
        </div>
      )}
    </main>
  );
};

export default Main;
