import React, { Fragment } from "react";
import base_url from "../../../../../../../src/service/base_url";
import { Table, Button } from "reactstrap";
import axios from "axios";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import { Row, Col, Card, CardBody, CardTitle } from "reactstrap";

export let xml = "";
export let id = "";
export class ListWF extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			Workflow: [],
			UserTasks: [],
			id: "",
		};
	}
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
	componentDidUpdate() {
		let n = this.state.Workflow.length;
		for (let i = 0; i < n; i++) {
			if (this.state.Workflow[i].id == this.state.id) {
				xml = this.state.Workflow[i].wfxml;
				id = this.state.id;
			}
		}
	}

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
														<Button
															className="mb-2 mr-2 btn-transition"
															size="lg"
															outline
															color="warning"
															onClick={() =>
																this.setState({
																	id: WF.id,
																})
															}
														>
															Show workflow
														</Button>
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
