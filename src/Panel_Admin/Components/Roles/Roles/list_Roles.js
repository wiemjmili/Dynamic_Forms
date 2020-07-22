import React, { Component } from "react";
import base_url from "../../../../service/base_url";
import { Table, FormGroup, Button, Col, Input } from "reactstrap";
import axios from "axios";
import {
	UncontrolledButtonDropdown,
	DropdownToggle,
	DropdownMenu,
	DropdownItem,
} from "reactstrap";
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
			search: "",
		};
		this.refresh = this.refresh.bind(this);
	}
	componentDidMount() {
		axios.get(base_url.getAllRoles()).then((res) => {
			const Roles = res.data;
			this.setState({ Roles });
		});
		axios.get(base_url.getAllUsers()).then((res) => {
			const Users = res.data;
			this.setState({ Users });
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
	updateSearch(event) {
		this.setState({ search: event.target.value.substr(0, 20) });
	}
	render() {
		let filteredRoles = this.state.Roles.filter((role) => {
			return (
				role.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1
			);
		});
		return (
			<div>
				<Table className="mb-0">
					<tbody>
						<tr>
							<Button
								className="btn-wide mb-2 mr-2"
								color="info"
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
								color="info"
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
								color="info"
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
						<br />
						<FormGroup row>
							<Col sm={4}>
								<Input
									type="text"
									value={this.state.search}
									onChange={this.updateSearch.bind(this)}
									placeholder="Search"
									aria-label="Search"
								/>
							</Col>
						</FormGroup>
						<br />
						<div>
							<FormGroup row>
								<Col sm={1}></Col>
								<Col sm={2}>
									<b>Name</b>
								</Col>
								<Col sm={5}>
									<b>Users</b>
								</Col>
							</FormGroup>
							<hr />
						</div>

						{filteredRoles.map((role) => (
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
									<Col sm={5}>
										<UncontrolledButtonDropdown>
											<DropdownToggle
												caret
												outline
												className="mb-2 mr-2"
												color="secondary"
											>
												Users
											</DropdownToggle>
											<DropdownMenu>
												{this.state.Users.map((user) => (
													<div>
														{user.roles.map((roleUser) => (
															<div>
																{roleUser.id == role.id && (
																	<DropdownItem>{user.username}</DropdownItem>
																)}
															</div>
														))}
													</div>
												))}
											</DropdownMenu>
										</UncontrolledButtonDropdown>
									</Col>
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
