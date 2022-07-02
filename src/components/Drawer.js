import React, { useState } from "react";

import "../styles/drawer.css";

const closeNav = (setOpenSideNav) => {
	setOpenSideNav(false);
};

const openNav = (setOpenSideNav) => {
	setOpenSideNav(true);
};
const Drawer = () => {
	const [openSideNav, setOpenSideNav] = useState(false);
	return (
		<div className='inline'>
			<div className={`sidenav ${openSideNav ? "open" : "close"}`}>
				<span className='closebtn' onClick={() => closeNav(setOpenSideNav)}>
					&times;
				</span>
				<a href='#'>Home</a><br></br>
				<a href='#'>Sports</a><br></br>
				<a href='#'>News</a><br></br>
				<a href='#'>Log out</a><br></br>
			</div>
			<span
				className={`open-button ${openSideNav ? "close" : "open"}`}
				onClick={() => openNav(setOpenSideNav)}>
				&#9776;
			</span>
		</div>
	);
};

export default Drawer;