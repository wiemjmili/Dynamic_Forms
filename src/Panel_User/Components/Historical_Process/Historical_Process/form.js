import React, { Component } from "react";
import base_url from "../../../../service/base_url";
import { Table, Label, FormGroup, Col, Button } from "reactstrap";
import axios from "axios";

class Form extends Component {
	constructor(props) {
		super(props);
		this.state = {
			Response: [],
			idReq: "",
		};
	}
	componentDidMount() {
		axios.get(base_url.getAllResponse()).then((res) => {
			const Response = res.data;
			this.setState({ Response });
		});
	}
	render() {
		const { idReq } = this.props;
		this.state.idReq = idReq;
		return (
			<div>
				{this.state.Response.map((Res) => (
					<div>
						{Res.idReq == idReq && (
							<div>
								<Table className="mb-0">
									<tbody>
										<tr>
											<FormGroup row>
												<Col sm={12}>
													<h5>
														<b>{Res.form.data[0].content}:</b>
														{Res.user.username}
													</h5>
												</Col>
											</FormGroup>
										</tr>
									</tbody>
								</Table>
								{Res.response.map((element) => (
									<div>
										{Res.form.data.map((d) => (
											<div>
												{element != null && (
													<div>
														{d.id == element[0] && (
															<div>
																<Table className="mb-0">
																	<tbody>
																		<tr>
																			<FormGroup row>
																				<Col sm={3}>
																					{d.element != "Paragraph" && (
																						<h6> {d.label}</h6>
																					)}
																					{d.element == "Paragraph" && (
																						<h6>{d.content}</h6>
																					)}
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
						<br />
					</div>
				))}
			</div>
		);
	}
}
export default Form;
