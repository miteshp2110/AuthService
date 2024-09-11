
/* To create Table */
 create table users(
    uid int auto_increment primary key,
    uname varchar(10) not null,
    email varchar (30) not null unique,
    password varchar (255) not null,
    created_at timestamp default current_timestamp);