import React, { Component, Fragment } from "react";
import BpmnModeler from "./custom-modeler";
import propertiesPanelModule from "bpmn-js-properties-panel";
import xmlStr from "../../assets/bpmn/xmlStr";
import propertiesProviderModule from "./provider/magic";
import magicModdleDescriptor from "./descriptors/magic";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import {
	Col,
	Card,
	CardBody,
	CardTitle,
	Button,
	Form,
	FormGroup,
	Label,
	Input,
	FormText
} from "reactstrap";

import ZoomControls from "./components/ZoomControls";
import FileControls from "./components/FileControls";
import EditingTools from "./components/EditingTools";
import "./style/app.css";

let scale = 1;
export default class extends Component {
	componentDidMount() {
		document.body.className = "shown";
		this.bpmnModeler = new BpmnModeler({
			additionalModules: [propertiesPanelModule, propertiesProviderModule],
			container: "#canvas",
			propertiesPanel: {
				parent: "#properties-panel"
			},
			moddleExtensions: {
				magic: magicModdleDescriptor
			}
		});

		const { xml = xmlStr } = this.props;
		this.renderDiagram(xml);
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
			fetch("/addWF", {
				method: "post",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					wfxml: xml
				})
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

	handleCreate = () => {};

	handleSaveFile = () => {};

	handleSaveImage = () => {};

	render() {
		return (
			/*	<Fragment>
				<div className="content">
					<div id="canvas" />
					<div id="properties-panel" />
				</div>

				<ZoomControls
					onZoomIn={this.handleZoomIn}
					onZoomOut={this.handleZoomOut}
					onZoomReset={this.handleZoomReset}
				/>
				<FileControls
					onOpen={this.handleOpen}
					onCreate={this.handleCreate}
					onSaveFile={this.handleSaveFile}
					onSaveImage={this.handleSaveImage}
				/>
				<EditingTools
					onSave={this.handleSave}
					onRedo={this.handleRedo}
					onUndo={this.handleUndo}
				/>
			</Fragment>*/
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
							<CardTitle>BPMN Workflow</CardTitle>
							<div className="content">
								<EditingTools
									onSave={this.handleSave}
									onRedo={this.handleRedo}
									onUndo={this.handleUndo}
								/>
								<div id="canvas" />
								<div id="properties-panel" />
							</div>
							<br />
							<br />
							<br />
							<br />
							<br />
							<br />
							<br />
							<br />
							<br />
							<br />
							<br />
							<br />
							<br />
							<br />
							<br />
							<br />
							<br />
							<br />
							<br />
							<br />
							<br />
							<br />
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
