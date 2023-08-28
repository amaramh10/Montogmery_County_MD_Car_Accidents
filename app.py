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



# ROUTES FOR LINE PLOT USING ONLY CRASH DATA

# ROUTE FOR WEEK ONE DATA
@app.route("/week_one")
def line_1(): 
    conn = psycopg2.connect(database="car_crash", user="postgres",
                        password="postgres", host="localhost", port="5432")
# Create a cursor
    cur = conn.cursor()
# Connect to table for week one of accident data
    cur.execute('''SELECT * FROM "week_one_totals";''')
    week_one_data = cur.fetchall()
    cur.close()
    conn.close()

    week_one_list = []
    for item in week_one_data:
        week_one_list.append({
            "date_only": item[0],
            "accident_count": item[1]
        })
    # Return render_template('index.html', data=data)
    return jsonify(week_one_list)

# ROUTE FOR WEEK TWO DATA
@app.route("/week_two")
def line_2(): 
    conn = psycopg2.connect(database="car_crash", user="postgres",
                        password="postgres", host="localhost", port="5432")
# Create a cursor
    cur = conn.cursor()
# Connect to table for week two of accident data
    cur.execute('''SELECT * FROM "week_two_totals";''')
    week_two_data = cur.fetchall()
    cur.close()
    conn.close()

    week_two_list = []
    for item in week_two_data:
        week_two_list.append({
            "date_only": item[0],
            "accident_count": item[1]
        })
    # Return render_template('index.html', data=data)
    return jsonify(week_two_list)

# ROUTE FOR WEEK THREE DATA
@app.route("/week_three")
def line_3(): 
    conn = psycopg2.connect(database="car_crash", user="postgres",
                        password="postgres", host="localhost", port="5432")
# Create a cursor
    cur = conn.cursor()
# Connect to table for week three of accident data
    cur.execute('''SELECT * FROM "week_three_totals";''')
    week_three_data = cur.fetchall()
    cur.close()
    conn.close()

    week_three_list = []
    for item in week_three_data:
        week_three_list.append({
            "date_only": item[0],
            "accident_count": item[1]
        })
    # Return render_template('index.html', data=data)
    return jsonify(week_three_list)

# ROUTE FOR WEEK FOUR DATA
@app.route("/week_four")
def line_4(): 
    conn = psycopg2.connect(database="car_crash", user="postgres",
                        password="postgres", host="localhost", port="5432")
# Create a cursor
    cur = conn.cursor()
# Connect to table for week four of accident data
    cur.execute('''SELECT * FROM "week_four_totals";''')
    week_four_data = cur.fetchall()
    cur.close()
    conn.close()

    week_four_list = []
    for item in week_four_data:
        week_four_list.append({
            "date_only": item[0],
            "accident_count": item[1]
        })
    # Return render_template('index.html', data=data)
    return jsonify(week_four_list)

# Connect to the database


if __name__ == "__main__":
    app.run(debug=True)