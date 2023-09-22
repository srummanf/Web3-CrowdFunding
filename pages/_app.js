import { NavBar, Footer } from "../components/index.js";
import "../styles/globals.css";
import { CrowdFundingProvider } from '../Context/CrowdFunding'

export default function App({ Component, pageProps }) {
  return (
    <>
      <CrowdFundingProvider>
        <NavBar />
        <Component {...pageProps} />
        <Footer />
      </CrowdFundingProvider>

    </>
  );
}
