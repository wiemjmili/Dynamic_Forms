import React, { Component } from "react";
import base_url from "../../../../service/base_url";
import { toast, Bounce } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import DatePicker from "react-datepicker";
import {
	Table,
	Button,
	CustomInput,
	FormGroup,
	Label,
	Input,
	Col,
	ModalFooter,
} from "reactstrap";
import axios from "axios";

var today = new Date(),
	date =
		today.getFullYear() +
		"-" +
		+0 +
		(today.getMonth() + 1) +
		"-" +
		today.getDate();

export default class New_Request extends Component {
	constructor(props) {
		super(props);
		this.state = {
			Workflow: [],
			nameWF: "",
			Forms: [],
			tab: [],
			date: date,
		};
		this.handleSubmit = this.handleSubmit.bind(this);
		this.sendRequest = this.sendRequest.bind(this);
		this.refreshPage = this.refreshPage.bind(this);
	}
	componentDidMount() {
		axios.get(base_url.getlistProcessbyUser()).then((res) => {
			const Workflow = res.data;
			this.setState({ Workflow });
		});
	}
	handleChangeWF = (event) => {
		this.setState({ Forms: [] });
		this.setState({ nameWF: event.target.value });
		nameWF = this.state.nameWF;
	};
	handleSubmit = (event) => {
		event.preventDefault();
		let url = base_url.getFormbyProcess() + "/" + this.state.nameWF;
		axios.get(url).then((res) => {
			const Forms = res.data;
			this.setState({ Forms });
		});
	};
	sendRequest(event) {
		event.preventDefault();
		let n = this.state.Forms[0].data.length;
		for (let i = 1; i < n; i++) {
			this.state.tab.push(this.state[i]);
		}
		let add_request = base_url.addRequestbyUser();
		fetch(add_request, {
			method: "post",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				request: this.state.tab,
				form: this.state.Forms[0],
			}),
		});
		this.toastId = toast(
			"Request successfully added " + "'" + this.state.nameWF + "'",
			{
				transition: Bounce,
				closeButton: true,
				autoClose: 5000,
				position: "bottom-center",
				type: "success",
			}
		);
		window.location.reload(false);
	}
	refreshPage() {
		window.location.reload(false);
	}

	render() {
		const { nameWF } = this.state;
		return (
			<div>
				<Table className="mb-0">
					<tbody>
						<tr>
							<td>
								<div className="card-header-title fsize-2 text-capitalize font-weight-normal">
									List of access process
								</div>
							</td>

							<td>
								<select
									required
									onChange={this.handleChangeWF}
									className="browser-default custom-select"
								>
									<option selected value="" value={nameWF}></option>
									{this.state.Workflow.map((WF) => (
										<option name="nameWF">{WF.name}</option>
									))}
								</select>
							</td>
							<td>
								<form onSubmit={this.handleSubmit}>
									<Button
										size="lg"
										color="secondary"
										className="btn-wide mb-2 mr-2"
									>
										<FontAwesomeIcon icon={faAngleRight} size="1x" />
									</Button>
								</form>
								<div className="mbg-3 h-auto pl-0 pr-0 bg-transparent no-border card-header">
									<div className="card-header-title fsize-2 text-capitalize font-weight-normal"></div>
								</div>
							</td>
						</tr>
					</tbody>
				</Table>

				{this.state.Forms.map((F) => (
					<div>
						<Table className="mb-0">
							<tbody>
								<tr>
									{F.data.map((d, index) => (
										<div>
											<div>
												{d.element == "Header" && (
													<div>
														<center>
															<h2>{d.content}</h2>
														</center>
														<br />
													</div>
												)}
											</div>
											<div>
												{d.element == "TextInput" && (
													<FormGroup row>
														<Col sm={3}>
															<Label>{d.label}</Label>
														</Col>
														<Col sm={9}>
															<Input
																required={d.required}
																className="form-control"
																placeholder={d.label}
																value={this.state[d.id]}
																onChange={(ev) =>
																	this.setState({
																		[index]: [d.id, ev.target.value],
																	})
																}
															/>
														</Col>
													</FormGroup>
												)}
												{d.element == "DatePicker" && (
													<FormGroup row>
														<Col sm={3}>
															<Label>{d.label}</Label>
														</Col>
														<Col sm={9}>
															<Input
																type="date"
																className="form-control"
																required={d.required}
																value={this.state[d.id]}
																onChange={(ev) =>
																	this.setState({
																		[index]: [d.id, ev.target.value],
																	})
																}
															/>
														</Col>
													</FormGroup>
												)}
												{d.element == "Checkboxes" && (
													<FormGroup row>
														<Col sm={3}>
															<Label>{d.label}</Label>
														</Col>
														<Col sm={9}>
															{d.options.map((ch) => (
																<CustomInput
																	type="checkbox"
																	id={ch.key}
																	label={ch.text}
																	required={d.required}
																	value={this.state[d.id]}
																	onChange={(ev) =>
																		this.setState({
																			[index]: [d.id, ev.target.value],
																		})
																	}
																/>
															))}
														</Col>
													</FormGroup>
												)}
												{d.element == "RadioButtons" && (
													<FormGroup row>
														<Col sm={3}>
															<Label>{d.label}</Label>
														</Col>
														<Col sm={9}>
															{d.options.map((radio) => (
																<CustomInput
																	type="radio"
																	id={radio.key}
																	label={radio.text}
																	required={d.required}
																	value={this.state[d.id]}
																	onChange={(ev) =>
																		this.setState({
																			[index]: [d.id, ev.target.value],
																		})
																	}
																/>
															))}
														</Col>
													</FormGroup>
												)}
												{d.element == "Paragraph" && (
													<FormGroup row>
														<Col sm={3}>
															<Label>{d.content}</Label>
														</Col>
														<Col sm={9}>
															<Input
																type="textarea"
																required={d.required}
																value={this.state[d.id]}
																onChange={(ev) =>
																	this.setState({
																		[index]: [d.id, ev.target.value],
																	})
																}
															/>
														</Col>
													</FormGroup>
												)}
												{d.element == "Download" && (
													<FormGroup row>
														<Col sm={3}>
															<Label>{d.content}</Label>
														</Col>
														<Col sm={9}>
															<Input
																type="file"
																value={this.state[d.id]}
																onChange={(ev) =>
																	this.setState({
																		[index]: [d.id, ev.target.value],
																	})
																}
															/>
														</Col>
													</FormGroup>
												)}
												{d.element == "Camera" && (
													<FormGroup row>
														<Col sm={3}>
															<Label>Select image</Label>
														</Col>
														<Col sm={9}>
															<Input
																type="file"
																name="file"
																id="exampleFile"
																value={this.state[d.id]}
																onChange={(ev) =>
																	this.setState({
																		[index]: [d.id, ev.target.value],
																	})
																}
															/>
														</Col>
													</FormGroup>
												)}
												{d.element == "Range" && (
													<FormGroup row>
														<Col sm={3}>
															<Label>{d.label}</Label>
														</Col>
														<Col sm={9}>
															<Input
																type="range"
																class="form-control-range"
																min={d.min_value}
																max={d.max_value}
																value={this.state[d.id]}
																onChange={(ev) =>
																	this.setState({
																		[index]: [d.id, ev.target.value],
																	})
																}
															/>
														</Col>
													</FormGroup>
												)}
												{d.element == "HyperLink" && (
													<FormGroup row>
														<Col sm={3}>
															<Label>{d.content}</Label>
														</Col>
														<Col sm={9}>
															<Input
																type="text"
																placeholder={d.href}
																value={this.state[d.id]}
																onChange={(ev) =>
																	this.setState({
																		[index]: [d.id, ev.target.value],
																	})
																}
															/>
														</Col>
													</FormGroup>
												)}
												{d.element == "NumberInput" && (
													<FormGroup row>
														<Col sm={3}>
															<Label>{d.label}</Label>
														</Col>
														<Col sm={9}>
															<Input
																type="number"
																placeholder="Number Input"
																required={d.required}
																value={this.state[d.id]}
																onChange={(ev) =>
																	this.setState({
																		[index]: [d.id, ev.target.value],
																	})
																}
															/>
														</Col>
													</FormGroup>
												)}
												{d.element == "Tags" && (
													<FormGroup row>
														<Col sm={3}>
															<Label>{d.label}</Label>
														</Col>
														<Col sm={9}>
															<Input
																type="select"
																required={d.required}
																onChange={(ev) =>
																	this.setState({
																		[index]: [d.id, ev.target.value],
																	})
																}
															>
																<option
																	selected
																	value=""
																	value={this.state[d.id]}
																></option>
																{d.options.map((op) => (
																	<option id={op.key}>{op.text}</option>
																))}
															</Input>
														</Col>
													</FormGroup>
												)}
												{d.element == "Label" && (
													<FormGroup row>
														<Label for="exampleFile" sm={2}>
															{d.text}
														</Label>
													</FormGroup>
												)}
												{d.element == "LineBreak" && (
													<div className="form-group">
														<div className={baseClasses}>
															<hr />
														</div>
													</div>
												)}
												{d.element == "TextArea" && (
													<Input
														type="textarea"
														required={d.required}
														value={this.state[d.id]}
														onChange={(ev) =>
															this.setState({
																[index]: [d.id, ev.target.value],
															})
														}
													/>
												)}
												{d.element == "Dropdown" && (
													<FormGroup row>
														<Col sm={3}>
															<Label>{d.label}</Label>
														</Col>
														<Col sm={9}>
															<Input
																type="select"
																id="exampleCustomSelect"
																required={d.required}
																onChange={(ev) =>
																	this.setState({
																		[index]: [d.id, ev.target.value],
																	})
																}
															>
																<option
																	selected
																	value=""
																	value={this.state[d.id]}
																></option>
																{d.options.map((dd) => (
																	<option id={dd.key}>{dd.text}</option>
																))}
															</Input>
														</Col>
													</FormGroup>
												)}
											</div>
										</div>
									))}
								</tr>
							</tbody>
						</Table>
						{this.state.nameWF != "" && (
							<ModalFooter>
								<Button color="danger" onClick={this.refreshPage}>
									Close
								</Button>
								<Button color="success" onClick={this.sendRequest}>
									Send
								</Button>
							</ModalFooter>
						)}
					</div>
				))}
			</div>
		);
	}
}
