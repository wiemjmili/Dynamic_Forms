import React, { Fragment } from "react";
import { Table, Button } from "reactstrap";
import PageTitle from "../../../Layout/AppMain/PageTitle";
import ListUT from "./UserTask/ListUTask";
import axios from "axios";

export default class Assign_Tasks extends React.Component {
	render() {
		return (
			<Fragment>
				<PageTitle
					heading="Workflow"
					subheading="Assign Tasks"
					icon="pe-7s-network "
				/>
				<ListUT />
			</Fragment>
		);
	}
}
