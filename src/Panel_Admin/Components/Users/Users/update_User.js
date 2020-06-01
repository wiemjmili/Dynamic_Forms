import React, { Component } from "react";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import Update from "./update";

export default class Update_Group extends Component {
	constructor(props) {
		super(props);

		this.state = { modal: true };
		this.toggle = this.toggle.bind(this);
	}

	toggle() {
		this.setState({
			modal: !this.state.modal,
		});
		window.location.reload(false);
	}

	render() {
		const { click1 } = this.props;
		this.state.click1 = click1;
		const { id } = this.props;
		this.state.id = id;
		return (
			<div>
				{this.state.click1 == true && (
					<div>
						{this.state.id != "" && (
							<Modal
								isOpen={this.state.modal}
								fade={false}
								toggle={this.toggle}
								className={this.props.className}
								size="lg"
								style={{ maxWidth: "1600px", width: "60%" }}
							>
								<ModalHeader toggle={this.toggle}>
									<h5>Update user</h5>
								</ModalHeader>
								<ModalBody>
									<Update id={id} />
								</ModalBody>
							</Modal>
						)}
					</div>
				)}
			</div>
		);
	}
}
