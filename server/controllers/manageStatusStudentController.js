const db = require("../db/index");
const { student, employer, posts_job, apply } = db;
db.sequelize.sync();

exports.myApply = async (req, res) => {
  try {
    const myApply = await apply.findOne({
      where: { std_id: req.user.username },
      include: [{ model: posts_job }],
    });
    res.status(200).json(myApply);
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
};
