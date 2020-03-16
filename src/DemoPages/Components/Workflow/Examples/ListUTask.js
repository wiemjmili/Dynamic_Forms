import React from "react";
import { Table, Button, ButtonGroup } from "reactstrap";
import axios from "axios";
import { toast, Bounce } from "react-toastify";

export default class ListUT extends React.Component {
	state = {
		UserTasks: [],
		Groups: [],
		group: "",
		name: "",
		nameWF: ""
	};

	componentDidMount() {
		axios.get(`http://localhost:8080/findTasksWF`).then((res) => {
			const UserTasks = res.data;
			this.setState({ UserTasks });
			this.setState({ nameWF: UserTasks[0].workFlow.name });
		});
		axios.get(`http://localhost:8080/findAllGroups`).then((res) => {
			const Groups = res.data;
			this.setState({ Groups });
		});
	}
	handleChange1 = (event) => {
		this.setState({ name: event.target.value });
	};
	handleChange2 = (event) => {
		this.setState({ group: event.target.value });
	};

	handleSubmit = (event) => {
		event.preventDefault();
		fetch("/updateUT", {
			method: "post",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				name: this.state.name,
				groupN: this.state.group
			})
		}).then((d) => {
			console.log({ d });
		});
		console.log(this.state.name);
		console.log(this.state.group);
	};

	render() {
		return (
			<div>
				<Table className="mb-0">
					<tbody>
						<tr>
							<td>
								<select
									onChange={this.handleChange1}
									className="browser-default custom-select"
								>
									<option selected value="" value={this.state.name}></option>
									{this.state.UserTasks.map((Usertask) => (
										<option name="name">{Usertask.name}</option>
									))}
								</select>
							</td>
							<td>
								<select
									onChange={this.handleChange2}
									className="browser-default custom-select"
								>
									<option selected value="" value={this.state.group}></option>
									{this.state.Groups.map((Group) => (
										<option name="group">{Group.name_GP}</option>
									))}
								</select>
							</td>
							<td>
								<form onSubmit={this.handleSubmit}>
									<Button
										className="btn-wide mb-2 mr-2"
										size="lg"
										color="primary"
									>
										Affect
									</Button>
								</form>
							</td>
						</tr>
					</tbody>
				</Table>
			</div>
		);
	}
}
