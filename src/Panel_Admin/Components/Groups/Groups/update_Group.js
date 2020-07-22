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
		const { idGp } = this.props;
		this.state.idGp = idGp;
		return (
			<div>
				{this.state.click1 == true && (
					<div>
						{this.state.idGp != "" && (
							<Modal
								isOpen={this.state.modal}
								fade={false}
								toggle={this.toggle}
								className={this.props.className}
								style={{ width: "40%" }}
							>
								<ModalHeader toggle={this.toggle}>
									<h5>Update group</h5>
								</ModalHeader>
								<ModalBody>
									<Update idGp={idGp} />
								</ModalBody>
							</Modal>
						)}
					</div>
				)}
			</div>
		);
	}
}
