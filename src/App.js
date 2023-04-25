
import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Products } from './products';
import { Navbar } from './navbar';
import { Cart } from './cart';

function App() {
  return (
    <div className="App">
      {/* <Navbar/> */}
   <Routes>
        <Route path="/" element={<Products />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </div>
  );
}

export default App;
