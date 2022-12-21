import type { AppProps } from 'next/app';
import { ToastContainer } from 'react-toastify';

import { GlobalStyle } from '../styles/global';

import 'react-toastify/dist/ReactToastify.css';
import '../styles/_app.css';
import { SessionProvider } from 'next-auth/react';

export default function App({ Component, pageProps: {session, ...pageProps} }: AppProps) {
  return (
    <>
      <SessionProvider session={session}>
        <Component {...pageProps} />
        <GlobalStyle />
        <ToastContainer position='bottom-left'/>
      </SessionProvider>
    </>
  );
}
