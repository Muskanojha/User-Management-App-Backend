const userModel = require("../models/userModel");
const {
  isValid,
  isValidName,
  isValidEmail,
  isValidPhone,
} = require("./validation");
const mongoose = require("mongoose");

//Add Users
const addUser = async (req, res) => {
  try {
    let userData = req.body;

    if (Object.keys(userData).length === 0) {
      return res.status(400).json({ msg: "Bad Request, No Data Provided" });
    }

    const { userName, userEmail, userContact, userAddress, gender, age } =
      userData;

    //User Name Validation
    if (!isValid(userName)) {
      return res.status(400).json({ msg: "User Name is required" });
    }

    if (!isValidName(userName)) {
      return res.status(400).json({ msg: "Invalid User Name" });
    }

    //User Email Validation
    if (!isValid(userEmail)) {
      return res.status(400).json({ msg: "User Email is required" });
    }

    if (!isValidEmail(userEmail)) {
      return res.status(400).json({ msg: "Invalid User Email" });
    }

    let duplicateEmail = await userModel.findOne({ userEmail });
    if (duplicateEmail) {
      return res.status(400).json({ mg: "Email Already Exists" });
    }

    //User Contact Validation
    if (!isValid(userContact)) {
      return res.status(400).json({ msg: "User Contact is required" });
    }

    if (!isValidPhone(userContact)) {
      return res.status(400).json({ msg: "Invalid User Contact" });
    }

    let duplicateContact = await userModel.findOne({ userContact });
    if (duplicateContact) {
      return res.status(400).json({ mg: "Contact Already Exists" });
    }

    //User Address Validation
    if (!isValid(userAddress)) {
      return res.status(400).json({ msg: "User Address is required" });
    }

    //User Gender Validation
    if (!isValid(gender)) {
      return res.status(400).json({ msg: "User Gender is required" });
    }

    //User Age Validation
    if (!isValid(age)) {
      return res.status(400).json({ msg: "User Age is required" });
    }

    let user = await userModel.create(userData);
    return res.status(200).json({ msg: "User Data Added Successfully", user });
  } catch (error) {
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

// Fetch User Data
const getUserData = async (req, res) => {
  try {
    let UserData = await userModel.find();
    return res.status(200).json(UserData);
  } catch (error) {
    console.error("Error fetching user data:", error);
    return res.status(500).json({ msg: "Internal server error" });
  }
};

// Update User Data
const updateUserData = async (req, res) => {
  try {
    let userId = req.params.id;
    let data = req.body;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ msg: "Invalid User Id" });
    }

    const { userName, userEmail, userContact, userAddress, gender, age } =
     data;
    //Validation userName
    if (userName !== undefined) {
      if (!isValid(userName)) {
        return res.status(400).json({ msg: "User Name is required" });
      }

      if (!isValidName(userName)) {
        return res.status(400).json({ msg: "Invalid User Name" });
      }
    }

    //validation userEmail
    if (userEmail !== undefined) {
      if (!isValid(userEmail)) {
        return res.status(400).json({ msg: "User Email is required" });
      }

      if (!isValidEmail(userEmail)) {
        return res.status(400).json({ msg: "Invalid User Email" });
      }
      let duplicateEmail = await userModel.findOne({ userEmail });
      if (duplicateEmail) {
        return res.status(400).json({ mg: "Email Already Exists" });
      }
    }

    //validaiton userContact
    if (userContact !== undefined) {
      if (!isValid(userContact)) {
        return res.status(400).json({ msg: "User Contact is required" });
      }

      if (!isValidPhone(userContact)) {
        return res.status(400).json({ msg: "Invalid User Contact" });
      }

      let duplicateContact = await userModel.findOne({ userContact });
      if (duplicateContact) {
        return res.status(400).json({ mg: "Contact Already Exists" });
      }
    }

    //validation userAddress
    if (userAddress !== undefined) {
      if (!isValid(userAddress)) {
        return res.status(400).json({ msg: "User Address is required" });
      }
    }

    //validation gender
    if (gender !== undefined) {
      if (!isValid(gender)) {
        return res.status(400).json({ msg: "User Gender is required" });
      }
    }

    //validation age
    if (age !== undefined) {
      if (!isValid(age)) {
        return res.status(400).json({ msg: "User Age is required" });
      }
    }
    const update = await userModel.findByIdAndUpdate(userId, data, {
      new: true,
    });

    return res.status(200).json({ msg: "User Updated successfully", update });
  } catch (error) {
    return res.status(200).json({ msg: "Internal server error", error });
  }
};

//Delete User Data
const deleteUserData = async (req, res) => {
  try {
    let userId = req.params.id;
    let data = req.body;
    const del = await userModel.findByIdAndDelete(userId, data, { new: true });

    return res.status(200).json({ msg: "Book Updated successfully", update });
  } catch (error) {
    return res.status(200).json({ msg: "Internal server error", error });
  }
};


//Get user by gender

const getUserByGender = async (req,res) => {
    try {
        const gender = req.query.gender

        if(!isValid(gender)){
             return res.status(200).json({ msg: "Internal server error", error });
        }

        const users = await userModel.find({gender: gender.toLowerCase()})
        
        if(users.length === 0){
            return res.status(400).json({msg: "No User Found"})
        }
        return res.status(200).json({users})
        
    } catch (error) {
        console.log(error);
         return res.status(200).json({ msg: "Internal server error", error });

    }
}
module.exports = { addUser, getUserData, updateUserData, deleteUserData, getUserByGender };
