import React, { Fragment } from "react";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import { Row, Col, Card, CardBody, CardTitle } from "reactstrap";

import Validate_Process from "./validate_Process";

class Validate_Proc extends React.Component {
	constructor(props) {
		super(props);
	}

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
					<Row>
						<Col md="12">
							<Card className="main-card mb-3">
								<CardBody>
									<CardTitle className="text-center">
										<h3>Validate Requests</h3>
									</CardTitle>
									<br />
									<br />
									<Validate_Process />
									<div className="divider" />
								</CardBody>
							</Card>
						</Col>
					</Row>
				</ReactCSSTransitionGroup>
			</Fragment>
		);
	}
}

export default Validate_Proc;
