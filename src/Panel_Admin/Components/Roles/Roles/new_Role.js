import React, { Component } from "react";
import base_url from "../../../../service/base_url";
import { toast, Bounce } from "react-toastify";
import {
	AvForm,
	AvGroup,
	AvInput,
	AvFeedback,
} from "availity-reactstrap-validation";
import { Button, FormGroup, Label, Input, Col, ModalFooter } from "reactstrap";

export default class New_Role extends Component {
	constructor(props) {
		super(props);
		this.state = { name: "" };

		this.saveRole = this.saveRole.bind(this);
		this.refreshPage = this.refreshPage.bind(this);
	}

	componentDidMount() {}

	saveRole(event) {
		event.preventDefault();

		fetch(base_url.addRole(), {
			method: "post",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				name: this.state.name,
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
								<Label for="example">Role</Label>
								<AvInput
									name="name"
									required
									type="text"
									required
									onChange={(ev) =>
										this.setState({
											name: ev.target.value,
										})
									}
								/>
								<AvFeedback>This is an error!</AvFeedback>
							</AvGroup>
						</AvForm>
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
						onClick={this.saveRole}
					>
						Save
					</Button>
				</ModalFooter>
			</div>
		);
	}
}
