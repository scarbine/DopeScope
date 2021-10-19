# DopeScope

DopeScope is a full stack application that allows users to upload, share, and interact with their favorite mircoscope slides. 


# Install Instructions

  - Clone this repo to the location of your choice
  - cd DopeScope
  - run start DopeScope.sln
  - cd client
  - run npm install
  - in the same directory run npm start
  - in Visual Studio create a New Query
  - copy and run the Create Tables SQL script in the new query
  - navigate to the database it creates and add it to a new query 
  - copy the Seed Data SQL file and run the sript in the new database
  - start the program in Visual studio

# SQL

[Create Tables Script](https://github.com/scarbine/DopeScope/blob/main/SQL/01_Db_Create.sql.sql)


# ERD


[DopeScope_MVP.pdf](https://github.com/scarbine/DopeScope/files/7376234/DopeScope_MVP.pdf)


# WireFrame

[DopeScope---Wireframe.pdf](https://github.com/scarbine/DopeScope/files/7374163/DopeScope---Wireframe.pdf)

# MVP For this Project

A user should have the ablitly to add new slides with images that can be viewed, sorted and searched by all users. The user should also be able to tag slides with a list of tags. The list of tags can be updated and added to and a slide may have a list of tags and add notes to the slides. Every page and request should have authorization. 

# Streach goals

  - Add ablity for users to like slides
  - Tap into external api for taxonomy info for that slide
  - Allow users to add ratings to slides


# Tech Stack

  - C#
  - .NET
  - React 
  - Bootstrap
  - SQL
  - Firebase
