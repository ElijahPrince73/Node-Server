// SurveyForm shows a form for a user to add input
import React, {
  Component
} from 'react';
import {
  reduxForm,
  Field
} from 'redux-form';
import SurveyField from './surveyField';

class SurveyForm extends Component {
  renderFields() {
    return (
      <div>
        <Field type="text" name="title" component={SurveyField} />
      </div>
    )
  }
  render() {
    return (
      <div>
        <form onSubmit={this.props.handleSubmit(val => console.log(val))}>
          {this.renderFields()}
          <button type="submit">Submit</button>
        </form>
      </div>
    )
  }
}

export default reduxForm({
  form: 'surveyForm'
})(SurveyForm);