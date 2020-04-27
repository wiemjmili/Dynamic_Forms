import React, { Fragment } from "react";
import PageTitle from "../../../Layout/AppMain/PageTitle";
import BpmnBoard from "./containers/BpmnBoard/index";

export default class New_WF extends React.Component {
	render() {
		return (
			<Fragment>
				<PageTitle
					heading="Workflow"
					subheading="Assign Tasks"
					icon="pe-7s-network "
				/>
				<BpmnBoard />
			</Fragment>
		);
	}
}
