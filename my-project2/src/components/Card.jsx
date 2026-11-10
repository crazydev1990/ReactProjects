import React from 'react'

const Card = (props) => {
  // ✅ props માંથી ડેટા કાઢવા માટે props.data લખવું પડે અને name ની જગ્યાએ title
  const { id,title, image, description, price, rating, category } = props.data
  const addTocart=()=>{
    const cart=JSON.parse(localStorage.getItem('cart') || '[]');
    const isProductExist=cart.find((item)=>item.id===id);
    if(isProductExist){
      console.log('product already exist',isProductExist);
      isProductExist.quantity=isProductExist.quantity+1;
    }else{
      const {data}=props;
      cart.push({...data,quantity:1});
    }
    console.log(id);
    localStorage.setItem('cart',JSON.stringify(cart));
  } 
  return (
    <>
      <div className="bg-neutral-primary-soft block max-w-sm p-6 border border-default rounded-base">
        <a href="#">
          <img className="rounded-base h-40 mx-auto object-contain" src={image} alt="no image" />
        </a>
        
        <a href="#">
          <h5 className="mt-6 mb-2 text-2xl font-semibold tracking-tight text-heading">{title}</h5>
        </a>
        
        <p className="mb-6 text-body">{description}</p>
        <p className="mb-6 text-body">Price: ${price}</p>
        <p className="mb-6 text-body">Rating: {rating?.rate} ⭐ ({rating?.count} reviews)</p>
        <p className="mb-6 text-body">Category: {category}</p>
       
        <div className="w-full flex justify-center mt-4">
         <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all font-medium" onClick={()=>addTocart()}>
            Add to cart
         </button>
        </div>
      </div>
    </>
  )
}

export default Card
