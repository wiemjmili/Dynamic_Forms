import React, { Component } from "react";
import base_url from "../../../../service/base_url";
import { Table, Label, FormGroup, Col, Button } from "reactstrap";
import axios from "axios";

class Form_user extends Component {
	constructor(props) {
		super(props);
		this.state = {
			Requests: [],
			idReq: "",
		};
	}
	componentDidMount() {
		axios.get(base_url.getALLRequest()).then((res) => {
			const Requests = res.data;
			this.setState({ Requests });
		});
	}
	render() {
		const { idReq } = this.props;
		this.state.idReq = idReq;
		return (
			<div>
				{this.state.Requests.map((Req) => (
					<div>
						{Req.id == idReq && (
							<div>
								<Table className="mb-0">
									<tbody>
										<tr>
											<FormGroup row>
												<Col sm={12}>
													<h5>{Req.form.data[0].content}</h5>
												</Col>
											</FormGroup>
										</tr>
										<tr>
											<FormGroup row>
												<Col sm={3}>
													<h5>
														<b>User :</b> {Req.user.username}
													</h5>
												</Col>
											</FormGroup>
										</tr>
									</tbody>
								</Table>
								{Req.request.map((element) => (
									<div>
										{Req.form.data.map((d) => (
											<div>
												{element != null && (
													<div>
														{d.id == element[0] && d.element == "Paragraph" && (
															<div>
																<Table className="mb-0">
																	<tbody>
																		<tr>
																			<FormGroup row>
																				<Col sm={3}>
																					<h6>{d.content}</h6>
																				</Col>
																				<Col sm={4}>
																					<Label>{element[1]}</Label>
																				</Col>
																			</FormGroup>
																		</tr>
																	</tbody>
																</Table>
															</div>
														)}
														{d.id == element[0] && d.element != "Paragraph" && (
															<div>
																<Table className="mb-0">
																	<tbody>
																		<tr>
																			<FormGroup row>
																				<Col sm={3}>
																					<h6>{d.label}</h6>
																				</Col>
																				<Col sm={4}>
																					<Label>{element[1]}</Label>
																				</Col>
																			</FormGroup>
																		</tr>
																	</tbody>
																</Table>
															</div>
														)}
													</div>
												)}
											</div>
										))}
									</div>
								))}
							</div>
						)}
					</div>
				))}
			</div>
		);
	}
}
export default Form_user;
