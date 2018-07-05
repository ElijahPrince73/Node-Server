// SurveyNew shows survey form and surveyFormReview

import React, {
  Component
} from 'react';
import SurveyForm from './surveyForm';

class SurveyNew extends Component {
  render() {
    return (
      <div>
        <SurveyForm />
      </div>
    )
  }
}

export default SurveyNew;