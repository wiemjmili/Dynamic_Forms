import React, { Component } from "react";
import base_url from "../../../../service/base_url";
import { Table, FormGroup, Button, Col, Input } from "reactstrap";
import {
	UncontrolledButtonDropdown,
	DropdownToggle,
	DropdownMenu,
	DropdownItem,
} from "reactstrap";

import axios from "axios";
import Create_user from "./create_User";
import Update_user from "./update_User";
import Delete_User from "./delete_User";

class List_Users extends Component {
	constructor(props) {
		super(props);
		this.state = {
			Users: [],
			click: false,
			id: "",
			search: "",
		};
		this.refresh = this.refresh.bind(this);
	}
	componentDidMount() {
		axios.get(base_url.getAllUsers()).then((res) => {
			const Users = res.data;
			this.setState({ Users });
		});
	}

	refresh() {
		window.location.reload(false);
	}
	updateSearch(event) {
		this.setState({ search: event.target.value.substr(0, 20) });
	}
	render() {
		let filteredUsers = this.state.Users.filter((user) => {
			return (
				user.username.toLowerCase().indexOf(this.state.search.toLowerCase()) !==
				-1
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
								onClick={() =>
									this.setState({
										click: true,
									})
								}
							>
								<Create_user click={this.state.click} />
								Create
							</Button>
							<Button
								outline
								className="btn-wide mb-2 mr-2"
								color="info"
								onClick={() =>
									this.setState({
										click1: true,
									})
								}
							>
								<Update_user click1={this.state.click1} id={this.state.id} />
								Update
							</Button>
							<Button
								outline
								className="btn-wide mb-2 mr-2"
								color="info"
								onClick={() =>
									this.setState({
										click2: true,
									})
								}
							>
								<Delete_User click2={this.state.click2} id={this.state.id} />
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
									<b>Username</b>
								</Col>
								<Col sm={2}>
									<b>Email</b>
								</Col>

								<Col sm={1}>
									<b>Roles</b>
								</Col>
								<Col sm={2}>
									<b>Groups</b>
								</Col>
							</FormGroup>
							<hr />
						</div>
						{filteredUsers.map((user) => (
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
														id: user.id,
													})
												}
											/>
											<span class="checkmark"></span>
										</label>
									</Col>

									<Col sm={2}>{user.username}</Col>
									<Col sm={2}>{user.email}</Col>

									<Col sm={1}>
										<UncontrolledButtonDropdown>
											{user.roles.length != 0 && (
												<div>
													<DropdownToggle
														caret
														outline
														className="mb-2 mr-2"
														color="secondary"
													>
														{user.roles[0].name}
													</DropdownToggle>

													<DropdownMenu>
														{user.roles.map((role) => (
															<DropdownItem>{role.name}</DropdownItem>
														))}
													</DropdownMenu>
												</div>
											)}
										</UncontrolledButtonDropdown>
									</Col>
									<Col sm={2}>
										<UncontrolledButtonDropdown>
											{user.groups.length != 0 && (
												<div>
													<DropdownToggle
														caret
														outline
														className="mb-2 mr-2"
														color="secondary"
													>
														{user.groups[0].name}
													</DropdownToggle>

													<DropdownMenu>
														{user.groups.map((gp) => (
															<DropdownItem>{gp.name}</DropdownItem>
														))}
													</DropdownMenu>
												</div>
											)}
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
export default List_Users;
