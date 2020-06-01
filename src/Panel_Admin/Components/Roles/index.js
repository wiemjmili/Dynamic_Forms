import React, { Fragment } from "react";

import PageTitle from "../../../Layout/AppMain/PageTitle";
import Histo_Process from "./Roles";

export default class Historical_Process extends React.Component {
	render() {
		return (
			<Fragment>
				<PageTitle
					heading="Manage Roles"
					subheading="List of roles"
					icon="pe-7s-id"
				/>
				<Histo_Process />
			</Fragment>
		);
	}
}
