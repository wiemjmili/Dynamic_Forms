import React, { Fragment } from "react";
import { Route } from "react-router-dom";

// COMPONENTS

// Tabs

import TabExample from "./Tabs/";

// Tooltips & Popovers

import TooltipsPopoversExample from "./TooltipsPopovers/";

// Progress Bar

import ProgressBarsExamples from "./ProgressBar/";

// Maps

import MapsExample from "./Maps/";

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

					{/* Tabs */}

					<Route path={`${match.url}/tabs`} component={TabExample} />

					{/* Tooltips & Popovers */}

					<Route
						path={`${match.url}/tooltips-popovers`}
						component={TooltipsPopoversExample}
					/>

					{/* Progress Bar */}

					<Route
						path={`${match.url}/progress-bar`}
						component={ProgressBarsExamples}
					/>

					{/* Maps */}

					<Route path={`${match.url}/maps`} component={MapsExample} />
				</div>
				<AppFooter />
			</div>
		</div>
	</Fragment>
);

export default Components;
