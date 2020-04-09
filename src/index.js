import React from "react";
import ReactDOM from "react-dom";
// import registerServiceWorker from './registerServiceWorker';
import { unregister } from "./registerServiceWorker";
import { HashRouter } from "react-router-dom";
import "./assets/base.css";
import Main from "./Panel_Admin/Main";
//import Main from "./Panel_User/Main";
import configureStore from "./config/configureStore";
import { Provider } from "react-redux";

const store = configureStore();
const rootElement = document.getElementById("root");

const renderApp = (Component) => {
	ReactDOM.render(
		<Provider store={store}>
			<HashRouter>
				<Component />
			</HashRouter>
		</Provider>,
		rootElement
	);
};

renderApp(Main);
/*
if (module.hot) {
	module.hot.accept("./AdminPanel/Main", () => {
		const NextApp = require("./AdminPanel/Main").default;
		renderApp(NextApp);
	});
}
if (module.hot) {
	module.hot.accept("./Panel_User/Main", () => {
		const NextApp = require("./Panel_User/Main").default;
		renderApp(NextApp);
	});
}*/
unregister();
