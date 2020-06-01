import React, { Component } from "react";
import base_url from "../../../../service/base_url";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import axios from "axios";
import New_Request from "./new_Request";

export default class Create_request extends Component {
	constructor(props) {
		super(props);

		this.state = { modal: true, Workflow: [], nameWF: "" };
		this.toggle = this.toggle.bind(this);
	}
	componentDidMount() {
		axios.get(base_url.getlistProcessbyUser()).then((res) => {
			const Workflow = res.data;
			this.setState({ Workflow });
		});
	}

	handleChangeWF = (event) => {
		this.setState({ nameWF: event.target.value });
		nameWF = this.state.nameWF;
	};

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
						style={{ maxWidth: "1600px", width: "50%" }}
					>
						<ModalHeader toggle={this.toggle}>
							<h3>Create request</h3>
						</ModalHeader>
						<ModalBody>
							<New_Request click={this.state.nameWF} />
						</ModalBody>
					</Modal>
				)}
			</div>
		);
	}
}
