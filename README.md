Backend

Dependecies: Python Flask, MySQL

Database used: MySQL with SQLAlchemy
    -The Database consists of two table 'todo' and 'puser'
    -todo schema:
            "
          
            
            id = db.Column(db.Integer, primary_key=True)
            username = db.Column(db.String(100))
            title = db.Column(db.String(100))
            description = db.Column(db.String(200))
            timestamp = db.Column(db.DateTime)
            image_path = db.Column(db.String(200))
            "


            
    -puser schema:
            '    
            username = db.Column(db.String(200))
            premium = db.Column(db.String(200))
            '

Used Python Flask for creation of Backend Server
Steps to run Server:

Step 1: Open the folder using cmd or teminal
Step 2: cd ./Server
Step 3:Run the command flask run
        it will start the flask app in localhost

Frontend
    Used react to create the frontend

    Dependencies: Node.js, Running Flask API Server,

Steps to Run the frontend application

Step 1:
        Opne the main folder into cmd or terminal
Step 2:
        Cd ./ToDoWeb
Step 3:
        run the command 'npm install'
step 4: 
        run the command 'npm run dev'
