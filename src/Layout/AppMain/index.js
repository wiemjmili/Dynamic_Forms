import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import React, { Suspense, lazy, Fragment } from "react";

import { ToastContainer } from "react-toastify";

const Components = lazy(() => import("../../Panel_Admin/Components"));
const Listworkflow = lazy(() => import("../../Panel_Admin/Listworkflow"));

const AppMain = () => {
	return (
		<Fragment>
			{/* Components */}

			<Suspense
				fallback={
					<div className="loader-container">
						<div className="loader-container-inner">
							<h6 className="mt-5">
								Please wait while we load all the Components examples
								<small>
									Because this is a demonstration we load at once all the
									Components examples. This wouldn't happen in a real live app!
								</small>
							</h6>
						</div>
					</div>
				}
			>
				<Route path="/components" component={Components} />
			</Suspense>

			{/* ListWorkflow */}

			<Suspense
				fallback={
					<div className="loader-container">
						<div className="loader-container-inner">
							<h6 className="mt-3">
								Please wait while we load all the Charts examples
								<small>
									Because this is a demonstration we load at once all the Charts
									examples. This wouldn't happen in a real live app!
								</small>
							</h6>
						</div>
					</div>
				}
			>
				<Route path="/listWF" component={Listworkflow} />
			</Suspense>

			<Route exact path="/" render={() => <Redirect to="/listWF/list" />} />
			<ToastContainer />
		</Fragment>
	);
};

export default AppMain;
