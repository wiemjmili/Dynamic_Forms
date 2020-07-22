import React, { Component } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
import base_url from "../../../../service/base_url";
import { ListGroup, ListGroupItem } from "reactstrap";
import axios from "axios";

export default class Delete_User extends Component {
	constructor(props) {
		super(props);
		this.state = { modal: true, Users: [] };
		this.toggle = this.toggle.bind(this);
		this.deleteGroup = this.deleteGroup.bind(this);
		this.refreshPage = this.refreshPage.bind(this);
	}
	componentDidMount() {
		axios.get(base_url.getAllUsers()).then((res) => {
			const Users = res.data;
			this.setState({ Users });
		});
	}

	toggle() {
		this.setState({
			modal: !this.state.modal,
		});
		window.location.reload(false);
	}
	deleteGroup() {
		axios({
			method: "delete",
			url: base_url.deleteUser() + "/" + this.state.id,
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
								style={{ maxWidth: "1600px", width: "30%" }}
							>
								<ModalHeader toggle={this.toggle}>
									<h5>Delete user</h5>
								</ModalHeader>
								<ModalBody>
									<ListGroup>
										{this.state.Users.map((user) => (
											<div>
												{user.id == id && (
													<ListGroupItem color="danger">
														Are you sure you want to delete user {user.username}
														?
													</ListGroupItem>
												)}
											</div>
										))}
									</ListGroup>
									<br />
								</ModalBody>
								<ModalFooter>
									<Button
										outline
										className="btn-wide mb-2 mr-2"
										color="success"
										onClick={this.refreshPage}
									>
										Cancel
									</Button>
									<Button
										className="btn-wide mb-2 mr-2"
										color="danger"
										onClick={this.deleteGroup}
									>
										Delete
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
