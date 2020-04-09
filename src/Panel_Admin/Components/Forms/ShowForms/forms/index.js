import React, { Fragment } from "react";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import { Row, Col, Card, CardBody, CardTitle } from "reactstrap";
import Show_Forms from "./ShowForms";

const Forms = (props) => {
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
					<Col lg="2"></Col>
					<Col lg="8">
						<Card className="main-card mb-3">
							<CardBody>
								<CardTitle>Form</CardTitle>
								<Show_Forms />
							</CardBody>
						</Card>
					</Col>
					<Col lg="2"></Col>
				</Row>
			</ReactCSSTransitionGroup>
		</Fragment>
	);
};

export default Forms;
