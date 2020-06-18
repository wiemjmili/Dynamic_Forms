export const FormsNav = [
	{
		icon: "pe-7s-network",
		label: "List of process",
		to: "#/components/list_Process",
	},
	{
		icon: "lnr-list",
		label: "Historical process",
		to: "#/components/historical_Process",
	},

	{
		icon: "pe-7s-id",
		label: "Process validation",
		content: [
			{
				label: "Process to validate",
				to: "#/components/validate_Process",
			},
			{
				label: "Process validated",
				to: "#/components/validated_Process",
			},
		],
		//to: "#/components/validate_Process",
	},
];
