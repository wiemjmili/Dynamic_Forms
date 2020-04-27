import React, { Fragment } from "react";

import PageTitle from "../../../Layout/AppMain/PageTitle";

// Examples
import Validate_Proc from "./Validate_Process";

export default class Validate_Process extends React.Component {
	render() {
		return (
			<Fragment>
				<PageTitle
					heading="Validation"
					subheading="Validate requests"
					icon="pe-7s-phone icon-gradient bg-premium-dark"
				/>
				<Validate_Proc />
			</Fragment>
		);
	}
}
