const Contact=()=>{
    {/* Internal Style */}
    const style={
        backgroundColor:'red',
        color:'white',
        fontSize:'20px',
        border:'1px solid black'
    }
    let x=10
    let name='Alpha'
     return(
        <div>
            <h1 style={style}>Contact</h1>
            <p>Value Of X is {x} And name is {name} and Addition is {10+20}</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.</p>
        </div>
    )
}
export default Contact;