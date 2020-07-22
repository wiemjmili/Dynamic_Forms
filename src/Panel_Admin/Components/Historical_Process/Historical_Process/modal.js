import React, { Component } from "react";
import base_url from "../../../../service/base_url";
import { Modal } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import Historical_Process from "./historical_Process";
import Select from "react-select";

import { Table, Button } from "reactstrap";
import axios from "axios";

export default class Select_WF extends Component {
	constructor(props) {
		super(props);
		this.state = {
			Workflow: [],
			optionsWF: [],
			click: false,
			nameWF: "",
			modal: true,
		};

		this.toggle = this.toggle.bind(this);
	}
	componentDidMount() {
		axios.get(base_url.all_WF()).then((res) => {
			const workflow = res.data;
			this.setState({ workflow });
			const n = this.state.workflow.length;
			let optionsWF = [];
			for (let i = 0; i < n; i++) {
				let WF = {
					value: this.state.workflow[i].id,
					label: this.state.workflow[i].name,
				};
				optionsWF.push(WF);
			}
			this.setState({ optionsWF });
		});
	}
	handleChangeWF = (selectedOption) => {
		this.setState({ selectedOption });
		this.setState({ idWF: selectedOption.value });
	};

	toggle() {
		this.setState({
			modal: !this.state.modal,
		});
		window.location.reload(false);
	}

	render() {
		return (
			<div>
				<Modal
					isOpen={this.state.modal}
					fade={false}
					toggle={this.toggle}
					className={this.props.className}
					size="lg"
					style={{ maxWidth: "1600px", width: "30%" }}
				>
					<div>
						<Table className="mb-0">
							<tbody>
								<tr>
									<td>
										<div className="card-header-title fsize-2 text-capitalize font-weight-normal">
											List of process
										</div>
									</td>

									<td>
										<Select
											required
											className="basic-multi-select"
											onChange={this.handleChangeWF}
											options={this.state.optionsWF}
										></Select>
									</td>
									<td>
										<Button
											size="lg"
											color="secondary"
											className="btn-wide mb-2 mr-2"
											onClick={(ev) =>
												this.setState({
													idReq: Req.id,
													click: true,
												})
											}
										>
											<FontAwesomeIcon icon={faAngleRight} size="1x" />
											<Historical_Process
												nameWF={this.state.idWF}
												click={this.state.click}
											/>
										</Button>

										<div className="mbg-3 h-auto pl-0 pr-0 bg-transparent no-border card-header">
											<div className="card-header-title fsize-2 text-capitalize font-weight-normal"></div>
										</div>
									</td>
								</tr>
							</tbody>
						</Table>
					</div>
				</Modal>
			</div>
		);
	}
}
