import React, { Component } from "react";
import base_url from "../../../../service/base_url";
import { Table, FormGroup, Button, Col, Input, Label } from "reactstrap";
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
			idGp: "",
		};
		this.refresh = this.refresh.bind(this);
	}
	componentDidMount() {
		axios.get(base_url.all_Groups()).then((res) => {
			const groups = res.data;
			this.setState({ groups });
		});
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
								<Create_Group click={this.state.click} />
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
								<Update_Group
									click1={this.state.click1}
									idGp={this.state.idGp}
								/>
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
								<Delete_Group
									click2={this.state.click2}
									idGp={this.state.idGp}
								/>
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

						{this.state.groups.map((gp, index) => (
							<div>
								<FormGroup row>
									<Col sm={1}>
										<label class="container1">
											<Input
												type="checkbox"
												id="scales"
												name="scales"
												onChange={(ev) =>
													this.setState({
														idGp: gp.id,
													})
												}
											/>
											<span class="checkmark"></span>
										</label>
									</Col>
									<Col sm={2}>{gp.name_GP}</Col>
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
