import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import btn from "./btn.module.css";
import employerDefaultImg from "../assets/employer_default_img.png";

export default function Job({
	id,
	img,
	title,
	company,
	location,
	allowance,
	positions,
	startPost,
	endPost,
}) {
	const parsedPositions =
		typeof positions === "string" ? JSON.parse(positions) : positions;

	const { user } = useSelector((state) => ({ ...state }));

	return (
		<>
			<Link to={`/job/${id}`}>
				<div className="job-card" key={id}>
					<div className="row">
						<div className="col-12 col-md-3 col-xl-2 d-flex justify-content-md-center justify-content-lg-start">
							<div className="job-card-img mb-3 mb-md-0">
								<img
									src={img ? img : employerDefaultImg}
									alt="Company Logo Image"
									className="img-fluid"
								/>
							</div>
							<div className="job-header-hidden d-block d-md-none px-3">
								<h6 className="job-card-title fw-bold text-break">{title}</h6>
								<small className="text-muted">
									รับสมัคร : {startPost} ถึง {endPost}
								</small>
							</div>
						</div>
						<div className="col-12 col-md-6 col-xl-7">
							<div className="job-card-details">
								<h6 className="job-card-title d-none d-md-block fw-bold text-break">
									{title}
								</h6>

								<p className="card-text mb-1">
									บริษัท/หน่วยงาน :{" "}
									<span className="text-secondary">{company}</span>
								</p>
								<p className="card-text mb-1">
									สถานที่ฝึกงาน :{" "}
									<span className="text-secondary">{location}</span>
								</p>
								{/* <p className="card-text mb-1">เบี้ยเลี้ยง : {allowance}</p> */}
								{parsedPositions && (
									<p className="card-text mb-1">
										ตำแหน่ง :{" "}
										<span className="text-secondary">
											{Array.isArray(parsedPositions)
												? parsedPositions.join(", ")
												: parsedPositions}
										</span>
									</p>
								)}
							</div>
						</div>
						<div className="col-12 col-md-3 col-xl-3">
							<div className="job-actions">
								<p className="card-text">
									<small className="text-muted d-none d-md-block">
										รับสมัคร : {startPost} ถึง {endPost}
									</small>
								</p>
								{user &&
								(user.user.role === "admin" ||
									user.user.role === "head" ||
									user.user.role === "teacher" ||
									user.user.role === "employer") ? (
									""
								) : (
									<button className={`${btn.btn_blue_outline} w-100`}>
										สมัครฝึกงาน
									</button>
								)}
							</div>
						</div>
					</div>
				</div>
			</Link>
		</>
	);

	function truncateText(text, maxLength) {
		return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
	}
}
