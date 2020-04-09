import React from "react";

export default ({ onUndo, onRedo, onSave }) => (
	<div
		className="io-editing-tools"
		style={{ display: "inline-block", position: "relative", right: "0px " }}
	>
		<ul className="io-control-list io-horizontal">
			<li className="io-control">
				<button title="undo" onClick={onUndo}>
					<span className="icon-undo" />
				</button>
			</li>
			<li className="io-control">
				<button title="redo" onClick={onRedo}>
					<span className="icon-redo" />
				</button>
			</li>
			<li className="io-control">
				<button title="save" onClick={onSave}>
					<span className="icon-save" />
				</button>
			</li>
		</ul>
	</div>
);
