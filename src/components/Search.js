import React, { useState } from "react";
import "../styles/search.css";


const searchUser = (
	users,
	searchInput,
	setSearchResults,
) => {
	setSearchResults(() => {
		return users.filter((user) => {
			return (
				user.name.includes(searchInput) || user.email.includes(searchInput)
			);
		});
	});
};
const Search = ({ users, searchInput, setSearchInput, setSelectedUser }) => {
	const [searchResults, setSearchResults] = useState([]);

	const handleChange = (event) => {
		if (event.target.value) {
			setSearchInput(event.target.value.trim());
			searchUser(users, searchInput, setSearchResults);
		}
	};
	const showDetails = (user) => {
		setSearchResults([]);
		setSelectedUser(user);
	};
	return (
		<div className='inline'>
			<form>
				<div className='autocomplete'>
					<p className='search-by'>Search By
					<input
						type='text'
						onChange={handleChange}
						placeholder='Email or Name'
					/></p>
					
				</div>
				<input type='submit'/>
			</form>
			<div className='autocomplete'>
				{searchResults.map((user, index) => {
					return (
						<div
							onClick={() => showDetails(user)}
							className='autocomplete-items'
							key={user.name}>
							{user.name}
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default Search;