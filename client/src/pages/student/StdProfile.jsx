import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import btn from "../../components/btn.module.css";

import { getStudentProfile } from "../../services/user.service";

function StdProfile() {
	const [data, setData] = useState([]);

	const { user } = useSelector((state) => ({ ...state }));

	const loadData = async (authtoken) => {
		await getStudentProfile(authtoken)
			.then((res) => {
				setData(res.data);
			})
			.catch((err) => {
				console.log(
					"Load data failed: ",
					err.response ? err.response.data : err.message
				);
			});
	};

	useEffect(() => {
		loadData(user.user.token);
	}, []);

	return (
		<>
			<div className="container p-3 p-sm-4 container-card stdProfileCard">
				<div className="d-flex justify-content-between">
					<h3 className="stdProfileTitle mb-3 fw-bold">ข้อมูลของฉัน</h3>
					<button className="btn btn-secondary d-none">แก้ไขข้อมูล</button>
				</div>

				<div className="row">
					<div className="col-12">
						<div className="stdProfileDetail px-2 pt-3">
							<div className="row">
								{/* <div className="col-sm-6 std-name">
									<p className="fw-bold">ชื่อ</p>
									<h6 className="border rounded p-2 bg-light">ภูชิชย์</h6>
								</div> */}
								<div className="col-sm-6 stdName">
									<p className="fw-bold">ชื่อ-นามสกุล</p>
									{data ? (
										<h6>{data.displayname_th}</h6>
									) : (
										<p className="text-muted">-</p>
									)}
								</div>
								<div className="col-sm-6 mt-2 mt-sm-0 stdSurname">
									<p className="fw-bold">Full Name</p>
									{data ? (
										<h6>{data.displayname_en}</h6>
									) : (
										<p className="text-muted">-</p>
									)}
								</div>
							</div>
							<div className="row mt-3">
								<div className="col-sm-6 stdId">
									<p className="fw-bold">รหัสนักศึกษา</p>
									{data ? (
										<h6>{data.std_id}</h6>
									) : (
										<p className="text-muted">-</p>
									)}
								</div>
								<div className="col-sm-6 mt-2 mt-sm-0 stdDepartment">
									<p className="fw-bold">ภาควิชา</p>
									{data ? (
										<h6>{data.department}</h6>
									) : (
										<p className="text-muted">-</p>
									)}
								</div>
							</div>
							<div className="row mt-3">
								<div className="col-sm-6 stdFaculty">
									<p className="fw-bold">คณะ</p>
									{data ? (
										<h6>{data.faculty}</h6>
									) : (
										<p className="text-muted">-</p>
									)}
								</div>
								<div className="col-sm-6 mt-2 mt-sm-0 stdPhone">
									<p className="fw-bold">โทรศัพท์</p>
									{data ? (
										<h6>ยังไม่มี data</h6>
									) : (
										<p className="text-muted">-</p>
									)}
								</div>
							</div>
							<div className="row mt-3">
								<div className="col-sm-6 stdMail">
									<p className="fw-bold">อีเมล</p>
									{data ? (
										<h6>{data.email}</h6>
									) : (
										<p className="text-muted">-</p>
									)}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className="container p-3 p-sm-4 mt-4 container-card std-resume-card">
				<div className="d-flex justify-content-between">
					<h4 className="std-resume-title mb-3 fw-bold">Resume</h4>
				</div>
				<div className="std-resume">
					<div className="stdResumeFile">
						<label htmlFor="stdResumeFile" className="form-label">
							อัปโหลดไฟล์ Resume เป็น .pdf
						</label>
						<input
							className="form-control"
							type="file"
							id="stdResumeFile"
							accept=".pdf"
						/>
					</div>
				</div>
			</div>
		</>
	);
}

export default StdProfile;
