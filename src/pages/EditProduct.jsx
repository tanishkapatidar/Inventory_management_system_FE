import React,{useState, useEffect} from "react";
import { useParams,Link, useNavigate } from "react-router-dom";
import { getProductById, updateProduct } from "../services/ProductService";
import { ArrowLeft, Save } from 'lucide-react';
import axios from "axios";

const EditProduct =() =>{

    const [product, setProduct] = useState({
        name: '',
        sku: '',
        price: '',
        quantity: '',
        description: ''
      });
    
    const navigate = useNavigate();

    const {id}= useParams();

    useEffect(() => {
        const fetchProduct = async ()=> {

            try{

                const data = await getProductById(id);
                setProduct(data);
            }
            catch(error){
                console.error("Error fetching product:", error);
                alert("Couldn't find this product in database!");
            }
        };
        fetchProduct();    
    },[id]);

    const handleChange = (e) =>{
        const{name,value}=e.target;
        setProduct({...product,[name]:value})
    };
    
    const saveChanges = async(e) =>{
        e.preventDefault();

        try{
            await updateProduct(id,product);
            navigate('/');
        }
        catch(error){
            console.error("Error updating product:", error);
            alert("Failed to update product. Check your backend console!");
        }
    };

    return (
        <div className="max-w-3xl mx-auto px-4 py-8 font-sans">
            <div className="flex items-center gap-4 mb-6">
                <Link to="/" className="p-2 bg-white border border-gray-200 rounded-lg text-gray-500 hover:text-gray-900 hover:bg-gray-50 transition shadow-sm">
                    <ArrowLeft size={20} />
                </Link>
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">Edit Product</h2>
                    <p className="text-sm text-gray-500">Update stock and details for this item</p>
                </div>
            </div>

            <div className="bg-white border border-gray-100 rounded-xl shadow-sm p-8">
                <form onSubmit={saveChanges} className="space-y-6">
                
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Product Name</label>
                        <input type="text" name="name" value={product.name} onChange={handleChange}
                        className="w-full border border-gray-200 rounded-lg p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition" required />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1 flex justify-between">
                                <span>SKU</span>
                                <span className="text-xs text-red-500 font-normal">Cannot be changed</span>
                            </label>
                            
                            <input type="text" name="sku" value={product.sku} onChange={handleChange}
                                className="w-full border border-gray-200 rounded-lg p-3 text-sm bg-gray-50 text-gray-500 cursor-not-allowed outline-none" readOnly />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Price ($)</label>
                            <input type="number" step="0.01" name="price" value={product.price} onChange={handleChange}
                                className="w-full border border-gray-200 rounded-lg p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition" required />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Update Quantity</label>
                        <input type="number" name="quantity" value={product.quantity} onChange={handleChange}
                        className="w-full border border-gray-200 rounded-lg p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition" required />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Description</label>
                        <textarea name="description" value={product.description} onChange={handleChange}
                        className="w-full border border-gray-200 rounded-lg p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition min-h-[100px]" rows="3"></textarea>
                    </div>

                    <div className="pt-4 flex gap-4 border-t border-gray-100 mt-6">
                        <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg text-sm font-medium transition flex items-center gap-2 shadow-sm">
                            <Save size={18} /> Update Product
                        </button>
                        <Link to="/" className="bg-white border border-gray-200 text-gray-700 px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-50 transition">
                            Cancel
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditProduct;
