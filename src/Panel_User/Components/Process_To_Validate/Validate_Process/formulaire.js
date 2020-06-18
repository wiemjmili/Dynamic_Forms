import React, { Component } from "react";
import base_url from "../../../../service/base_url";
import {
	Table,
	CustomInput,
	FormGroup,
	Label,
	Input,
	Col,
	ModalFooter,
	Button,
} from "reactstrap";
import axios from "axios";

class Formulaire extends Component {
	constructor(props) {
		super(props);
		this.state = {
			Forms: [],
			Usertasks: [],
			idNextUT: "",
			idReq: "",
			tab: [],
			Form: "",
		};
		const { idUT } = this.props;
		this.state.idUT = idUT;
		this.validate = this.validate.bind(this);
		this.cancel = this.cancel.bind(this);
	}
	componentDidMount() {
		console.log(this.state.idUT);
		axios.get(base_url.all_UserTasks()).then((res) => {
			const Usertasks = res.data;
			this.setState({ Usertasks });
		});
		axios.get(base_url.getFormsByUser() + "/" + this.state.idUT).then((res) => {
			const Forms = res.data;
			this.setState({ Forms });
		});
	}

	componentDidUpdate() {}

	validate() {
		event.preventDefault();
		let n1 = this.state.Forms.length;
		/*for (let i = 0; i < n1; i++) {
			if (this.state.Forms[i].idUT == this.state.idNextUT) {
				this.state.Form = this.state.Forms[i];
			}
		}*/
		this.state.Form = this.state.Forms[0];
		let n2 = this.state.Form.data.length;
		for (let i = 1; i < n2; i++) {
			this.state.tab.push(this.state[i]);
		}

		let add_res = base_url.addResponse();
		fetch(add_res, {
			method: "post",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				response: this.state.tab,
				form: this.state.Form,
				idReq: this.state.idReq,
			}),
		});
		window.location.reload(false);
	}
	cancel() {
		window.location.reload(false);
	}

	render() {
		const { idNextUT } = this.props;
		this.state.idNextUT = idNextUT;
		const { idUT } = this.props;
		this.state.idUT = idUT;
		const { idReq } = this.props;
		this.state.idReq = idReq;
		return (
			<div>
				{this.state.Forms.map((F) => (
					<div>
						<div>
							<hr />
							<Table className="mb-0">
								<tbody>
									<tr>
										{F.data.map((d, index) => (
											<div>
												<div>
													{d.element == "Header" && (
														<div className="text-center">
															<h3>{d.content}</h3>
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
							<ModalFooter>
								<Button color="danger" onClick={this.cancel}>
									Close
								</Button>
								<Button color="success" onClick={this.validate}>
									Send
								</Button>
							</ModalFooter>
						</div>
					</div>
				))}
			</div>
		);
	}
}
export default Formulaire;
