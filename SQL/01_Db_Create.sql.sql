USE [master]

IF db_id('DopeScope') IS NULL
	CREATE DATABASE [DopeScope]

GO

USE [DopeScope]

GO

DROP TABLE IF EXISTS [Slide]
DROP TABLE IF EXISTS [User]
DROP TABLE IF EXISTS [Microscope]
DROP TABLE IF EXISTS [Tag]
DROP TABLE IF EXISTS [SlideTags]
DROP TABLE IF EXISTS [Notes]


CREATE TABLE [Slide] (
  [id] int PRIMARY KEY,
  [userId] int,
  [dateCreated] datetime,
  [magnification] int,
  [microscopeId] int,
  [imageUrl] nvarchar(255)

CONSTRAINT [FK_Slide_Microscope] FOREIGN KEY ([microscopeId]) REFRENCES [Microscope] ([Id]),
CONSTRAINT [FK_Slide_User] FOREIGN KEY ([userId]) REFRENCES [User] ([Id])


)
GO

CREATE TABLE [User] (
  [id] int PRIMARY KEY,
  [firstName] nvarchar(255),
  [lastName] nvarchar(255),
  [email] nvarchar(255),
  [isAdmin] bit,
  [firebaseId] nvarchar(255)
)
GO

CREATE TABLE [Microscope] (
  [id] int PRIMARY KEY,
  [make] nvarchar(255),
  [model] nvarchar(255),
  [userId] int
)
GO

CREATE TABLE [Tag] (
  [id] int PRIMARY KEY,
  [tag] nvarchar(255)
)
GO

CREATE TABLE [SlideTags] (
  [id] int PRIMARY KEY,
  [tagId] int,
  [slideId] int

CONSTRAINT [FK_SlideTags_Tag] FOREIGN KEY ([tagId]) REFRENCES [Tag] ([Id]),
CONSTRAINT [FK_SlideTags_Slide] FOREIGN KEY ([slideId]) REFRENCES [Slide] ([Id])
)
GO

CREATE TABLE [Notes] (
  [id] int PRIMARY KEY,
  [note] nvarchar(255),
  [userId] int,
  [slideId] int

CONSTRAINT [FK_Notes_User] FOREIGN KEY ([userId]) REFRENCES [User] ([Id]),
CONSTRAINT [FK_Notes_Slide] FOREIGN KEY ([slideId]) REFRENCES [Slide] ([Id])
)
GO

