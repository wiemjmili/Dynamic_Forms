import React, { Fragment } from "react";

import PageTitle from "../../../Layout/AppMain/PageTitle";
import Histo_Process from "./Historical_Process";

export default class Historical_Process extends React.Component {
	render() {
		return (
			<Fragment>
				<PageTitle
					heading="Requests"
					subheading="List of historical process"
					icon="pe-7s-id"
				/>
				<Histo_Process />
			</Fragment>
		);
	}
}
