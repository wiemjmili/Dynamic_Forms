import React, { Component } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
import base_url from "../../../../service/base_url";
import { ListGroup, ListGroupItem } from "reactstrap";
import axios from "axios";

export default class Reject_Request extends Component {
	constructor(props) {
		super(props);
		this.state = { modal: true };
		this.toggle = this.toggle.bind(this);
		this.reject_Request = this.reject_Request.bind(this);
		this.refreshPage = this.refreshPage.bind(this);
	}

	toggle() {
		this.setState({
			modal: !this.state.modal,
		});
		window.location.reload(false);
	}
	reject_Request() {
		let reject_Request = base_url.reject_Request();
		fetch(reject_Request, {
			method: "post",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				id: this.state.idReq,
			}),
		});
		window.location.reload(false);
	}

	refreshPage() {
		window.location.reload(false);
	}

	render() {
		const { click } = this.props;
		this.state.click = click;
		const { idReq } = this.props;
		this.state.idReq = idReq;
		return (
			<div>
				{this.state.click == true && (
					<div>
						<Modal
							isOpen={this.state.modal}
							fade={false}
							toggle={this.toggle}
							className={this.props.className}
							size="lg"
							style={{ maxWidth: "1600px", width: "30%" }}
						>
							<ModalHeader toggle={this.toggle}>
								<h5>Reject request</h5>
							</ModalHeader>
							<ModalBody>
								<ListGroup>
									<div>
										<ListGroupItem color="warning">
											Are you sure you want to reject this request ?
										</ListGroupItem>
									</div>
								</ListGroup>
								<br />
							</ModalBody>
							<ModalFooter>
								<Button
									outline
									className="btn-wide mb-2 mr-2"
									size="lg"
									color="warning"
									onClick={this.refreshPage}
								>
									Close
								</Button>
								<Button
									className="btn-wide mb-2 mr-2"
									size="lg"
									color="warning"
									onClick={this.reject_Request}
								>
									Reject
								</Button>
							</ModalFooter>
						</Modal>
					</div>
				)}
			</div>
		);
	}
}
