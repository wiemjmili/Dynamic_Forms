import React, { Component } from "react";
import {
	Button,
	Card,
	CardBody,
	CardGroup,
	Col,
	Container,
	Form,
	Input,
	InputGroup,
	InputGroupAddon,
	InputGroupText,
	Row,
} from "reactstrap";
import logo from "../../assets/utils/images/avatars/logo.png";
import base_url from "../../../src/service/base_url";
import Swal from "sweetalert2";
import axios from "axios";

class Login extends Component {
	constructor(props) {
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.state = {
			email: "",
			password: "",
			verif: "",
		};
	}
	handleSubmit(event) {
		event.preventDefault();
		axios
			.get(
				base_url.check_User() +
					"/" +
					this.state.email +
					"/" +
					this.state.password
			)
			.then((res) => {
				const verif = res.data;
				this.setState({ verif });
			})
			.then((response) => {
				if (this.state.verif === "admin") {
					this.props.history.replace("/components/list_WF");
				} else if (this.state.verif === "True") {
					this.props.history.replace("/components/list_Process");
				} else if (this.state.verif === "False") {
					Swal.fire({
						position: "top-center",
						type: "error",
						title: "Email or Password are incorrect !",
						showConfirmButton: false,
						timer: 1500,
					});
				}
			})
			.catch(console.error);
	}

	render() {
		return (
			<div className="app flex-row align-items-center">
				<br />
				<br />
				<br />
				<br />
				<br />
				<br />
				<br />
				<br />
				<br />
				<Container>
					<Row className="justify-content-center">
						<Col xs="8" md="5" xl="4">
							<CardGroup>
								<Card className="p-4">
									<center>
										<img
											src={logo}
											className="text-center"
											alt=""
											width="100"
											height="100"
										/>
									</center>
									<CardBody>
										<Form onSubmit={this.handleSubmit}>
											<InputGroup className="mb-3">
												<InputGroupAddon addonType="prepend">
													<InputGroupText>
														<i className="icon-user"> </i>
													</InputGroupText>
												</InputGroupAddon>
												<Input
													type="text"
													required
													placeholder="Email"
													onChange={(ev) =>
														this.setState({
															email: ev.target.value,
														})
													}
													autoComplete="email"
												/>
											</InputGroup>
											<InputGroup className="mb-4">
												<InputGroupAddon addonType="prepend">
													<InputGroupText>
														<i className="icon-lock"> </i>
													</InputGroupText>
												</InputGroupAddon>
												<Input
													type="password"
													required
													placeholder="Password"
													onChange={(ev) =>
														this.setState({
															password: ev.target.value,
														})
													}
													autoComplete="current-password"
												/>
											</InputGroup>

											<Row>
												<Col xs="6" className="text-center">
													<Button
														color="primary"
														className="px-4"
														type="Submit"
													>
														Login
													</Button>
												</Col>
												<Col xs="6" className="text-right">
													<Button color="link" className="px-0">
														Forgot password ?
													</Button>
												</Col>
											</Row>
										</Form>
									</CardBody>
								</Card>
							</CardGroup>
						</Col>
					</Row>
				</Container>
			</div>
		);
	}
}
export default Login;
