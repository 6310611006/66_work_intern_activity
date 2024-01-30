import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Job from "../components/Job";
import btn from "../components/btn.module.css";

import axios from "axios";

function Home() {
	const [jobData, setJobData] = useState(null); // should be null or empty array?

	useEffect(() => {
		// Fetch data from the API
		const fetchData = async () => {
			try {
				const response = await axios.get("http://localhost:5500/api/listPosts");
				console.log(response.data);
				setJobData(response.data);
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		};
		fetchData();
	}, []);

	return (
		<>
			<div className="container p-2 p-lg-3 p-xl-5 mb-3 mb-xl-0">
				<h3 className="my-4 mb-sm-5 fw-bold">
					ระบบสนับสนุนวิชาฝึกงานของภาควิชาวิศวกรรมไฟฟ้าและคอมพิวเตอร์
				</h3>

				<div className="row justify-content-center">
					<p className="fw-bold">ตำแหน่งฝึกงานที่เปิดรับ : </p>

					<div className="col-md-9">
						{jobData ? (
							<>
								{jobData
									.slice()
									.reverse()
									.map((item) => (
										<div key={item.job_id} className="mb-2">
											<Job
												key={item.job_id}
												id={item.job_id}
												img={item.employer.company_pic}
												title={item.job_title}
												company={item.employer.company_name}
												location={item.location}
												allowance={item.salary}
												positions={
													Array.isArray(item.cat)
														? item.cat
														: typeof item.cat === "string"
														? JSON.parse(item.cat)
														: []
												}
												startPost={item.dateStartPost}
												endPost={item.dateEndPost}
											/>
										</div>
									))}

								<div className="text-center mt-4">
									<Link to={"/alljob"}>
										<button className={`${btn.btn_blue} w-100`}>
											ดูที่ฝึกงานทั้งหมด
										</button>
									</Link>
								</div>
							</>
						) : (
							<div className="d-flex flex-column justify-content-center align-items-center p-5 min-vh-100 text-muted bg-light container-card">
								<h4>ยังไม่มีตำแหน่งฝึกงานที่เปิดรับในระบบ</h4>
								<small>
									- นักศึกษา สามารถยื่นฝึกงานเองได้ที่ :{" "}
									<span className="text-light-blue">
										<Link to={"/student/self-enroll"}>ยื่นที่ฝึกงานเอง</Link>
									</span>
								</small>
								<small>
									- บริษัท/หน่วยงาน สามารถประกาศรับนักศึกษาฝึกงานได้ที่ :{" "}
									<span className="text-light-blue">
										<Link to={"/employer/create-job"}>+ ประกาศรับฝึกงาน</Link>
									</span>
								</small>
							</div>
						)}

						<hr className="hr-blue d-block d-md-none" />
					</div>

					<div className="col-12 col-md-3 bg-light my-3 my-md-0">
						<p className="p-3">Search Filter or News</p>
					</div>
				</div>
			</div>
		</>
	);
}

export default Home;
