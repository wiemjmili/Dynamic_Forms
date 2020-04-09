import React, { Fragment } from "react";
import { Table, Button } from "reactstrap";
import axios from "axios";
import base_url from "../../../../../src/service/base_url";
import { toast, Bounce } from "react-toastify";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import { Row, Col, Card, CardBody } from "reactstrap";

export default class ListUT extends React.Component {
	state = {
		userTasks: [],
		groups: [],
		group: "",
		name: "",
		nameWF: "",
		workflow: [],
	};

	componentDidMount() {
		axios.get(base_url.all_Groups()).then((res) => {
			const groups = res.data;
			this.setState({ groups });
		});

		axios.get(base_url.all_WF()).then((res) => {
			const workflow = res.data;
			this.setState({ workflow });
		});
	}

	handleChange = (event) => {
		this.setState({ nameWF: event.target.value });
	};

	handleSubmit = (event) => {
		event.preventDefault();
		const nameWF = this.state.nameWF;
		let url = base_url.all_UserTasks() + "/" + nameWF;
		axios.get(url).then((res) => {
			const userTasks = res.data;
			this.setState({ userTasks });
		});
	};

	handleChange1 = (event) => {
		this.setState({ name: event.target.value });
	};

	handleChange2 = (event) => {
		this.setState({ group: event.target.value });
	};

	handleSubmit2 = (event) => {
		event.preventDefault();
		console.log(this.state.name);
		console.log(this.state.group);
		const nameWF = this.state.nameWF;
		let get_UT = base_url.all_UserTasks() + "/" + nameWF;
		let update_UT = base_url.update_UT();
		fetch(update_UT, {
			method: "post",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				name: this.state.name,
				groupN: this.state.group,
			}),
		});
		axios.get(get_UT).then((res) => {
			const userTasks = res.data;
			this.setState({ userTasks });
		});
		this.toastId = toast(
			"Candidate group successfully added for user task " +
				"'" +
				this.state.name +
				"'",
			{
				transition: Bounce,
				closeButton: true,
				autoClose: 5000,
				position: "bottom-center",
				type: "success",
			}
		);
	};

	render() {
		const { name, group, nameWF } = this.state;
		return (
			<Fragment>
				<ReactCSSTransitionGroup
					component="div"
					transitionName="TabsAnimation"
					transitionAppear={true}
					transitionAppearTimeout={0}
					transitionEnter={false}
					transitionLeave={false}
				>
					<Row>
						<Col lg="12">
							<Card className="main-card mb-3">
								<CardBody>
									<Row>
										<Col lg="3">
											<div className="card-header-title fsize-2 text-capitalize ">
												List of Workflow
											</div>
										</Col>
										<Col lg="4">
											<select
												required
												onChange={this.handleChange}
												className="browser-default custom-select"
											>
												<option selected value="" value={nameWF}></option>
												{this.state.workflow.map((WF) => (
													<option name="nameWF">{WF.name}</option>
												))}
											</select>
										</Col>
										<Col lg="2">
											{" "}
											<form onSubmit={this.handleSubmit}>
												<Button
													className="btn-wide mb-1 mr-1"
													size="lg"
													color="secondary"
												>
													>>
												</Button>
											</form>
										</Col>
									</Row>
									<div className="mbg-3 h-auto pl-0 pr-0 bg-transparent no-border card-header">
										<div className="card-header-title fsize-2 text-capitalize font-weight-normal"></div>
									</div>
									<Row>
										<Col lg="5">
											<div className="card-header-title fsize-2 text-capitalize ">
												List of user tasks
											</div>
										</Col>
										<Col lg="6">
											<div className="card-header-title fsize-2 text-capitalize ">
												List of groups
											</div>
										</Col>
									</Row>
									<div className="mbg-3 h-auto pl-0 pr-0 bg-transparent no-border card-header">
										<div className="card-header-title fsize-2 text-capitalize font-weight-normal"></div>
									</div>
									<Row>
										<Col lg="5">
											<select
												required
												onChange={this.handleChange1}
												className="browser-default custom-select"
											>
												<option selected value="" value={name}></option>
												{this.state.userTasks.map((usertask) => (
													<option name="name">{usertask.name}</option>
												))}
											</select>
										</Col>
										<Col lg="5">
											<select
												required
												onChange={this.handleChange2}
												className="browser-default custom-select"
											>
												<option selected value="" value={group}></option>
												{this.state.groups.map((group) => (
													<option name="group">{group.name_GP}</option>
												))}
											</select>
										</Col>
										<Col lg="2">
											<form onSubmit={this.handleSubmit2}>
												<Button
													className="btn-wide mb-1 mr-1"
													size="lg"
													color="secondary"
												>
													Affect Group
												</Button>
											</form>
										</Col>
									</Row>
									<div className="mbg-3 h-auto pl-0 pr-0 bg-transparent no-border card-header">
										<div className="card-header-title fsize-2 text-capitalize font-weight-normal"></div>
									</div>
									<Table>
										<tbody>
											<tr>
												<th></th>
												<th>User Task</th>
												<th>Group</th>
											</tr>
											{this.state.userTasks.map((usertask) => (
												<tr>
													<td></td>
													{usertask.group.length != 0 && (
														<td>{usertask.name}</td>
													)}
													{usertask.group.length != 0 && (
														<td>{usertask.group[0].name_GP}</td>
													)}
												</tr>
											))}
										</tbody>
									</Table>
								</CardBody>
							</Card>
						</Col>
					</Row>
				</ReactCSSTransitionGroup>
			</Fragment>
		);
	}
}
