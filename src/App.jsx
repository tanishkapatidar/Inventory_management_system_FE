import { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import InventoryList from './components/InventoryList';
import AddProduct from './pages/AddProduct';
import EditProduct from './pages/EditProduct';


function App() {

  return (
      <BrowserRouter>
        <div className="min-h-screen bg-gray-50">
      
          <Routes>
            <Route path="/" element={<InventoryList />} /> 
            <Route path="/add-product" element={<AddProduct />} />
            <Route path="/edit-product/:id" element={<EditProduct />} />
          </Routes>

        </div>
      </BrowserRouter>
  )
}

export default App;
