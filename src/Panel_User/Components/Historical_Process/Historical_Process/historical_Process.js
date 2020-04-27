import React, { Component } from "react";
import base_url from "../../../../service/base_url";
import { Table, Label, FormGroup, Button, Col } from "reactstrap";
import axios from "axios";

class Historical_Process extends Component {
	constructor(props) {
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.state = {
			Requests: [],
		};
	}
	componentDidMount() {
		axios.get(base_url.getRequestByUser()).then((res) => {
			const Requests = res.data;
			this.setState({ Requests });
		});
	}
	handleSubmit(event) {
		event.preventDefault();
	}
	refreshPage() {
		window.location.reload(false);
	}
	render() {
		return (
			<div>
				<Table className="mb-0">
					<tbody>
						<tr>
							<Button
								className="btn-wide mb-2 mr-2"
								size="lg"
								color="warning"
								onClick={this.handleSubmit}
							>
								Create
							</Button>
							<Button
								outline
								className="btn-wide mb-2 mr-2"
								size="lg"
								color="warning"
								onClick={this.handleSubmit}
							>
								Delete
							</Button>
							<Button
								outline
								className="btn-wide mb-2 mr-2"
								size="lg"
								color="warning"
								onClick={this.refreshPage}
							>
								Refresh
							</Button>
						</tr>
						<br />
						{this.state.Requests.map((Req) => (
							<div>
								<FormGroup row></FormGroup>
								<FormGroup row>
									<Col sm={3}>
										<h5>{Req.form.data[0].content}</h5>
									</Col>
									{Req.request.map((element) => (
										<Col sm={3}>
											{Req.form.data.map((d) => (
												<div>
													{element != null && (
														<div>
															{d.id == element[0] && <h6>{d.label}</h6>}
															{d.id == element[0] &&
																d.element == "Paragraph" && (
																	<h6>{d.content}</h6>
																)}
														</div>
													)}
												</div>
											))}
										</Col>
									))}
								</FormGroup>
								<FormGroup row>
									<Col sm={3}></Col>
									{Req.request.map((element) => (
										<Col sm={3}>
											{Req.form.data.map((d) => (
												<div>
													{element != null && (
														<div>
															{d.id == element[0] && (
																<Label>{element[1]}</Label>
															)}
														</div>
													)}
												</div>
											))}
										</Col>
									))}
								</FormGroup>
								<hr />
							</div>
						))}
					</tbody>
				</Table>
			</div>
		);
	}
}
export default Historical_Process;
