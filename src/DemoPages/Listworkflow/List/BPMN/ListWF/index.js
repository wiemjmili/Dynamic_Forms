import React from "react";
import base_url from "../../../../../../src/api/base_url";
import { Table, Button } from "reactstrap";
import axios from "axios";

export default class ListWF extends React.Component {
	state = {
		Workflow: [],
		UserTasks: [],
		WF: "",
		name: "",
		id: "",
		i: 0
	};

	componentDidMount() {
		axios.get(base_url.all_WF()).then((res) => {
			const Workflow = res.data;
			this.setState({ Workflow });
		});
		axios.get(base_url.all_UserTasks()).then((res) => {
			const UserTasks = res.data;
			this.setState({ UserTasks });
		});
	}
	handleSubmit = (event) => {
		event.preventDefault();
		const count = this.state.Workflow.length;
		const id = this.state.Workflow[count - 1].id;
		axios.get(base_url.all_WF() + id).then((res) => {
			const WF = res.data;
			this.setState({ WF });
		});
		//console.log(this.state.WF.wfxml);
	};

	render() {
		return (
			<div>
				<Table className="mb-0">
					<thead>
						<tr>
							<th>Name </th>
							<th>Tasks</th>
							<th>Workflow</th>
						</tr>
					</thead>

					<tbody>
						{this.state.Workflow.map((WF) => (
							<tr>
								<td>
									<h6>
										<input
											readOnly
											className="form-control-plaintext"
											type="text"
											name="name"
											value={(this.state.name = WF.name)}
										/>
									</h6>
								</td>
								<td>
									{this.state.UserTasks.map((Usertask) => (
										<h6>
											{Usertask.workFlow.id == WF.id && (
												<h6>{Usertask.name}</h6>
											)}
										</h6>
									))}
								</td>

								<td>
									<form onSubmit={this.handleSubmit}>
										<Button
											outline
											className="mb-2 mr-2 btn-transition"
											color="primary"
										>
											Show Workflow
										</Button>
									</form>
								</td>
							</tr>
						))}
					</tbody>
				</Table>
			</div>
		);
	}
}
