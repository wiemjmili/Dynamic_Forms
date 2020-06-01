import React, { Fragment } from "react";

import PageTitle from "../../../Layout/AppMain/PageTitle";
import Histo_Process from "./Groups";

export default class Historical_Process extends React.Component {
	render() {
		return (
			<Fragment>
				<PageTitle
					heading="Manage groups"
					subheading="List of groups"
					icon="pe-7s-users"
				/>
				<Histo_Process />
			</Fragment>
		);
	}
}
