#!/usr/bin/python3

mc_table = """CREATE TABLE mc(
id integer not null auto_increment,
skillname varchar(25) unique,
semester integer not null,
primary key (id))"""

skills = [
 ("Unix",              0b000001),
 ("Linux",             0b000001),
 ("MacOS",             0b000001),
 ("Windows",           0b000001),
 ("Security",          0b000011),
 ("Office products",   0b000001),
 ("Databases",         0b000111),
 ("IDEs",              0b000001),
 ("Communication",     0b000001),
 ("Environment setup", 0b000001),
 ("Ansible",           0b000010),
 ("Presentation",      0b000001),
 ("Java",              0b000011),
 ("PHP",               0b000001),
 ("JavaScript",        0b000001),
 ("Go",                0b000011),
 ("C#",                0b000001),
 ("Python",            0b000001),
 ("C",                 0b000001),
 ("C++",               0b000110),
 ("Frameworks",        0b000110),
 ("Other",             0b000000)]


