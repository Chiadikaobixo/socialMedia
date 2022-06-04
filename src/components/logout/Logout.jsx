import React from "react";
import { Link } from "react-router-dom";

const Logout = () => {
    const handleChange = () => {
        localStorage.clear()
    };

    return (
        <div>
            <Link to='/login'>
                <button className='shareButton' onClick={handleChange}>mylogout</button>
            </Link>
        </div>
    );
};

export default Logout