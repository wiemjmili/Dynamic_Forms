import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import React, { Suspense, lazy, Fragment } from "react";

import { ToastContainer } from "react-toastify";

const Components = lazy(() => import("../../Panel_Admin/Components"));

const AppMain = () => {
	return (
		<Fragment>
			{/* Components */}

			<Suspense
				fallback={
					<div className="loader-container">
						<div className="loader-container-inner">
							<h6 className="mt-5">
								Please wait while we load all the Components
							</h6>
						</div>
					</div>
				}
			>
				<Route path="/components" component={Components} />
			</Suspense>

			<Route exact path="/" render={() => <Redirect to="/components/list" />} />

			<ToastContainer />
		</Fragment>
	);
};

export default AppMain;
