'use client';
import styles from './styles.module.scss';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
export default function Dashboard() {
  const router = useRouter();
  const jumtTo = () => router.push('/list/3');

  return (
    <div>
      <h2 className={styles.dashboard}>dashboard page</h2>
      <ul>
        <li>
          <Link href="/list/1" className="underline">
            列表项1
          </Link>
        </li>
        <li>
          <Link href="/list/2" className="underline">
            列表项2
          </Link>
        </li>
      </ul>
      {/* <botton onClick={jumtTo} className="underline">
          列表项3
        </botton> */}
      <botton onClick={jumtTo} className="btn btn-primary">
        列表项3
      </botton>
    </div>
  );
}
