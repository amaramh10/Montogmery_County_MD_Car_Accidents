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

# updated/refined geomap
@app.route("/optimized_geomap")
def optimized_geomap():
    conn = psycopg2.connect(database="car_crash", user="postgres",
                        password="postgres", host="localhost", port="5432")
    cur = conn.cursor()
    cur.execute('''SELECT * FROM "Optimized_Data";''')
    refined_data = cur.fetchall()
    cur.close()
    conn.close()

    refined_list = []
    for item in refined_data:
        refined_list.append({
            "Date & Time": item[0],
            "Weather": item[1],
            "Latitude": item[2],
            "Longitude": item[3],
            "Vehicle Damage": item[4],
            "Year": item[5],
            "Make": item[6],
            "Model": item[7],
            "Substance Abuse": item[8],
            "Injury Severity": item[9]
        })
    return jsonify(refined_list)





# ROUTE FOR bubble PLOT using only crash_data
@app.route("/bubble")
def bubble():
    conn = psycopg2.connect(database="car_crash", user="postgres",
                        password="postgres", host="localhost", port="5432")
# create a cursor
    cur = conn.cursor()
# connect tables.
    cur.execute('''SELECT * FROM "bubble_data";''')
    bubble_data = cur.fetchall()
    cur.close()
    conn.close()
    bubblelist = []
    for item in bubble_data:
        bubblelist.append([
            item[0],
            item[1],
            item[2]
        ])
    # return render_template('index.html', data=data)
    return jsonify(bubblelist)



# ROUTE FOR LINE PLOT USING ONLY CRASH DATA
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

