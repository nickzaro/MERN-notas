const User = require('../models/User');
class UsersController {

    async getUsers(req, res) {
        const users = await User.find();
        res.send(users);
    }
    async postUser(req, res) {
        const { username } = req.body;
        const newUser = new User({ username });
        await newUser.save();
        res.send({ message: "User created" });
    }
    async deleteUser(req, res) {
        const user = await User.findByIdAndDelete(req.params.id);
        if (user != null)
            res.json({ message:"User deleted"});
        else
            res.json({ message:"User not deleted"});
        
    }
}
const usersController = new UsersController();

module.exports = usersController;