import axios from 'axios';
import { useState } from 'react';
import PopupForm from '@/components/PopupForm'; // Make sure this path is correct
import '../../styles/globals.css'; // Importing the global CSS file

export async function getStaticProps() {
    try {
        const res = await axios.get("http://localhost:5001/product");
        let data = res.data;
        console.log("Fetched data:", data);

        if (!data || data.length === 0) {
            return {
                props: {
                    products: [],
                },
            };
        }

        // เรียงลำดับตาม id
        data.sort((a, b) => a.id - b.id);

        return {
            props: {
                products: data,
            },
        };
    } catch (error) {
        console.error("Error fetching data:", error);
        return {
            props: {
                products: [],
            },
        };
    }
}

export default function Dashboard({ products = [] }) {
    const [productData, setProductData] = useState(products.sort((a, b) => a.id - b.id));
    const [isPopupVisible, setPopupVisible] = useState(false);
    const [currentProduct, setCurrentProduct] = useState(null);

    const handleAddProduct = () => {
        setCurrentProduct(null); // Reset form for new product
        setPopupVisible(true);
    };

    const handleEditProduct = (product) => {
        setCurrentProduct(product); // Load product data into form
        setPopupVisible(true);
    };

    const handleDeleteProduct = async (id) => {
        try {
            await axios.delete(`http://localhost:5001/product/${id}`);
            console.log(`Deleted product with ID ${id}`);
            setProductData(productData.filter(product => product.id !== id));
        } catch (error) {
            console.error("Error deleting product:", error);
        }
    };

    const handleSearch = async () => {
        try {
            const res = await axios.get(`http://localhost:5001/product/search`, {
                params: { query: searchQuery },
            });
            setProductData(res.data); // อัปเดตข้อมูลใหม่
        } catch (error) {
            console.error("Error fetching search results:", error);
        }
    };

    const closePopup = () => {
        setPopupVisible(false);
        setCurrentProduct(null);
    };

    const saveProduct = async (product) => {
        console.log('Product to save:', product);
        try {
            if (currentProduct) {
                console.log('Editing product with ID:', product.id);
                await axios.patch(`http://localhost:5001/product/${product.id}`, product);
            } else {
                console.log('Adding new product');
                const res = await axios.post("http://localhost:5001/product", product);
                setProductData([...productData, res.data]);
            }
            closePopup();
        } catch (error) {
            console.error("Error saving product:", error);
        }
    };

    const [searchQuery, setSearchQuery] = useState('');

    // Combined filtering logic
    const filteredProducts = productData.filter(product => {
        // Convert searchQuery to number (if it's a number)
        const queryAsNumber = parseInt(searchQuery, 10);

        // Check if searchQuery matches name, id, or rfid
        return (
            product.name.toLowerCase().includes(searchQuery.toLowerCase()) || // Search in name
            (!isNaN(queryAsNumber) && product.id === queryAsNumber) ||        // Search in id
            (!isNaN(queryAsNumber) && product.rfid === queryAsNumber)         // Search in rfid
        );
    });

    return (
        <div className="container">
            <h1>ข้อมูลสินค้า</h1>
            <button onClick={handleAddProduct} className="addButton">เพิ่มข้อมูล</button>
            {/* Search box placed below the Add button */}
            <div style={{ marginTop: '10px' }}>
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="searchBox"
                />
            </div>
            {/* Table of products */}
            <table className="table" aria-label="Product Data">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>ชื่อสินค้า</th>
                        <th>RFID</th>
                        <th>แก้ไข</th>
                        <th>ลบ</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredProducts.length > 0 ? (
                        filteredProducts.map(item => (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.name}</td>
                                <td>{item.rfid}</td>
                                <td>
                                    <button onClick={() => handleEditProduct(item)} className="editButton">แก้ไข</button>
                                </td>
                                <td>
                                    <button onClick={() => handleDeleteProduct(item.id)} className="deleteButton">ลบ</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5">No product data available.</td>
                        </tr>
                    )}
                </tbody>
            </table>
            {/* Popup form for adding/editing */}
            {isPopupVisible && (
                <PopupForm
                    product={currentProduct}
                    onClose={closePopup}
                    onSave={saveProduct}
                />
            )}
        </div>
    );
}
