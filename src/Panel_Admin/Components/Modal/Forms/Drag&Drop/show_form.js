import React, { Component } from "react";
import base_url from "../../../../../service/base_url";
import { Table } from "reactstrap";
import { CustomInput, FormGroup, Label, Input, Col } from "reactstrap";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import { toast } from "react-toastify";
import axios from "axios";

class Show_Forms extends Component {
	constructor(props) {
		super(props);

		this.state = {
			modal: true,
			Workflow: [],
			nameWF: "",
			nameUT: "",
			Forms: "",
			idUT: "",
			click: false,
		};
		this.toggle = this.toggle.bind(this);
	}

	componentDidMount() {}

	componentDidUpdate() {
		if (this.state.click == true) {
			if (this.state.nameUT != "" && this.state.nameWF != "") {
				let get_UT =
					base_url.find_UserTask() +
					"/" +
					this.state.nameUT +
					"/" +
					this.state.nameWF;
				axios.get(get_UT).then((res) => {
					const idUT = res.data;
					this.setState({ idUT });
				});
				let get_form = base_url.getFormbyUserTask() + "/" + this.state.idUT;
				if (this.state.idUT != "") {
					axios.get(get_form).then((res) => {
						const Forms = res.data;
						this.setState({ Forms });
					});
				}
			}
		} else if (this.state.nameWF == "" && this.state.click == true) {
			toast.error("Error ! some information was unavailable", {
				position: toast.POSITION.TOP_LEFT,
			});
		}
	}
	toggle() {
		this.setState({
			modal: !this.state.modal,
		});
		window.location.reload(true);
	}

	render() {
		const { click } = this.props;
		this.state.click = click;
		const { nameWF } = this.props;
		this.state.nameWF = nameWF;
		const { nameUT } = this.props;
		this.state.nameUT = nameUT;
		let baseClasses = "SortableItem rfb-item";
		if (this.state.click == true) {
			if (this.state.nameWF == "") {
				toast.error("Error ! Select workflow and usertask", {
					position: toast.POSITION.TOP_LEFT,
				});
			} else if (this.state.nameUT == "") {
				toast.error("Error ! Select workflow and usertask", {
					position: toast.POSITION.TOP_LEFT,
				});
			}
		}
		return (
			<div>
				{this.state.click == true && (
					<div>
						{this.state.Forms.id != null && (
							<Modal
								isOpen={this.state.modal}
								fade={false}
								toggle={this.toggle}
								className={this.props.className}
							>
								<ModalHeader toggle={this.toggle}>
									<h5>{this.state.nameWF}</h5>
								</ModalHeader>
								<ModalBody>
									<div>
										<Table className="mb-0">
											<tbody>
												<tr>
													{this.state.Forms.data.map((d) => (
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
																			<Input
																				type="file"
																				name="file"
																				id="exampleFile"
																			/>
																		</Col>
																	</FormGroup>
																)}
																{d.element == "Camera" && (
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
									</div>
								</ModalBody>
							</Modal>
						)}
					</div>
				)}
			</div>
		);
	}
}

export default Show_Forms;
