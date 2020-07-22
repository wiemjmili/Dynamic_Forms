import React, { Fragment } from "react";
import { Route } from "react-router-dom";

// List_Process

import List_Process from "./List_Process/";

// Historical_Process

import Historical_Process from "./Historical_Process/";

// Process_To_Validate

import Validate_Process from "./Process_To_Validate/";

// Validated_Process

import Validated_Process from "./Validated_Process/";

// Dashboard

import Dashboard from "./Dashboard/";

// Layout

import AppHeader from "../../Layout/AppHeader/";
import AppSidebar from "../../Layout/AppSidebar/UserSidebar";
import AppFooter from "../../Layout/AppFooter/";

const Components = ({ match }) => (
	<Fragment>
		<AppHeader />
		<div className="app-main">
			<AppSidebar />
			<div className="app-main__outer">
				<div className="app-main__inner">
					{/* Components */}

					{/* List_Process */}

					<Route path={`${match.url}/list_Process`} component={List_Process} />

					{/* Historical_Process */}

					<Route
						path={`${match.url}/historical_Process`}
						component={Historical_Process}
					/>

					{/* Process_To_validate*/}

					<Route
						path={`${match.url}/validate_Process`}
						component={Validate_Process}
					/>

					{/* Validated_Process*/}

					<Route
						path={`${match.url}/validated_Process`}
						component={Validated_Process}
					/>

					{/* Dashboard*/}

					<Route path={`${match.url}/Dashboard`} component={Dashboard} />
				</div>
				<AppFooter />
			</div>
		</div>
	</Fragment>
);

export default Components;
