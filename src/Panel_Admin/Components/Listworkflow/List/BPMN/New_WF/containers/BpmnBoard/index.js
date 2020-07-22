import React, { Component, Fragment } from "react";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import { Row, Col, Card, CardBody, CardTitle } from "reactstrap";
import propertiesPanelModule from "bpmn-js-properties-panel";
import propertiesProviderModule from "./provider/magic";
import base_url from "../../../../../../../../service/base_url";
import ZoomControls from "./components/ZoomControls";
import FileControls from "./components/FileControls";
import EditingTools from "./components/EditingTools";
import BpmnModeler from "./custom-modeler";
import "./style/app.css";
import { xml } from "../../../ListWF";
import { id } from "../../../ListWF";
import xmlStr from "../../bpmn/xmlStr";
import axios from "axios";
let scale = 1;

export default class BpmnBoard extends Component {
	constructor(props) {
		super(props);
		this.state = {
			Workflow: [],
			nameWF: "",
		};
	}
	componentDidMount() {
		document.body.className = "shown";
		this.bpmnModeler = new BpmnModeler({
			additionalModules: [propertiesPanelModule, propertiesProviderModule],
			container: "#canvas",
			propertiesPanel: {
				parent: "#properties-panel",
			},
		});
		if (xml == "") {
			this.renderDiagram(xmlStr);
		} else {
			this.renderDiagram(xml);
		}
	}

	componentWillReceiveProps(nextProps) {
		const { xml } = nextProps;
		if (xml && xml !== this.props.xml) {
			this.renderDiagram(xml);
		}
	}
	shouldComponentUpdate() {
		return false;
	}
	renderDiagram = (xml) => {
		this.bpmnModeler.importXML(xml, (err) => {
			if (err) {
				console.log("error rendering", err);
			} else {
				this.bpmnModeler.getDefinitions();
				console.log("successfully rendered");
			}
		});
	};
	handleSave = () => {
		this.bpmnModeler.saveXML({ format: true }, (err, xml) => {
			const add_WF = base_url.add_WF();

			axios
				.post(add_WF, {
					xml: xml,
				})
				.then(
					(response) => {
						this.toastId = toast(response.data, {
							transition: Bounce,
							closeButton: true,
							autoClose: 1500,
							position: "bottom-center",
							type: "success",
						});
					},
					(error) => {
						toast.error(error, {
							position: toast.POSITION.TOP_LEFT,
						});
					}
				);
		});
		window.location.reload(false);
	};
	handleUpdateWF = () => {
		this.bpmnModeler.saveXML({ format: true }, (err, xml) => {
			const update_WF = base_url.updateWF();

			fetch(update_WF, {
				method: "post",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					xml: xml,
				}),
			});
		});
		window.location.reload(false);
	};

	handleDeleteWF = () => {
		if (id != "") {
			axios({
				method: "delete",
				url: base_url.deleteWF() + "/" + id,
			});
		}
		window.location.reload(false);
	};

	handleRedo = () => {
		this.bpmnModeler.get("commandStack").redo();
	};
	handleUndo = () => {
		this.bpmnModeler.get("commandStack").undo();
	};
	handleZoom = () => {
		this.bpmnModeler.get("canvas").zoom(scale);
	};
	handleZoomIn = () => {
		scale += 0.1;
		this.handleZoom();
	};
	handleZoomOut = () => {
		if (scale <= 0.3) {
			scale = 0.2;
		} else {
			scale -= 0.1;
		}
		this.handleZoom();
	};
	handleZoomReset = () => {
		scale = 1;
		this.handleZoom();
	};
	handleOpen = () => {
		const { xml = xmlStr } = this.props;
		this.renderDiagram(xml);
	};
	handleSaveImage = () => {};

	render() {
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
					<Card className="main-card mb-8">
						<CardBody>
							<Row>
								<Col lg="2"></Col>
								<Col lg="3">
									<FileControls
										onSaveFile={this.handleSaveFile}
										onSaveImage={this.handleSaveImage}
									/>
								</Col>
								<Col lg="5">
									<EditingTools
										onRedo={this.handleRedo}
										onUndo={this.handleUndo}
										onSave={this.handleSave}
										onUpdate={this.handleUpdateWF}
										onDelete={this.handleDeleteWF}
									/>
								</Col>
								<Col lg="2"></Col>
							</Row>
							<div className="content">
								<div id="canvas" />
								<div id="properties-panel" />
							</div>
						</CardBody>
					</Card>
				</ReactCSSTransitionGroup>

				<ZoomControls
					onZoomIn={this.handleZoomIn}
					onZoomOut={this.handleZoomOut}
					onZoomReset={this.handleZoomReset}
				/>
			</Fragment>
		);
	}
}
