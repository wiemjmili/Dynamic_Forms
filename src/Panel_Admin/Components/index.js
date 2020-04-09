import React, { Fragment } from "react";
import { Route } from "react-router-dom";

// List of Usertasks

import Assign_Tasks from "./Workflow/";

// Modals

import Drag_Drop from "./Modal/";

// Forms

import Forms_WF from "./Forms/";

// Layout

import AppHeader from "../../Layout/AppHeader/";
import AppSidebar from "../../Layout/AppSidebar/";
import AppFooter from "../../Layout/AppFooter/";

const Components = ({ match }) => (
	<Fragment>
		<AppHeader />
		<div className="app-main">
			<AppSidebar />
			<div className="app-main__outer">
				<div className="app-main__inner">
					{/* Workflow */}

					<Route path={`${match.url}/workflow`} component={Assign_Tasks} />

					{/* Forms */}

					<Route path={`${match.url}/Forms`} component={Forms_WF} />

					{/* Modals */}

					<Route path={`${match.url}/modals`} component={Drag_Drop} />
				</div>
				<AppFooter />
			</div>
		</div>
	</Fragment>
);

export default Components;
