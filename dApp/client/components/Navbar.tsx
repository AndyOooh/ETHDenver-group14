import {NextPage} from 'next';
import Link from 'next/link';

export const Navbar: NextPage = () => {
  return (
    <ul className="w-full flex justify-center items-center gap-6 text-lg">
      <li>
        <Link href="/ballot">Ballot</Link>
      </li>
      <li>
        <Link href="/lottery">Lottery</Link>
      </li>
    </ul>
  );
};
