import React, { Component } from "react";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import New_Group from "./new_Group";

export default class Create_Group extends Component {
	constructor(props) {
		super(props);
		this.state = { modal: true, idGp: "" };
		this.toggle = this.toggle.bind(this);
	}

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
							<h5>Create group</h5>
						</ModalHeader>
						<ModalBody>
							<New_Group />
						</ModalBody>
					</Modal>
				)}
			</div>
		);
	}
}
