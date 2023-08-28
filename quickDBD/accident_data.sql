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

-- Week One Total Accidents by Day Table
CREATE TABLE week_one_totals AS
SELECT
  DATE(date_time) AS date_only,
  SUM(CASE WHEN EXTRACT(DAY FROM date_time) IS NOT NULL THEN 1 ELSE 0 END) AS new_column
FROM "Crash_Data"
WHERE date_time BETWEEN '2023-07-02 00:00:00' AND '2023-07-08 23:59:59'
GROUP BY date_only
ORDER BY date_only ASC;
ALTER TABLE week_one_totals
    RENAME COLUMN new_column TO accident_count;
SELECT * FROM "week_one_totals";
---------------------------------------------------
-- Week Two Total Accidents by Day Table
CREATE TABLE week_two_totals AS
SELECT
  DATE(date_time) AS date_only,
  SUM(CASE WHEN EXTRACT(DAY FROM date_time) IS NOT NULL THEN 1 ELSE 0 END) AS new_column
FROM "Crash_Data"
WHERE date_time BETWEEN '2023-07-09 00:00:00' AND '2023-07-15 23:59:59'
GROUP BY date_only
ORDER BY date_only ASC;
ALTER TABLE week_two_totals
    RENAME COLUMN new_column TO accident_count;
SELECT * FROM "week_two_totals";
---------------------------------------------------
-- Week Three Total Accidents by Day Table
CREATE TABLE week_three_totals AS
SELECT
  DATE(date_time) AS date_only,
  SUM(CASE WHEN EXTRACT(DAY FROM date_time) IS NOT NULL THEN 1 ELSE 0 END) AS new_column
FROM "Crash_Data"
WHERE date_time BETWEEN '2023-07-16 00:00:00' AND '2023-07-22 23:59:59'
GROUP BY date_only
ORDER BY date_only ASC;
ALTER TABLE week_three_totals
    RENAME COLUMN new_column TO accident_count;
SELECT * FROM "week_three_totals";
---------------------------------------------------
-- Week Four Total Accidents by Day Table
CREATE TABLE week_four_totals AS
SELECT
  DATE(date_time) AS date_only,
  SUM(CASE WHEN EXTRACT(DAY FROM date_time) IS NOT NULL THEN 1 ELSE 0 END) AS new_column
FROM "Crash_Data"
WHERE date_time BETWEEN '2023-07-23 00:00:00' AND '2023-07-29 23:59:59'
GROUP BY date_only
ORDER BY date_only ASC;
ALTER TABLE week_four_totals
    RENAME COLUMN new_column TO accident_count;
SELECT * FROM "week_four_totals";
