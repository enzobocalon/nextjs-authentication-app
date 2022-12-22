import { SessionProvider } from 'next-auth/react';
import type { AppProps } from 'next/app';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { GlobalStyle } from '../styles/global';

import '../styles/_app.css';

export default function App({ Component, pageProps}: AppProps) {
  return (
    <>
      <SessionProvider>
        <Component {...pageProps} />
        <GlobalStyle />
        <ToastContainer position='bottom-left'/>
      </SessionProvider>
    </>
  );
}
