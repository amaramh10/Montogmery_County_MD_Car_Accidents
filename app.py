from flask import Flask, render_template, jsonify
import psycopg2

app = Flask(__name__)

#Route to produce your main home page. 
#Feel free to add additional HTML routes to add additional pages
@app.route("/")
def index(): 
   return render_template("index.html")

@app.route("/scatter")
def scatter(): 
    conn = psycopg2.connect(database="car_crash", user="postgres",
                        password="postgres", host="localhost", port="5432")
  
# create a cursor
    cur = conn.cursor()
    
# if you already have any table or not id doesnt matter this 
# will create a products table for you.
    cur.execute('''SELECT * FROM "Crash_Data";''')
    data = cur.fetchall()
    cur.close()
    conn.close()
    # return render_template('index.html', data=data)
    return jsonify(data)
   
# define the variable ^
@app.route("/line")
def line(): 
   return jsonify(line_Data)
# define above
# Connect to the database


if __name__ == "__main__":
    app.run(debug=True)

