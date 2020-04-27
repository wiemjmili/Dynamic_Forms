import CustomElementFactory from "./CustomElementFactory";
import CustomRenderer from "./CustomRenderer";
import CustomPalette from "./CustomPalette";
import CustomRules from "./CustomRules";
import CustomUpdater from "./CustomUpdater";
import CustomContextPadProvider from "./CustomContextPadProvider";

export default {
	__init__: [
		"customRenderer",
		"customRules",
		"customUpdater",
		"contextPadProvider",
	],
	elementFactory: ["type", CustomElementFactory],
	customRenderer: ["type", CustomRenderer],

	customRules: ["type", CustomRules],
	customUpdater: ["type", CustomUpdater],
	contextPadProvider: ["type", CustomContextPadProvider],
};
