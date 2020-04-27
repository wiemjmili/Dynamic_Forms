import React, { Fragment } from "react";
import {
	DropdownToggle,
	DropdownMenu,
	DropdownItem,
	Nav,
	Button,
	NavItem,
	NavLink,
	UncontrolledTooltip,
	UncontrolledButtonDropdown
} from "reactstrap";

import { toast, Bounce } from "react-toastify";

import { faCalendarAlt, faAngleDown } from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import avatar1 from "../../../assets/utils/images/avatars/1.png";

class UserBox extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			active: false
		};
	}

	notify2 = () =>
		(this.toastId = toast("Toast", {
			transition: Bounce,
			closeButton: true,
			autoClose: 5000,
			position: "bottom-center",
			type: "success"
		}));

	signOut = () =>
		this.props.history.push('/');


	render() {
		return (
			<Fragment>
				<div className="header-btn-lg pr-0">
					<div className="widget-content p-0">
						<div className="widget-content-wrapper">
							<div className="widget-content-left">
								<UncontrolledButtonDropdown>
									<DropdownToggle color="link" className="p-0">
										<img
											width={42}
											className="rounded-circle"
											src={avatar1}
											alt=""
										/>
										<FontAwesomeIcon
											className="ml-2 opacity-8"
											icon={faAngleDown}
										/>
									</DropdownToggle>
									<DropdownMenu right className="rm-pointers dropdown-menu-lg">
										<Nav vertical>
											<NavItem>
												<NavLink href="javascript:void(0);">
													<DropdownItem header tag="div" className="text-center"><strong>My Account</strong></DropdownItem>
													<DropdownItem onClick={this.signOut}><i className="fa fa-lock"></i> Logout</DropdownItem>
												</NavLink>
											</NavItem>
										</Nav>
									</DropdownMenu>
								</UncontrolledButtonDropdown>
							</div>
							<div className="widget-content-left  ml-3 header-user-info">
								<div className="widget-heading">Admin</div>
								<div className="widget-subheading">Business&Decision</div>
							</div>

							<div className="widget-content-right header-user-info ml-3">
								<Button
									className="btn-shadow p-1"
									size="sm"
									onClick={this.notify2}
									color="info"
									id="Tooltip-1"
								>
									<FontAwesomeIcon className="mr-2 ml-2" icon={faCalendarAlt} />
								</Button>
								<UncontrolledTooltip placement="bottom" target={"Tooltip-1"}>
									Notifications!
								</UncontrolledTooltip>
							</div>
						</div>
					</div>
				</div>
			</Fragment >
		);
	}
}

export default UserBox;
