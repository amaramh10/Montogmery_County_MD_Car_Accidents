from flask import Flask, render_template, jsonify
import psycopg2

app = Flask(__name__)

#Route to produce your main home page. 
#Feel free to add additional HTML routes to add additional pages
# DONT TOUCH THIS ONE
@app.route("/")
def index(): 
   return render_template("index.html")



# ROUTE FOR GEO MAP
@app.route("/geomap")
def geomap():
    conn = psycopg2.connect(database="car_crash", user="postgres",
                        password="postgres", host="localhost", port="5432")
# create a cursor
    cur = conn.cursor()
# connect table.
    cur.execute('''SELECT * FROM "Crash_Data" LEFT JOIN "Vehicle_Information" ON "Crash_Data".report_num = "Vehicle_Information".report_num LEFT JOIN "Driver" ON "Crash_Data".report_num = "Driver".report_num;''')
    map_data = cur.fetchall()
    cur.close()
    conn.close()
    # return render_template('index.html', data=data)
    return jsonify(map_data)




# ROUTE FOR bubble PLOT using only crash_data
@app.route("/bubble")
def bubble(): 
    conn = psycopg2.connect(database="car_crash", user="postgres",
                        password="postgres", host="localhost", port="5432")
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
   



# ROUTE FOR LINE PLOT
@app.route("/line")
def line(): 
    conn = psycopg2.connect(database="car_crash", user="postgres",
                        password="postgres", host="localhost", port="5432")
# create a cursor
    cur = conn.cursor()
# connect tables.
    cur.execute('''SELECT * FROM "Crash_Data";''')
    line_data = cur.fetchall()
    cur.close()
    conn.close()
    # return render_template('index.html', data=data)
    return jsonify(line_data)



# Connect to the database


if __name__ == "__main__":
    app.run(debug=True)

