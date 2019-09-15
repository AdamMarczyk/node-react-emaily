import React from 'react';
import { connect } from 'react-redux';
import { fetchSurveys } from '../../actions';

interface ISurvey {
  _id: string;
  title: string;
  body: any;
  dateSent: string;
  yes: boolean;
  no: boolean;
}

interface ISurveyListProps {
  fetchSurveys: () => {};
  surveys: ISurvey[]
}

class SurveyList extends React.Component<ISurveyListProps> {
  componentDidMount() {
    this.props.fetchSurveys();
  }

  renderSurveys() {
    return this.props.surveys.reverse().map(survey => {
      return (
        <div className="card darken-1" key={survey._id}>
          <div className="card-content">
            <span className="card-title">{survey.title}</span>
            <p>{survey.body}</p>
            <p className="right">
              Sent On: {new Date(survey.dateSent).toLocaleDateString()}
            </p>
          </div>
          <div className="card-action">
            <button>Yes: {survey.yes}</button>
            <button>No: {survey.no}</button>
          </div>
        </div>
      );
    });
  }

  render() {
    return <div>{this.renderSurveys()}</div>;
  }
}

function mapStateToProps({ surveys }: any) {
  return { surveys };
}

export default connect(
  mapStateToProps,
  { fetchSurveys }
)(SurveyList);