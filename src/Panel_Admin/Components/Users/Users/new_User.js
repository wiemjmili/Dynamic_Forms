import React, { Component } from "react";
import base_url from "../../../../service/base_url";
import { toast, Bounce } from "react-toastify";
import Select from "react-select";
import {
	AvForm,
	AvGroup,
	AvInput,
	AvFeedback,
} from "availity-reactstrap-validation";

import { Button, FormGroup, Label, Input, Col, ModalFooter } from "reactstrap";
import axios from "axios";

export default class New_user extends Component {
	constructor(props) {
		super(props);
		this.state = {
			groups: [],
			options: [],
			Roles: [],
			selectedOptionGP: null,
			selectedOptionR: null,
			tabGp: [],
			tabR: [],
		};
		this.saveUser = this.saveUser.bind(this);
		this.refreshPage = this.refreshPage.bind(this);
	}
	componentDidMount() {
		axios.get(base_url.all_Groups()).then((res) => {
			const groups = res.data;
			this.setState({ groups });
			const n = this.state.groups.length;
			let options = [];
			for (let i = 0; i < n; i++) {
				let gp = {
					value: this.state.groups[i].name,
					label: this.state.groups[i].name,
				};
				options.push(gp);
			}
			this.setState({ options });
			axios.get(base_url.getAllRoles()).then((res) => {
				const Roles = res.data;
				this.setState({ Roles });
				const n = this.state.Roles.length;
				let optionsR = [];
				for (let i = 0; i < n; i++) {
					let role = {
						value: this.state.Roles[i].name,
						label: this.state.Roles[i].name,
					};
					optionsR.push(role);
				}
				this.setState({ optionsR });
			});
		});
	}

	handleChangeGp = (selectedOptionGP) => {
		this.setState({ selectedOptionGP });
	};
	handleChangeRole = (selectedOptionR) => {
		this.setState({ selectedOptionR });
	};

	saveUser(event) {
		event.preventDefault();
		if (this.state.selectedOptionGP != null) {
			const n1 = this.state.selectedOptionGP.length;
			let n_Gp = this.state.groups.length;
			for (let i = 0; i < n1; i++) {
				for (let j = 0; j < n_Gp; j++) {
					if (
						this.state.groups[j].name == this.state.selectedOptionGP[i].label
					) {
						this.state.tabGp.push(this.state.groups[j]);
					}
				}
			}
		}
		if (this.state.selectedOptionR != null) {
			const n2 = this.state.selectedOptionR.length;
			let n_R = this.state.Roles.length;
			for (let i = 0; i < n2; i++) {
				for (let j = 0; j < n_R; j++) {
					if (this.state.Roles[j].name == this.state.selectedOptionR[i].label) {
						this.state.tabR.push(this.state.Roles[j]);
					}
				}
			}
		}

		fetch(base_url.addUser(), {
			method: "post",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				username: this.state.username,
				email: this.state.email,
				password: this.state.password,
				roles: this.state.tabR,
				groups: this.state.tabGp,
			}),
		});
		window.location.reload(false);
	}

	refreshPage() {
		window.location.reload(false);
	}

	render() {
		return (
			<div>
				<FormGroup row>
					<Col sm={1}></Col>

					<Col sm={5}>
						<AvForm>
							<AvGroup>
								<Label for="example">Username</Label>
								<AvInput
									name="Username"
									required
									type="text"
									required
									onChange={(ev) =>
										this.setState({
											username: ev.target.value,
										})
									}
								/>

								<AvFeedback>This is an error!</AvFeedback>
							</AvGroup>
						</AvForm>
					</Col>
				</FormGroup>
				<FormGroup row>
					<Col sm={1}></Col>
					<Col sm={5}>
						<AvForm>
							<AvGroup>
								<Label for="example">Email</Label>
								<AvInput
									name="Email"
									required
									type="email"
									required
									onChange={(ev) =>
										this.setState({
											email: ev.target.value,
										})
									}
								/>

								<AvFeedback>This is an error!</AvFeedback>
							</AvGroup>
						</AvForm>
					</Col>
					<Col sm={5}>
						<AvForm>
							<AvGroup>
								<Label for="example">Password</Label>
								<AvInput
									name="Password"
									required
									type="text"
									required
									onChange={(ev) =>
										this.setState({
											password: ev.target.value,
										})
									}
								/>

								<AvFeedback>This is an error!</AvFeedback>
							</AvGroup>
						</AvForm>
					</Col>
				</FormGroup>
				<FormGroup row>
					<Col sm={1}></Col>
					<Col sm={5}>
						<Label>
							<b>Roles</b>
						</Label>
						<Select
							isMulti
							required
							className="basic-multi-select"
							options={this.state.optionsR}
							onChange={this.handleChangeRole}
						></Select>
					</Col>

					<Col sm={5}>
						<Label>
							<b>Groups</b>
						</Label>
						<Select
							isMulti
							required
							className="basic-multi-select"
							options={this.state.options}
							onChange={this.handleChangeGp}
						></Select>
					</Col>
				</FormGroup>

				<ModalFooter>
					<Button
						outline
						className="btn-wide mb-2 mr-2"
						color="danger"
						onClick={this.refreshPage}
					>
						Cancel
					</Button>
					<Button
						className="btn-wide mb-2 mr-2"
						color="success"
						onClick={this.saveUser}
					>
						Save
					</Button>
				</ModalFooter>
			</div>
		);
	}
}
