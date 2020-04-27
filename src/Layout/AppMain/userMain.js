import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import React, { Suspense, lazy, Fragment } from "react";

import { ToastContainer } from "react-toastify";

const Elements = lazy(() => import("../../Panel_User/Elements"));
const Components = lazy(() => import("../../Panel_User/Components"));

const UserMain = () => {
	return (
		<Fragment>
			{/* Elements */}

			<Suspense
				fallback={
					<div className="loader-container">
						<div className="loader-container-inner">
							<h6 className="mt-3">
								Please wait while we load all the Elements
							</h6>
						</div>
					</div>
				}
			>
				<Route path="/elements" component={Elements} />
			</Suspense>
			{/* Components */}

			<Suspense
				fallback={
					<div className="loader-container">
						<div className="loader-container-inner">
							<h6 className="mt-5">
								Please wait while we load all the Components examples
							</h6>
						</div>
					</div>
				}
			>
				<Route path="/components" component={Components} />
			</Suspense>

			<Route
				exact
				path="/"
				render={() => <Redirect to="/components/list_Process" />}
			/>
			<ToastContainer />
		</Fragment>
	);
};

export default UserMain;
