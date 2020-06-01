import React, { Component } from "react";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import Form from "./form";
import Form_User from "../../Process_To_Validate/Validate_Process/form_User";

export default class Show_Response extends Component {
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
		const { idReq } = this.props;
		return (
			<div>
				{idReq != "" && (
					<Modal
						isOpen={this.state.modal}
						fade={false}
						toggle={this.toggle}
						className={this.props.className}
						size="lg"
						style={{ maxWidth: "1400px", width: "50%" }}
					>
						<ModalHeader toggle={this.toggle}>
							<div className="text-center">
								<h3>Response</h3>
							</div>
						</ModalHeader>
						<ModalBody>
							<Form_User idReq={idReq} />
							<hr />
							<Form idReq={idReq} />
						</ModalBody>
					</Modal>
				)}
			</div>
		);
	}
}
