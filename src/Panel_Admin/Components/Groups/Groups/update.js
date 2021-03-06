import React, { Component } from "react";
import base_url from "../../../../service/base_url";
import { toast, Bounce } from "react-toastify";
import { Button, FormGroup, Label, Input, Col, ModalFooter } from "reactstrap";
import axios from "axios";
import {
	AvForm,
	AvGroup,
	AvInput,
	AvFeedback,
} from "availity-reactstrap-validation";

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
			this.state.name = group.name;
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
				name: this.state.name,
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
						<AvForm>
							<AvGroup>
								<Label for="example">Group</Label>
								<AvInput
									name="name"
									required
									value={this.state.name}
									type="text"
									required
									onChange={(ev) =>
										this.setState({
											name: ev.target.value,
										})
									}
								/>
								<AvFeedback>This is an error!</AvFeedback>
							</AvGroup>
						</AvForm>
					</Col>
				</FormGroup>

				<ModalFooter>
					<Button
						outline
						className="btn-wide mb-2 mr-2"
						color="danger"
						onClick={this.refreshPage}
					>
						Cancel
					</Button>
					<Button
						className="btn-wide mb-2 mr-2"
						color="success"
						onClick={this.saveGroup}
					>
						Save
					</Button>
				</ModalFooter>
			</div>
		);
	}
}
