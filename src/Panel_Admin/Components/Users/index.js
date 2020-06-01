import React, { Fragment } from "react";

import PageTitle from "../../../Layout/AppMain/PageTitle";
import Histo_Process from "./Users";

export default class Historical_Process extends React.Component {
	render() {
		return (
			<Fragment>
				<PageTitle
					heading="Manage Users"
					subheading="List of users"
					icon="pe-7s-user"
				/>
				<Histo_Process />
			</Fragment>
		);
	}
}
