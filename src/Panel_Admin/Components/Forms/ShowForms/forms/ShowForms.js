import React, { Component } from "react";
import base_url from "../../../../../service/base_url";
import { Table, Button } from "reactstrap";
import { CustomInput, FormGroup, Label, Input, Col } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import axios from "axios";

class Show_Forms extends Component {
	state = {
		Workflow: [],
		nameWF: "",
		Forms: [],
	};

	componentDidMount() {
		axios.get(base_url.all_WF()).then((res) => {
			const Workflow = res.data;
			this.setState({ Workflow });
		});
	}
	handleChange = (event) => {
		this.setState({ Forms: [] });
		this.setState({ nameWF: event.target.value });
	};

	handleSubmit = (event) => {
		if (this.state.nameWF != "") {
			event.preventDefault();
			const nameWF = this.state.nameWF;
			let url = base_url.get_Forms() + "/" + nameWF;
			axios.get(url).then((res) => {
				const Forms = res.data;
				this.setState({ Forms });
			});
		} else if (this.state.nameWF == "") {
			toast.error("Error ! select workflow", {
				position: toast.POSITION.TOP_LEFT,
			});
		}
	};

	render() {
		const { nameWF } = this.state;
		let baseClasses = "SortableItem rfb-item";
		return (
			<div>
				<Table className="mb-0">
					<tbody>
						<tr>
							<td>
								<div className="card-header-title fsize-2 text-capitalize font-weight-normal">
									List of Workflow
								</div>
							</td>

							<td>
								<select
									required
									onChange={this.handleChange}
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
										className="btn-wide mb-1 mr-1"
										size="xs"
										color="secondary"
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
									{F.data.map((d) => (
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
																class="form-control"
																placeholder={d.label}
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
																	name="customRadio"
																	label={radio.text}
																	required={d.required}
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
																name="text"
																value={d.content}
																id="exampleText"
																required={d.required}
															/>
														</Col>
													</FormGroup>
												)}
												{d.element == "Download" && (
													<FormGroup row>
														<Label for="exampleFile" sm={2}>
															{d.content}
														</Label>
														<Col sm={10}>
															<Input type="file" name="file" id="exampleFile" />
														</Col>
													</FormGroup>
												)}
												{d.element == "Camera" && (
													<FormGroup row>
														<Label for="img" sm={2}>
															Select image
														</Label>
														<Col sm={10}>
															<Input type="file" name="file" id="exampleFile" />
														</Col>
													</FormGroup>
												)}
												{d.element == "Range" && (
													<FormGroup row>
														<Label for="exampleFile" sm={2}>
															{d.label}
														</Label>
														<Col sm={10}>
															<input
																type="range"
																class="form-control-range"
																min={d.min_value}
																max={d.max_value}
															/>
														</Col>
													</FormGroup>
												)}
												{d.element == "HyperLink" && (
													<FormGroup row>
														<Label for="exampleFile" sm={2}>
															{d.content}
														</Label>
														<Col sm={10}>
															<Input type="text" placeholder={d.href} />
														</Col>
													</FormGroup>
												)}
												{d.element == "NumberInput" && (
													<FormGroup row>
														<Label for="exampleFile" sm={2}>
															{d.label}
														</Label>
														<Col sm={10}>
															<Input
																type="number"
																placeholder="Number Input"
																required={d.required}
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
															<select
																required
																className="browser-default custom-select"
															>
																<option
																	selected
																	value=""
																	required={d.required}
																></option>
																{d.options.map((op) => (
																	<option
																		type="radio"
																		id={op.key}
																		name="customRadio"
																		label={op.label}
																	></option>
																))}
															</select>
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
													<div className={baseClasses}>
														<hr />
													</div>
												)}
												{d.element == "TextArea" && (
													<Input
														type="textarea"
														name="text"
														id="exampleText"
														required={d.required}
													/>
												)}
												{d.element == "Dropdown" && (
													<FormGroup row>
														<Label for="exampleCustomSelect" sm={2}>
															{d.label}
														</Label>
														<Col sm={10}>
															<Input
																type="select"
																id="exampleCustomSelect"
																name="customSelect"
																required={d.required}
															>
																{d.options.map((dd) => (
																	<option
																		type="radio"
																		id={dd.key}
																		name="customRadio"
																		label={dd.text}
																	></option>
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
						<div className="form-group">
							<div className={baseClasses}>
								<hr />
							</div>
						</div>
					</div>
				))}
			</div>
		);
	}
}

export default Show_Forms;
