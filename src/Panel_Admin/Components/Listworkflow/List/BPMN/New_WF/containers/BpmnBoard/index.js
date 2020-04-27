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
import xmlStr from "../../bpmn/xmlStr";
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
	handleSave = (e) => {
		this.bpmnModeler.saveXML({ format: true }, (err, xml) => {
			const add_WF = base_url.add_WF();
			fetch(add_WF, {
				method: "post",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					wfxml: xml,
				}),
			});
		});
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
								<Col lg="5"></Col>
								<Col lg="2">
									<FileControls
										onSaveFile={this.handleSaveFile}
										onSaveImage={this.handleSaveImage}
									/>
								</Col>
								<Col lg="2">
									<EditingTools
										onSave={this.handleSave}
										onRedo={this.handleRedo}
										onUndo={this.handleUndo}
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
