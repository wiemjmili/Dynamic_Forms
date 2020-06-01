import React, { Fragment } from "react";
import store from "../../Forms/stores/store";
import ReactFormGenerator from "./form";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import { toast, Bounce } from "react-toastify";
import { Row, Col, Card, CardBody, Button, Label, Table } from "reactstrap";
import base_url from "../../../../../../src/service/base_url";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import Show_Forms from "./show_form";
import Select from "react-select";

const answers = {};

export default class Modals extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			data: [],
			nameWF: "",
			Forms: "",
			nameUT: "",
			idUT: "",
			verif: "",
			optionsUT: [],
			optionsWF: [],
			click: false,
			previewVisible: false,
			roPreviewVisible: false,
		};
		const update = this._onChange.bind(this);
		this.get_UT = this.get_UT.bind(this);
		this._onSubmit = this._onSubmit.bind(this);
		store.subscribe((state) => update(state.data));
	}
	componentDidMount() {
		let url = base_url.getAllForms();
		axios.get(url).then((res) => {
			const Forms = res.data;
			this.setState({ Forms });
		});

		axios.get(base_url.all_WF()).then((res) => {
			const Workflow = res.data;

			this.setState({ Workflow });
			const n = this.state.Workflow.length;
			let optionsWF = [];
			for (let i = 0; i < n; i++) {
				let WF = {
					value: this.state.Workflow[i].id,
					label: this.state.Workflow[i].name,
				};
				optionsWF.push(WF);
			}
			this.setState({ optionsWF });
		});
	}
	handleChangeWF = (selectedOption) => {
		this.setState({ selectedOption });
		this.setState({ idWF: selectedOption.value });
		this.setState({ nameWF: selectedOption.label });
	};

	get_UT = () => {
		let get_allUT = base_url.all_UserTasks() + "/" + this.state.idWF;
		axios.get(get_allUT).then((res) => {
			const UserTasks = res.data;
			this.setState({ UserTasks });
			const n = this.state.UserTasks.length;
			let optionsUT = [];
			for (let i = 0; i < n; i++) {
				let UT = {
					value: this.state.UserTasks[i].id,
					label: this.state.UserTasks[i].name,
				};
				optionsUT.push(UT);
			}
			this.setState({ optionsUT });
		});
	};

	handleChangeUT = (selectedOption) => {
		this.setState({ selectedOption });
		this.setState({ idUT: selectedOption.value });
		this.setState({ nameUT: selectedOption.label });
	};

	showPreview() {
		let add_Form = base_url.add_Form();
		if (this.state.data.length != 0 && this.state.idUT != "") {
			fetch(add_Form, {
				method: "post",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					data: this.state.data,
					idUT: this.state.idUT,
				}),
			});

			this.toastId = toast(
				"Form successfully added to usertask " +
					"' " +
					this.state.nameUT +
					" '",
				{
					transition: Bounce,
					closeButton: true,
					autoClose: 5000,
					position: "bottom-center",
					type: "success",
				}
			);
		} else {
			toast.error("Error ! some information was unavailable", {
				position: toast.POSITION.TOP_LEFT,
			});
		}
		this.setState({
			previewVisible: true,
		});
		//window.location.reload(false);
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
										<Col md="1">
											<Label>Workflow</Label>
										</Col>
										<Col md="3">
											<Select
												onChange={this.handleChangeWF}
												options={this.state.optionsWF}
											/>
										</Col>
										<Col md="1">
											<Button
												className="btn-wide mb-1 mr-1"
												size="lg"
												color="warning"
												outline
												onClick={this.get_UT}
											>
												<FontAwesomeIcon icon={faAngleRight} size="1x" />
											</Button>
										</Col>
										<Col md="1">
											<Label>UserTask</Label>
										</Col>
										<Col md="3">
											<Select
												onChange={this.handleChangeUT}
												options={this.state.optionsUT}
											/>
										</Col>
										<Col md="1">
											<Button
												className="btn-wide mb-1 mr-1"
												size="lg"
												color="warning"
												onClick={this.showPreview.bind(this)}
											>
												Save form
											</Button>
										</Col>
										<Col md="1">
											<Button
												class="btn-wide mb-2 mr-2 btn btn-lg"
												size="lg"
												outline
												color="warning"
												onClick={() =>
													this.setState({
														click: true,
													})
												}
											>
												<Show_Forms
													nameWF={this.state.nameWF}
													id={this.state.idUT}
													nameUT={this.state.nameUT}
													click={this.state.click}
												/>
												Show form
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
