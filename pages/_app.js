import '../styles/globals.css';
import {ThirdwebWeb3Provider} from '@3rdweb/hooks';

// Rinkeby network is equivalent to chain ID 4
const supportedChainIds = [4];

// injected connector method is a web3 connection method used by metamask
const connectors = {
  // inject metamask
  injected: {},
}

function MyApp({ Component, pageProps }) {
  return (
  <ThirdwebWeb3Provider
  supportedChainIds={supportedChainIds}
  connectors={connectors}>

    <Component {...pageProps} />
  </ThirdwebWeb3Provider>)
  
}

export default MyApp
