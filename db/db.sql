drop table if exists roles CASCADE;
create table roles(
    id bigserial primary key,
    name varchar(180)not null unique,
    image varchar(255)null ,
    route varchar(255) null ,
    created_at timestamp(0) not null ,
    updated_at timestamp(0) not null
);

drop table if exists users CASCADE;
create table users(
    id bigserial primary key,
    email varchar(255) not null  unique ,
    name varchar(255) not null ,
    lastname varchar(255) not null ,
    phone varchar(80) not null unique ,
    image varchar(255) null ,
    password varchar(255) not null ,
    is_available boolean null ,
    session_token varchar(255) null ,
    created_at timestamp(0) not null ,
    updated_at timestamp(0) not null
);

drop table if exists user_has_roles CASCADE;
create table user_has_roles(
    id_user bigserial not null,
    id_rol bigserial not null,
    created_at timestamp(0) not null ,
    updated_at timestamp(0) not null,
    FOREIGN key(id_user) REFERENCES users(id) on UPDATE CASCADE on delete CASCADE,
    FOREIGN key(id_rol) REFERENCES roles(id) on UPDATE CASCADE on delete CASCADE,
    primary key (id_user, id_rol)

);

insert into roles(name,route,image,created_at,updated_at)
values('CLIENTE', 'client/home', 'https://cdn.dribbble.com/users/2095589/screenshots/4166422/user_1.png', '2022-06-12', '2022-06-12');

insert into roles(name,route,image,created_at,updated_at)
values('RESTAURANTE', 'restaurante/home', 'https://media-cdn.tripadvisor.com/media/photo-s/1c/1b/7b/13/area-interna.jpg', '2022-06-12', '2022-06-12');
	   
insert into roles(name,route,image,created_at,updated_at)
values('REPARTIDOR', 'delivery/home', 'https://simondecirene.cl/simondecirene_webtres/wp-content/uploads/2020/05/Delivery_1920x700.png', '2022-06-12', '2022-06-12');