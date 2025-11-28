import { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const OrderConfirmPopup = (props) => {
    const [dropoffBuilding, setDropoffBuilding] = useState('')
    const [dropoffDetails, setDropoffDetails] = useState('')

	// async function handleSubmit(e) {
	// 	e.preventDefault();
	// 	if (!dropoffBuilding) {
	// 		toast.error("Please specify the dropoff building");
	// 		return;
	// 	}
	// 		const result = await props.logInUser(email, password);
	// 		if (!result.success) {
	// 			console.log(result.message);
	// 			toast.error("Something went wrong. Try again?");
	// 		} else {
	// 			toast.success("Successfully logged you in!");
	// 			props.toggle();
	// 			navigate('/catalog');
	// 		}
	// }

	return (
			<div className="popup">
					<div className="popup-inner">
            <h2>Order confirmation</h2>
						<p>Your total is ${props.total}</p>
						<form onSubmit={(e) => props.handleSubmit(e, dropoffBuilding, dropoffDetails)}>
							<label>
									Building for dropoff:
									<input type="text" value={dropoffBuilding} onChange={e => setDropoffBuilding(e.target.value)} />
							</label>
							<label>
									Please provide any other details.
									<textarea
										value={dropoffDetails}
										onChange={e => setDropoffDetails(e.target.value)}
									/>
								</label>
							<div>
								<label>
										Receipt will be sent to: {props.usersEmail}
								</label>
							</div>
							<div>
									<button type="submit">Confirm Order</button>
									<button type="button" onClick={props.toggle}>Close</button>
							</div>
						</form>
					</div>
			</div>
	)
}

export default OrderConfirmPopup;