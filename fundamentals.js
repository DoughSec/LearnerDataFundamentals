//Using the example data set for each object on here
//instantialize a courseinfo object
const CourseInfo = {
    id: 451,
    name: "Introduction to JavaScript"
};

//instantialize an AssignmentInfo object
// let assignmentInfo = {
//     id: number,
//     name: string,
//     // the due date for the assignment
//     due_at: Date,
//     // the maximum points possible for the assignment
//     points_possible: number
// };


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
    //iterate through each assignment in the AssignmentGroup
    AssignmentGroup.assignments.forEach(assignment => {
        //call our method for this and pass in points_possible
        //utilize a try catch block to handle potential errors
        try {
            checkIfPointsPossibleIsZero(assignment.points_possible);
        } catch (error) {
            console.error(error.message);
        }
    });

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
    if (pointsPossible === 0) {
        throw new Error("Error! points_possible cannot be zero.");
    }
    return true;//not sure if we need this
}