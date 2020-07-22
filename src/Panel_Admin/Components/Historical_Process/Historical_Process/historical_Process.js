import React, { Component } from "react";
import base_url from "../../../../service/base_url";
import { Table, Label, FormGroup, Button, Col, Input } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import Show_Response from "./show_Response";
import { toast } from "react-toastify";
import Select from "react-select";

import axios from "axios";

class Historical_Process extends Component {
	constructor(props) {
		super(props);
		this.state = {
			id: "",
			idReq: "",
			Requests: [],
			Requests_copie: [],
			search: "",
			Requests_Inverse: [],
			workflow: [],
			optionsWF: [],
			idWF: "",
		};

		this.get_Req = this.get_Req.bind(this);
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
		axios.get(base_url.getALLRequest()).then((res) => {
			const Requests = res.data;
			this.setState({ Requests });
			this.setState({ Requests_copie: Requests });

			this.state.Requests_Inverse = Requests.reverse();
		});
	}

	updateSearch(event) {
		this.setState({ search: event.target.value.substr(0, 20) });
	}
	handleChangeWF = (selectedOption) => {
		this.setState({ selectedOption });
		this.setState({ idWF: selectedOption.value });
	};

	get_Req = () => {
		if (this.state.idWF != "") {
			const Requests_WF = [];
			for (let i = 0; i < this.state.Requests_copie.length; i++) {
				if (this.state.Requests_copie[i].wf.id == this.state.idWF) {
					Requests_WF.push(this.state.Requests_copie[i]);
				}
			}

			this.setState({ Requests: Requests_WF });
			this.state.Requests_Inverse = this.state.Requests.reverse();
		} else {
			toast.error("Error ! select workflow", {
				position: toast.POSITION.TOP_LEFT,
			});
		}
	};

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
				<FormGroup row>
					<Col sm={2}></Col>
					<Col sm={2}>
						<h4>Process:</h4>
					</Col>
					<Col sm={4}>
						<Select
							required
							className="basic-multi-select"
							onChange={this.handleChangeWF}
							options={this.state.optionsWF}
						></Select>
					</Col>
					<Col sm={1}>
						<Button
							size="lg"
							color="secondary"
							className="btn-wide mb-2 mr-2"
							onClick={this.get_Req}
						>
							<FontAwesomeIcon icon={faAngleRight} size="1x" />
						</Button>
					</Col>
				</FormGroup>

				<br />

				{filteredRequest.map((Req) => (
					<div>
						<FormGroup row>
							<Col sm={1}></Col>
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
													{d.id == element[0] && d.element == "Paragraph" && (
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
													{d.id == element[0] && <Label>{element[1]}</Label>}
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
			</div>
		);
	}
}
export default Historical_Process;
