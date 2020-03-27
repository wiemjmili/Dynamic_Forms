import React from "react";
import { Table, Button, ButtonGroup } from "reactstrap";
import axios from "axios";
import base_url from "../../../../../src/api/base_url";

export default class ListUT extends React.Component {
	state = {
		UserTasks: [],
		Groups: [],
		group: "",
		name: "",
		nameWF: "",
		Workflow: []
	};

	componentDidMount() {
		axios.get(base_url.all_Groups()).then((res) => {
			const Groups = res.data;
			this.setState({ Groups });
		});

		axios.get(base_url.all_WF()).then((res) => {
			const Workflow = res.data;
			this.setState({ Workflow });
		});
	}

	handleChange = (event) => {
		this.setState({ nameWF: event.target.value });
		console.log(this.state.nameWF);
	};

	handleSubmit = (event) => {
		event.preventDefault();
		const nameWF = this.state.nameWF;
		let url = base_url.all_UserTasks() + "/" + nameWF;
		axios.get(url).then((res) => {
			const UserTasks = res.data;
			this.setState({ UserTasks });
		});
	};

	handleChange1 = (event) => {
		this.setState({ name: event.target.value });
		console.log(this.state.name);
	};

	handleChange2 = (event) => {
		this.setState({ group: event.target.value });
		console.log(this.state.group);
	};

	handleSubmit2 = (event) => {
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
		const nameWF = this.state.nameWF;
		let url = base_url.all_UserTasks() + "/" + nameWF;
		axios.get(url).then((res) => {
			const UserTasks = res.data;
			this.setState({ UserTasks });
		});
	};

	render() {
		const { name, group, nameWF } = this.state;
		return (
			<div>
				<Table className="mb-0">
					<tbody>
						<tr>
							<td>
								<div className="card-header-title fsize-2 text-capitalize font-weight-normal">
									List of Workflow
								</div>
							</td>
							<td>
								<select
									onChange={this.handleChange}
									className="browser-default custom-select"
								>
									<option selected value="" value={nameWF}></option>
									{this.state.Workflow.map((WF) => (
										<option name="nameWF">{WF.name}</option>
									))}
								</select>
							</td>
							<td>
								<form onSubmit={this.handleSubmit}>
									<Button
										outline
										className="mb-2 mr-2 btn-transition"
										color="info"
									>
										>>
									</Button>
								</form>
								<div className="mbg-3 h-auto pl-0 pr-0 bg-transparent no-border card-header">
									<div className="card-header-title fsize-2 text-capitalize font-weight-normal"></div>
								</div>
							</td>
						</tr>
						<tr>
							<td>
								<div className="card-header-title fsize-2 text-capitalize ">
									List of User Tasks
								</div>
							</td>
						</tr>
						<tr>
							<td>
								<select
									onChange={this.handleChange1}
									className="browser-default custom-select"
								>
									<option selected value="" value={name}></option>
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
									<option selected value="" value={group}></option>
									{this.state.Groups.map((Group) => (
										<option name="group">{Group.name_GP}</option>
									))}
								</select>
							</td>
							<td>
								<form onSubmit={this.handleSubmit2}>
									<Button className="btn-wide mb-2 mr-2" size="lg" color="info">
										Affect Group
									</Button>
								</form>
							</td>
						</tr>
					</tbody>
				</Table>
				<Table className="mb-0">
					<tbody>
						<tr>
							<th></th>
							<th>User Task</th>
							<th>Group</th>
							<th></th>
							<th></th>
						</tr>
						{this.state.UserTasks.map((Usertask) => (
							<tr>
								<td></td>
								{Usertask.group.length != 0 && <td>{Usertask.name}</td>}
								{Usertask.group.length != 0 && (
									<td>{Usertask.group[0].name_GP}</td>
								)}
								<td></td>
							</tr>
						))}
					</tbody>
				</Table>
			</div>
		);
	}
}
