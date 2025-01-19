import React from "react";

function NavBar() {
    return(
        <div className = "flex justify-between items-center animate-pulse animate-once animate-delay-300">
            <div className="text-[56px] font-instrument font-bold text-palette2 pl-3 select-none">EcoRoute</div>
            <ul className="space-x-5 text-[24px] font-instrument font-bold my-3 flex">
                <li className="navbar-elements text-palette3"><a href= "#">Home</a></li>
                <li className="navbar-elements text-palette4"><a href= "#">Mission Statement</a></li>
                <li className="navbar-elements pr-3 text-palette5"><a href= "#">About Us</a></li>
            </ul>
        </div>
    );
}
export default NavBar