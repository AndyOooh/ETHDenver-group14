import {ReactNode} from 'react';

type Props = {
  children: ReactNode;
};

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const Main = ({children}: Props) => {
  return (
    <main className="flex w-full min-h-screen flex-col items-center justify-center py-2 px-20 text-center gap-2">
      {children}
    </main>
  );
};

export default Main;
