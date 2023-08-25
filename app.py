from flask import Flask, render_template, jsonify
import psycopg2

app = Flask(__name__)

#Route to produce your main home page. 
#Feel free to add additional HTML routes to add additional pages

# DONT TOUCH THIS ONE
@app.route("/")
def index(): 
   return render_template("index.html")
# ^DON'T TOUCH THIS ONE^


# ROUTE FOR GEO MAP
@app.route("/geomap")
def geomap():
    conn = psycopg2.connect(database="car_accident_areas", user="postgres",
                        password="postgres", host="localhost", port="5433")
# create a cursor
    cur = conn.cursor()
# connect table.
    cur.execute('''SELECT * FROM "Crash_Data" LEFT JOIN "Vehicle_Information" ON "Crash_Data".report_num = "Vehicle_Information".report_num LEFT JOIN "Driver" ON "Crash_Data".report_num = "Driver".report_num;''')
    map_data = cur.fetchall()
    cur.close()
    conn.close()

    map_list = []
    for item in map_data:
        map_list.append({
            "Report Number": item[0],
            "Report Type": item[1],
            "Date & Time": item[2],
            "Weather": item[3],
            "Light": item[4],
            "Latitude": item[5],
            "Longitude": item[6],
            "Report Number": item[7],
            "Vehicle_ID": item[8],
            "Vehicle Damage": item[9],
            "Body Type": item[10],
            "Year": item[11],
            "Make": item[12],
            "Model": item[13],
            "Report Number": item[14],
            "SubstanceAbuse": item[15],
            "Person_ID": item[16],
            "Injury Severity": item[17]
        })
    # return render_template('index.html', data=data)
    return jsonify(map_list)




# ROUTE FOR bubble PLOT using only crash_data
@app.route("/bubble")
def bubble(): 
    conn = psycopg2.connect(database="car_accident_areas", user="postgres",
                        password="postgres", host="localhost", port="5433")
# create a cursor
    cur = conn.cursor()
# connect tables.
    cur.execute('''SELECT * FROM "Crash_Data";''')
    bubble_data = cur.fetchall()
    cur.close()
    conn.close()

    bubblelist = []
    for item in bubble_data:
        bubblelist.append({
            "Report Number": item[0],
            "Report Type": item[1],
            "Date & Time": item[2],
            "Weather": item[3],
            "Light": item[4],
            "Latitude": item[5],
            "Longitude": item[6]
        })
    # return render_template('index.html', data=data)
    return jsonify(bubblelist)
   



# ROUTE FOR LINE PLOT USING ONLY CRASH DATA
@app.route("/line")
def line(): 
    conn = psycopg2.connect(database="car_accident_areas", user="postgres",
                        password="postgres", host="localhost", port="5433")
# create a cursor
    cur = conn.cursor()
# connect tables.
    cur.execute('''SELECT * FROM "Crash_Data";''')
    line_data = cur.fetchall()
    cur.close()
    conn.close()

    line_list = []
    for item in line_data:
        line_list.append({
            "Report Number": item[0],
            "Report Type": item[1],
            "Date & Time": item[2],
            "Weather": item[3],
            "Light": item[4],
            "Latitude": item[5],
            "Longitude": item[6]
        })
    # return render_template('index.html', data=data)
    return jsonify(line_list)



# Connect to the database


if __name__ == "__main__":
    app.run(debug=True)