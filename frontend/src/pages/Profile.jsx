import { useState, useEffect } from 'react';
import { useNavigate, Link } from "react-router-dom";
import "./Catalog.css"
import toast from "react-hot-toast";

const Profile = (props) => {
	const [mainOrders, setMainOrders] = useState([]);
	const [permission, setPermission] = useState()
	const navigate = useNavigate();

	useEffect(() => {
	async function fetchOrders() {
		const result = await props.getMyOrders();
		if (result.success) {
			setMainOrders(result.data);
		} else {
			console.log(result.message);
		}
	}

	fetchOrders();
	setPermission(props.userInfo.permission);
	}, []);

	async function handleLogOut(e) {
			e.preventDefault();
			const result = await props.logOutUser();
			if (result.success) {
					toast.success("Successfully logged you out");
					navigate('/');
			} else {
					console.log("Error logging out user ", result.message);
					toast.error("Something went wrong. Try again?");
			}
	}

	async function handlePermissionChange(newPermission) {
		const result = await props.changePermission(newPermission);
		if (result.success) {
				toast.success("Changed your permission");
				setPermission(newPermission);
		} else {
				console.log("Error changing user permission ", result.message);
				toast.error("Something went wrong. Try again?");
		}
	}

    return (
			<div>
				<h1>Profile for {props.userInfo.name}</h1>
				<div className="filters">
					<button className="dropbtn" onClick={handleLogOut}>Log Out</button>
					<div className="dropdown">
						<button className="dropbtn">Change permission</button>
						<div className="dropdown-content">
							<Link to="/profile" onClick={() => handlePermissionChange("user")}>User</Link>
							<Link to="/profile" onClick={() => handlePermissionChange("retriever")}>Retriever</Link>
							<Link to="/profile" onClick={() => handlePermissionChange("admin")}>Admin</Link>
						</div>
					</div>
				</div>
				{/* <button type="button" onClick={handlePermissionChange}>Change permission</button> */}
				<p>Email: <strong>{props.userInfo.email}</strong></p>
				<p>Phone number: <strong>{props.userInfo.phoneNumber}</strong></p>
				<p>Permission: <strong>{permission}</strong></p>
				<p>Orders placed: <strong>{mainOrders.length}</strong></p>
				<p>Orders delivered: <strong>0</strong></p>
			</div>
  );
};

export default Profile;