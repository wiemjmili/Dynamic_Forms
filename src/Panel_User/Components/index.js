import React, { Fragment } from "react";
import { Route } from "react-router-dom";

// List_Process

import List_Process from "./List_Process/";

// Historical_Process

import Historical_Process from "./Historical_Process/";

// Validate_Process

import Validate_Process from "./Validate_Process/";

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

					{/* Validate_Process */}

					<Route
						path={`${match.url}/validate_Process`}
						component={Validate_Process}
					/>
				</div>
				<AppFooter />
			</div>
		</div>
	</Fragment>
);

export default Components;
