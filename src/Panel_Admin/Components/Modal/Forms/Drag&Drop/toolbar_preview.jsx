import React, { Fragment } from "react";
import { DndProvider } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import Preview from "./preview";
import Toolbar from "./toolbar";
import ReactFormGenerator from "./form";
import store from "../stores/store";
import Modals from "./index.js";
import * as variables from "./variables";
import { Row, Col, Card, CardBody } from "reactstrap";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import base_url from "../../../../../service/base_url";
import axios from "axios";

class ReactFormBuilder extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			editMode: false,
			editElement: null,
			Forms: [],
			data: "",
		};
	}
	componentDidMount() {
		let url = base_url.getAllForms();
		axios.get(url).then((res) => {
			const Forms = res.data;
			this.setState({ Forms });
		});
	}

	editModeOn(data, e) {
		e.preventDefault();
		e.stopPropagation();
		if (this.state.editMode) {
			this.setState({ editMode: !this.state.editMode, editElement: null });
		} else {
			this.setState({ editMode: !this.state.editMode, editElement: data });
		}
	}

	manualEditModeOff() {
		if (this.state.editMode) {
			this.setState({
				editMode: false,
				editElement: null,
			});
		}
	}

	render() {
		const toolbarProps = {};
		if (this.props.toolbarItems) {
			toolbarProps.items = this.props.toolbarItems;
		}
		return (
			<DndProvider backend={HTML5Backend}>
				<div>
					<div className="react-form-builder clearfix">
						<Fragment>
							<ReactCSSTransitionGroup
								component="div"
								transitionName="TabsAnimation"
								transitionAppear={true}
								transitionAppearTimeout={0}
								transitionEnter={false}
								transitionLeave={false}
							>
								<Modals variables={variables} />
								<Row>
									<Col lg="8">
										<Card className="main-card mb-3">
											<CardBody>
												<Preview
													files={this.props.files}
													manualEditModeOff={this.manualEditModeOff.bind(this)}
													showCorrectColumn={this.props.showCorrectColumn}
													parent={this}
													data={this.props.data}
													editModeOn={this.editModeOn}
													editMode={this.state.editMode}
													variables={this.props.variables}
													editElement={this.state.editElement}
												/>
											</CardBody>
										</Card>
									</Col>
									<Col lg="4">
										<Toolbar {...toolbarProps} />
									</Col>
								</Row>
							</ReactCSSTransitionGroup>
						</Fragment>
					</div>
				</div>
			</DndProvider>
		);
	}
}

const FormBuilders = {};
FormBuilders.ReactFormBuilder = ReactFormBuilder;
FormBuilders.ReactFormGenerator = ReactFormGenerator;
FormBuilders.ElementStore = store;

export default FormBuilders;

export { ReactFormBuilder, ReactFormGenerator, store as ElementStore };
