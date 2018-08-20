import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSurveys } from '../../actions';

class SurveyList extends Component {
	componentDidMount() {
		this.props.fetchSurveys();
	}

	renderSurveys() {
		if (this.props.surveys.length) {
			return this.props.surveys.reverse().map(survey => {
				return (
					<div
						className="card darken-1 blue-grey"
						style={{ color: 'white' }}
						key={survey._id}
					>
						<div className="card-content">
							<span className="card-title">{survey.title}</span>
							<p>{survey.body}</p>
							<p className="right">
								Sent On: {new Date(survey.dateSent).toLocaleDateString()}
							</p>
						</div>
						<div className="card-action">
							<a>Yes: {survey.yes}</a>
							<a>No: {survey.no}</a>
						</div>
					</div>
				);
			});
		} else {
			return (
				<div className="center">
					<h2>LOADING...</h2>
				</div>
			);
		}
	}

	render() {
		return <div>{this.renderSurveys()}</div>;
	}
}

function mapStateToProps({ surveys }) {
	return { surveys };
}

export default connect(
	mapStateToProps,
	{ fetchSurveys }
)(SurveyList);
