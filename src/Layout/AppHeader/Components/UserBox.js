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

import admin_img from "../../../assets/utils/images/avatars/Admin.png";

import user_img from "../../../assets/utils/images/avatars/user.png";

import base_url from "../../../service/base_url";

import axios from "axios";

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
			User: "",
		};
		this.signOut = this.signOut.bind(this);
		axios.get(base_url.getCurrentUser()).then((res) => {
			const User = res.data;
			this.setState({ User });
		});
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
										{this.state.User.username == "Admin" && (
											<img
												width={36}
												className="rounded-circle"
												src={admin_img}
												alt=""
											/>
										)}
										{this.state.User.username != "Admin" && (
											<img
												width={36}
												className="rounded-circle"
												src={user_img}
												alt=""
											/>
										)}
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
								<div className="widget-heading">{this.state.User.username}</div>
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
