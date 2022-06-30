
import React, { useState, useEffect } from "react";
import {
Link
} from "react-router-dom";
import "../styles/header.css";
import UsersTable from "./UsersTable";



const URL = "https://jsonplaceholder.typicode.com/users";
let loading = false;

const Header2 = () => {
	const [users, setUsers] = useState([]);
	const [blockedUsers, setBlockedUsers] = useState([]);
	const [searchInput, setSearchInput] = useState("");
	const [selectedUser, setSelectedUser] = useState({});
	const [active, setActive] = useState("users");
	const [topUsers, setTopUsers] = useState([]);
	const handleLinkClick = (link) => {
		setSelectedUser({});
		setActive(link);
		setBlockedUsers({});
	};
	useEffect(() => {
		loading = true;
		fetch(URL)
			.then((response) => response.json())
			.then((users) => {
				loading = false;
				setUsers(users);
			})
			.catch((err) => {
				loading = false;
				console.log(err);
			});
	}, []);
	return (

			<div>
				<Link
							onClick={() => {
								handleLinkClick("top-users");
							}}
							className={`link ${active === "top-users" ? "active" : null}`}
							to='/top-users'>
					
						</Link>
			
			
						
							<UsersTable
									users={JSON.parse(localStorage.getItem("topUsers")) || []}
									setTopUsers={setTopUsers}
									setBlockedUsers={setBlockedUsers}
									routeType={"top-users"}
									setUsers={setUsers}
								/>
		
			
			</div>
	
	);
};

export default Header2;