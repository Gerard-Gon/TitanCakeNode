import { Routes, Route } from 'react-router-dom';
import NavBar from './components/organisms/Navbar';
import Home from './pages/Home';
import Products from './pages/Products';
import Nosotros from './pages/Nosotros';
import Footer from './components/organisms/Footer';
import Blog from './pages/Blog';
import RecetasDetail from './pages/RecetasDetail';
import NotFound from './pages/NotFound';
import ProductDetail from './pages/ProductsDetails';


function App() {
 return (
   <>
     <NavBar />
     <Routes>
       <Route path="/" element={<Home />} />
       <Route path="/products" element={<Products />} />
       <Route path="/products/:id" element={<ProductDetail />} />
       <Route path="/nosotros" element={<Nosotros />} />
       <Route path="/Blog" element={<Blog />} />
       <Route path="/recetas/:id" element={<RecetasDetail />} />
       <Route path="*" element={<NotFound />} />
     </Routes>
     <Footer />
   </>
 );
}


export default App;
