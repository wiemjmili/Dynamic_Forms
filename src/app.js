import React, { Component } from "react";
import { HashRouter, Route, Switch } from "react-router-dom";

const loading = () => (
	<div className="loader-container">
		<div className="loader-container-inner">
			<h6 className="mt-5">Please wait while we load all the Components</h6>
		</div>
	</div>
);

const Login = React.lazy(() => import("./Pages/Login"));
const Admin_Panel = React.lazy(() => import("./Panel_Admin/Main"));
const User_Panel = React.lazy(() => import("./Panel_User/Main"));

class App extends Component {
	render() {
		return (
			<HashRouter>
				<React.Suspense fallback={loading()}>
					<Switch>
						<Route
							exact
							path="/"
							name="Login Page"
							render={(props) => <Login {...props} />}
						/>
						<Route
							path="/components/users"
							name="Admin Page"
							render={(props) => <Admin_Panel {...props} />}
						/>
						<Route
							path="/components/groups"
							name="Admin Page"
							render={(props) => <Admin_Panel {...props} />}
						/>
						<Route
							path="/components/roles"
							name="Admin Page"
							render={(props) => <Admin_Panel {...props} />}
						/>
						<Route
							path="/components/list_WF"
							name="Admin Page"
							render={(props) => <Admin_Panel {...props} />}
						/>
						<Route
							path="/components/workflow"
							name="Admin Page"
							render={(props) => <Admin_Panel {...props} />}
						/>
						<Route
							path="/components/new_WF"
							name="User Page"
							render={(props) => <Admin_Panel {...props} />}
						/>
						<Route
							path="/components/show_Forms"
							name="Admin Page"
							render={(props) => <Admin_Panel {...props} />}
						/>
						<Route
							path="/components/Forms"
							name="Admin Page"
							render={(props) => <Admin_Panel {...props} />}
						/>

						<Route
							path="/components/list_Process"
							name="User Page"
							render={(props) => <User_Panel {...props} />}
						/>
						<Route
							path="/elements"
							name="User Page"
							render={(props) => <User_Panel {...props} />}
						/>
						<Route
							path="/components/validate_Process"
							name="User Page"
							render={(props) => <User_Panel {...props} />}
						/>
						<Route
							path="/components/validated_Process"
							name="User Page"
							render={(props) => <User_Panel {...props} />}
						/>
						<Route
							path="/components/historical_Process"
							name="User Page"
							render={(props) => <User_Panel {...props} />}
						/>
					</Switch>
				</React.Suspense>
			</HashRouter>
		);
	}
}
export default App;
