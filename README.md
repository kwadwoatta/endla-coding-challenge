# Endla UI Challenge

The purpose of this challenge is to assess your ability in react UI/UX on the types of tasks you'd be working on at Endla. 

Some standard React coding is required to make the application work as intended, however, keep in mind that **UI and UX is the most important aspect of the challenge**.

#### Please read this document completely before you start the challenge.

## Submission instructions
Please use git and GitHub during this task and submit your code.

Create a **private** GitHub repository with the supplied code on the main branch and add your changes to a new branch.

Once completed **open a PR to the main branch** and submit by inviting GitHub users *rileyodon* and *michael1997* to your repository.

## Getting Started

Clone this repo and run `yarn run dev`. This will start the application.
You will see the following table:

![original table](./images/original_table.png)

### Code Structure

This is a small React app created using create-react-app, the component which you will work on the most is `frontend/src/components/DataTable.tsx`.

The data displayed are imported from the data folder, take a look at `frontend/src/data/data.json` and `frontend/src/data/columns.json`, it is important to understand the data in order to complete the challenge.

### Rules

You have the freedom to choose whatever additional library to complete the task, the table needs to be constructed with `react-table` (this is already installed).

You can add new data to the json files provided to you if needed, however, you should not delete them or remove some of the already existing entries.

We recommend that you install a styling package to help you complete the tasks.

## Tasks

You're expected to complete the tasks below, we expect that you spend some time on "making things look good", this
will be an important factor upon evaluation.

1. Size:
 - The table width should be as wide as the page
 - The table height should be constant (i.e. it height doesn't increase if more rows are displayed)
 - The table should be scrollable both horizontally and vertically

2. Columns:
 - The "Locate" column cells should be a button (you don't have to implement onClick)
 - The "Show" column cells should be icons (show/hide icons), once clicked the icon is switched
 - The "Tags" column cells should behave like this:
   - The tags should be well displayed in a single row (up to you to find out how) 
   - When the cell is clicked, a selectable is displayed, it allows you to add new tags (multiple tags can be added at once)
 - The following columns "Longitude", "Latitude", and "Elevation" must have the following properties:
    - A cell is editable, i.e. you can click on a cell and edit the value
    - Longitude value must be a number within `[-180, 180)`
    - Latitude value must be a number within `[-90, 90]`
    - Elevation value must be a positive number

3. Table functionality:
 - For each row create a checkbox that allows selecting the row
 - Create a header for the table:
    - It contains a save button (you're not expected to implement a save functionality)
    - It contains a select all rows button (when checked all rows are checked)
    - If a row(s) is(are) selected, show a delete button on the header, upon clicking, the rows are deleted
 - Create a pagination:
    - By default keep 5 rows on a page, the user should be able to manually change that to 10 and 20
    - It must have buttons to navigate page by page, and to the final/first page

4. Exapandble rows:
   - Wells that have "additional" entry should be expandable (take a look at data.json, first two entries are an example), add an icon which expands the row when clicked (have two icons, one for exapanding and one for closing)
   - When expanded, display a *collapsible* list for the "wireline" and "pason" keys 
     - List the values inside the array, have a checkbox next each one of them
   - When expanded, display the value of "heatmap" next to a checkbox  
