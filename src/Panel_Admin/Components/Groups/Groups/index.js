import React, { Fragment } from "react";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import { Row, Col, Card, CardBody, CardTitle } from "reactstrap";
import List_Groups from "./list_Groups";

const Histo_Process = (props) => {
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
					<Col lg="12">
						<Card className="main-card mb-3">
							<CardBody>
								<List_Groups />
							</CardBody>
						</Card>
					</Col>
				</Row>
			</ReactCSSTransitionGroup>
		</Fragment>
	);
};

export default Histo_Process;
