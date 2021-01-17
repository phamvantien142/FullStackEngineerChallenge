# Full Stack Developer Challenge
## 1. Requirements
Design a web application that allows employees to submit feedback toward each other's performance review.

### Admin view
* Add/remove/update/view employees
* Add/update/view performance reviews
* Assign employees to participate in another employee's performance review

### Employee view
* List of performance reviews requiring feedback
* Submit feedback

## 2. High-level design

![alt text](https://user-images.githubusercontent.com/9964409/104837329-25d7d400-58f7-11eb-83e7-5b90f4b71ee8.png)

## 3. Data structure

* User: Combine two types (Admin and Employee model)
```
_id NOT NULL (Mongo ObjectID)
userType NOT NULL (String with only two types (admin|user(employee)))
firstName NOT NULL (String)
lastName NOT NULL (String)
email NOT NULL (String)
password NOT NULL (String)

Index: {_id, userType, email}
Unique constraint: {userType, email}
```
* Review: Represent a performance review of a specific employee
```
_id NOT NULL (Mongo ObjectID)
title NOT NULL (String with only two values (admin|user(employee)))
reviewee NOT NULL (ObjectID - foreignKey with User table)
totalStars NOT NULL (Number)
totalFeedbacks NOT NULL (Number)
createdAt NOT NULL (Date)

Index: {_id, createdAt}
```
* Feedback: Use this table for both two operations:
  * Admin assigns a reviewer: Create a new Feedback record and set Assigned status.
  * User send a feedback: Update the feedback and set Completed status.
```
_id NOT NULL (Mongo ObjectID)
reviewer NOT NULL (ObjectID - foreignKey with User table)
status NOT NULL (String with only two values (Assigned|Completed))
stars NOT NULL (Number) (Integer from 1 to 5)
comment NOT NULL (String)
createdAt NOT NULL (Date)

Index: {_id, createdAt, reviewer}
```

## Server API
* Admin API
  * POST ```/admin/login``` - Login an admin
  * POST ```/admin/register``` - Register an admin account
  * POST ```/admin/user``` - New an employee account
  * PUT ```/admin/user/:id``` - Update employee information by id
  * DELETE ```/admin/user/:id``` - Delete an employee by id
  * GET ```/admin/user/:id``` - Get employee information by id
  * GET ```/admin/users``` - Get a list of employee information with pagination: {Params: pageIndex}
  * POST ```/admin/review``` - New a review
  * PUT ```/admin/review/:id``` - Update review information
  * GET ```/admin/users``` - Get a list of review information with pagination: {Params: pageIndex}
  * POST ```/admin/review/:id/assign``` (body: {email}) - Assign a reviewer (determined by email) to join a specific review: New a feedback with Assigned status
* Employee API
  * POST ```/login``` - Login an employee
  * GET ```/feedbacks``` - Get a list of feedback information with pagination by reviewer (logged in account): {Params: pageIndex}
  * PUT ```/feedback/:id``` - Update the feedback (do nothing in case of completed feedback)

Technology used for backend side: NodeJS, ExpressJS, MongoDB, Jest (for testing)

## Website application
In this challenge, I implemented some screen pages:
  * Login for Admin and Employee
  * Register a new admin account
  * New an employee account
  * New a review
  * Home overview screen for admin: (Show the list of employees and reviews - but not implemented the pagination display, only show first 20 records for each).

In the whole app, jwt authentication was used for every time sending a request. The jwt token was stored into the browser localStorage and will retrieve immediately if need to send a request.

Technology used for frontend side: ReactJS, bootstrap, reactboostrap, axios for sending API, ReactRouter for navigation
