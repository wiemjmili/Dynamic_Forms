import React, { Component } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
import base_url from "../../../../service/base_url";
import { ListGroup, ListGroupItem } from "reactstrap";
import axios from "axios";

export default class Delete_Group extends Component {
	constructor(props) {
		super(props);
		this.state = { modal: true, groups: [] };
		this.toggle = this.toggle.bind(this);
		this.deleteGroup = this.deleteGroup.bind(this);
		this.refreshPage = this.refreshPage.bind(this);
	}
	componentDidMount() {
		axios.get(base_url.all_Groups()).then((res) => {
			const groups = res.data;
			this.setState({ groups });
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
			url: base_url.deleteGroup() + "/" + this.state.idGp,
		});
		window.location.reload(false);
	}

	refreshPage() {
		window.location.reload(false);
	}

	render() {
		const { click2 } = this.props;
		this.state.click2 = click2;
		const { idGp } = this.props;
		this.state.idGp = idGp;
		return (
			<div>
				{this.state.click2 == true && (
					<div>
						{this.state.idGp != "" && (
							<Modal
								isOpen={this.state.modal}
								fade={false}
								toggle={this.toggle}
								className={this.props.className}
								style={{ maxWidth: "1600px", width: "30%" }}
							>
								<ModalHeader toggle={this.toggle}>
									<h5>Delete group</h5>
								</ModalHeader>
								<ModalBody>
									<ListGroup>
										{this.state.groups.map((gp) => (
											<div>
												{gp.id == idGp && (
													<ListGroupItem color="info">
														Are you sure you want to delete group : {gp.name} ?
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
										color="info"
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
