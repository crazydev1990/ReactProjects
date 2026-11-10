const Service=(props)=>{
    {/* console.log(props) retrieve data passed from parent component*/}
     return(
        <div>
            <h1>Service</h1>
            <span>{props.price}</span>
            <span>{props.name}</span>
            <span>{props.phone}</span>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.</p>
        </div>
    )
}
export default Service;