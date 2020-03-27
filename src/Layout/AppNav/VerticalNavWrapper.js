import React, { Component, Fragment } from "react";
import { withRouter } from "react-router-dom";

import MetisMenu from "react-metismenu";

import { ComponentsNav, Security, workflow, Forms, FormsNav } from "./NavItems";

class Nav extends Component {
	state = {};

	render() {
		return (
			<Fragment>
				<h5 className="app-sidebar__heading">Workflow</h5>
				<MetisMenu
					content={workflow}
					activeLinkFromLocation
					className="vertical-nav-menu"
					iconNamePrefix=""
					classNameStateIcon="pe-7s-angle-down"
				/>
				<h5 className="app-sidebar__heading">Forms</h5>
				<MetisMenu
					content={Forms}
					activeLinkFromLocation
					className="vertical-nav-menu"
					iconNamePrefix=""
					classNameStateIcon="pe-7s-angle-down"
				/>

				<h5 className="app-sidebar__heading">Security</h5>
				<MetisMenu
					content={Security}
					activeLinkFromLocation
					className="vertical-nav-menu"
					iconNamePrefix=""
					classNameStateIcon="pe-7s-angle-down"
				/>
				<h5 className="app-sidebar__heading">Forms</h5>
				<MetisMenu
					content={FormsNav}
					activeLinkFromLocation
					className="vertical-nav-menu"
					iconNamePrefix=""
					classNameStateIcon="pe-7s-angle-down"
				/>
				<h5 className="app-sidebar__heading">UI Components</h5>
				<MetisMenu
					content={ComponentsNav}
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
