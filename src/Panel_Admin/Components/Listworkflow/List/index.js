import React, { Component, Fragment } from "react";
import Tabs from "react-responsive-tabs";
import PageTitle from "../../../../Layout/AppMain/PageTitle";
import { ListWF } from "./BPMN/ListWF";
import NewWF from "./BPMN/New_WF";

const tabsContent = [
	{
		title: "List of workflow",
		content: <ListWF />,
	},

	{
		title: "New workflow",
		content: <NewWF />,
	},
];

function getTabs() {
	return tabsContent.map((tab, index) => ({
		title: tab.title,
		getContent: () => tab.content,
		key: index,
	}));
}

export default class List_Workflow extends Component {
	render() {
		return (
			<Fragment>
				<PageTitle heading="List Of Workflow" subheading="" icon="lnr-list " />
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
