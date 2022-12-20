import type { AppProps } from 'next/app';
import { ToastContainer } from 'react-toastify';

import { GlobalStyle } from '../styles/global';

import 'react-toastify/dist/ReactToastify.css';
import '../styles/_app.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
      <GlobalStyle />
      <ToastContainer position='bottom-left'/>
    </>
  );
}
