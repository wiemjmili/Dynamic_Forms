import React from "react";

export default ({ onUndo, onRedo, onSave, onUpdate, onDelete }) => (
	<div
		className="io-editing-tools"
		style={{ display: "inline-block", position: "relative" }}
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
				<button title="delete workflow" onClick={onDelete}>
					<span className="pe-7s-trash" />
				</button>
			</li>
			<li className="io-control">
				<button title="update workflow" onClick={onUpdate}>
					<span className="lnr-sync"></span>
				</button>
			</li>
			<li className="io-control">
				<button title="save workflow" onClick={onSave}>
					<span className="icon-save" />
				</button>
			</li>
		</ul>
	</div>
);
