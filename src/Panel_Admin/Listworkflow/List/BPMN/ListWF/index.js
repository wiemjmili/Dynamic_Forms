import React, { Fragment } from "react";
import base_url from "../../../../../../src/service/base_url";
import { Table, Button } from "reactstrap";
import axios from "axios";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import { Row, Col, Card, CardBody, CardTitle } from "reactstrap";

export default class ListWF extends React.Component {
	state = {
		Workflow: [],
		UserTasks: [],
		WF: "",
		name: "",
		id: "",
		i: 0,
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
									<CardTitle>List of workflow</CardTitle>
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
															<div>
																{Usertask.workFlow.id == WF.id && (
																	<h6>{Usertask.name}</h6>
																)}
															</div>
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
								</CardBody>
							</Card>
						</Col>
					</Row>
				</ReactCSSTransitionGroup>
			</Fragment>
		);
	}
}
