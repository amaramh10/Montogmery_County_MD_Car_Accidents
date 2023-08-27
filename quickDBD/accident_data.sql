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

CREATE TABLE "Optimized_Data" (
	"date_time" VARCHAR NOT NULL,
	"weather" VARCHAR NOT NULL,
	"latitude" NUMERIC NOT NULL,
	"longitude" NUMERIC NOT NULL,
	"vehicle_damage" VARCHAR NOT NULL,
	"year" INTEGER NOT NULL,
	"make" VARCHAR NOT NULL,
	"model" VARCHAR NOT NULL,
	"substance_abuse" VARCHAR NOT NULL,
	"injury_severity" VARCHAR NOT NULL
);

CREATE TABLE bubble_data AS
SELECT
    EXTRACT(DOW FROM date_time) AS day_numeric,
    EXTRACT(HOUR FROM date_time) AS hour,
    CASE
        WHEN EXTRACT(DOW FROM date_time) IS NOT NULL THEN 1
        ELSE 0
    END AS new_column
FROM
    "Crash_Data";
	
ALTER TABLE bubble_data
	RENAME COLUMN new_column TO accident_count;
	
SELECT * FROM "bubble_data";

select * from "Optimized_Data"
select * FROM "Driver" 

drop table "Driver"
drop table "Vehicle_Information"
drop table "Crash_Data"

