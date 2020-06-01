import React, { Component } from "react";
import base_url from "../../../../service/base_url";
import { toast, Bounce } from "react-toastify";
import { Button, FormGroup, Label, Input, Col, ModalFooter } from "reactstrap";

export default class New_Group extends Component {
	constructor(props) {
		super(props);
		this.state = { name: "" };
		this.saveGroup = this.saveGroup.bind(this);
		this.refreshPage = this.refreshPage.bind(this);
	}

	saveGroup(event) {
		event.preventDefault();

		fetch(base_url.addGroup(), {
			method: "post",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				name_GP: this.state.name,
			}),
		})
			.then((res) => res.text())
			.then((res) => console.log(res));
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
						<Label>
							<b>Name group</b>
						</Label>
						<Input
							type="text"
							required
							onChange={(ev) =>
								this.setState({
									name: ev.target.value,
								})
							}
						></Input>
					</Col>
				</FormGroup>

				<ModalFooter>
					<Button
						outline
						className="btn-wide mb-2 mr-2"
						size="lg"
						color="warning"
						onClick={this.refreshPage}
					>
						Cancel
					</Button>
					<Button
						className="btn-wide mb-2 mr-2"
						size="lg"
						color="warning"
						onClick={this.saveGroup}
					>
						Save
					</Button>
				</ModalFooter>
			</div>
		);
	}
}
