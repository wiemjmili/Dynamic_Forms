import React, { Fragment } from "react";
import { Table, Button } from "reactstrap";
import axios from "axios";
import base_url from "../../../../../src/service/base_url";
import { toast, Bounce } from "react-toastify";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import { Row, Col, Card, CardBody, Label } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import Select from "react-select";

export default class ListUT extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			userTasks: [],
			tabGp: [],
			selectedOptionGP: null,
			options: [],
			optionsUT: [],
			options: [],
			optionsWF: [],
		};
		this.affectGroup = this.affectGroup.bind(this);
		this.getUT = this.getUT.bind(this);
	}

	componentDidMount() {
		axios.get(base_url.all_WF()).then((res) => {
			const workflow = res.data;
			this.setState({ workflow });
			const n = this.state.workflow.length;
			let optionsWF = [];
			for (let i = 0; i < n; i++) {
				let WF = {
					value: this.state.workflow[i].id,
					label: this.state.workflow[i].name,
				};
				optionsWF.push(WF);
			}
			this.setState({ optionsWF });
		});

		axios.get(base_url.all_Groups()).then((res) => {
			const groups = res.data;
			this.setState({ groups });
			const n = this.state.groups.length;
			let options = [];
			for (let i = 0; i < n; i++) {
				let gp = {
					value: this.state.groups[i].name_GP,
					label: this.state.groups[i].name_GP,
				};
				options.push(gp);
			}
			this.setState({ options });
		});
	}

	handleChangeWF = (selectedOption) => {
		this.setState({ selectedOption });
		this.setState({ idWF: selectedOption.value });
	};

	getUT = (event) => {
		event.preventDefault();
		let url = base_url.all_UserTasks() + "/" + this.state.idWF;
		axios.get(url).then((res) => {
			const userTasks = res.data;
			this.setState({ userTasks });
			const n = this.state.userTasks.length;
			let optionsUT = [];
			for (let i = 0; i < n; i++) {
				let UT = {
					value: this.state.userTasks[i].id,
					label: this.state.userTasks[i].name,
				};
				optionsUT.push(UT);
			}
			this.setState({ optionsUT });
		});
	};

	handleChangeUT = (selectedOption) => {
		this.setState({ selectedOption });
		this.setState({ idUT: selectedOption.value });
		this.setState({ name: selectedOption.label });
	};
	handleChangeGp = (selectedOptionGP) => {
		this.setState({ selectedOptionGP });
	};

	affectGroup = (event) => {
		event.preventDefault();
		if (this.state.selectedOptionGP != null) {
			const n1 = this.state.selectedOptionGP.length;
			let n_Gp = this.state.groups.length;
			for (let i = 0; i < n1; i++) {
				for (let j = 0; j < n_Gp; j++) {
					if (
						this.state.groups[j].name_GP == this.state.selectedOptionGP[i].label
					) {
						this.state.tabGp.push(this.state.groups[j]);
					}
				}
			}
		}

		if (this.state.idUT != "" && this.state.tabGp.length != 0) {
			fetch(base_url.update_UT(), {
				method: "post",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					id: this.state.idUT,
					group: this.state.tabGp,
				}),
			});
			this.state.tabGp = [];

			this.toastId = toast(
				"Candidate group successfully added to usertask " +
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
		} else {
			toast.error("Error ! some information was unavailable", {
				position: toast.POSITION.TOP_LEFT,
			});
		}
		//	window.location.reload(false);
	};

	render() {
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
										<Col lg="2"></Col>
										<Col lg="2">
											<Label> List of workflow</Label>
										</Col>
										<Col lg="4">
											<Select
												onChange={this.handleChangeWF}
												options={this.state.optionsWF}
											/>
										</Col>
										<Col lg="2">
											<Button
												className="btn-wide mb-1 mr-1"
												size="lg"
												outline
												color="warning"
												onClick={this.getUT}
											>
												<FontAwesomeIcon icon={faAngleRight} size="1x" />
											</Button>
										</Col>
									</Row>
									<br />
									<br />
									<Row>
										<Col lg="2">
											<Label>List of usertasks</Label>
										</Col>
										<Col lg="3">
											<Select
												onChange={this.handleChangeUT}
												options={this.state.optionsUT}
											/>
										</Col>

										<Col lg="2">
											<Label>List of groups</Label>
										</Col>
										<Col lg="3">
											<Select
												isMulti
												required
												className="basic-multi-select"
												onChange={this.handleChangeGp}
												options={this.state.options}
											></Select>
										</Col>
										<Col lg="2">
											<Button
												className="btn-wide mb-1 mr-1"
												size="lg"
												outline
												color="warning"
												onClick={this.affectGroup}
											>
												Affect group
											</Button>
										</Col>
									</Row>
									<div className="mbg-3 h-auto pl-0 pr-0 bg-transparent no-border card-header">
										<div className="card-header-title fsize-2 text-capitalize font-weight-normal"></div>
									</div>
									<Table>
										<tbody>
											<tr>
												<th></th>
												<th>Usertask</th>
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
