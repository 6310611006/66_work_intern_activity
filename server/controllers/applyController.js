const db = require("../db/index");
const { student, employer, posts_job, apply } = db;
db.sequelize.sync();

exports.createApply = async (req, res) => {
  try {
    const { job_id, position } = req.body;
    const studentData = await student.findOne({
      where: { std_id: req.user.username },
    });
    if (studentData.status === "0") {
      const posts_data = await posts_job.findOne({
        where: { job_id: job_id },
      });
      console.log(posts_data);
      const createApply = await apply.create({
        std_id: req.user.username,
        employer_id: posts_data.emp_id,
        job_id: posts_data.job_id,
        position: position,
      });

      const updateStatus = await student.update(
        {
          status: "1",
        },
        {
          where: { std_id: req.user.username },
        }
      );
      res
        .status(200)
        .json({ message: "สมัครฝึกงานสำเร็จ กรุณารอการตอบรับทาง อีเมล์" });
    } else if (studentData.status === "1") {
      res.status(400).json({
        message: "สมัครฝึกงานไม่สำเร็จ คุณเคยสมัครฝึกงานเเล้ว กรุณารอการตอบรับ",
      });
    } else {
      res
        .status(400)
        .json({ message: "สมัครฝึกงานไม่สำเร็จ กรุณาติดต่อภาควิชา" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "server error" });
  }
};
