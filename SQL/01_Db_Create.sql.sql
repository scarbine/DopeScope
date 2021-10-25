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
DROP TABLE IF EXISTS [SlideTag]
DROP TABLE IF EXISTS [Note]



CREATE TABLE [User] (
  [id] integer PRIMARY KEY IDENTITY,
  [FirstName] nvarchar(50) NOT NULL,
  [LastName] nvarchar(50) NOT NULL,
  [Email] nvarchar(50) NOT NULL,
  [FirebaseId] nvarchar(28) NOT NULL
)
GO

CREATE TABLE [Microscope] (
  [id] integer PRIMARY KEY IDENTITY,
  [Make] nvarchar(50) NOT NULL,
  [Model] nvarchar(50) NOT NULL,
  [UserId] integer NOT NULL,
ImageUrl nvarchar(255) 
)
GO

CREATE TABLE [Slide] (
  [id] integer PRIMARY KEY IDENTITY,
  [DateCreated] datetime NOT NULL,
  [Magnification] integer NOT NULL,
  [MicroscopeId] integer NOT NULL,
  [Name] nvarchar(255) NOT NULL,
  [Description] nvarchar(255) NOT NULL,
  [ImageUrl] nvarchar(255) NOT NULL,

CONSTRAINT [FK_Slide_Microscope] FOREIGN KEY ([microscopeId]) REFERENCES [Microscope] ([Id])

)
GO

CREATE TABLE [Tag] (
  [id] integer PRIMARY KEY IDENTITY,
  [Tag] nvarchar(50) NOT NULL
)
GO

CREATE TABLE [SlideTag] (
  [id] integer PRIMARY KEY IDENTITY,
  [TagId] integer NOT NULL,
  [SlideId] integer NOT NULL,

CONSTRAINT [FK_SlideTag_Tag] FOREIGN KEY ([tagId]) REFERENCES [Tag] ([Id])ON DELETE CASCADE,
CONSTRAINT [FK_SlideTag_Slide] FOREIGN KEY ([slideId]) REFERENCES [Slide] ([Id]) ON DELETE CASCADE
)
GO

CREATE TABLE [Note] (
  [id] integer PRIMARY KEY IDENTITY,
  [Note] nvarchar(500) NOT NULL,
  [UserId] integer NOT NULL,
  [SlideId] integer NOT NULL,

CONSTRAINT [FK_Note_User] FOREIGN KEY ([userId]) REFERENCES [User] ([Id])ON DELETE CASCADE,
CONSTRAINT [FK_Note_Slide] FOREIGN KEY ([slideId]) REFERENCES [Slide] ([Id])ON DELETE CASCADE
)
GO
