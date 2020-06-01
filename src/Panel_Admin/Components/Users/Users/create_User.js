import React, { Component } from "react";
import base_url from "../../../../service/base_url";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import axios from "axios";
import New_user from "./new_User";

export default class Create_User extends Component {
	constructor(props) {
		super(props);

		this.state = { modal: true, Workflow: [], nameWF: "" };
		this.toggle = this.toggle.bind(this);
	}
	componentDidMount() {}

	toggle() {
		this.setState({
			modal: !this.state.modal,
		});
		window.location.reload(false);
	}

	render() {
		const { click } = this.props;
		this.state.click = click;
		return (
			<div>
				{this.state.click == true && (
					<Modal
						isOpen={this.state.modal}
						fade={false}
						toggle={this.toggle}
						className={this.props.className}
						size="lg"
						style={{ maxWidth: "1600px", width: "60%" }}
					>
						<ModalHeader toggle={this.toggle}>
							<h5>Create user</h5>
						</ModalHeader>
						<ModalBody>
							<New_user />
						</ModalBody>
					</Modal>
				)}
			</div>
		);
	}
}
