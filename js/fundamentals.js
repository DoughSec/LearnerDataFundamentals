//Using the example data set for each object on here
//instantialize a courseinfo object
const CourseInfo = {
    id: 451,
    name: "Introduction to JavaScript"
};

//instantialize an AssignmentGroup object
const AssignmentGroup = {
    id: 12345,
    name: "Fundamentals of JavaScript",
    course_id: 451,
    group_weight: 25,
    assignments: [
        {
            id: 1,
            name: "Declare a Variable",
            due_at: "2023-01-25",
            points_possible: 50
        },
        {
            id: 2,
            name: "Write a Function",
            due_at: "2023-02-27",
            points_possible: 150
        },
        {
            id: 3,
            name: "Code the World",
            due_at: "3156-11-15",
            points_possible: 500
        }
    ]
};

//instantialize a LearnerSubmission object
const LearnerSubmissions = [
    {
        learner_id: 125,
        assignment_id: 1,
        submission: {
            submitted_at: "2023-01-25",
            score: 47
        }
    },
    {
        learner_id: 125,
        assignment_id: 2,
        submission: {
            submitted_at: "2023-02-12",
            score: 150
        }
    },
    {
        learner_id: 125,
        assignment_id: 3,
        submission: {
            submitted_at: "2023-01-25",
            score: 400
        }
    },
    {
        learner_id: 132,
        assignment_id: 1,
        submission: {
            submitted_at: "2023-01-24",
            score: 39
        }
    },
    {
        learner_id: 132,
        assignment_id: 2,
        submission: {
            submitted_at: "2023-03-07",
            score: 140
        }
    }
];

/*
    Your goal is to analyze and transform this data such that the output of 
    your program is an array of objects, each containing the following 
    information in the following format:
    {
        // the ID of the learner for which this data has been collected
        "id": number,
        // the learner’s total, weighted average, in which assignments
        // with more points_possible should be counted for more
        // e.g. a learner with 50/100 on one assignment and 190/200 on another
        // would have a weighted average score of 240/300 = 80%.
        "avg": number,
        // each assignment should have a key with its ID,
        // and the value associated with it should be the percentage that
        // the learner scored on the assignment (submission.score / points_possible)
        <assignment_id>: number,
        // if an assignment is not yet due, it should not be included in either
        // the average or the keyed dictionary of scores
    }
    If an AssignmentGroup does not belong to its course (mismatching course_id), 
    your program should throw an error, letting the user know that the input was invalid. 
    Similar data validation should occur elsewhere within the program.
    You should also account for potential errors in the data that your program receives. 
    What if points_possible is 0? You cannot divide by zero. What if a value that you are expecting to be a number is instead a string? 
    Use try/catch and other logic to handle these types of errors gracefully.
    If an assignment is not yet due, do not include it in the results or the average. Additionally, if the learner’s submission is late 
    (submitted_at is past due_at), deduct 10 percent of the total points possible from their score for that assignment.
    Create a function named getLearnerData() that accepts these values as parameters, 
    in the order listed: (CourseInfo, AssignmentGroup, [LearnerSubmission]), and 
    returns the formatted result, which should be an array of objects as described above.
*/
function getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions) {
    //instantialize an empty array to hold our results
    let results = [];
    //check if AssignmentGroup belongs to CourseInfo and call our method for this
    verifyCourseId(CourseInfo.id, AssignmentGroup.course_id);

    //check if points_possible is 0
    //iterate through each assignment in the AssignmentGroup to make sure points_possible is valid
    for (let i = 0; i < AssignmentGroup.assignments.length; i++) {
        const assignment = AssignmentGroup.assignments[i];
        //call our method for this and pass in points_possible
        //utilize a try catch block to handle potential errors
        try {
            checkIfNumber(assignment.points_possible);
            checkIfPointsPossibleIsZero(assignment.points_possible);
        } catch (error) {
            console.error(error.message);
            break; // Stop checking further assignments if an error occurs
        }
    }

    //iterate through each learner submission
    LearnerSubmissions.forEach(learnerSubmission => {
        //find if the learner already exists in the results array
        let learnerResult = results.find(result => result.id === learnerSubmission.learner_id);
        //if the learner does not exist, create a new object for them
        if (!learnerResult) {
            learnerResult = {
                id: learnerSubmission.learner_id,
                totalScore: 0,
                totalPossible: 0
            };
            results.push(learnerResult);
        }
        //find the corresponding assignment for the learner submission
        let assignment = AssignmentGroup.assignments.find(a => a.id === learnerSubmission.assignment_id);
        //check if the assignment is found and if it is past due
        if (assignment) {
            //convert due_at and submitted_at to Date objects for comparison
            let dueDate = new Date(assignment.due_at);
            let submittedDate = new Date(learnerSubmission.submission.submitted_at);
            //only process if the assignment is due, new Date() gets the current date
            if (dueDate <= new Date()) {
                // get the score from the learner submission
                let score = learnerSubmission.submission.score;
                //check if the submission is late
                if (submittedDate > dueDate) {
                    //deduct 10 percent of the total points possible from their score
                    score -= assignment.points_possible * 0.1;
                }
                //calculate the percentage score for the assignment
                let percentageScore = score / assignment.points_possible;
                //add the assignment score to the learner's result object
                learnerResult[assignment.id] = percentageScore;
                //update total score and total possible for weighted average calculation
                learnerResult.totalScore += score;
                learnerResult.totalPossible += assignment.points_possible;
            }
        }
    });

    //calculate weighted average and format results, this should account for due 
    //assignments only as we already filtered them out
    for (let i = 0; i < results.length; i++) {
        //instantialize learner variable for easier access
        const learner = results[i];
        //calculate avg by dividing totalScore by totalPossible
        learner.avg = learner.totalScore / learner.totalPossible;
        //remove totalScore and totalPossible from the final output
        delete learner.totalScore;
        delete learner.totalPossible;
    }

    //return the results array
    return results;
}

function verifyCourseId(CourseInfoId, AssignmentGroupId) {
    //verify that AssignmentGroup belongs to CourseInfo
    if (AssignmentGroupId !== CourseInfoId) {
        //throw a new error if it does not match
        throw new Error("Error! AssignmentGroup does not belong to CourseInfo");
    }
    return true;//not sure if we need this
}

function checkIfPointsPossibleIsZero(pointsPossible) {
    //check if points_possible is 0
    switch (pointsPossible) {
        case 0:
            throw new Error("Error! points_possible cannot be zero.");
        default:
            return true;//not sure if we need this
    }
}

//what other checks could we do to prevent the code from breaking?
//e.g., check if a value that you are expecting to be a number is instead a string
function checkIfNumber(value) {
    if (typeof value !== 'number') {
        throw new Error("Error! Expected a number but received a different type.");
    } else {
        return true;//not sure if we need this
    }

}

//call our main function and log the results to the console
console.log(getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions));