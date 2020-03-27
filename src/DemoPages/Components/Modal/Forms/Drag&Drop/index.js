import React, { Fragment } from "react";
import store from "../../Forms/stores/store";
import ReactFormGenerator from "./form";
import { Table, Button, ButtonGroup } from "reactstrap";
const answers = {};
export default class ModalsExample extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			data: [],
			previewVisible: false,
			shortPreviewVisible: false,
			roPreviewVisible: false
		};

		const update = this._onChange.bind(this);
		this._onSubmit = this._onSubmit.bind(this);

		store.subscribe((state) => update(state.data));
	}

	showPreview() {
		this.setState({
			previewVisible: true
		});
	}

	showShortPreview() {
		this.setState({
			shortPreviewVisible: true
		});
	}

	showRoPreview() {
		this.setState({
			roPreviewVisible: true
		});
	}

	closePreview() {
		this.setState({
			previewVisible: false,
			shortPreviewVisible: false,
			roPreviewVisible: false
		});
	}

	_onChange(data) {
		this.setState({
			data
		});
	}

	_onSubmit(data) {
		// console.log('onSubmit', data);
		// Place code to post json data to server here
	}

	render() {
		let modalClass = "modal";
		if (this.state.previewVisible) {
			modalClass += " show";
		}

		let shortModalClass = "modal short-modal";
		if (this.state.shortPreviewVisible) {
			shortModalClass += " show";
		}

		let roModalClass = "modal ro-modal";
		if (this.state.roPreviewVisible) {
			roModalClass += " show";
		}
		/*	<tr>
		<td>
			<h4 className="pull-left">Forms</h4>
		</td>
		<td>
			<Button
				className="btn btn-primary pull-right"
				onClick={this.showPreview.bind(this)}
			>
				Preview Form
			</Button>
		</td>
	</tr>*/

		return (
			<div>
				<Table className="mb-0">
					<tbody>
						{this.state.previewVisible && (
							<tr>
								<td>
									<div className={modalClass}>
										<div className="modal-dialog">
											<div className="modal-content">
												<ReactFormGenerator
													download_path=""
													back_action="/"
													back_name="Back"
													answer_data={answers}
													action_name="Save"
													form_action="/api/form"
													form_method="POST"
													variables={this.props.variables}
													data={this.state.data}
												/>

												<div className="modal-footer">
													<button
														type="button"
														className="btn btn-default"
														data-dismiss="modal"
														onClick={this.closePreview.bind(this)}
													>
														Close
													</button>
												</div>
											</div>
										</div>
									</div>
								</td>
							</tr>
						)}

						{this.state.roPreviewVisible && (
							<tr>
								<div className={roModalClass}>
									<div className="modal-dialog">
										<div className="modal-content">
											<ReactFormGenerator
												download_path=""
												back_action="/"
												back_name="Back"
												answer_data={answers}
												action_name="Save"
												form_action="/"
												form_method="POST"
												read_only={true}
												variables={this.props.variables}
												hide_actions={true}
												data={this.state.data}
											/>

											<div className="modal-footer">
												<button
													type="button"
													className="btn btn-default"
													data-dismiss="modal"
													onClick={this.closePreview.bind(this)}
												>
													Close
												</button>
											</div>
										</div>
									</div>
								</div>
							</tr>
						)}

						{this.state.shortPreviewVisible && (
							<tr>
								<div className={shortModalClass}>
									<div className="modal-dialog">
										<div className="modal-content">
											<ReactFormGenerator
												download_path=""
												back_action=""
												answer_data={answers}
												form_action="/"
												form_method="POST"
												data={this.state.data}
												display_short={true}
												variables={this.props.variables}
												hide_actions={false}
											/>

											<div className="modal-footer">
												<button
													type="button"
													className="btn btn-default"
													data-dismiss="modal"
													onClick={this.closePreview.bind(this)}
												>
													Close
												</button>
											</div>
										</div>
									</div>
								</div>
							</tr>
						)}
					</tbody>
				</Table>
			</div>
		);
	}
}
