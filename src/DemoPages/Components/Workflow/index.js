import React, { Fragment } from "react";

import PageTitle from "../../../Layout/AppMain/PageTitle";
import ListUT from "./Examples/ListUTask";
import axios from "axios";

export default class WorkflowExamples extends React.Component {
	state = {
		nameWF: ""
	};
	componentDidMount() {
		axios.get(`http://localhost:8080/findTasksWF`).then((res) => {
			const UserTasks = res.data;
			this.setState({ UserTasks });
			this.setState({ nameWF: UserTasks[0].workFlow.name });
		});
	}
	render() {
		return (
			<Fragment>
				<PageTitle
					heading="Workflow"
					subheading="List of User tasks of the last workflow "
					icon="pe-7s-network icon-gradient bg-love-kiss"
				/>
				<div className="mbg-3 h-auto pl-0 pr-0 bg-transparent no-border card-header">
					<div className="card-header-title fsize-2 text-capitalize font-weight-normal">
						Workflow Name : {this.state.nameWF}
					</div>
				</div>
				<div className="card-header-title fsize-2 text-capitalize font-weight-normal">
					List of User Tasks
				</div>
				<ListUT />
			</Fragment>
		);
	}
}
