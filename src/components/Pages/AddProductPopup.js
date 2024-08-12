import React, {useState , useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import '../Styles/AddProductPopup.css';
import Popup from './Popup';
import config from '../../config';
import CircularProgress from '@mui/material/CircularProgress';

function AddProductPopup({ onClose }) {
    const navigate = useNavigate();
    const [product , setProduct] = useState('');
    const [product_price , setProductPrice] = useState('');
    const [sku , setSKU] = useState('');
    const [invent , setInvent] = useState('');
    const [showPopup, setShowPopup] = useState(false); 
    const [popupMessage, setPopupMessage] = useState('');
    const [description, setDescription] = useState('');
    const [unit, setUnit] = useState('');
  
    const [loading, setLoading] = useState(false);
  const branchName = localStorage.getItem('branch_name');
  const sname = localStorage.getItem('s-name');

  console.log(atob(branchName));

  const handleSubmit = async (e) => {
    setLoading(true);
    const token = localStorage.getItem('token');
    e.preventDefault();
    try {
        const response = await fetch(`${config.apiUrl}/api/swalook/inventory/product/add/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`
            },
            body: JSON.stringify({
                product_name: product,
                product_price: product_price,
                product_description: description,
                vendor_branch_name: atob(branchName),
                product_id: sku,
                stocks_in_hand: parseInt(invent, 10),
                unit: unit
            }),
        });

        const result = await response.json();

        if (response.ok) {
            setPopupMessage('Product added successfully!');
            setShowPopup(true);
            onClose();
            window.location.reload();
        } else {
            setPopupMessage('Failed to add product.');
            setShowPopup(true);
        }
    } catch (error) {
        setPopupMessage('An error occurred.');
        setShowPopup(true);
    } finally {
        setLoading(false);
    }
};
  return (
    <div className="ad_p_popup_overlay">
    <div className="ad_p_popup_container">
      <div className="ad_p_popup_header">
       <div className='ad_p_pph3'>
       <h3>Add Product</h3>
       </div>
        <button className="close_button" onClick={onClose}>X</button>
      </div>
      <hr></hr>
      <form onSubmit={handleSubmit}>
      <div className="adp1">
          <label htmlFor="product_name">Name:</label>
          <input type="text" id="product_name" name="product_name" placeholder='Product Name' required onChange={(e)=>setProduct(e.target.value)}/>
      </div>
      <div className="adp2">
          <label htmlFor="sku">SKU:</label>
          <input type="text" id="sku" name="sku" placeholder="Id of product" required onChange={(e)=>setSKU(e.target.value)}/>
      </div>
      <div className="adp3">
          <label htmlFor="price">Price:</label>
          <input type="number" id="price" name="price" placeholder="Price" required  onChange={(e)=>setProductPrice(e.target.value)}/>
      </div>
      <div className="adp4">
          <label htmlFor="invent">Quantity:</label>
          <input type="number" id="invent" name="invent" placeholder="Quantity" required onChange={(e)=>setInvent(e.target.value)}/>
      </div>
      <div className="adp4">
                        <label htmlFor="unit">Unit:</label>
                        <select id="unit" className='status-dropdown' name="unit" value={unit} onChange={(e) => setUnit(e.target.value)}>
                            <option value="">Select unit</option>
                            <option value="gm">gm</option>
                            <option value="ml">ml</option>
                        </select>
        </div>
      <div className="adp4">
              <label htmlFor="description">Description:</label>
              <input type="text" id="description" name="description" placeholder="Description" required onChange={(e) => setDescription(e.target.value)} />
      </div>
      <div className="ad_p_button_container">
          <button className="ad_p_save_button">
            {loading ? <CircularProgress size={20} color="inherit" /> : 'Save'}
          </button>
        </div>
      </form>
    </div>
    {showPopup && <Popup message={popupMessage} onClose={() => {setShowPopup(false); navigate(`/${sname}/${branchName}/inventory`);} }/>}
  </div>
  )
}

export default AddProductPopup