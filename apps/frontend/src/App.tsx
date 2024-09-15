import { DAppKitProvider } from "@vechain/dapp-kit-react";
import { ChakraProvider } from "@chakra-ui/react";
import { lightTheme } from "./theme";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LoginPage } from "./pages/LoginPage";
import { HomePage } from "./pages/HomePage";
import { Uploadimage } from "./pages/Uploadimage";
import RegisterDroppoint from "./pages/RegisterDroppoint";
import { RegisterPage } from "./pages/RegisterPage";
import { SelectRolePage } from "./pages/SelectRolePage";
import { SelectDropoffLocationPage } from "./pages/SelectDropoffLocationPage";
import { SellerSnap } from "./pages/SellerSnap";

function App() {
  return (
    <ChakraProvider theme={lightTheme}>
      <DAppKitProvider
        usePersistence
        requireCertificate={false}
        genesis="test"
        nodeUrl="https://testnet.vechain.org/"
        logLevel={"DEBUG"}
      >
        <Router>
          <div>
            <Routes>
              <Route path="/upload" element={<Uploadimage />} />
              <Route
                path="/select-dropoff-location"
                element={<SelectDropoffLocationPage />}
              />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/home" element={<HomePage />} />
              <Route path="/select-role" element={<SelectRolePage />} />
              <Route path="/seller-snap" element={<SellerSnap />} />
              <Route path="/" element={<HomePage />} />
              <Route
                path="/registerdroppoint"
                element={<RegisterDroppoint />}
              />
            </Routes>
          </div>
        </Router>
      </DAppKitProvider>
    </ChakraProvider>
  );
}

export default App;
