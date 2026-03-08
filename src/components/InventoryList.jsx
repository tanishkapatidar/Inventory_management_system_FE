import React, {useState,useEffect} from "react";
import { Link } from "react-router-dom";
import { listProducts ,deleteProduct} from "../services/ProductService";
import { Package, Plus, Search, Edit2, Trash2, DollarSign, AlertTriangle, BoxSelect } from 'lucide-react';

const InventoryList =() => {

    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {

        const fetchProducts = async () => {
            try{
                const data = await listProducts();
                setProducts(data);
            }
            catch(error){
                console.error("Error fetching data from backend:" , error);
            } 
        };
        fetchProducts();

    },[])

    const handleDelete = async(id) =>{
        if (window.confirm("Are you sure you want to delete this product?")){
            try{
                await deleteProduct(id);
                setProducts(products.filter(product => product.id !== id));
            }
            catch(error){
                console.error("Error deleting product:" , error);
                alert("Could not delete product.");
            }
        }
    };

    const totalProducts = products.length;
  
    const inventoryValue = products.reduce((sum, product) => {
        return sum + (product.price * product.quantity);
    }, 0);

    const lowStockCount = products.filter(p => p.quantity > 0 && p.quantity <= 20).length;
    const outOfStockCount = products.filter(p => p.quantity === 0).length;

    const filteredProducts = products.filter(product => 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (product.description && product.description.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return (
        
    <div className="max-w-6xl mx-auto px-4 py-8 font-sans">
        <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-3">
                <div className="bg-blue-600 p-2.5 rounded-lg text-white shadow-sm">
                    <Package size={24} />
                </div>
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 leading-tight">Inventory Manager</h1>
                    <p className="text-sm text-gray-500">Product stock control</p>
                </div>
            </div>
            <Link to="/add-product" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg text-sm font-medium transition flex items-center gap-2 shadow-sm">
                <Plus size={18} /> Add Product
            </Link>
        </div>

        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm flex items-center gap-4">
                <div className="bg-blue-50 text-blue-600 p-3 rounded-lg"><Package size={20} /></div>
                <div>
                    <p className="text-sm text-gray-500 font-medium">Total Products</p>
                    <h3 className="text-xl font-bold text-gray-900">{totalProducts}</h3>
                </div>
            </div>
            
            <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm flex items-center gap-4">
                <div className="bg-green-50 text-green-600 p-3 rounded-lg"><DollarSign size={20} /></div>
                <div>
                    <p className="text-sm text-gray-500 font-medium">Inventory Value</p>
                    <h3 className="text-xl font-bold text-gray-900">
                    ${inventoryValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </h3>
                </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm flex items-center gap-4">
                <div className="bg-yellow-50 text-yellow-600 p-3 rounded-lg"><AlertTriangle size={20} /></div>
                <div>
                    <p className="text-sm text-gray-500 font-medium">Low Stock</p>
                    <h3 className="text-xl font-bold text-gray-900">{lowStockCount}</h3>
                </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm flex items-center gap-4">
                <div className="bg-red-50 text-red-600 p-3 rounded-lg"><BoxSelect size={20} /></div>
                <div>
                    <p className="text-sm text-gray-500 font-medium">Out of Stock</p>
                    <h3 className="text-xl font-bold text-gray-900">{outOfStockCount}</h3>
                </div>
            </div>
        </div>

        
        <div className="relative mb-6 w-full md:w-96">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={18} className="text-gray-400" />
            </div>
            <input 
            type="text" 
            placeholder="Search by name, SKU, or description..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2.5 w-full border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm text-gray-700 shadow-sm"
            />
        </div>

        <div className="bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="bg-gray-50/50 border-b border-gray-100 text-gray-500 text-xs font-semibold uppercase tracking-wider">
                        <th className="py-4 px-6">Product</th>
                        <th className="py-4 px-6">SKU</th>
                        <th className="py-4 px-6">Price</th>
                        <th className="py-4 px-6">Qty</th>
                        <th className="py-4 px-6">Status</th>
                        <th className="py-4 px-6 text-right">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-sm">
                    {filteredProducts.map((product) => (
                    <tr key={product.id} className="hover:bg-gray-50/50 transition">
                        <td className="py-4 px-6">
                            <div className="font-semibold text-gray-900">{product.name}</div>
                            <div className="text-xs text-gray-500 mt-1 truncate max-w-xs">{product.description}</div>
                        </td>
                        <td className="py-4 px-6 font-mono text-gray-500 text-xs">{product.sku}</td>
                        <td className="py-4 px-6 font-semibold text-gray-900">
                            ${product.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                        </td>
                        <td className="py-4 px-6 text-gray-900 font-medium">{product.quantity}</td>
                        <td className="py-4 px-6">
                        
                            <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                                product.quantity === 0 ? 'bg-red-100 text-red-700' : 
                                product.quantity <= 20 ? 'bg-yellow-100 text-yellow-700' : 
                                'bg-green-100 text-green-700'
                            }`}>
                                {product.quantity === 0 ? 'Out of Stock' : product.quantity <= 20 ? 'Low Stock' : 'In Stock'}
                            </span>
                        </td>
                        <td className="py-4 px-6 text-right">
                            <div className="flex justify-end gap-3">
                                <Link to={`/edit-product/${product.id}`} className="text-gray-400 hover:text-blue-600 transition">
                                    <Edit2 size={18} />
                                </Link>
                                <button onClick={() => handleDelete(product.id)} className="text-gray-400 hover:text-red-600 transition">
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        </td>
                    </tr>
                    ))}
                
                    {filteredProducts.length === 0 && (
                    <tr>
                        <td colSpan="6" className="py-10 text-center text-gray-500">
                        No products found matching your search.
                        </td>
                    </tr>
                    )}
                </tbody>
            </table>
        </div>
    </div>
    );
};

export default InventoryList;