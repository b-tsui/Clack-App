# Clack App Data Schema

## **users**
| attribute name | data type |               details |
| -------------- | :-------: | --------------------: |
| id             |  integer  | not null, primary key |
| fullName       |  string   |              not null |
| email          |  string   |      not null, unique |
| hashedPassword |  string   |     not null (binary) |
| createdAt      | timestamp |              not null |
| updatedAt      | timestamp |              not null |

## **channels**
| attribute name | data type |               details |
| -------------- | :-------: | --------------------: |
| id             |  integer  | not null, primary key |
| userId         |  integer  | not null, foreign key |
| name           |  string   |      not null, unique |
| isDM           |  boolean  |              not null |
| createdAt      | timestamp |              not null |
| updatedAt      | timestamp |              not null |

## **messages**
| attribute name | data type |               details |
| -------------- | :-------: | --------------------: |
| id             |  integer  | not null, primary key |
| message        |   text    |              not null |
| userId         |  integer  | not null, foreign key |
| channelId      |  integer  | not null, foreign key |
| createdAt      | timestamp |              not null |
| updatedAt      | timestamp |              not null |

## **channelUsers**
| attribute name | data type |               details |
| -------------- | :-------: | --------------------: |
| id             |  integer  | not null, primary key |
| userId         |  integer  | not null, foreign key |
| channelId      |  integer  | not null, foreign key |
| createdAt      | timestamp |              not null |
| updatedAt      | timestamp |              not null |
