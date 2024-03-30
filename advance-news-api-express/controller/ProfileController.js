class ProfileController {
  static async index(req, res) {
    try {
      const user = req.user;
      return res.json({ status: 200, user });
    } catch (e) {
      return res.status(500).json({ message: "Something went wrong" });
    }
  }
  static async store(req, res) {}
  static async show(req, res) {}
  static async update(req, res) {
    try {
    } catch (e) {}
  }
  static async destroy(req, res) {}
}

export default ProfileController;
