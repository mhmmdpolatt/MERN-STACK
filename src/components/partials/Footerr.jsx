import React from 'react'
import { useLocation } from 'react-router-dom';

const Footerr = () => {
    const location = useLocation();
    if (location.pathname == "/portfolio") {
        return null
    }
    console.log("şuanki konumun", location.pathname);
    return (
        <div className="relative bottom-0 bg-gradient-to-r from-slate-600 to-slate-800 text-white py-6 mt-16 w-full">
            <div className="container mx-auto text-center">
                <p>&copy; 2024 MYBlog | Tüm Hakları Saklıdır</p>
                <p className='font-extralight text-sm'>design by @mdpolat</p>
            </div>
        </div>
    )
}

export default Footerr