import React, { Fragment } from "react";
import PageTitle from "../../../Layout/AppMain/PageTitle";
import Forms from "./ShowForms/forms";

export default class Show_Forms extends React.Component {
	render() {
		return (
			<Fragment>
				<PageTitle
					heading="Show Forms"
					subheading="Sow forms with slideshows."
					icon="pe-7s-id"
				/>
				<Forms />
			</Fragment>
		);
	}
}
