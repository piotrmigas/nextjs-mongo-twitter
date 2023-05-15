import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import Layout from '../components/Layout';
import { Toaster } from 'react-hot-toast';
import { SessionProvider } from 'next-auth/react';
import RegisterModal from '@/components/modals/RegisterModal';
import LoginModal from '@/components/modals/LoginModal';
import EditModal from '@/components/modals/EditModal';
import { Provider } from 'react-redux';
import { store } from '@/redux/store';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <Provider store={store}>
        <Toaster />
        <RegisterModal />
        <LoginModal />
        <EditModal />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Provider>
    </SessionProvider>
  );
}
