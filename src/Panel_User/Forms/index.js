import React, { Fragment } from "react";
import { Route } from "react-router-dom";

// Forms

import FormElementsControls from "./Elements/Controls/";
import FormElementsValidation from "./Elements/Validation/";

// Layout

import AppHeader from "../../Layout/AppHeader/";
import AppSidebar from "../../Layout/AppSidebar/UserSidebar";
import AppFooter from "../../Layout/AppFooter/";

const Forms = ({ match }) => (
	<Fragment>
		<AppHeader />
		<div className="app-main">
			<AppSidebar />
			<div className="app-main__outer">
				<div className="app-main__inner">
					{/* Form Elements */}

					<Route
						path={`${match.url}/controls`}
						component={FormElementsControls}
					/>

					<Route
						path={`${match.url}/validation`}
						component={FormElementsValidation}
					/>
				</div>
				<AppFooter />
			</div>
		</div>
	</Fragment>
);

export default Forms;
