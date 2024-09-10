## Setting up and running the app ##

1. Since this is a frontend app with CRUD operations, hence it needs server (or localStorage), for which I've used json-server which needs to be downloaded
   to test the app's CRUD operations.

*Install the json-server* :  
 npm install -g json-server

*Run the json-server (i've used PORT = 8080)* : 
 json-server --watch db.json --port 8080

*Run the application* : 
 npm run dev

2. I've used db.json as database here to store and manipulate the data which needs to be connected to the json-server

3. Apart from "CRUD" operation, I've also included sorting and filtering functionalities to enhance the app.

4. I've used redux and react-redux for the overall state management and extensively used react-based Chakra UI for designing the UI.

5. As you can see, there's a backend folder so that in future if asked, I can also create backend using express and can use MongoDB as database to convert it into MERN full-stack app.