CREATE TABLE [dbo].[Table]
(
	[UserName] CHAR(10) NOT NULL PRIMARY KEY, 
    [Password] NCHAR(10) NULL, 
    [NickName] NCHAR(10) NULL, 
    [ProfilePicture] NCHAR(10) NULL, 
    [ContactList] INT NULL, 
    [CreatedDate] DATETIME NULL
)
