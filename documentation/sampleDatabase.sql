CREATE DATABASE globant_intro;
-- Switch to the newly created database
\c globant_intro;

-- Create the organization table
CREATE TABLE organization (
    id_organization SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    status INT NOT NULL
);

-- Create the tribe table
CREATE TABLE tribe (
    id_tribe SERIAL PRIMARY KEY,
    id_organization INT NOT NULL,
    name VARCHAR(50) NOT NULL,
    status INT NOT NULL,
    FOREIGN KEY (id_organization) REFERENCES organization (id_organization)
);

-- Create the repository table
CREATE TABLE repository (
    id_repository SERIAL PRIMARY KEY,
    id_tribe INT NOT NULL,
    name VARCHAR(50) NOT NULL,
    state CHAR(1) NOT NULL,
    create_time TIMESTAMP NOT NULL,
    status CHAR(1) NOT NULL,
    FOREIGN KEY (id_tribe) REFERENCES tribe (id_tribe)
);

-- Create the metrics table
CREATE TABLE metrics (
    id_repository INT NOT NULL,
    coverage DOUBLE PRECISION NOT NULL,
    bugs INT NOT NULL,
    vulnerabilities INT NOT NULL,
    hotspot INT NOT NULL,
    code_smells INT NOT NULL,
    PRIMARY KEY (id_repository),
    FOREIGN KEY (id_repository) REFERENCES repository (id_repository)
);

-- Fill with dummy data

-- Organizations
insert into organization (id_organization, name, status) values (1, 'Labadie, Renner and Bins', 0);
insert into organization (id_organization, name, status) values (2, 'Schamberger and Sons', 1);
insert into organization (id_organization, name, status) values (3, 'Kris and Sons', 1);

-- Tribes
insert into tribe (id_tribe, id_organization, name, status) values (1, 2, 'White-browed owl', 0);
insert into tribe (id_tribe, id_organization, name, status) values (2, 2, 'Asian openbill', 0);
insert into tribe (id_tribe, id_organization, name, status) values (3, 3, 'Squirrel, red', 1);
insert into tribe (id_tribe, id_organization, name, status) values (4, 3, 'Rufous-collared sparrow', 1);
insert into tribe (id_tribe, id_organization, name, status) values (5, 3, 'Crane, brolga', 0);
insert into tribe (id_tribe, id_organization, name, status) values (6, 1, 'Australian brush turkey', 0);

-- Repositories
insert into repository (id_repository, id_tribe, name, state, create_time, status) values (1, 5, 'Solarbreeze', 'D', '3/5/2023', 'A');
insert into repository (id_repository, id_tribe, name, state, create_time, status) values (2, 6, 'Alpha', 'D', '1/19/2023', 'A');
insert into repository (id_repository, id_tribe, name, state, create_time, status) values (3, 5, 'Aerified', 'D', '5/23/2023', 'I');
insert into repository (id_repository, id_tribe, name, state, create_time, status) values (4, 4, 'Trippledex', 'E', '12/19/2022', 'I');
insert into repository (id_repository, id_tribe, name, state, create_time, status) values (5, 3, 'Rank', 'E', '5/30/2023', 'A');
insert into repository (id_repository, id_tribe, name, state, create_time, status) values (6, 5, 'Voyatouch', 'D', '12/3/2022', 'A');
insert into repository (id_repository, id_tribe, name, state, create_time, status) values (7, 6, 'Rank', 'A', '4/21/2023', 'A');
insert into repository (id_repository, id_tribe, name, state, create_time, status) values (8, 1, 'Flowdesk', 'D', '1/3/2023', 'A');
insert into repository (id_repository, id_tribe, name, state, create_time, status) values (9, 1, 'Bitchip', 'D', '12/3/2022', 'A');
insert into repository (id_repository, id_tribe, name, state, create_time, status) values (10, 1, 'Flexidy', 'D', '1/9/2023', 'A');
insert into repository (id_repository, id_tribe, name, state, create_time, status) values (11, 6, 'Pannier', 'D', '3/27/2023', 'A');
insert into repository (id_repository, id_tribe, name, state, create_time, status) values (12, 4, 'Aerified', 'D', '2/9/2023', 'I');
insert into repository (id_repository, id_tribe, name, state, create_time, status) values (13, 6, 'Tempsoft', 'A', '6/11/2023', 'I');
insert into repository (id_repository, id_tribe, name, state, create_time, status) values (14, 6, 'Stringtough', 'D', '4/4/2023', 'I');
insert into repository (id_repository, id_tribe, name, state, create_time, status) values (15, 4, 'Voyatouch', 'D', '3/31/2023', 'A');
insert into repository (id_repository, id_tribe, name, state, create_time, status) values (16, 3, 'Otcom', 'E', '12/16/2022', 'I');
insert into repository (id_repository, id_tribe, name, state, create_time, status) values (17, 1, 'Home Ing', 'D', '1/19/2023', 'A');
insert into repository (id_repository, id_tribe, name, state, create_time, status) values (18, 4, 'Zamit', 'D', '1/26/2023', 'I');
insert into repository (id_repository, id_tribe, name, state, create_time, status) values (19, 6, 'Flexidy', 'D', '3/25/2023', 'A');
insert into repository (id_repository, id_tribe, name, state, create_time, status) values (20, 4, 'Span', 'D', '6/24/2023', 'A');
insert into repository (id_repository, id_tribe, name, state, create_time, status) values (21, 4, 'Zontrax', 'D', '12/6/2022', 'I');
insert into repository (id_repository, id_tribe, name, state, create_time, status) values (22, 5, 'Stronghold', 'E', '3/1/2023', 'A');
insert into repository (id_repository, id_tribe, name, state, create_time, status) values (23, 1, 'Pannier', 'E', '5/15/2023', 'I');
insert into repository (id_repository, id_tribe, name, state, create_time, status) values (24, 1, 'Sub-Ex', 'D', '3/2/2023', 'I');
insert into repository (id_repository, id_tribe, name, state, create_time, status) values (25, 2, 'Greenlam', 'D', '6/16/2023', 'A');
insert into repository (id_repository, id_tribe, name, state, create_time, status) values (26, 2, 'Tampflex', 'E', '6/24/2023', 'A');
insert into repository (id_repository, id_tribe, name, state, create_time, status) values (27, 5, 'Subin', 'D', '6/30/2023', 'I');
insert into repository (id_repository, id_tribe, name, state, create_time, status) values (28, 5, 'Kanlam', 'E', '1/13/2023', 'I');
insert into repository (id_repository, id_tribe, name, state, create_time, status) values (29, 1, 'Tresom', 'A', '1/14/2023', 'I');
insert into repository (id_repository, id_tribe, name, state, create_time, status) values (30, 1, 'Cardguard', 'A', '3/29/2023', 'A');

