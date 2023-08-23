-- Exported from QuickDBD: https://www.quickdatabasediagrams.com/
-- Link to schema: https://app.quickdatabasediagrams.com/#/d/6xddPJ
-- NOTE! If you have used non-SQL datatypes in your design, you will have to change these here.



CREATE TABLE "Crash_Data" (
    "report_num" VARCHAR   NOT NULL,
    "report_type" VARCHAR   NOT NULL,
    "date_time" TIMESTAMP   NOT NULL,
    "weather" VARCHAR   NOT NULL,
    "light" VARCHAR   NOT NULL,
    "latitude" NUMERIC   NOT NULL,
    "longitude" NUMERIC   NOT NULL
);
SELECT * from "Crash_Data"

CREATE TABLE "Vehicle_Information" (
	"report_num" VARCHAR NOT NULL,
    "vehicle_id" VARCHAR   NOT NULL,
    "vehicle_damage" VARCHAR   NOT NULL,
    "body_type" VARCHAR,
    "year" INTEGER   NOT NULL,
    "make" VARCHAR   NOT NULL,
    "model" VARCHAR   NOT NULL   
);
select * FROM "Vehicle_Information"

CREATE TABLE "Driver" (
	"report_num" VARCHAR NOT NULL,
    "person_id" VARCHAR   NOT NULL,
    "substance_abuse" VARCHAR   NOT NULL,
    "injury_severity" VARCHAR   NOT NULL
);
select * FROM "Driver" 

drop table "Driver"
drop table "Vehicle_Information"
drop table "Crash_Data"

