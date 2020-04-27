import React, { Fragment } from "react";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import { Row, Col, Card, CardBody, CardTitle } from "reactstrap";
import { Access_Process } from "./access_Process";

const Process = (props) => {
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
				<Row className="text-center">
					<Col lg="2"></Col>
					<Col lg="8">
						<Card className="main-card mb-3">
							<CardBody>
								<CardTitle>
									<div className="card-header-title fsize-2 text-capitalize font-weight-normal">
										List of Process
									</div>
								</CardTitle>
								<Access_Process />
							</CardBody>
						</Card>
					</Col>
					<Col lg="2"></Col>
				</Row>
			</ReactCSSTransitionGroup>
		</Fragment>
	);
};

export default Process;
