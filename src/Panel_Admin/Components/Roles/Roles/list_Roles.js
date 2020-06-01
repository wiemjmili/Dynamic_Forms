import React, { Component } from "react";
import base_url from "../../../../service/base_url";
import { Table, Label, FormGroup, Button, Col, Input } from "reactstrap";
import axios from "axios";
import Create_Role from "./create_Role";
import Update_Role from "./update_Role";
import Delete_Role from "./delete_Role";

class List_Roles extends Component {
	constructor(props) {
		super(props);
		this.state = {
			click: false,
			Roles: [],
			id: "",
		};
		this.refresh = this.refresh.bind(this);
	}
	componentDidMount() {
		axios.get(base_url.getAllRoles()).then((res) => {
			const Roles = res.data;
			this.setState({ Roles });
		});
	}
	create(event) {
		event.preventDefault();
	}
	delete(event) {
		event.preventDefault();
	}
	refresh() {
		window.location.reload(false);
	}
	render() {
		return (
			<div>
				<Table className="mb-0">
					<tbody>
						<tr>
							<Button
								className="btn-wide mb-2 mr-2"
								size="lg"
								color="warning"
								onClick={(ev) =>
									this.setState({
										click: true,
									})
								}
							>
								<Create_Role click={this.state.click} />
								Create
							</Button>
							<Button
								outline
								className="btn-wide mb-2 mr-2"
								size="lg"
								color="warning"
								onClick={(ev) =>
									this.setState({
										click1: true,
									})
								}
							>
								<Update_Role click1={this.state.click1} id={this.state.id} />
								Update
							</Button>
							<Button
								outline
								className="btn-wide mb-2 mr-2"
								size="lg"
								color="warning"
								onClick={(ev) =>
									this.setState({
										click2: true,
									})
								}
							>
								<Delete_Role click2={this.state.click2} id={this.state.id} />
								Delete
							</Button>
						</tr>
						<hr />
						<div>
							<FormGroup row>
								<Col sm={1}></Col>
								<Col sm={2}>
									<b>Name</b>
								</Col>
							</FormGroup>
							<hr />
						</div>

						{this.state.Roles.map((role, index) => (
							<div>
								<FormGroup row>
									<Col sm={1}>
										<label class="container1">
											<Input
												type="checkbox"
												id="scales"
												name="scales"
												onChange={() =>
													this.setState({
														id: role.id,
													})
												}
											/>
											<span class="checkmark"></span>
										</label>
									</Col>
									<Col sm={2}>{role.name}</Col>
								</FormGroup>
								<hr />
							</div>
						))}
					</tbody>
				</Table>
			</div>
		);
	}
}
export default List_Roles;
