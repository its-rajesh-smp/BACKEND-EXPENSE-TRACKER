const DownloadURL = require("../models/downloadURL");

exports.getAll = async (req, res) => {
  try {
    const { user } = req;
    const dbRes = await DownloadURL.findAll({
      where: { userEmail: user.email },
      order: [["CreatedAt", "DESC"]],
    });
    res.send(dbRes);
  } catch (error) {
    console.log(error.message);
    res.status(404).send(error.message);
  }
};
