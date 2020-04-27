import React, { Fragment } from "react";
import { Table, Button } from "reactstrap";
import axios from "axios";
import base_url from "../../../../../src/service/base_url";
import { toast, Bounce } from "react-toastify";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import { Row, Col, Card, CardBody } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";

export default class ListUT extends React.Component {
	state = {
		userTasks: [],
		groups: [],
		tab: [],
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

	handleChangeWF = (event) => {
		this.setState({ nameWF: event.target.value });
	};

	getUT_GP = (event) => {
		event.preventDefault();
		const nameWF = this.state.nameWF;
		let url = base_url.all_UserTasks() + "/" + nameWF;
		axios.get(url).then((res) => {
			const userTasks = res.data;
			this.setState({ userTasks });
		});
	};

	handleChangeUT = (event) => {
		this.setState({ name: event.target.value });
	};
	handleChangeGp = (event) => {
		let value = Array.from(
			event.target.selectedOptions,
			(option) => option.value
		);
		this.setState({ gp: value });
	};

	affectGroup = (event) => {
		event.preventDefault();
		let n1 = this.state.gp.length;
		let n2 = this.state.groups.length;

		for (let i = 0; i < n1; i++) {
			let find = false;
			let j = 0;
			while (find == false && j < n2) {
				if (this.state.gp[i] == this.state.groups[j].name_GP) {
					this.state.tab.push(this.state.groups[j]);
					find = true;
				} else {
					j++;
				}
			}
		}
		const nameWF = this.state.nameWF;
		let get_UT = base_url.all_UserTasks() + "/" + nameWF;
		let update_UT = base_url.update_UT();
		fetch(update_UT, {
			method: "post",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				name: this.state.name,
				group: this.state.tab,
			}),
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
		window.location.reload(false);
	};

	render() {
		const { name, nameWF } = this.state;
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
												onChange={this.handleChangeWF}
												className="browser-default custom-select"
											>
												<option selected value="" value={nameWF}></option>
												{this.state.workflow.map((WF) => (
													<option name="nameWF">{WF.name}</option>
												))}
											</select>
										</Col>
										<Col lg="2">
											<form onSubmit={this.getUT_GP}>
												<Button
													className="btn-wide mb-1 mr-1"
													size="lg"
													color="secondary"
												>
													<FontAwesomeIcon icon={faAngleRight} size="1x" />
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
												onChange={this.handleChangeUT}
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
												multiple={true}
												required
												onChange={this.handleChangeGp}
												className="browser-default custom-select"
											>
												{this.state.groups.map((group) => (
													<option
														name="group"
														selectedOptions
														value={group.name_GP}
													>
														{group.name_GP}
													</option>
												))}
											</select>
										</Col>
										<Col lg="2">
											<form onSubmit={this.affectGroup}>
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
														<td>
															{usertask.group.map((gp) => (
																<div>{gp.name_GP}</div>
															))}
														</td>
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
