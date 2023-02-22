import React from 'react';
import { Link } from 'react-router-dom';

const Authnetication = () => {
    return (
        <div style={{marginLeft:"550px", marginTop:"100px", }}>
           <h1 style={{fontFamily:"sans-serif"}}>Authnetication required</h1> 
           <div style={{display:"flex", flexDirection:"row", gap:"10px", marginLeft:"120px", marginTop:"20px"}}>
            <Link style={{textDecoration:"none"}} className='btn btn-dark' to='/login'>Log in</Link>
            <Link style={{textDecoration:"none"}} className='btn btn-dark' to='/register'>Register</Link>
           </div>
            
        </div>
    );
};

export default Authnetication;