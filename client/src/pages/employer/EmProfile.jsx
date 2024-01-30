import React from "react";

import Job from "../../components/Job";

import btn from "../../components/btn.module.css";

function EmProfile() {
	// must get employer job data from database here?
	const mockupObject = {
		title: "รับนักศึกษาฝึกงาน ตำแหน่ง x, y, z",
		company: "com x",
		place: "bkk",
		allowance: 100,
		positions: ["full-stack (3)", "front-end (1)", "back-end (2)"],
		created: "xx/xx/xxxx",
	};

	const duplicatedObjects = [];

	let nextId = 1;

	const numberOfDuplicates = 4;

	for (let i = 0; i < numberOfDuplicates; i++) {
		const copy = { ...mockupObject };
		copy.id = nextId;
		nextId++;

		duplicatedObjects.push(copy);
	}
	return (
		<>
			<div className="container p-2 p-sm-4 container-card employerProfileDetailCard">
				{/* <div className="d-flex justify-content-between">
						<h3 className="std-profile-title mb-3 fw-bold">ข้อมูลของฉัน</h3>
						<button className="btn btn-secondary d-none">แก้ไขข้อมูล</button>
					</div> */}

				<div className="row">
					<div className="col-12">
						<div className="employerProfileDetail px-2 pt-3">
							<div className="d-flex justify-content-between">
								<div className="row employerTitle">
									<div className="col-6 mb-3 mb-md-0 employer-card-img">
										<div className="job-card-img mb-3 mb-md-0">
											<img
												src="https://picsum.photos/120"
												alt="Company Logo Image"
												className="img-fluid"
											/>
										</div>
									</div>
									<div className="col-6 employerTitleText">
										<p className="fw-bold">บริษัท x</p>
										<h6>ประเภทธุรกิจ : x</h6>
									</div>
								</div>
								<div className="mt-2 mt-sm-0 employerAction">
									<button className={`${btn.btn_blue_outline}`}>
										แก้ไขโปรไฟล์
									</button>
								</div>
							</div>
							<div className="row mt-4">
								<div className="col-sm-12 employerAbout">
									<p className="fw-bold">เกี่ยวกับเรา</p>
									<h6>
										Lorem ipsum dolor sit amet, consectetur adipisicing elit.
										Corrupti natus distinctio amet vitae, ab culpa corporis at
										incidunt suscipit. Laboriosam culpa dolores voluptas velit
										officia unde, inventore expedita iusto dolorem.
									</h6>
								</div>
							</div>
							<div className="row mt-4">
								<div className="col-sm-12 employerLocation">
									<p className="fw-bold">สถานที่ตั้ง</p>
									<h6>
										Lorem ipsum dolor sit amet consectetur, adipisicing elit.
										Vero, neque!
									</h6>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className="container p-3 p-sm-4 mt-4 container-card employerJobCard">
				<div className="d-flex justify-content-between mb-4">
					<h4 className="employerJobTitle fw-bold">ข้อมูลอื่น ๆ</h4>
				</div>
				{/* <div className="employerJob">
						{duplicatedObjects.map((item) => (
							<div key={item.id} className="mb-2">
								<Job
									id={item.id}
									title={item.title}
									company={item.company}
									place={item.place}
									allowance={item.allowance}
									positions={item.positions}
									created={item.created}
								/>
							</div>
						))}
					</div> */}
			</div>
		</>
	);
}

export default EmProfile;
