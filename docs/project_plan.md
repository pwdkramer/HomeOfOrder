# Project Plan

## 1

Brainstorm a list of features that you'd like the finished product to have. You are not expected to finish all, or even most, of the features you come up with. The goal is just to come up with some fun ideas that you can work towards. Add a docs folder to you repository and include this list as a markdown file.

- Have multiple accounts that are part of a shared household.
- Create custom tasks to be used for things like chores. They can be one-time or repeatable. Some accounts have permissions to assign these tasks to other accounts in the household, some do not (parent/child).
- Some tasks might automatically assign when repeated, either to the same individuals or in a rotation.
- Meal planning tasks. Stretch goal to create an ingredient list and export to shopping list.
- Create calendar events to share with household. Stretch goal to export to iCal, google cal, etc.

## 2

Define the MVP (Minimum viable product) for your project. Out of your list of features select the most important subset. You will be expected to complete implementation of this list so try to keep the set of tasks manageable. Aim for something that you think can be completed in 2-4 weeks. Include the resulting list in your docs directory.

- Account creation. Ability to create households, ability to invite others to join a household.
- Create tasks that can be given name, deadline, description, and assigned user.
- Be able to mark tasks as complete.

## 3

For each of the features that are to be included in the MVP, create one or more User stories. You'll estimate these tasks as part of your first sprint, so you don't need to be too precise yet, but try to keep them small. Any story that will take more than a week should be broken into multiple smaller stories if possible. Follow the user stories guidelines discussed in lecture. To track these user stories we'll be using GitHub Issues. Create an Issue for each user story in your project. All group member must create at least one user story.

- Account creation: As a member of a disorganized household, I want to be able to create an account and household, so that I can invite others in my home to have a coordination tool.

- Task creation: As a user, I want to create a weekly list of chores, so that I can assign them to myself or others and know who is responsible for getting them done, and trust that they will be assigned regularly automatically.

- Task completion: As a user, I want to be able to mark tasks as complete, so that others can check the list in the household instead of feeling the need to nag.
  
- Calendar sync: As a user, I want to export tasks and events to my primary calendar app, so that I can have information for my day in one location and not worry about always checking this app.

## 4

Discuss the overall structure your project will have. It's a good idea to break the project into several files in order to simplify the process of multiple people contributing to the project.

- I believe this project would be best suited as an interface to a relational database. I would have tables for users, households, tasks, and potentially tables for suggested tasks like common chores, or recipes to be used with meal planning.

- I would need to design pages for users to view certain criteria of content (a chores page, a meal planning page, a household summary page) as well as methods for the user to add to lists or mark items complete.

TODO for mvp:
    (Get basic task list working for session)
    - Edit tasks
    - Mark tasks as complete
    - Seperate pending and complete tasks
    - Delete tasks
