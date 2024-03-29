import React from "react";
import Toggle from "./Toggle";
import "../styles/usersTable.css";
import { Link } from "react-router-dom";


const tableHeadings = ["User", "User Name", "Email", "Block/UnBlock"];
const unBlockingTimeInMinutes=5;
const unBlockingTimeInMilliseconds=
	unBlockingTimeInMinutes * 60 * 1000;

const isTopUser = (userId) => {
	let topUsersIds = localStorage.getItem("topUsersIds");
	return topUsersIds && topUsersIds.includes(userId);
};

const blockUser = (username, setBlockedUsers) => {
	localStorage.setItem(username, "true");
	setBlockedUsers((prevState) => {
		return prevState.concat(username);
	});
};

const unblockUser = (username, setBlockedUsers) => {
	setBlockedUsers((prevState) => {
		localStorage.removeItem(username);
		return prevState.filter((username) => username === username);
	});
};

const handleBlockToggle = (event, setBlockedUsers) => {
	const username = event.target.value;
	const blockedUser = localStorage.getItem(username);
	if (blockedUser) {
		unblockUser(username, setBlockedUsers);
	} else {
		blockUser(username, setBlockedUsers);
		setTimeout(() => {
			unblockUser(username, setBlockedUsers);
		}, unBlockingTimeInMilliseconds);
	}
};

const handleTopUserClick = (
	event,
	user,
	setUsers,
	setTopUsers,
) => {
	let topUsersIds = localStorage.getItem("topUsersIds");
	let topUsers = localStorage.getItem("topUsers");
	if (topUsersIds && topUsers) {
		let topUsersIdsArray = JSON.parse(topUsersIds);
		let topUsersArray = JSON.parse(topUsers);
		if (topUsersIdsArray.includes(user.id)) {
			const updatedTopUsersIdArray = topUsersIdsArray.filter(
				(id) => id !== user.id,
			);
			localStorage.setItem(
				"topUsersIds",
				JSON.stringify(updatedTopUsersIdArray),
			);
			const updatedTopUsersArray = topUsersArray.filter(
				(topUser) => topUser.id !== user.id,
			);
			localStorage.setItem("topUsers", JSON.stringify(updatedTopUsersArray));
			setTopUsers(topUsersArray);
		} else {
			localStorage.setItem(
				"topUsersIds",
				JSON.stringify(topUsersIdsArray.concat(user.id)),
			);
			const updatedTopUsersArray = JSON.stringify(topUsersArray.concat(user));
			localStorage.setItem("topUsers", updatedTopUsersArray);
			setTopUsers(updatedTopUsersArray);
		}
	} else {
		localStorage.setItem("topUsersIds", JSON.stringify([user.id]));
		localStorage.setItem("topUsers", JSON.stringify([user]));
	}
};

const UsersTable = ({
	// event,
	users,
	setUsers,
	setBlockedUsers,
	routeType,
	setTopUsers,
}) => {
	return (
		<table>
			<tr>
				{tableHeadings.map((heading, index) => {
					return <th key={index}>{heading}</th>;
				})}
				{routeType === "users" ? <th>Top User</th> : null}
			</tr>
			{users.map((user, index) => {
				const { name, username, email, id } = user;
				return (
					<tr key={index}>
						<td>{name}</td>
						<td>{username}</td>
						<td>{email}</td>
						<td>
							<Toggle
								username={username}
								handleBlockToggle={() =>
									handleBlockToggle( setBlockedUsers)
								}
							/>
							{localStorage.getItem(username) === "true" ? (
								<span>Blocked</span>
							) : null}
						</td>
						{<Link to="/top-users" />? (
							<td>
								<input
									type='checkbox'
									value={username}
									checked={isTopUser(id)}
									id={id}
									onChange={(event) => {
										handleTopUserClick(event, user, setUsers, setTopUsers);
									}}
								/>
							</td>
						) : null}
					</tr>
				);
			})}
		</table>
	);
};

export default UsersTable;