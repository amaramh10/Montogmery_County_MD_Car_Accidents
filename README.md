# Car_Accident_Areas
## Project Proposal: Interactive Car Crash Map
### Created by:
#### Amary Henry, Brandon Loredo, Christina LaManna, Kady Epley

### Project Overview:
#### We propose to develop an interactive web-based map that visualizes and analyzes car crash data in Montgomery County, Maryland, for July 2023. This map will allow users to explore car crash incidents across different hours of the day by dragging a cursor across the timeline. By providing insights into the frequency, locations, timing, and types of car crashes, the map aims to raise public awareness, enhance road safety measures, and facilitate data-informed decisions.

### Project Features:
#### Time Slider Navigation: The map will feature a timeline slider that users can drag to explore car crash incidents throughout a specific month. The slider will allow users to select different time intervals, such as one-hour periods (e.g., 1-2 pm, 2-3 pm), enabling them to analyze crash patterns during specific times of the day.

#### Spatial Visualization: Car crash incidents will be displayed on the map using icons or markers. Each marker's color or icon will represent the crash severity or type, such as injury crashes, PDO (Property Damage Option) crashes, and others. Users can click on markers to access detailed information about each crash.

#### Hourly Breakdown: The timeline slider will provide a visual breakdown of car crashes during different hours of the day. As users drag the cursor across the timeline, the map will update to display crash incidents for the selected time interval.

#### Filter and Search: Users can filter and search for specific types of crashes, locations, or other criteria to focus on relevant data. This feature enhances user interaction and customization of the displayed information.

#### Statistical Insights: The map may include statistical visualizations, such as graphs or charts, that highlight trends and patterns in car crash data over the selected month. This will provide users with additional insights for analysis.

### Data Source:
#### The car crash data will be sourced from the "Crash Reporting - Incidents Data" dataset provided by Montgomery County, Maryland. This dataset contains detailed information about each reported car crash, including date, time, location, crash type, road conditions, and more. The dataset will be used to populate the interactive map.
##### https://data.montgomerycountymd.gov/api/views/mmzv-x632/rows.json?accessType=DOWNLOAD

### Technology Stack:
#### HTML, CSS, and JavaScript for the frontend interface and user interaction.
#### Data visualization libraries for presenting statistical insights.
##### Libraries:
###### Leaflet: will be utilized for creating interactive maps and markers.
###### CesiumJS (3d, 2, 2.5d Columbus View): will be used to show topographical and hot spots of accidents. 
#### Other Visualization: ECharts.apache.org (https://echarts.apache.org/examples/en/editor.html?c=scatter-single-axis)
##### Will be used to visualize the hourly accidents per hour each day of the week. 

### Expected Impact:
#### This interactive car crash map will serve as a valuable resource for both the general public and local authorities. It will promote road safety awareness, inform drivers about high-risk areas and times, and facilitate data-driven decision-making by local law enforcement and traffic management authorities. By providing real-time insights into car crash incidents, the map aims to contribute to reducing car crashes and improving overall road safety in Montgomery County.

### Conclusion:
#### The proposed interactive car crash map will provide a user-friendly platform for visualizing and understanding car crash data in Montgomery County. By leveraging real-time data and advanced visualization techniques, this map aims to raise awareness, enhance road safety, and contribute to informed decision-making in the community.

