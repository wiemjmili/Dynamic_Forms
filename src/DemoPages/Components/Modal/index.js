import React, { Fragment } from "react";
import PageTitle from "../../../Layout/AppMain/PageTitle";
import FormBuilder from "./Forms/Drag&Drop/index1";
import * as variables from "./Forms/Drag&Drop/variables";
require("./Forms/scss/application.scss");
// Examples
import ModalsExample from "./Forms/Drag&Drop";

export default class ModalsExamples extends React.Component {
	render() {
		return (
			<Fragment>
				<PageTitle
					heading="Forms builder"
					subheading="Create your own form control"
					icon="pe-7s-back-2 "
				/>
				<FormBuilder.ReactFormBuilder />
				<ModalsExample variables={variables} />
			</Fragment>
		);
	}
}
