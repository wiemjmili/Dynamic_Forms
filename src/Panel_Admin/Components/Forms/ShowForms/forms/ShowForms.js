import React, { Component } from "react";
import base_url from "../../../../../service/base_url";
import { Table, Button } from "reactstrap";
import { CustomInput, FormGroup, Label, Input, Col } from "reactstrap";
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
		this.setState({ nameWF: event.target.value });
	};

	handleSubmit = (event) => {
		event.preventDefault();
		const nameWF = this.state.nameWF;
		let url = base_url.get_Forms() + "/" + nameWF;
		axios.get(url).then((res) => {
			const Forms = res.data;
			this.setState({ Forms });
		});
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
										size="lg"
										color="secondary"
									>
										>>
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
														<h2>{d.content}</h2>
														<br />
													</div>
												)}
											</div>

											<div>
												{d.element == "TextInput" && (
													<div class="form-group">
														<Label>{d.label}</Label>
														<Input
															required={d.required}
															class="form-control"
															placeholder={d.label}
														/>
													</div>
												)}
												{d.element == "DatePicker" && (
													<div class="form-group">
														<Label>{d.label}</Label>
														<Input
															type="date"
															dateFormat="MM/DD/YYYY"
															className="form-control"
															required={d.required}
														/>
													</div>
												)}
												{d.element == "Checkboxes" && (
													<div class="form-group">
														<Label>{d.label}</Label>
														<div>
															{d.options.map((ch) => (
																<CustomInput
																	type="checkbox"
																	id={ch.key}
																	label={ch.text}
																	required={d.required}
																/>
															))}
														</div>
													</div>
												)}
												{d.element == "RadioButtons" && (
													<div class="form-group">
														<Label>{d.label}</Label>
														<div>
															{d.options.map((radio) => (
																<CustomInput
																	type="radio"
																	id={radio.key}
																	name="customRadio"
																	label={radio.text}
																	required={d.required}
																/>
															))}
														</div>
													</div>
												)}
												{d.element == "Paragraph" && (
													<div class="form-group">
														<Input
															type="textarea"
															name="text"
															value={d.content}
															id="exampleText"
															required={d.required}
														/>
													</div>
												)}
												{d.element == "Download" && (
													<div class="form-group">
														<FormGroup row>
															<Label for="exampleFile" sm={2}>
																{d.content}
															</Label>
															<Col sm={10}>
																<Input
																	type="file"
																	name="file"
																	id="exampleFile"
																/>
															</Col>
														</FormGroup>
													</div>
												)}
												{d.element == "Camera" && (
													<div class="form-group">
														<FormGroup row>
															<Label for="img" sm={2}>
																Select image
															</Label>
															<Col sm={10}>
																<Input
																	type="file"
																	name="file"
																	id="exampleFile"
																/>
															</Col>
														</FormGroup>
													</div>
												)}
												{d.element == "Range" && (
													<div class="form-group">
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
													</div>
												)}
												{d.element == "HyperLink" && (
													<div class="form-group">
														<FormGroup row>
															<Label for="exampleFile" sm={2}>
																{d.content}
															</Label>
															<Col sm={10}>
																<Input type="text" placeholder={d.href} />
															</Col>
														</FormGroup>
													</div>
												)}
												{d.element == "NumberInput" && (
													<div class="form-group">
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
													</div>
												)}
												{d.element == "Tags" && (
													<div class="form-group">
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
																	<option value="">Select</option>
																	{d.options.map((op) => (
																		<option
																			type="radio"
																			id={op.key}
																			name="customRadio"
																			label={op.label}
																		></option>
																	))}
																</Input>
															</Col>
														</FormGroup>
													</div>
												)}
												{d.element == "Label" && (
													<div class="form-group">
														<FormGroup row>
															<Label for="exampleFile" sm={2}>
																{d.text}
															</Label>
														</FormGroup>
													</div>
												)}
												{d.element == "LineBreak" && (
													<div class="form-group">
														<div className={baseClasses}>
															<hr />
														</div>
													</div>
												)}
												{d.element == "TextArea" && (
													<div class="form-group">
														<Input
															type="textarea"
															name="text"
															id="exampleText"
															required={d.required}
														/>
													</div>
												)}
												{d.element == "Dropdown" && (
													<div class="form-group">
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
													</div>
												)}
											</div>
										</div>
									))}
								</tr>
							</tbody>
						</Table>
						<div class="form-group">
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
