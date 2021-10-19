CREATE TABLE [Slide] (
  [id] int PRIMARY KEY,
  [userId] int,
  [dateCreated] datetime,
  [magnification] int,
  [microscopeId] int,
  [imageUrl] nvarchar(255)
)
GO

CREATE TABLE [User] (
  [id] int PRIMARY KEY,
  [firstName] nvarchar(255),
  [lastName] nvarchar(255),
  [email] nvarchar(255),
  [isAdmin] bool,
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
)
GO

CREATE TABLE [Notes] (
  [id] int PRIMARY KEY,
  [note] nvarchar(255),
  [userId] int,
  [slideId] int
)
GO

ALTER TABLE [Slide] ADD FOREIGN KEY ([userId]) REFERENCES [User] ([id])
GO

ALTER TABLE [Notes] ADD FOREIGN KEY ([slideId]) REFERENCES [Slide] ([id])
GO

ALTER TABLE [Notes] ADD FOREIGN KEY ([userId]) REFERENCES [User] ([id])
GO

ALTER TABLE [Slide] ADD FOREIGN KEY ([microscopeId]) REFERENCES [Microscope] ([id])
GO

ALTER TABLE [SlideTags] ADD FOREIGN KEY ([tagId]) REFERENCES [Tag] ([id])
GO

ALTER TABLE [SlideTags] ADD FOREIGN KEY ([id]) REFERENCES [Slide] ([id])
GO

ALTER TABLE [Microscope] ADD FOREIGN KEY ([userId]) REFERENCES [User] ([id])
GO
