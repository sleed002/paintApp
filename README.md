# PaintApp

## Introduction
### Tell us what the app is, how to use it, etc.
A Painting and Drawing app
## Technologies
### Tell us, on a high-level what technologies you are going to use to build the app
Python, Django, Javascript, HTML, CSS, Bootstrap **AJAX**
### Tell us how you plan on implementing the difficult parts
I found some base code to build out the canvas part of the app. Some of it was broken but I think i fixed it and got it working ok. Will need to research how to save the canvas data as a URL - but seems doable.
**completed**
## MVP
### Tell us what you must have for the project to work
The MVP of the project will be that a user can login, create a drawing on the canvas, save it, delete it or edit it. I'd like to have the user be able to increase or decrease the line size, have a pencil and eraser option, a clear button and at least all the basic colors of the rainbow as options plus black.
Users can view other people's drawings on the main gallery page but cannot edit or delete other user's art.
Users can also name and caption their art.
**all completed**
## Goals
### Tell us what you would like to have after you reach your MVP
I'd like to have an option to send completed drawings to other users to view and users be able to comment on the drawings.
**send completed but decided to skip commenting to keep app clean**
### Stretch Goals
I want to include an option to make a drawing with a random line and save it and send it to another user so that the next user can make the line into a drawing - kind of like a game. Then both should be able to comment on the final drawing. When you roll over the line art the original line will show up bright.
**completed - user can see both edited and original versions and on rollover the new art pops**
### Tell us what you would like to get to, if time were no issue. You should not expect to reach these.
Share a drawing on FB?
**did not get to this**
## Timeline
### By Monday
I would like to have the canvas fully working with all the options mentioned in the MVP and test heroku deployment.
### By Tuesday
I'd like to have the url save working into the Paint table and be able to select a user to send it to their table. Also test heroku.
### By Wednesday
 I'd like to get the gallery for all users working so that others can view the work of other users and get the edit and delete capabilities working. Test heroku.
### By Thursday
I'd like to cleanup css and bootstrap and of course make sure heroku is working, maybe any stretch goals.
## Wireframe

<a href="https://ibb.co/kdqRsy"><img src="https://preview.ibb.co/mARzCy/Screen_Shot_2018_06_17_at_5_30_28_PM.png" alt="Screen_Shot_2018_06_17_at_5_30_28_PM" border="0"></a>

## Crows Foot Diagram of Schema

<a href="https://ibb.co/nqCgsy"><img src="https://preview.ibb.co/i6RkKd/Screen_Shot_2018_06_17_at_5_47_25_PM.png" alt="Screen_Shot_2018_06_17_at_5_47_25_PM" border="0"></a>


## Technical Requirements

### Be Full CRUD: Create && Read && Update && Destroy
complete - user can create, edit and destroy a drawing
### Have authentication. Users can log in and out. A user should not have the ability to see or update any data that you don't want them to
complete - login and signup pages plus authentication throughout
### Tests. You need to have at least a few tests per app. All tests must pass.
complete - 3 tests on each app, all pass
### Postgres database with multiple related database tables.
complete - 2 tables, Drawing and User
### Do something on the frontend - You are still using Django to serve up the pages But the pages are not completely static - the user can interact with it
complete - canvas used on front end
### Use Vanilla Javascript or jQuery for DOM manipulation
complete - jQuery used only to get token and for my ajax call - rest is vanilla JS
### If you are using Vanilla JS: we should see no $ (unless it's used for AJAX) If you are using jQuery: we should see no document
 complete - I did use one other $ to grab the token off the page
## Use at least one of the following (and your README should tell us what option(s) used)
1. AJAX request to your Django app. This means you have route that responds with JSON and your frontend makes an AJAX request to it.
2. requests. Make an HTTP from the backend to some API.
Typescript. Use Typescript on your frontend instead of of Javascript.
3. Full test coverage. At least one test per route per verb. If the route does something different depending on whether or not someone is logged in. Test both cases. All tests must pass.
4. Deploy your app on Google App Engine instead of Heroku
5. Something else that will blow us away.