-- Metrics
insert into metrics (id_repository, coverage, bugs, vulnerabilities, hotspot, code_smells) values (1, 0.87, 82, 1, 41, 90);
insert into metrics (id_repository, coverage, bugs, vulnerabilities, hotspot, code_smells) values (2, 0.69, 98, 66, 83, 38);
insert into metrics (id_repository, coverage, bugs, vulnerabilities, hotspot, code_smells) values (3, 0.54, 7, 44, 49, 97);
insert into metrics (id_repository, coverage, bugs, vulnerabilities, hotspot, code_smells) values (4, 0.37, 23, 96, 17, 21);
insert into metrics (id_repository, coverage, bugs, vulnerabilities, hotspot, code_smells) values (5, 0.7, 54, 14, 57, 12);
insert into metrics (id_repository, coverage, bugs, vulnerabilities, hotspot, code_smells) values (6, 0.84, 76, 63, 38, 80);
insert into metrics (id_repository, coverage, bugs, vulnerabilities, hotspot, code_smells) values (7, 0.84, 71, 91, 17, 53);
insert into metrics (id_repository, coverage, bugs, vulnerabilities, hotspot, code_smells) values (8, 0.04, 93, 25, 97, 34);
insert into metrics (id_repository, coverage, bugs, vulnerabilities, hotspot, code_smells) values (9, 0.28, 97, 30, 27, 19);
insert into metrics (id_repository, coverage, bugs, vulnerabilities, hotspot, code_smells) values (10, 0.84, 33, 0, 7, 87);
insert into metrics (id_repository, coverage, bugs, vulnerabilities, hotspot, code_smells) values (11, 0.1, 58, 7, 77, 26);
insert into metrics (id_repository, coverage, bugs, vulnerabilities, hotspot, code_smells) values (12, 0.01, 58, 96, 24, 98);
insert into metrics (id_repository, coverage, bugs, vulnerabilities, hotspot, code_smells) values (13, 0.95, 42, 93, 23, 21);
insert into metrics (id_repository, coverage, bugs, vulnerabilities, hotspot, code_smells) values (14, 0.98, 26, 34, 61, 93);
insert into metrics (id_repository, coverage, bugs, vulnerabilities, hotspot, code_smells) values (15, 0.82, 36, 48, 25, 44);
insert into metrics (id_repository, coverage, bugs, vulnerabilities, hotspot, code_smells) values (16, 0.63, 50, 65, 49, 52);
insert into metrics (id_repository, coverage, bugs, vulnerabilities, hotspot, code_smells) values (17, 0.08, 52, 17, 72, 47);
insert into metrics (id_repository, coverage, bugs, vulnerabilities, hotspot, code_smells) values (18, 0.74, 4, 59, 5, 75);
insert into metrics (id_repository, coverage, bugs, vulnerabilities, hotspot, code_smells) values (19, 0.32, 31, 89, 82, 83);
insert into metrics (id_repository, coverage, bugs, vulnerabilities, hotspot, code_smells) values (20, 0.27, 30, 55, 30, 24);
insert into metrics (id_repository, coverage, bugs, vulnerabilities, hotspot, code_smells) values (21, 0.21, 21, 14, 83, 2);
insert into metrics (id_repository, coverage, bugs, vulnerabilities, hotspot, code_smells) values (22, 0.3, 3, 65, 68, 72);
insert into metrics (id_repository, coverage, bugs, vulnerabilities, hotspot, code_smells) values (23, 0.53, 3, 95, 31, 97);
insert into metrics (id_repository, coverage, bugs, vulnerabilities, hotspot, code_smells) values (24, 0.54, 87, 36, 76, 70);
insert into metrics (id_repository, coverage, bugs, vulnerabilities, hotspot, code_smells) values (25, 0.64, 79, 39, 52, 80);
insert into metrics (id_repository, coverage, bugs, vulnerabilities, hotspot, code_smells) values (26, 0.24, 30, 66, 64, 29);
insert into metrics (id_repository, coverage, bugs, vulnerabilities, hotspot, code_smells) values (27, 0.97, 28, 98, 28, 79);
insert into metrics (id_repository, coverage, bugs, vulnerabilities, hotspot, code_smells) values (28, 0.93, 91, 2, 81, 44);
insert into metrics (id_repository, coverage, bugs, vulnerabilities, hotspot, code_smells) values (29, 0.45, 37, 30, 10, 80);
insert into metrics (id_repository, coverage, bugs, vulnerabilities, hotspot, code_smells) values (30, 0.24, 34, 7, 72, 23);
