import React,{useState} from "react";
import { Navigate,Link, useNavigate } from "react-router-dom";
import { createProduct } from "../services/ProductService";
import { ArrowLeft, Save } from 'lucide-react';

const AddProduct = () => {

    const [product, setProduct] = useState({
        name: '',
        sku: '',
        price: '',
        quantity: '',
        description: ''
      });
    
    const navigate = useNavigate();

    const handleChange = (e) =>{
        const{name,value}=e.target;
        setProduct({...product,[ name]:value})
    };

    const saveProduct = async(e) =>{
        e.preventDefault();

        const validationErrors = {};
        if (!product.name.trim()) validationErrors.name = "Name is required";
        if (!product.sku.trim()) validationErrors.sku = "SKU is required";
        if (!product.price || Number(product.price) <= 0) validationErrors.price = "Price must be greater than 0";
        if (product.quantity === '' || Number(product.quantity) < 0) validationErrors.quantity = "Quantity cannot be negative";
    
        if (Object.keys(validationErrors).length > 0) {
            alert("Please fix the following errors:\n" + Object.values(validationErrors).join("\n"));
            return;
        }
    

        const cleanedProduct = {
            ...product,
            price: Number(product.price),
            quantity: Number(product.quantity),
            description: product.description.trim() || "" 
        };
    
        try {
            await createProduct(cleanedProduct); 
            navigate('/');
        } catch (error) {
            console.error("Backend Error:", error.response?.data || error);
            alert("Server rejected the product. Check the console for details.");
        }
        
    };

    return(

        <div className="max-w-3xl mx-auto px-4 py-8 font-sans">
            <div className="flex items-center gap-4 mb-6">
                <Link to="/" className="p-2 bg-white border border-gray-200 rounded-lg text-gray-500 hover:text-gray-900 hover:bg-gray-50 transition shadow-sm">
                    <ArrowLeft size={20} />
                </Link>
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">Add New Product</h2>
                    <p className="text-sm text-gray-500">Create a new item in your inventory</p>
                </div>
            </div>

            <div className="bg-white border border-gray-100 rounded-xl shadow-sm p-8">
                <form onSubmit={saveProduct} className="space-y-6">
                
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Product Name</label>
                        <input type="text" name="name" value={product.name} onChange={handleChange}
                        placeholder="e.g. Ergonomic Office Chair"
                        className="w-full border border-gray-200 rounded-lg p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition" required />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">SKU (Stock Keeping Unit)</label>
                            <input type="text" name="sku" value={product.sku} onChange={handleChange}
                                placeholder="e.g. CHAIR-001"
                                className="w-full border border-gray-200 rounded-lg p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition uppercase" required />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Price ($)</label>
                            <input type="number" step="0.01" name="price" value={product.price} onChange={handleChange}
                                placeholder="0.00"
                                className="w-full border border-gray-200 rounded-lg p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition" required />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Initial Quantity</label>
                        <input type="number" name="quantity" value={product.quantity} onChange={handleChange}
                        placeholder="0"
                        className="w-full border border-gray-200 rounded-lg p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition" required />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Description</label>
                        <textarea name="description" value={product.description} onChange={handleChange}
                        placeholder="Brief details about the product..."
                        className="w-full border border-gray-200 rounded-lg p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition min-h-[100px]" rows="3"></textarea>
                    </div>

                    <div className="pt-4 flex gap-4 border-t border-gray-100 mt-6">
                        <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg text-sm font-medium transition flex items-center gap-2 shadow-sm">
                            <Save size={18} /> Save Product
                        </button>
                        <Link to="/" className="bg-white border border-gray-200 text-gray-700 px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-50 transition">
                            Cancel
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    )
};

export default AddProduct;
