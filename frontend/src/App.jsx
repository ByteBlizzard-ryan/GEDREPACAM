import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import Home from './Home';
import Program from './Program';
import Inscription from './Inscription';
import Informations from './Informations';
import Contact from './Contact'; 
import Paiement from './Paiement';
import MonBadge from './MonBadge';
import VerifierBadge from './VerifierBadge';

function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <Header />
        
        <main className="flex-grow bg-white">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/programme" element={<Program />} />
            <Route path="/inscription" element={<Inscription />} />
            <Route path="/informations" element={<Informations />} />
            <Route path="/contact" element={<Contact />} /> {/* <-- Route active */}
            <Route path="/paiement" element={<Paiement />} />
            <Route path="/mon-badge" element={<MonBadge />} />
            <Route path="/verifier" element={<VerifierBadge />} />
          </Routes>
        </main>
        
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;