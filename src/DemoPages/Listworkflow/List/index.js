import React, { Component, Fragment } from "react";

import Tabs from "react-responsive-tabs";

import PageTitle from "../../../Layout/AppMain/PageTitle";

import ListWF from "./Examples/ListWF";
import showWF from "./Examples/showWF";

const tabsContent = [
	{
		title: "List of Workflow",
		content: <ListWF />
	},
	{
		title: "New Workflow",
		content: <showWF />
	}
];

function getTabs() {
	return tabsContent.map((tab, index) => ({
		title: tab.title,
		getContent: () => tab.content,
		key: index
	}));
}

export default class WFExamples extends Component {
	render() {
		return (
			<Fragment>
				<PageTitle
					heading="List Of Workflow"
					subheading=""
					icon="pe-7s-menu icon-gradient bg-love-kiss"
				/>
				<Tabs
					tabsWrapperClass="body-tabs body-tabs-layout"
					transform={false}
					showInkBar={true}
					items={getTabs()}
				/>
			</Fragment>
		);
	}
}
