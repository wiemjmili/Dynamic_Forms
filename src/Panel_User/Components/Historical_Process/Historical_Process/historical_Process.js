import React, { Component } from "react";
import base_url from "../../../../service/base_url";
import { Table, Label, FormGroup, Button, Col, Input } from "reactstrap";
import Show_Response from "./show_Response";
import axios from "axios";
import Cancel_request from "./cancel_Request";
import Create_request from "./create_Request";

class Historical_Process extends Component {
	constructor(props) {
		super(props);
		this.state = {
			id: "",
			idReq: "",
			Requests: [],
			click: false,
			click2: false,
			search: "",
			Requests_Inverse: [],
		};
		this.refresh = this.refresh.bind(this);
	}
	componentDidMount() {
		axios.get(base_url.getRequestByUser()).then((res) => {
			const Requests = res.data;
			this.setState({ Requests });
			this.state.Requests_Inverse = Requests.reverse();
		});
	}

	refresh() {
		window.location.reload(false);
	}

	updateSearch(event) {
		this.setState({ search: event.target.value.substr(0, 20) });
	}

	render() {
		let filteredRequest = this.state.Requests.filter((req) => {
			return (
				req.form.data[0].content
					.toLowerCase()
					.indexOf(this.state.search.toLowerCase()) !== -1
			);
		});

		return (
			<div>
				<Table className="mb-0">
					<tbody>
						<tr>
							<Button
								className="btn-wide mb-2 mr-2"
								color="info"
								onClick={() =>
									this.setState({
										click: true,
									})
								}
							>
								Create
								<Create_request click={this.state.click} />
							</Button>
							<Button
								outline
								className="btn-wide mb-2 mr-2"
								color="info"
								onClick={() =>
									this.setState({
										click2: true,
									})
								}
							>
								<Cancel_request click2={this.state.click2} id={this.state.id} />
								Cancel
							</Button>
							<Button
								outline
								className="btn-wide mb-2 mr-2"
								color="info"
								onClick={this.refresh}
							>
								Refresh
							</Button>
							<br />
							<br />
							<br />
						</tr>
						<FormGroup row>
							<Col sm={4}>
								<Input
									type="text"
									value={this.state.search}
									onChange={this.updateSearch.bind(this)}
									placeholder="Search"
									aria-label="Search"
								/>
							</Col>
						</FormGroup>

						<br />

						{filteredRequest.map((Req) => (
							<div>
								<FormGroup row>
									<Col sm={1}>
										<label class="container1">
											<Input
												type="checkbox"
												id="scales"
												name="scales"
												onChange={() =>
													this.setState({
														id: Req.id,
													})
												}
											/>{" "}
											<span class="checkmark"></span>
										</label>
									</Col>
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
									<Col sm={1}>
										<h6>Etat</h6>
									</Col>
								</FormGroup>
								<FormGroup row>
									<Col sm={1}></Col>
									<Col sm={3}></Col>
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
									{Req.state == "REFUSED" && (
										<div>
											<Col sm={2}>
												<Button
													className="mb-2 mr-2"
													color="danger"
													onClick={() =>
														this.setState({
															idReq: Req.id,
														})
													}
												>
													Refused
													<Show_Response idReq={this.state.idReq} />
												</Button>
											</Col>
										</div>
									)}
									{Req.valide == true && Req.state == "VALIDATED" && (
										<div>
											<Col sm={2}>
												<Button
													className="mb-2 mr-2"
													color="success"
													onClick={() =>
														this.setState({
															idReq: Req.id,
														})
													}
												>
													Validated
													<Show_Response idReq={this.state.idReq} />
												</Button>
											</Col>
										</div>
									)}
									{Req.valide == false && (
										<div>
											<Col sm={2}>
												<Button
													className="mb-2 mr-2"
													color="info"
													onClick={() =>
														this.setState({
															idReq: Req.id,
														})
													}
												>
													In progress
													<Show_Response idReq={this.state.idReq} />
												</Button>
											</Col>
										</div>
									)}
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
