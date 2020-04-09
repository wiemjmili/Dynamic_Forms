export const Security = [
	{
		icon: "pe-7s-user",
		label: "Manage users",
		to: "#/components/notifications",
	},
	{
		icon: "pe-7s-users",
		label: "Manage groups",
		to: "#/components/notifications",
	},
	{
		icon: "pe-7s-config",
		label: "Manage roles",
		to: "#/components/notifications",
	},
];
export const workflow = [
	{
		icon: "pe-7s-network",
		label: "Workflow",
		content: [
			{
				icon: "lnr-list",
				label: "List of workflow",
				to: "#/listWF/list",
			},
			{
				label: "Assign tasks",
				to: "#/components/workflow",
			},
		],
	},
];

export const Forms = [
	{
		icon: "pe-7s-back-2",
		label: "Manage forms",
		to: "#/components/modals",
	},
	{
		icon: "pe-7s-id",
		label: "Show forms",
		to: "#/components/Forms",
	},
];
