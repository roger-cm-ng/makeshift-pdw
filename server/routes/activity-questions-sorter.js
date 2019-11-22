import activityQuestions from './activity-questions.json';
import _ from 'lodash';

const index = {};

export const activityQuestionsSorter = ({
    assignmentId
}) => {
    if (_.has(index, assignmentId)) {
        index[assignmentId] += 1
        if (index[assignmentId] === activityQuestions.length) {
            index[assignmentId] = 0
        }
    } else {
        index[assignmentId] = 0;
    }
    return activityQuestions[index[assignmentId]];
};