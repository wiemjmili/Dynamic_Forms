import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import React, { Suspense, lazy, Fragment } from "react";

import { ToastContainer } from "react-toastify";

const Widgets = lazy(() => import("../../DemoPages/Widgets"));
const Elements = lazy(() => import("../../DemoPages/Elements"));
const Components = lazy(() => import("../../DemoPages/Components"));
const Listworkflow = lazy(() => import("../../DemoPages/Listworkflow"));
const Forms = lazy(() => import("../../DemoPages/Forms"));
const Tables = lazy(() => import("../../DemoPages/Tables"));

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

			{/* Forms */}

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

			{/* Charts */}

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

			{/* Tables */}

			<Suspense
				fallback={
					<div className="loader-container">
						<div className="loader-container-inner">
							<h6 className="mt-5">
								Please wait while we load all the Tables examples
								<small>
									Because this is a demonstration we load at once all the Tables
									examples. This wouldn't happen in a real live app!
								</small>
							</h6>
						</div>
					</div>
				}
			>
				<Route path="/tables" component={Tables} />
			</Suspense>

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

			{/* Dashboard Widgets */}

			<Suspense
				fallback={
					<div className="loader-container">
						<div className="loader-container-inner">
							<h6 className="mt-3">
								Please wait while we load all the Dashboard Widgets examples
								<small>
									Because this is a demonstration we load at once all the
									Dashboard Widgets examples. This wouldn't happen in a real
									live app!
								</small>
							</h6>
						</div>
					</div>
				}
			>
				<Route path="/widgets" component={Widgets} />
			</Suspense>

			<Route exact path="/" render={() => <Redirect to="/listWF/list" />} />
			<ToastContainer />
		</Fragment>
	);
};

export default AppMain;
