import React from 'react'
import { useState, useEffect } from 'react'
import Card from './Card'
import Loader from './Loader'
const AllProducts = () => {
    const [prodData, setProdData] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 4; // એક પેજ પર 4 પ્રોડક્ટ દેખાશે

    const products = async () => {    
        try {
            setLoading(true); 
            const res = await fetch('https://fakestoreapi.com/products')
            const data = await res.json()
            setProdData(data)
            const uniqueCategories = [...new Set(data.map(item => item.category))];
            setCategories(uniqueCategories);
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false); 
        }
    }

    useEffect(() => {
        products()
    }, [])

    useEffect(() => {
        if(categories.length > 0) {
            console.log("Updated Categories:", categories);
        }
    }, [categories]);
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = prodData.slice(indexOfFirstProduct, indexOfLastProduct);
    const totalPages = Math.ceil(prodData.length / productsPerPage);

    return (
        <>
        <div style={{ textAlign: 'right', width: '100%' }}>
        <span><label><b>Categories:</b></label></span>
        <select name="" id="">
           {
           categories.map((item) => {
             return <option key={item} value={item}>{item}</option>
           })
           }
        </select>
        </div>
            {loading ? (
                <Loader/>
            ) : (
                <>
                    <div className="flex flex-wrap justify-center gap-2">
                        {currentProducts.map((item) => {
                            return <Card key={item.id} data={item} />
                        })}
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', margin: '20px 0', alignItems: 'center' }}>
                        <button 
                            onClick={() => setCurrentPage(prev => prev - 1)} 
                            disabled={currentPage === 1}
                        >
                            Previous
                        </button>
                        <span>Page {currentPage} of {totalPages}</span>
                        <button 
                            onClick={() => setCurrentPage(prev => prev + 1)} 
                            disabled={currentPage === totalPages}
                        >
                            Next
                        </button>
                    </div>
                </>
            )}
        </>
    )
}
export default AllProducts
