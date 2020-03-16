import React, { Component, Fragment } from "react";
import { withRouter } from "react-router-dom";

import MetisMenu from "react-metismenu";

import {
	MainNav,
	ComponentsNav,
	Security,
	workflow,
	Forms,
	FormsNav,
	WidgetsNav,
	ChartsNav
} from "./NavItems";

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

				<h5 className="app-sidebar__heading">Menu</h5>
				<MetisMenu
					content={MainNav}
					activeLinkFromLocation
					className="vertical-nav-menu"
					iconNamePrefix=""
					classNameStateIcon="pe-7s-angle-down"
				/>

				<h5 className="app-sidebar__heading">Widgets</h5>
				<MetisMenu
					content={WidgetsNav}
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
