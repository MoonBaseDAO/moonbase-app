import { Web3AuthProvider } from '@/contexts/web3auth-context';
import { CacheProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import Head from 'next/head';
import 'simplebar-react/dist/simplebar.min.css';
import { AuthConsumer, AuthProvider } from 'src/contexts/auth-context';
import { WalletSelectorContextProvider } from 'src/contexts/wallet-selector-context';
import { useNProgress } from 'src/hooks/use-nprogress';
import 'src/styles/globals.css';
import { createTheme } from 'src/theme';
import { createEmotionCache } from 'src/utils/create-emotion-cache';

const clientSideEmotionCache = createEmotionCache();

const SplashScreen = () => null;

const App = (props) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  useNProgress();

  const getLayout = Component.getLayout ?? ((page) => page);

  const theme = createTheme();

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>
          Moonbase
        </title>
        <meta
          name="viewport"
          content="initial-scale=1, width=device-width"
        />
      </Head>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <AuthProvider>
          <WalletSelectorContextProvider>
            <Web3AuthProvider chain="mainnet" web3AuthNetwork="testnet">
              <ThemeProvider theme={theme}>
                <CssBaseline />
                <AuthConsumer>
                  {
                    (auth) => auth.isLoading
                      ? <SplashScreen />
                      : getLayout(<Component {...pageProps} />)
                  }
                </AuthConsumer>
              </ThemeProvider>
            </Web3AuthProvider>
          </WalletSelectorContextProvider>
        </AuthProvider>
      </LocalizationProvider>
    </CacheProvider>
  );
};

export default App;
