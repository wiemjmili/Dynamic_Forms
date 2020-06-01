import React, { Component } from "react";
import base_url from "../../../../service/base_url";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import Form_User from "./form_User";
import Form_validate from "./form_validate";

import axios from "axios";

export default class Validate_request extends Component {
	constructor(props) {
		super(props);

		this.state = { idReq: "", modal: true, Requests: "" };
		this.toggle = this.toggle.bind(this);
	}
	componentDidMount() {
		axios.get(base_url.getRequestToValidate()).then((res) => {
			const Requests = res.data;
			this.setState({ Requests });
		});
	}

	toggle() {
		this.setState({
			modal: !this.state.modal,
		});
		window.location.reload(false);
	}

	render() {
		const { name } = this.props;
		this.state.idReq = name;
		return (
			<div>
				{this.state.idReq != "" && (
					<Modal
						isOpen={this.state.modal}
						fade={false}
						toggle={this.toggle}
						className={this.props.className}
						size="lg"
						style={{ maxWidth: "1600px", width: "50%" }}
					>
						<ModalHeader toggle={this.toggle}>
							<h3>Validate request</h3>
						</ModalHeader>
						<ModalBody>
							{this.state.Requests.map((Req) => (
								<div>
									{Req.id == name && (
										<div>
											<Form_User idReq={Req.id} />
											<Form_validate idUT={Req.form.idUT} idReq={Req.id} />
										</div>
									)}
								</div>
							))}
						</ModalBody>
					</Modal>
				)}
			</div>
		);
	}
}
