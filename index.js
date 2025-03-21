const mongoose = require('mongoose');
const express = require('express');
const app = express();
const cors = require('cors');
const Path = require('path');


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static(Path.join(__dirname, `../dream`)))

app.use(cors());

mongoose.connect('mongodb+srv://sawalarora20:Supersawal@cluster0.dtd4w.mongodb.net/theskillboost?retryWrites=true&w=majority')
    .then(() => console.log("connected"))
    .catch((err) => console.log(err));

const UserSchema = new mongoose.Schema({
    Name: String,
    Email: String,
    Contact: String,
    Qualification: String,
    Course: String,
    Date:String

});

const UserModel = mongoose.model("user", UserSchema);

app.get('/', (req, res) => {
    res.sendFile(Path.join(__dirname, '../dream'));
});
app.use(express.static('../dream'));



// app.get('/admin', (req, res) => {
//     res.sendFile(Path.join(__dirname, '../dream/form.html'));
// });
app.get('/dashboard', (req, res) => {

    UserModel.find({})
        .then((data) => {
            res.json(data)
        })
        .catch((err) => console.log(err))
});



app.post('/create', (req, res) => {

    const { Name, Email, Contact, Qualification, Course, Date } = req.body;

    UserModel.create({ Name, Email, Contact, Qualification, Course,Date })
        .then((data) => {
            // res.json(data);
            res.redirect('https://www.theskillboost.com/');
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error creating user.');
        });
});

app.delete('/delete/:id', (req, res) => {
    const id = req.params.id;
    console.log("Deleting user with ID:", id);


    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'Invalid ObjectId' });
    }

    UserModel.findByIdAndDelete(id)
        .then(response => {
            if (!response) {
                return res.status(404).json({ error: 'User not found' });
            }

            res.json({ message: 'User deleted successfully', user: response });
        })
        .catch(err => {
            console.error('Error deleting user:', err);
            res.status(500).json({ error: 'An error occurred while deleting the user' });
        });
});


const UserSchema1 = new mongoose.Schema({
    Name: String,
    email: String,
    Number: String,
    Message: String,
    Subject: String,
    Date: String

});

const UserModel1 = mongoose.model("query", UserSchema1);


app.get('/dashboard1', (req, res) => {

    UserModel1.find({})
        .then((data) => {
            res.json(data)
        })
        .catch((err) => console.log(err))
});



app.post('/create1', (req, res) => {
    const { Name, email, Number, Message, Subject, Date } = req.body;

    UserModel1.create({ Name, email, Number, Message, Subject,Date })
        .then((data) => {
            res.redirect('https://www.theskillboost.com/contact');
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error creating user.');
        });
});



app.delete('/delete1/:id', (req, res) => {
    const id = req.params.id;
    console.log("Deleting user with ID:", id);


    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'Invalid ObjectId' });
    }

    UserModel1.findByIdAndDelete(id)
        .then(response => {
            if (!response) {
                return res.status(404).json({ error: 'User not found' });
            }

            res.json({ message: 'User deleted successfully', user: response });
        })
        .catch(err => {
            console.error('Error deleting user:', err);
            res.status(500).json({ error: 'An error occurred while deleting the user' });
        });
});
const BlogSchema = new mongoose.Schema({
    Title: String,
    Description: String,
    Date: String,
    Description1: String,
    Slug: { type: String, unique: true }  // Slug field for unique URLs
});



const BlogModel = mongoose.model("Blogs", BlogSchema);

app.post("/createblog", (req, res) => {
    const { Title, Description, Date, Description1, Slug } = req.body;
    BlogModel.create({ Title, Description, Description1, Date, Slug })
        .then((blog) => {
            // res.status(201).json(blog);
            res.redirect('https://www.theskillboost.com/contact');
            
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({ message: "Error creating blog", error: err });
        });
});

// Fetch all blogs
app.get("/show", (req, res) => {
    BlogModel.find({})
        .then((blogs) => {
            res.json(blogs);  // Return all blogs
        })
        .catch((err) => res.json(err));
});

app.delete('/deletee/:id', (req, res) => {
    const id = req.params.id;
    console.log("Deleting user with ID:", id);


    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'Invalid ObjectId' });
    }

    BlogModel.findByIdAndDelete(id)
        .then(response => {
            if (!response) {
                return res.status(404).json({ error: 'User not found' });
            }

            res.json({ message: 'User deleted successfully', user: response });
        })
        .catch(err => {
            console.error('Error deleting user:', err);
            res.status(500).json({ error: 'An error occurred while deleting the user' });
        });
});
app.get("/blog/:slug", (req, res) => {
    const { slug } = req.params;
    BlogModel.findOne({ Slug: slug })
        .then((blog) => {
            if (blog) {
                res.json(blog); 
            } else {
                res.status(404).json({ message: "Blog not found" });
            }
        })
        .catch((err) => res.status(500).json({ message: "Error fetching blog", error: err }));
});








// get advice



const adviceSchema = new mongoose.Schema({
    Name: String,
    Phone: String,
    Course: String

});

const Advicemodel = mongoose.model("advice", adviceSchema);


app.post('/advice', (req, res) => {
    const { Name, Phone, Course } = req.body;

    console.log(req.body)

    Advicemodel.create({ Name,Phone,Course })
        .then((data) => {
            res.redirect('https://www.theskillboost.com/');
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error creating user.');
        });
});



app.get("/advicedata",(req,res)=>{
    Advicemodel.find({})
    .then((data) => {
        res.json(data);  // Return all data
    })
    .catch((err) => res.json(err));
})





app.listen(8081);
