import React, { Component } from "react";
import base_url from "../../../../service/base_url";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import axios from "axios";
import New_Role from "./new_Role";

export default class Create_Role extends Component {
	constructor(props) {
		super(props);

		this.state = { modal: true };
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
						style={{ width: "40%" }}
					>
						<ModalHeader toggle={this.toggle}>
							<h5>Create role</h5>
						</ModalHeader>
						<ModalBody>
							<New_Role />
						</ModalBody>
					</Modal>
				)}
			</div>
		);
	}
}
