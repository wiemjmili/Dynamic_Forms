import React from "react";
import PropTypes from "prop-types";
import base_url from "../../../../../../src/service/base_url";
const PLACE_HOLDER = "form-place-holder";
import axios from "axios";

export default class PlaceHolder extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			Forms: [],
		};
	}
	componentDidMount() {
		let url = base_url.getAllForms();
		axios.get(url).then((res) => {
			const Forms = res.data;
			this.setState({ Forms });
		});
		console.log(this.state.Forms);
	}
	render() {
		return (
			this.props.show && (
				<div className={PLACE_HOLDER}>
					<div>{this.props.text}</div>
				</div>
			)
		);
	}
}

PlaceHolder.propTypes = {
	text: PropTypes.string,
	show: PropTypes.bool,
};

PlaceHolder.defaultProps = {
	text: "Drop a item here....",
	show: false,
};
