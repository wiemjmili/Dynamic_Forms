import React, { Component } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
import base_url from "../../../../service/base_url";
import { ListGroup, ListGroupItem } from "reactstrap";
import axios from "axios";

export default class Delete_Role extends Component {
	constructor(props) {
		super(props);
		this.state = { modal: true, Roles: [] };
		this.toggle = this.toggle.bind(this);
		this.deleteGroup = this.deleteGroup.bind(this);
		this.refreshPage = this.refreshPage.bind(this);
	}
	componentDidMount() {
		axios.get(base_url.getAllRoles()).then((res) => {
			const Roles = res.data;
			this.setState({ Roles });
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
			url: base_url.deleteRole() + "/" + this.state.id,
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
								style={{ width: "30%" }}
							>
								<ModalHeader toggle={this.toggle}>
									<h5>Delete role</h5>
								</ModalHeader>
								<ModalBody>
									<ListGroup>
										{this.state.Roles.map((r) => (
											<div>
												{r.id == id && (
													<ListGroupItem color="danger">
														Are you sure you want to delete role: {r.name} ?
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
										Close
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
