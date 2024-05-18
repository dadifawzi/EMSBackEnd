const User = require('../model/user.model'); 
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');




//create admin account
const createAdminAccount = async()=>{

let admin ={
    fullname : process.env.fullname,
    email : process.env.email,
    password:process.env.password,
    tel:process.env.tel,
    image:process.env.image,
    tag:process.env.tag,
    role:process.env.role,
    date:new Date()
}

let adminExist = await User.findOne({role:'admin'}) ; 
if(adminExist){
console.log('admin exist'); 
}
else{
console.log('admin does not exist!');
     try {
    const hashedpassword = await bcrypt.hash(admin.password,10)
        let user = new User({...admin , 
             password:hashedpassword ,
            });
        await user.save();
        
        
    } catch (error) {
        console.log(error);
    }
}



};


//SignIn 
const signIn = async (req, res) => {
    try {
        const { email, password } = req.body;
console.log('email:'+email);
console.log('password: '+password);
        const user = await User.findOne({ email: email });
        if(!user){
           return res.status(401).send('oops email or password invalid');
        }   

        const valid = bcrypt.compareSync( password, user.password );

        if(!valid){
            return res.status(401).send('oops 2 email or password invalid');
        }

        let payload = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            tel: user.tel,
            image: user.image,
            role: user.role,
            tag: user.tag,
            date: user.date
        }

        let token = jwt.sign( payload, process.env.SECRET_KEY );
        res.status(200).send({ myToken: token });

    } catch (error) {
        res.status(500).send(error)
    }
};


// Create a new user
const createUser = async (req, res ) => {
let data = req.body ; 

const imageuploaded = req.file ? req.file.filename : null;
const userExists = await User.findOne({ email:data.email });

if (userExists) {
    console.log('User exists!');
    res.status(400).send('user exist');
} else {
    console.log('User does not exist!');
     try {
    const hashedpassword = await bcrypt.hash(data.password,10); 
   // const tags =JSON.parse(data.tags) ; 
        const user = new User({...data , 
             password:hashedpassword ,
             image:imageuploaded,
             //tags:tags,
             date : new Date()
            });
        await user.save();
        res.status(200).send(user);
    } catch (error) {
        res.status(400).send(error);
    }
}
   
};

// Get all users
const getUsers = async (req, res) => {
    try {
        const users = await User.find({deleted:false});
        res.send(users);
    } catch (error) {
        res.status(500).send();
    }
};

// Get user by ID
const getUserById = async (req, res) => {
    const _id = req.params.id;

    try {
        const user = await User.findById({ _id: req.params.id }, { password: 0 });
        if (!user) {
            return res.status(404).send();
        }
        res.send(user);
    } catch (error) {
        res.status(500).send();
    }
};

// Update user by ID
const updateUserById = async (req, res , fileName) => {
    
 try {
        
        let id = req.params.id;
        let data = req.body;
      //  data.tags = JSON.parse(data.tags);

        if(fileName.length > 0){
            data.image = fileName;
        }

        if(data.password){
            data.password = bcrypt.hashSync(data.password, 10);
        }

        let updatedUser = await User.findByIdAndUpdate({_id: id},data);
        
        res.status(200).send(updatedUser);


    } catch (error) {
        res.status(500).send(error)
    }

};

// Delete user by ID
const deleteUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        let id = req.params.id ; 
        if (!user) {
            return res.status(404).send();
            console.log("no user found");
        }else{
            user.deleted = true ; 
            let deleteduser = await User.findByIdAndUpdate({_id: id},user);
            console.log("user deleted ");
            res.send(deleteduser);
        }
      
    } catch (error) {
        res.status(500).send();
    }
};

module.exports = {
    signIn,
    createUser,
    getUsers,
    getUserById,
    updateUserById,
    deleteUserById,
    createAdminAccount
};
