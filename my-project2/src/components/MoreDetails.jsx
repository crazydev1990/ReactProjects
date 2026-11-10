import React from 'react'
import { useState } from 'react'
import Loader from './Loader';
const MoreDetails = () => {
    const [selected,setSelected]=useState([]);
    const [count, setCount] = useState(() => {
        return JSON.parse(localStorage.getItem('cart')) || [];
    });
    
    function handleIncrement(index)
    {
        const updatedCart=[...count];
        console.log(updatedCart);
        const prod=updatedCart[index];
        prod.quantity++;
        setCount(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    }
    
    function handleDecrement(index){
        const updatedCart=[...count];
        const prod=updatedCart[index];
        if(prod.quantity>1){
            prod.quantity--;
            setCount(updatedCart);
            localStorage.setItem('cart', JSON.stringify(updatedCart));
        }
    }

    //Delete Single 
    function handleRemove(id){
        console.log(id)
        const updatedCart=count.filter((data,index,arr) =>{
            return index !== id;
        });
        console.log(updatedCart)
        setCount(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    }
    function handleCheckAll(){
      console.log("checked All");
      console.log(selected)
      console.log(count)
      if(selected.length===count.length){
        console.log(selected)
        setSelected([])
      }else{
        setSelected(count.map((data,index,arr) => 
        {
            return index
        }))
      }
    }
    
    // આ ફંક્શનમાં બ્રેકેટ્સની ભૂલ સુધારેલ છે
    function handleCheckedEvent(index){
        console.log("checked Single")
        console.log(index)
        setSelected((prev) =>{
            console.log(prev)
            return prev.includes(index) ?
                prev.filter((data,i) => {
                    return data !== index // અહીં i ની જગ્યાએ data સરખાવવો વધુ યોગ્ય રહેશે
                }) : [...prev, index];
        });
    } // અહીં ફંક્શન પૂરું થાય છે
    
    function handleRemoveSelected(){
        console.log("remove selected")
        console.log(selected)
        const updatedCart = count.filter((data,index,arr) =>{
            return !selected.includes(index);
        })
        setCount(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
        setSelected([]);
    }
    
    return (
        <div className="container py-5" style={{ backgroundColor: '#f1f3f6', minHeight: '100vh', fontFamily: 'Arial, sans-serif' }}>
            <input type="checkbox" checked={count.length > 0 && selected.length=== count.length} onChange={handleCheckAll} />
            <span className="px-2 text-xl text-center font-weight-bold text-dark border-bottom pb-3"><label>Select All</label></span>
            <button className="btn btn-danger" onClick={handleRemoveSelected} disabled={selected.length === 0}>Remove Selected ({selected.length})</button>
            <h1 className="my-4 text-center font-weight-bold text-dark border-bottom pb-3" style={{ letterSpacing: '1px' }}>
                Shopping Cart Details 🛒            
            </h1>
            {count.length===0 && <div className="text-center justify-center"><Loader/><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTArLmrih6aPB_hEcstKPwnfUD-OLrnPZE8trLe_YtemwVVnG7Zx4MhT2Y&s=10" alt="Empty Cart"/></div>}
            {count && count.map((item, index) => {
                return (
                    <div className="row align-items-center mb-4 bg-white p-4 rounded shadow-sm border mx-1" key={item.id || index} style={{ transition: 'all 0.3s ease' }}>             
                        <div className="col-md-4 text-center mb-3 mb-md-0">
                          <input type="checkbox" checked={selected.includes(index)} onChange={()=>handleCheckedEvent(index)}  />

                            <div style={{ width: '100%', height: '220px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f9f9f9', padding: '15px', borderRadius: '8px', border: '1px solid #f0f0f0' }}>

                                <img 
                                    src={item.image} 
                                    alt={item.title} 
                                    className='thumbnail img-fluid' 
                                    style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }} 
                                />
                            </div>
                        </div>
                        
                        <div className="col-md-8">
                            <h3 className="font-weight-bold text-dark mb-2 h4 text-truncate-2" style={{ lineHeight: '1.4' }}>{item.title}</h3>
                            <p className="text-muted small text-justify mb-3" style={{ color: '#666', fontSize: '13px' }}>{item.description}</p>
                            <p className="font-weight-bold h5 mb-3" style={{ color: '#212121' }}>
                                Price: <span className="text-dark">{new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(item.price)}</span>
                            </p>
                            <div className="flex items-center gap-3 mb-3 d-flex align-items-center">
                                <button 
                                    className="btn btn-sm btn-danger px-3 py-1 font-weight-bold text-white shadow-sm" 
                                    style={{ borderRadius: '4px', backgroundColor: '#e53935', border: 'none', minWidth: '35px' }}
                                    onClick={() => handleDecrement(index)}
                                >
                                    -
                                </button>
                                <input 
                                    type="number" 
                                    className="form-control text-center font-weight-bold border mx-2" 
                                    style={{ width: '250px', height: '32px', display: 'inline-block', backgroundColor: '#f8f9fa' }} 
                                    value={item.quantity} 
                                    readOnly 
                                />
                                <button 
                                    className="btn btn-sm btn-success px-3 py-1 font-weight-bold text-white shadow-sm" 
                                    style={{ borderRadius: '4px', backgroundColor: '#43a047', border: 'none', minWidth: '35px' }}
                                    onClick={() => handleIncrement(index)}
                                >
                                    +
                                </button>
                            </div>
                            <div className="pt-3 border-top d-flex flex-wrap align-items-center justify-content-between gap-3">
                                <p className="text-success font-weight-bold h5 mb-0">
                                    Total: {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(item.price * (item.quantity || 1))}
                                </p>
                                <span className="text-muted small bg-light px-3 py-1 rounded border text-uppercase" style={{ fontSize: '11px', fontWeight: '600' }}>
                                    {item.category}
                                </span>
                                <p className="text-warning font-weight-bold mb-0" style={{ fontSize: '15px' }}>
                                    ★ <span className="text-dark font-weight-bold">{item.rating?.rate || "No rating"}</span>
                                </p>
                            </div>
                            <div className="pt-3 border-top d-flex flex-wrap align-items-center justify-content-between gap-3 actions">
                                <button className="btn btn-sm btn-outline-secondary btn-danger text-white" onClick={() => { handleRemove(index) }}>
                                    <i className="bi bi-trash"></i>Remove
                                </button>
                            </div>   
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default MoreDetails;
