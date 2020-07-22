import React from "react";
import ReactDOM from "react-dom";
import registerServiceWorker from "./registerServiceWorker";
import { unregister } from "./registerServiceWorker";
import { HashRouter } from "react-router-dom";
import "./assets/base.css";
import App from "./app";
import configureStore from "./config/configureStore";
import { Provider } from "react-redux";

const store = configureStore();
ReactDOM.render(
	<Provider store={store}>
		<HashRouter>
			<App />
		</HashRouter>
	</Provider>,
	document.getElementById("root")
);
registerServiceWorker();

unregister();
