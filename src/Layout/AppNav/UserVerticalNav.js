import React, { Component, Fragment } from "react";
import { withRouter } from "react-router-dom";

import MetisMenu from "react-metismenu";

import { ComponentsNav, FormsNav } from "./UserNavItems";

class Nav extends Component {
	state = {};

	render() {
		return (
			<Fragment>
				<h5 className="app-sidebar__heading">UI Components</h5>
				<MetisMenu
					content={ComponentsNav}
					activeLinkFromLocation
					className="vertical-nav-menu"
					iconNamePrefix=""
					classNameStateIcon="pe-7s-angle-down"
				/>
				<h5 className="app-sidebar__heading">Form</h5>
				<MetisMenu
					content={FormsNav}
					activeLinkFromLocation
					className="vertical-nav-menu"
					iconNamePrefix=""
					classNameStateIcon="pe-7s-angle-down"
				/>
			</Fragment>
		);
	}

	isPathActive(path) {
		return this.props.location.pathname.startsWith(path);
	}
}

export default withRouter(Nav);
