USE [DopeScope];
GO

set identity_insert [User] on
insert into [User] (id, FirstName, LastName, Email, FirebaseId) VALUES (1, 'John', 'Smith', 'js@me.com','h3x09WR5jKYhbWoOQGyqxEdAGmo1'), 
(2, 'Jane', 'John', 'jj@me.com','8RnvpS55C3N3i7LzN5O3cZ8I0vD2') ;
set identity_insert [User] off

set identity_insert [Tag] on
insert into [Tag] ([id], [Tag])
values (1, 'Cool'), (2, 'Dope'), (3, 'Colorful'), (4, 'Scary');
set identity_insert [Tag] off

set identity_insert [Microscope] on
insert into [Microscope] (id, Make, Model, UserId, ImageUrl) VALUES (1, 'Amscope', 'A32453', 1,'https://res.cloudinary.com/ddaeunjfu/image/upload/v1634945558/tjqa6nyu6hlgkfnuptkf.jpg'),
 (2, 'Amscope', 'B34542', 2,'https://res.cloudinary.com/ddaeunjfu/image/upload/v1634945558/tjqa6nyu6hlgkfnuptkf.jpg');
set identity_insert [Microscope] off

set identity_insert [Slide] on
insert into [Slide] ([id],[Name],[Description],[DateCreated],[Magnification], [MicroscopeId], [ImageUrl]) VALUES (1,'cell','very very tiny', '2019-10-23', 10, 1, 'test'),
 (2,'plant cell',' green', '2020-10-23', 100, 2, 'test');
set identity_insert [Slide] off

set identity_insert [Note] on
insert into [Note] (id, Note, UserId, SlideId) VALUES (1, 'This is dope', 1, 1),
 (2, 'This is cool', 2, 1),
 (3, 'This is rad', 1, 2),
 (4, 'This is super', 2, 2);
set identity_insert [Note] off

set identity_insert [Like] on
insert into [Like] (id, Userid, Slideid) VALUES (1,1,1) , (2,1,2), (3,1,2), (4,2,1)
set identity_insert [Like] off

set identity_insert [SlideTag] on
insert into [SlideTag] (id, SlideId, TagId) VALUES 
 (1, 1 ,1),
 (2, 1 ,2),
 (3, 2 ,3),
 (4, 2 ,4)

set identity_insert [SlideTag] off
