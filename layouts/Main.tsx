import Head from 'next/head';
import Header from 'components/header';
import { useRouter } from 'next/router';
import '@fortawesome/fontawesome-free/css/all.min.css';

type LayoutType = {
  title?: string;
  children?: React.ReactNode;
}

export default ({ children, title = 'TNA SHOP' }: LayoutType) => {
  const router = useRouter();
  const pathname = router.pathname;

  return (
    <div className="app-main">
      <Head>
        <title>{ title }</title>
      </Head>

      <Header />

      <main className={(pathname !== '/' ? 'main-page' : '')}>
        { children }
      </main>
    </div>
  )
}