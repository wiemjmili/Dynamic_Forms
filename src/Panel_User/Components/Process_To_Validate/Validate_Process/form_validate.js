import React, { Component } from "react";
import base_url from "../../../../service/base_url";
import axios from "axios";
import Formulaire from "./formulaire";

class Form_validate extends Component {
	constructor(props) {
		super(props);
		this.state = {
			Usertasks: [],
			idReq: "",
		};
	}
	componentDidMount() {
		axios.get(base_url.all_UserTasks()).then((res) => {
			const Usertasks = res.data;
			this.setState({ Usertasks });
		});
	}
	render() {
		const { idUT } = this.props;
		this.state.idUT = idUT;
		const { idReq } = this.props;
		this.state.idReq = idReq;
		return (
			<div>
				{this.state.Usertasks.map((UT) => (
					<div>
						{UT.id == idUT && (
							<Formulaire idNextUT={UT.idNextUT} idReq={idReq} idUT={idUT} />
						)}
					</div>
				))}
			</div>
		);
	}
}
export default Form_validate;