**I used AJAX requests to my Django App to get canvas save data to work**
### Be deployed on Heroku
complete
### Have all your code on our GitHub Enterprise
complete
### Use CSS. You may use Bootstrap but you also need to have some of your own CSS.
complete
### Have at least 40 commits. (You will likely have many more)
complete
### Have code that we can read. If the indentation is all over place, variable / function names that don't make sense, etc. then we cannot read your code. We have to read your code in order to grade it.
complete

## Struggles

By far the most challenging part was getting the canvas to work.  I had to do a ton of research to get it to render just so the person could draw. The code I found had no color options, the eraser had problems and the jQuery was out of date, so the $push on the AJAX request did not work. I had to clean it up, research each error one by one and keep trying and changing things until it worked on my end. I also had to alter the backend to get the drawing info to link to a specific user.

After working through this part and the canvas image save, I wanted to add background colors as an option to make my app more colorful and fun. I researched adding a canvas background for a long time but from everything I found you could only change the background once. I ended up just adding a background color property on to the drawing model and rendering the canvas art on top of the background to keep the image intact.

The third challenge was then getting the image to show up correctly in the edit canvas page, and still allow the user to edit it and have it save correctly.  After a lot of trial and error I was able to render the image on its background in the canvas, then force both of those through on the edit save to a new image. The user can also change the title of the drawing. Initially the original canvas image was off in its size so I fixed that by adding a background size property to the div.

The final big challenge was allowing a user to send artwork to another user and allow that user to edit it - my stretch goal. I was able to do this more easily than I anticipated by using a boolean to tell if the user sent an image. If the boolean was true than the artist id would be changed from the user instance to the filtered instance of the user to whom the image was being sent. The image would then show up under the new user's profile. This did mean that my schema for my stretch goal changed with only one user now being linked to the sent drawing.

I learned a lot about Django, passing info into the html pages, using the urls.py page and of course how to successfully manipulate the canvas data. All in all I am pretty happy with my app!

## App
https://artogram.herokuapp.com/
## Screen shots of the different pages of the app
The Home Page

<a href="https://ibb.co/neEfAT"><img src="https://preview.ibb.co/gF9DVT/Screen_Shot_2018_06_21_at_4_04_51_PM.png" alt="Screen_Shot_2018_06_21_at_4_04_51_PM" border="0"></a>
<a href="https://ibb.co/cZw5c8"><img src="https://preview.ibb.co/gQQyx8/Screen_Shot_2018_06_21_at_4_05_10_PM.png" alt="Screen_Shot_2018_06_21_at_4_05_10_PM" border="0"></a>

User Profile Page

<a href="https://ibb.co/feQnqT"><img src="https://preview.ibb.co/d7pDVT/Screen_Shot_2018_06_21_at_4_05_27_PM.png" alt="Screen_Shot_2018_06_21_at_4_05_27_PM" border="0"></a>

The Create Page

<a href="https://ibb.co/mQfbjo"><img src="https://preview.ibb.co/bsxdx8/Screen_Shot_2018_06_21_at_4_05_42_PM.png" alt="Screen_Shot_2018_06_21_at_4_05_42_PM" border="0"></a>

Example of a finished drawing after save.

<a href="https://ibb.co/fGJkc8"><img src="https://preview.ibb.co/hptJx8/Screen_Shot_2018_06_21_at_4_08_26_PM.png" alt="Screen_Shot_2018_06_21_at_4_08_26_PM" border="0"></a>

The Home Page with newly saved image.

<a href="https://ibb.co/kNPxqT"><img src="https://preview.ibb.co/cdhTx8/Screen_Shot_2018_06_21_at_4_08_40_PM.png" alt="Screen_Shot_2018_06_21_at_4_08_40_PM" border="0"></a>

The User Profile with the newly saved image.

<a href="https://ibb.co/b2fRjo"><img src="https://preview.ibb.co/bH6MH8/Screen_Shot_2018_06_21_at_4_08_53_PM.png" alt="Screen_Shot_2018_06_21_at_4_08_53_PM" border="0"></a>

The Edit page

<a href="https://ibb.co/cXBSqT"><img src="https://preview.ibb.co/iwGtVT/Screen_Shot_2018_06_21_at_4_09_07_PM.png" alt="Screen_Shot_2018_06_21_at_4_09_07_PM" border="0"></a>

The Edited drawing after save.

