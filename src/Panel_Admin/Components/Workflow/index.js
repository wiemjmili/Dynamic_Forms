import React, { Fragment } from "react";
import PageTitle from "../../../Layout/AppMain/PageTitle";
import ListUT from "./UserTask/listUtask";

export default class Assign_Tasks extends React.Component {
	render() {
		return (
			<Fragment>
				<PageTitle
					heading="Workflow"
					subheading="Assign Tasks"
					icon="pe-7s-exapnd2"
				/>
				<ListUT />
			</Fragment>
		);
	}
}
