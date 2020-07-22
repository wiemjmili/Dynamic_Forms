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
import Create_Group from "./create_Group";
import Update_Group from "./update_Group";
import Delete_Group from "./delete_Group";

class List_Groups extends Component {
	constructor(props) {
		super(props);
		this.state = {
			click: false,
			groups: [],
			Users: [],
			idGp: "",
			search: "",
		};
		this.refresh = this.refresh.bind(this);
	}
	componentDidMount() {
		axios.get(base_url.getAllUsers()).then((res) => {
			const Users = res.data;
			this.setState({ Users });
		});
		axios.get(base_url.all_Groups()).then((res) => {
			const groups = res.data;
			this.setState({ groups });
		});
	}

	refresh() {
		window.location.reload(false);
	}
	updateSearch(event) {
		this.setState({ search: event.target.value.substr(0, 20) });
	}
	render() {
		let filteredgroups = this.state.groups.filter((group) => {
			return (
				group.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1
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
								<Create_Group click={this.state.click} />
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
								<Update_Group
									click1={this.state.click1}
									idGp={this.state.idGp}
								/>
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
								<Delete_Group
									click2={this.state.click2}
									idGp={this.state.idGp}
								/>
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

						{filteredgroups.map((gp) => (
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
														idGp: gp.id,
													})
												}
											/>
											<span class="checkmark"></span>
										</label>
									</Col>
									<Col sm={2}>{gp.name}</Col>
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
														{user.groups.map((gpUser) => (
															<div>
																{gpUser.id == gp.id && (
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
export default List_Groups;