<a href="https://ibb.co/ho8wjo"><img src="https://preview.ibb.co/cnCNPo/Screen_Shot_2018_06_21_at_4_09_47_PM.png" alt="Screen_Shot_2018_06_21_at_4_09_47_PM" border="0"></a>

The Original and Edited drawings side by side in the User profile.

<a href="https://ibb.co/gs7HqT"><img src="https://preview.ibb.co/eKXiVT/Screen_Shot_2018_06_21_at_4_10_02_PM.png" alt="Screen_Shot_2018_06_21_at_4_10_02_PM" border="0"></a>

The User Sign in Page

<a href="https://ibb.co/cDD1H8"><img src="https://preview.ibb.co/cMwz4o/Screen_Shot_2018_06_21_at_4_10_24_PM.png" alt="Screen_Shot_2018_06_21_at_4_10_24_PM" border="0"></a>

The User Login Page

<a href="https://ibb.co/ex51jo"><img src="https://preview.ibb.co/c93XqT/Screen_Shot_2018_06_21_at_4_10_35_PM.png" alt="Screen_Shot_2018_06_21_at_4_10_35_PM" border="0"></a>

Example of the View Page for a selected Image - no login required.

<a href="https://ibb.co/khqgH8"><img src="https://preview.ibb.co/eYBAAT/Screen_Shot_2018_06_21_at_4_11_24_PM.png" alt="Screen_Shot_2018_06_21_at_4_11_24_PM" border="0"></a>

Example of a user sending a drawing to another user.

<a href="https://ibb.co/kPaHPo"><img src="https://preview.ibb.co/hJPBjo/Screen_Shot_2018_06_21_at_4_12_37_PM.png" alt="Screen_Shot_2018_06_21_at_4_12_37_PM" border="0"></a>

<a href="https://ibb.co/nwsLc8"><img src="https://preview.ibb.co/kOHmH8/Screen_Shot_2018_06_21_at_4_12_51_PM.png" alt="Screen_Shot_2018_06_21_at_4_12_51_PM" border="0"></a>

The Home Page with the send drawing showing.

<a href="https://ibb.co/k2vqc8"><img src="https://preview.ibb.co/mZVOx8/Screen_Shot_2018_06_21_at_4_13_03_PM.png" alt="Screen_Shot_2018_06_21_at_4_13_03_PM" border="0"></a>

The sent-to User's Profile page with the sent drawing in it available for edit.

<a href="https://ibb.co/dfKSPo"><img src="https://preview.ibb.co/fzDnPo/Screen_Shot_2018_06_21_at_4_13_20_PM.png" alt="Screen_Shot_2018_06_21_at_4_13_20_PM" border="0"></a>

The Sent-To-User editing their sent photo and renaming it.

<a href="https://ibb.co/fFiMjo"><img src="https://preview.ibb.co/hv2sqT/Screen_Shot_2018_06_21_at_4_14_21_PM.png" alt="Screen_Shot_2018_06_21_at_4_14_21_PM" border="0"></a>

The Edited drawing and Sent drawing showing together in the Home page.

<a href="https://ibb.co/cHiFAT"><img src="https://preview.ibb.co/n38RH8/Screen_Shot_2018_06_21_at_4_14_42_PM.png" alt="Screen_Shot_2018_06_21_at_4_14_42_PM" border="0"></a>

The Edited Sent photo in the View Page.

<a href="https://ibb.co/nxavAT"><img src="https://preview.ibb.co/kt7Wjo/Screen_Shot_2018_06_21_at_4_14_50_PM.png" alt="Screen_Shot_2018_06_21_at_4_14_50_PM" border="0"></a>


## Any other info we should know
Turn on your sound while painting for some inspirational music! You can also right click save photos - though without the background of course as they are pngs.
## Future Goals
One future goal I considered is to have it that when a user click's another user's name they are taken to that user's page where they can like or unlike any of their drawings. I skipped allowing comments to keep the app neat and tidy and would probably keep it that way but likes could be fun.
## Tell us what would like to add/fix/remove/change with more time
If I had a ton of time since I have the users' email addresses it would be fun to send an email notification to a user when another user sends them a drawing. The share on FB would still be cool if the background was included. (Technically user can download the image and then upload it to FB if they save it over a background and change it a jpeg. ;) )
