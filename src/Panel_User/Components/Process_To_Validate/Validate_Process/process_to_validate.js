import React, { Component } from "react";
import base_url from "../../../../service/base_url";
import { Table, Label, FormGroup, Col, Button } from "reactstrap";
import axios from "axios";
import Validate_request from "./validate_request";
import Reject_Request from "./reject_Request";

class Validate_Process extends Component {
	constructor(props) {
		super(props);
		this.state = {
			Requests: [],
			idReq: "",
			click: false,
			click2: false,
		};
	}
	componentDidMount() {
		axios.get(base_url.getRequestToValidate()).then((res) => {
			const Requests = res.data;
			this.setState({ Requests });
		});
	}
	render() {
		return (
			<div>
				<Table className="mb-0">
					<tbody>
						{this.state.Requests.map((Req) => (
							<div>
								<div>
									<FormGroup row>
										<Col sm={3}>
											<h5>{Req.form.data[0].content}</h5>
										</Col>

										{Req.request.map((element) => (
											<Col sm={2}>
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
										<Col sm={3}>
											<h5>User : {Req.user.name}</h5>
										</Col>
										{Req.request.map((element) => (
											<Col sm={2}>
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
										<Col sm={1}>
											<Button
												className="btn-wide mb-2 mr-2"
												size="lg"
												color="warning"
												onClick={(ev) =>
													this.setState({
														idReq: Req.id,
														click2: true,
													})
												}
											>
												Validate
												<Validate_request
													name={this.state.idReq}
													click2={this.state.click2}
												/>
											</Button>
										</Col>
										<Col sm={1}>
											<Button
												outline
												className="btn-wide mb-2 mr-2"
												size="lg"
												color="warning"
												onClick={(ev) =>
													this.setState({
														idReq: Req.id,
														click: true,
													})
												}
											>
												Reject
												<Reject_Request
													click={this.state.click}
													idReq={this.state.idReq}
												/>
											</Button>
										</Col>
									</FormGroup>
									<hr />
								</div>
							</div>
						))}
					</tbody>
				</Table>
			</div>
		);
	}
}
export default Validate_Process;
