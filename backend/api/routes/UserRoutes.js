const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const semesterModel = require("../models/SemesterModel");
const department = require("../models/DepartmentModel");

router.get("/", (req, res, next) => {
    res.json({
        msg: "Get request for /user route",
    });
});

router.get("/:xAuthToken", async (req, res) => {
    const token = req.params.xAuthToken;
    try {
        //verify token
        const decoded = jwt.verify(token, process.env.jwtSecret);
        const user = await User.findById(decoded.id);
        if (!user) return res.status(400).json({user: {}});
        return res.status(200).json({user: user});
    } catch (err) {
        res.status(400).json({user: {}});
    }
});

//desc:route for handling the regitration
//method:POST
router.post("/", (req, res, next) => {
    const {userName, email, password, rollNumber, stream, semester} = req.body;
    if (!userName || !email || !password) {
        res.status(400).json({
            ERR_STATUS: 400,
            ERR_INFO: "Please enter a valid email and password ",
        });
    }
    //check for existing user
    User.findOne({roll_number: rollNumber}).then((user) => {
        if (user)
            return res.status(400).json({
                user: rollNumber,
                ERR_STATUS: 400,
                ERR_INFO: "User Already exist",
            });
        department
            .findOne({dept_code: stream})
            .then((dept) => {
                semesterModel
                    .findOne({sem: semester})
                    .then((sem) => {
                        const newUser = new User({
                            name: userName,
                            password: password,
                            email: email,
                            roll_number: rollNumber,
                            stream: dept._id,
                            semester: sem._id,
                        });
                        //create salt and hash
                        bcrypt.genSalt(10, (err, salt) => {
                            bcrypt.hash(newUser.password, salt, (err, hash) => {
                                if (err) throw err;
                                newUser.password = hash;
                                newUser.save().then((user) => {
                                    jwt.sign(
                                        {
                                            id: user.id,
                                        },
                                        process.env.jwtSecret,
                                        {expiresIn: 3600},
                                        (err, token) => {
                                            if (err) throw err;
                                            res.json({
                                                token,
                                                user: {
                                                    id: user.id,
                                                    name: user.name,
                                                },
                                            });
                                        }
                                    );
                                });
                            });
                        });
                    })
                    .catch((err) => {
                        return res.status(500).json({
                            user: roll_number,
                            ERR_STATUS: 500,
                            ERR_INFO: "SERVER ERROR",
                        });
                    });
            })
            .catch((err) => {
                return res.status(500).json({
                    user: roll_number,
                    ERR_STATUS: 500,
                    ERR_INFO: "SERVER ERROR",
                });
            });
    });
});

// route for handling the login
// method:POST
router.post("/signIn", (req, res, next) => {
    const {rollNumber, password} = req.body;
    if (!rollNumber || !password) {
        res
            .status(400)
            .json({message: "Please enter valid credentials", loginStatus: false});
    }
    //check for existing user
    User.findOne({roll_number: rollNumber}).then((user) => {
        if (!user)
            return res
                .status(400)
                .json({message: "User Does'nt exist", loginStatus: false});
        //Validate password
        bcrypt.compare(password, user.password).then((isMatch) => {
            if (!isMatch)
                return res
                    .status(400)
                    .json({message: "Invalid Credential", loginStatus: false});

            jwt.sign(
                {
                    id: user.id,
                },
                process.env.jwtSecret,
                {expiresIn: "2days"},
                (err, token) => {
                    if (err) throw err;
                    res.status(200).json({
                        message: "Log in successful",
                        token: token,
                        user: {
                            id: user.id,
                            name: user.name,
                        },
                        loginStatus: true,
                    });
                }
            );
        });
    });
});

router.post("/auth/validate", async (req, res, next) => {
    const token = req.header("x-auth-token");

    //check for token
    if (!token)
        return res.status(401).json({
            msg: "No token ! authorization",
        });
    try {
        //verify token
        const decoded = jwt.verify(token, process.env.jwtSecret);
        const user = await User.findById(decoded.id);
        if (!user) return res.json(false);
        return res.json(true);
    } catch (err) {
        res.status(400).json({msg: "Invalid Token"});
    }
});

/**
 * @description route to delete a specific user
 * @method DELETE
 */
router.delete("/:userID", async (request, response) => {
    //search the user with the userID sent in query param
    const {userID} = request.params;

    if (!userID.length) return response.status(400).json({
        msg: "Invalid User ID",
        userID: userID
    })

    //search the DB for the user with the _id: userID
    const searchResult = await User.findById(userID);

    if (!searchResult) return response.status(404).json({
        msg: `User not found with ID: ${userID}`,
        userID: userID
    })

    try {
        //Delete the user from the DB
        const deleteResponse = await User.deleteOne({_id: userID});
        if (deleteResponse) return response.status(200).json({
            msg: `Successfully deleted the user with ID: ${userID}`,
            userID: userID
        })
    } catch (e) {
        console.log("=>(UserRoutes.js:194) e", e);
        return response.status(500).json({
            msg: `Unable delete the user with id: ${userID}`,
            userID: userID,
            error: e
        })

    }


})
module.exports = router;
