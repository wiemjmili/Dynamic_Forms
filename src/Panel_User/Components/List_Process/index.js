import React, { Fragment } from "react";

import PageTitle from "../../../Layout/AppMain/PageTitle";
import Process from "./List_Process";

export default class List_Process extends React.Component {
	render() {
		return (
			<Fragment>
				<PageTitle
					heading="List Process"
					subheading="List of access process"
					icon="pe-7s-id"
				/>
				<Process />
			</Fragment>
		);
	}
}
