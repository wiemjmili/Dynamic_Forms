export const workflow = [
	{
		icon: "pe-7s-network",
		label: "Workflow",
		content: [
			{
				icon: "pe-7s-network",
				label: "List of workflow",
				to: "#/components/list_WF",
			},
			{
				icon: "pe-7s-network",
				label: "New workflow",
				to: "#/components/new_WF",
			},

			{
				icon: "lnr-list",
				label: "Assign tasks",
				to: "#/components/workflow",
			},
		],
	},
];

export const Security = [
	{
		icon: "pe-7s-user",
		label: "Manage users",
		to: "#/components/users",
	},
	{
		icon: "pe-7s-users",
		label: "Manage groups",
		to: "#/components/groups",
	},
	{
		icon: "pe-7s-config",
		label: "Manage roles",
		to: "#/components/roles",
	},
];

export const Forms = [
	{
		icon: "pe-7s-back-2",
		label: "Forms",
		content: [
			{
				icon: "pe-7s-back-2",
				label: "Manage forms",
				to: "#/components/Forms",
			},

			{
				icon: "pe-7s-id",
				label: "Show forms",
				to: "#/components/show_Forms",
			},
		],
	},
];
