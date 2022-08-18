# reusable-comment-component

To creat a reusable comment component, I defined custom HTML elements. I defined the user-comment element with attributes to take in the content, and I manually placed an unlimited number of identically structured and styled comments with different content in HTML. I used Custom Elements, which can take a name, email address, and comment as attributes, to display the name, email address, and attribute in a built-in custom layout.

The second branch has been updated to include an image and a comment form. The comment form includes the following elements:

a. name, email address, and large body input
b. checkbox to indicate agreement to post the comment 
c. submit button
Before being submitted, all three comment fields will be required and valid. When submitted, it is displayed using a reusable comment component, which also includes the time and date of submission.

A state manager manages comments; whenever a new comment is added, it triggers the state manager, which then updates the displayed comments on the site. Comments are always displayed in the order in which they were submitted.

The third branch includes an IndexedDB database, using the IDB NPM package, to store comments

 a. When a comment is valid and is submitted, it will saved to the IndexedDB database,
 b. When the page is loaded, it will load the comments from the IndexedDB database and display them
It also allows for the deletion of comments and the ability to filter comments by author name, email address, and comment length. This filtering will drive the users' state manager and eliminate the need to look up comments in IndexedDB.
