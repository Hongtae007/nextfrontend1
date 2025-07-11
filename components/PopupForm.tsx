import { useState, useEffect } from 'react';

const PopupForm = ({ product, onClose, onSave }) => {
    const [formState, setFormState] = useState({
        name: product ? product.name : '',
        rfid: product ? product.rfid.toString() : '',  // Initialize with string
    });

    useEffect(() => {
        if (product) {
            setFormState({
                name: product.name,
                rfid: product.rfid.toString(),  // Ensure RFID is a string for input
            });
        }
    }, [product]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormState({ ...formState, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave({ ...formState, id: product ? product.id : undefined, rfid: Number(formState.rfid) });
    };


    return (
        <div className="popup">
            <div className="popup-content">
                <h2>{product ? 'แก้ไขสินค้า' : 'เพิ่มสินค้า'}</h2>
                <form onSubmit={handleSubmit} className="border">
                    <label>
                        ชื่อสินค้า:
                        <input
                            className="popup-content"
                            type="text"
                            name="name"
                            value={formState.name}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <label>
                        RFID:
                        <input
                            className="popup-content"
                            type="number"
                            name="rfid"
                            value={formState.rfid}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <button type="submit">บันทึก</button>
                    <button type="button" onClick={onClose}>ยกเลิก</button>
                </form>
            </div>
        </div>
    );
};

export default PopupForm;
