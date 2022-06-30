import React from "react";
import "./styles/app.css";
import Header from "./components/Header";
import {Routes,Route} from "react-router-dom";
// import Home from "./components/Routerdom/Home";
// import About from "./components/Routerdom/About";
// import Navigation from "./components/Navigationbar";
// import UsersTable from "./components/UsersTable";
import Header2 from "./components/Header2";
// import Header3 from "./components/Header3";

const App = () => {
	return (
		<div>
		
			<Header />

			{/* <Navigation/> */}
     <Routes>
       {/* <Route path='/' element={<Header>}/> */}
	   <Route path='/top-users' element={<Header2/>}/>
       {/* <Route path='/users'     element={<Header3/>}/> */}
       {/* <Route path='/contact' element={<Contact/>}/> */}
     </Routes>
		</div>

	);
};
export default App;