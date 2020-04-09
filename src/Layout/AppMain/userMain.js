import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import React, { Suspense, lazy, Fragment } from "react";

import { ToastContainer } from "react-toastify";

const Elements = lazy(() => import("../../Panel_User/Elements"));
const Components = lazy(() => import("../../Panel_User/Components"));
const Forms = lazy(() => import("../../Panel_User/Forms"));

const UserMain = () => {
	return (
		<Fragment>
			{/* Elements */}

			<Suspense
				fallback={
					<div className="loader-container">
						<div className="loader-container-inner">
							<h6 className="mt-3">
								Please wait while we load all the Elements examples
								<small>
									Because this is a demonstration we load at once all the
									Elements examples. This wouldn't happen in a real live app!
								</small>
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
			<Suspense
				fallback={
					<div className="loader-container">
						<div className="loader-container-inner">
							<h6 className="mt-5">
								Please wait while we load all the Forms examples
								<small>
									Because this is a demonstration we load at once all the Forms
									examples. This wouldn't happen in a real live app!
								</small>
							</h6>
						</div>
					</div>
				}
			>
				<Route path="/forms" component={Forms} />
			</Suspense>

			<Route exact path="/" render={() => <Redirect to="/elements" />} />
			<ToastContainer />
		</Fragment>
	);
};

export default UserMain;
