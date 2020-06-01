import React, { Component } from "react";
import base_url from "../../../../service/base_url";
import { toast, Bounce } from "react-toastify";
import { Button, FormGroup, Label, Input, Col, ModalFooter } from "reactstrap";
import axios from "axios";

export default class Update extends Component {
	constructor(props) {
		super(props);
		this.state = { group: "" };
		this.saveGroup = this.saveGroup.bind(this);
		this.refreshPage = this.refreshPage.bind(this);
		const { idGp } = this.props;
		this.state.idGp = idGp;
	}
	componentDidMount() {
		axios.get(base_url.getGroup_Byid() + "/" + this.state.idGp).then((res) => {
			const group = res.data;
			this.state.name = group.name_GP;
			this.setState({ group });
		});
	}

	saveGroup(event) {
		event.preventDefault();

		fetch(base_url.addGroup(), {
			method: "post",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				id: this.state.idGp,
				name_GP: this.state.name,
			}),
		});
		window.location.reload(false);
	}

	refreshPage() {
		window.location.reload(false);
	}

	render() {
		return (
			<div>
				<FormGroup row>
					<Col sm={1}></Col>
					<Col sm={5}>
						<Label>
							<b>Name group</b>
						</Label>
						<Input
							type="text"
							required
							value={this.state.name}
							onChange={(ev) =>
								this.setState({
									name: ev.target.value,
								})
							}
						></Input>
					</Col>
				</FormGroup>

				<ModalFooter>
					<Button
						outline
						className="btn-wide mb-2 mr-2"
						size="lg"
						color="warning"
						onClick={this.refreshPage}
					>
						Cancel
					</Button>
					<Button
						className="btn-wide mb-2 mr-2"
						size="lg"
						color="warning"
						onClick={this.saveGroup}
					>
						Save
					</Button>
				</ModalFooter>
			</div>
		);
	}
}
