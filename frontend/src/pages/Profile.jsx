// import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Profile = (props) => {
		const navigate = useNavigate();
		async function handleLogOut(e) {
				e.preventDefault();
				const result = await props.logOutUser();
				console.log(result);
				if (result.success) {
						toast.success("Successfully logged you out");
						navigate('/');
				} else {
						console.log("Error logging out user ", result.message);
						toast.error("Something went wrong. Try again?");
				}
		}

    return (
			<div>
				<h1>Profile for {props.user}</h1>
				<button type="button" onClick={handleLogOut}>Log Out</button>
			</div>
  );
};

export default Profile;