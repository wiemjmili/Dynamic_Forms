import React from "react";
import { Table, Button } from "reactstrap";
import axios from "axios";

export default class ListWF extends React.Component {
	state = {
		Workflow: [],
		UserTasks: [],
		i: 0
	};

	componentDidMount() {
		axios.get(`http://localhost:8080/findAllWF`).then((res) => {
			const Workflow = res.data;
			this.setState({ Workflow });
		});
		axios.get(`http://localhost:8080/findAlltasks`).then((res) => {
			const UserTasks = res.data;
			this.setState({ UserTasks });
		});
	}

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
									<input
										readOnly
										className="form-control-plaintext"
										type="text"
										name="name"
										value={WF.name}
									/>
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
									<Button
										className="btn-wide mb-2 mr-2"
										size="lg"
										color="primary"
									>
										Show Workflow
									</Button>
								</td>
							</tr>
						))}
					</tbody>
				</Table>
			</div>
		);
	}
}
