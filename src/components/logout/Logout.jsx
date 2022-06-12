import React from "react";
import { useHistory } from "react-router-dom";

const Logout = () => {
    let history = useHistory();
    const handleChange = () => {
        localStorage.clear()
        history.push('/')
        window.location.reload()
    };

    return (
        <div>
            <button className='shareButton' onClick={handleChange}>Logout</button>
        </div>
    );
};

export default Logout