import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import {
	DropdownToggle,
	DropdownMenu,
	DropdownItem,
	Nav,
	NavItem,
	NavLink,
	UncontrolledButtonDropdown,
} from "reactstrap";

import { toast, Bounce } from "react-toastify";

import { faCalendarAlt, faAngleDown } from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import avatar1 from "../../../assets/utils/images/avatars/1.png";

const propTypes = {
	children: PropTypes.node,
};
const defaultProps = {};

class UserBox extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			active: false,
			navigate: false,
		};
		this.signOut = this.signOut.bind(this);
	}

	notify2 = () =>
		(this.toastId = toast("Toast", {
			transition: Bounce,
			closeButton: true,
			autoClose: 5000,
			position: "bottom-center",
			type: "success",
		}));

	signOut = () => {
		const { history } = this.props;
		if (history) history.push("/");
	};

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
											width={36}
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
													<DropdownItem
														header
														tag="div"
														className="text-center"
													>
														<strong>My Account</strong>
													</DropdownItem>

													<DropdownItem onClick={() => this.signOut()}>
														<i className="fa fa-lock"></i>
														&nbsp;&nbsp;Logout
													</DropdownItem>
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
						</div>
					</div>
				</div>
			</Fragment>
		);
	}
}
UserBox.propTypes = propTypes;
UserBox.defaultProps = defaultProps;
export default withRouter(UserBox);
