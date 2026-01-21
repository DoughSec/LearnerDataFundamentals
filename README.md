Using the fundamentals.js file, it takes in the mock data given by the sandbox for testing and matching the potentail outputs. I don't think I accounted for every possible data input as that has many many possibilities. 

While going through the code, it starts by having a few verification functions to meet any requirements that were to be met including verifying that the course id is valid, checking if points_possible is acutally a number, etc. afterwards I iterate throughout each AssignmentGroup and perform these checks to try and catch potential error early on. Next comes the harder logic where we check through each LearnerSubmission and check if the learner has already been checked in the results array. 

Afterwards, iterating through the assigment group to find the current assigment that we will be assessing and following the other requirements mentioned inluding 10% deductions for being past the due date, etc. 

Lastly, the once all checks are made and the scores are updated, the average is calculated and then we print the results eventually while passing in the example objects.