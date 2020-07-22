import React, { Fragment } from "react";
import PageTitle from "../../../Layout/AppMain/PageTitle";
import FormBuilder from "./Forms/Drag&Drop/toolbar_preview";
require("./Forms/scss/application.scss");

export default class Drag_Drop extends React.Component {
	render() {
		return (
			<Fragment>
				<PageTitle
					heading="Create easy and beautiful forms builder"
					subheading="Create your own form control"
					icon="pe-7s-back-2 "
				/>
				<FormBuilder.ReactFormBuilder />
			</Fragment>
		);
	}
}
