import React, { Fragment } from "react";
import store from "../../Forms/stores/store";
import ReactFormGenerator from "./form";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import { toast, Bounce } from "react-toastify";
import { Row, Col, Card, CardBody, Button } from "reactstrap";
import base_url from "../../../../../../src/service/base_url";
import axios from "axios";

const answers = {};

export default class Modals extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			data: "",
			nameWF: "",
			nameUT: "",
			idUT: "",
			UserTasks: [],
			Workflow: [],
			previewVisible: false,
			shortPreviewVisible: false,
			roPreviewVisible: false,
		};

		const update = this._onChange.bind(this);
		this._onSubmit = this._onSubmit.bind(this);

		store.subscribe((state) => update(state.data));
	}
	componentDidMount() {
		axios.get(base_url.all_WF()).then((res) => {
			const Workflow = res.data;
			this.setState({ Workflow });
		});
	}
	handleChange = (event) => {
		event.preventDefault();
		this.setState({ nameWF: event.target.value });
	};
	handleChange1 = (event) => {
		event.preventDefault();
		this.setState({ nameUT: event.target.value });
	};

	handleSubmit = (event) => {
		event.preventDefault();
		const nameWF = this.state.nameWF;
		let get_allUT = base_url.all_UserTasks() + "/" + nameWF;
		axios.get(get_allUT).then((res) => {
			const UserTasks = res.data;
			this.setState({ UserTasks });
		});
	};

	showPreview() {
		this.toastId = toast(
			"Form successfully added for " + "'" + this.state.nameUT + "'",
			{
				transition: Bounce,
				closeButton: true,
				autoClose: 5000,
				position: "bottom-center",
				type: "success",
			}
		);
		this.setState({
			previewVisible: true,
		});

		let get_UT =
			base_url.find_UserTask() + "/" + this.state.nameUT + this.state.nameWF;
		let add_Form = base_url.add_Form();

		axios.get(get_UT).then((res) => {
			fetch(add_Form, {
				method: "post",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					data: this.state.data,
					idUT: res.data,
				}),
			}).then((d) => {
				console.log({ d });
			});
		});
	}

	showShortPreview() {
		this.setState({
			shortPreviewVisible: true,
		});
	}

	_onChange(data) {
		this.setState({
			data,
		});
	}

	_onSubmit(data) {}

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
		const { nameWF, nameUT } = this.state;
		return (
			<Fragment>
				<ReactCSSTransitionGroup
					component="div"
					transitionName="TabsAnimation"
					transitionAppear={true}
					transitionAppearTimeout={0}
					transitionEnter={false}
					transitionLeave={false}
				>
					<Row>
						<Col md="12">
							<Card className="main-card mb-3">
								<CardBody>
									<Row>
										<Col md="2">
											<div className="card-header-title fsize-2 text-capitalize font-weight-normal">
												Select workflow :
											</div>
										</Col>
										<Col md="3">
											<select
												onChange={this.handleChange}
												className="browser-default custom-select"
											>
												<option selected value="" value={nameWF}></option>
												{this.state.Workflow.map((WF) => (
													<option name="nameWF">{WF.name}</option>
												))}
											</select>
										</Col>
										<Col md="1">
											<form onSubmit={this.handleSubmit}>
												<Button
													className="btn-wide mb-1 mr-1"
													size="lg"
													color="secondary"
												>
													>>
												</Button>
											</form>
										</Col>
										<Col md="2">
											<div className="card-header-title fsize-2 text-capitalize font-weight-normal">
												Select usertask :
											</div>
										</Col>
										<Col md="2">
											<select
												onChange={this.handleChange1}
												className="browser-default custom-select"
											>
												<option selected value="" value={nameUT}></option>
												{this.state.UserTasks.map((Usertask) => (
													<option name="nameUT">{Usertask.name}</option>
												))}
											</select>
										</Col>
										<Col md="1">
											<Button
												className="btn-wide mb-1 mr-1"
												size="lg"
												color="secondary"
												onClick={this.showPreview.bind(this)}
											>
												Save Form
											</Button>
										</Col>
									</Row>
								</CardBody>
							</Card>
						</Col>
					</Row>
					<Row className="text-center">
						<Col lg="8" className="text-center">
							{this.state.roPreviewVisible && (
								<div className={roModalClass}>
									<ReactFormGenerator
										answer_data={answers}
										variables={this.props.variables}
										data={this.state.data}
									/>
								</div>
							)}
						</Col>
					</Row>
				</ReactCSSTransitionGroup>
			</Fragment>
		);
	}
}
