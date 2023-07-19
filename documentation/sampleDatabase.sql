CREATE DATABASE globant_intro_test;
-- Switch to the newly created database
\ c globant_intro_test;
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
INSERT INTO organization (name, status)
VALUES ('ABC Company', 1);
INSERT INTO tribe (id_organization, name, status)
VALUES (1, 'Development', 1);
INSERT INTO repository (id_tribe, name, state, create_time, status)
VALUES (1, 'Project X', 'A', NOW(), 'A');
INSERT INTO metrics (
        id_repository,
        coverage,
        bugs,
        vulnerabilities,
        hotspot,
        code_smells
    )
VALUES (1, 0.85, 10, 3, 5, 7);
insert into organization (name, status)
values ('Edgewire', 0);
insert into organization (name, status)
values ('Yabox', 1);
insert into organization (name, status)
values ('Jaxnation', 1);
insert into tribe (id_organization, name, status)
values (1, 'Dromedary camel', 0);
insert into tribe (id_organization, name, status)
values (2, 'Porcupine, north american', 1);
insert into tribe (id_organization, name, status)
values (2, 'White-throated robin', 0);
insert into tribe (id_organization, name, status)
values (2, 'Egyptian goose', 1);
insert into tribe (id_organization, name, status)
values (1, 'Common brushtail possum', 0);
insert into tribe (id_organization, name, status)
values (3, 'Deer, black-tailed', 1);
insert into tribe (id_organization, name, status)
values (3, 'Sally lightfoot crab', 0);
insert into tribe (id_organization, name, status)
values (3, 'Horned puffin', 0);
insert into repository (id_tribe, name, state, create_time, status)
values (11, 'Williamson-Kris', 'E', '5/19/2021', 'I');
insert into repository (id_tribe, name, state, create_time, status)
values (
        9,
        'Runte, OKeefe and Schimmel',
        'E',
        '8/8/2007',
        'A'
    );
insert into repository (id_tribe, name, state, create_time, status)
values (1, 'Flatley Inc', 'E', '11/20/2017', 'A');
insert into repository (id_tribe, name, state, create_time, status)
values (8, 'Hansen LLC', 'E', '9/23/2003', 'A');
insert into repository (id_tribe, name, state, create_time, status)
values (
        8,
        'Ankunding, Zulauf and Jakubowski',
        'A',
        '6/30/2010',
        'A'
    );
insert into repository (id_tribe, name, state, create_time, status)
values (
        10,
        'Bailey, Vandervort and Ritchie',
        'E',
        '10/24/2006',
        'A'
    );
insert into repository (id_tribe, name, state, create_time, status)
values (
        11,
        'Schmidt, Mohr and Auer',
        'D',
        '6/28/2007',
        'A'
    );
insert into repository (id_tribe, name, state, create_time, status)
values (9, 'Yundt-Gusikowski', 'D', '12/7/2009', 'A');
insert into metrics (
        id_repository,
        coverage,
        bugs,
        vulnerabilities,
        hotspot,
        code_smells
    )
values (1, 0.96, 7, 13, 6, 4);
insert into metrics (
        id_repository,
        coverage,
        bugs,
        vulnerabilities,
        hotspot,
        code_smells
    )
values (2, 0.68, 9, 11, 9, 16);
insert into metrics (
        id_repository,
        coverage,
        bugs,
        vulnerabilities,
        hotspot,
        code_smells
    )
values (3, 0.12, 2, 19, 12, 6);
insert into metrics (
        id_repository,
        coverage,
        bugs,
        vulnerabilities,
        hotspot,
        code_smells
    )
values (4, 0.61, 19, 2, 12, 13);
insert into metrics (
        id_repository,
        coverage,
        bugs,
        vulnerabilities,
        hotspot,
        code_smells
    )
values (5, 0.34, 4, 10, 18, 9);
insert into metrics (
        id_repository,
        coverage,
        bugs,
        vulnerabilities,
        hotspot,
        code_smells
    )
values (6, 0.47, 0, 2, 10, 6);
insert into metrics (
        id_repository,
        coverage,
        bugs,
        vulnerabilities,
        hotspot,
        code_smells
    )
values (7, 0.76, 4, 0, 14, 19);
insert into metrics (
        id_repository,
        coverage,
        bugs,
        vulnerabilities,
        hotspot,
        code_smells
    )
values (8, 0.19, 13, 19, 14, 14);