import React, { Component } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
import base_url from "../../../../service/base_url";
import { ListGroup, ListGroupItem } from "reactstrap";
import axios from "axios";

export default class Cancel_request extends Component {
	constructor(props) {
		super(props);
		this.state = { modal: true, id: "" };
		this.toggle = this.toggle.bind(this);
		this.cancel_request = this.cancel_request.bind(this);
		this.refreshPage = this.refreshPage.bind(this);
		const { id } = this.props;
		this.state.id = id;
	}

	componentDidMount() {
		axios.get(base_url.getRequestByUser()).then((res) => {
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
	cancel_request() {
		axios({
			method: "delete",
			url: base_url.cancelRequest() + "/" + this.state.id,
		});
		window.location.reload(false);
	}

	refreshPage() {
		window.location.reload(false);
	}

	render() {
		const { click2 } = this.props;
		this.state.click2 = click2;
		const { id } = this.props;
		this.state.id = id;
		return (
			<div>
				{this.state.click2 == true && (
					<div>
						{this.state.id != "" && (
							<Modal
								isOpen={this.state.modal}
								fade={false}
								toggle={this.toggle}
								className={this.props.className}
								size="lg"
								style={{ maxWidth: "1600px", width: "50%" }}
							>
								<ModalHeader toggle={this.toggle}>
									<h5>Cancel request</h5>
								</ModalHeader>
								<ModalBody>
									<ListGroup>
										{this.state.Requests.map((req) => (
											<div>
												{req.id == id && (
													<ListGroupItem color="warning">
														Are you sure to cancel this request
													</ListGroupItem>
												)}
											</div>
										))}
									</ListGroup>
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
										onClick={this.cancel_request}
									>
										Send
									</Button>
								</ModalFooter>
							</Modal>
						)}
					</div>
				)}
			</div>
		);
	}
}
