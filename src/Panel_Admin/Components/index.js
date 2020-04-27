import React, { Fragment } from "react";
import { Route } from "react-router-dom";

// List_of_worflow

import List_Workflow from "./Listworkflow/List";

// List of Usertasks

import Assign_Tasks from "./Workflow/";

// Drag & Drop Formms

import Drag_Drop from "./Modal/";

// Show Forms

import Show_Forms from "./Forms/";

//New Workflow

import NewWF from "./New_WF";

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
					{/* List_Workflow */}

					<Route path={`${match.url}/list_WF`} component={List_Workflow} />

					{/* new_Workflow */}

					<Route path={`${match.url}/new_WF`} component={NewWF} />

					{/* Workflow */}

					<Route path={`${match.url}/workflow`} component={Assign_Tasks} />

					{/* Modals */}

					<Route path={`${match.url}/Forms`} component={Drag_Drop} />

					{/* Forms */}

					<Route path={`${match.url}/show_Forms`} component={Show_Forms} />
				</div>
				<AppFooter />
			</div>
		</div>
	</Fragment>
);
export default Components;
