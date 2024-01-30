import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import btn from "../components/btn.module.css";
import employerDefaultImg from "../assets/employer_default_img.png";
import { Button, Modal, Dropdown } from "react-bootstrap";
import axios from "axios";
import { getPost } from "../services/user.service";

export default function JobDetail() {
  const params = useParams();
  const navigate = useNavigate();

  // let parsedPositions;
  const [jobData, setJobData] = useState(null);
  const [parsedPositions, setparsedPositions] = useState(null);
  const [isApply, setIsApply] = useState(false);
  const [apiResponse, setApiResponse] = useState(null);
  const goBack = () => navigate(-1);
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [isResponseModalOpen, setIsResponseModalOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [dropdownOptions, setDropdownOptions] = useState([]);

  const loadData = async () => {
    await getPost(params.jobId)
      .then((res) => {
        const job = res.data;
        const parsedPositions =
          typeof job.post.cat === "string"
            ? JSON.parse(job.post.cat)
            : job.post.cat;
        setJobData(job);
        setparsedPositions(parsedPositions);
      })
      .catch((err) => {
        console.log(
          "Load data failed: ",
          err.response ? err.response.data : err.message
        );
      });
  };
  useEffect(() => {
    // const fetchData = async () => {
    // 	try {
    // 		const response = await axios.get(
    // 			`http://localhost:5500/api/post/${params.jobId}`
    // 		);

    // 		if (response.status >= 200 && response.status < 300) {
    // 			const job = response.data;
    // 			const parsedPositions =
    // 				typeof job.cat === "string" ? JSON.parse(job.cat) : job.cat;
    // 			setJobData(job);
    // 			setJobDataPost(job.post);
    // 			setJobDataPosts(job.posts);
    // 			setJobDataProfile(job.profile);
    // 		} else {
    // 			throw new Error(`Failed to fetch data. Status: ${response.status}`);
    // 		}
    // 	} catch (error) {
    // 		console.error("Error fetching data:", error.message);
    // 	}
    // };

    // fetchData();
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5500/api/Post/${params.jobId}`
        );

        if (response.status >= 200 && response.status < 300) {
          const job = response.data;

          console.log("API Response:", job);
          let positionsArray;

          if (typeof job.post.cat === "string") {
            positionsArray = JSON.parse(job.post.cat);
          } else {
            positionsArray = job.post.cat;
          }
          positionsArray = JSON.parse(positionsArray);
          console.log("positionsArray:", positionsArray);
          setparsedPositions(positionsArray);
          setJobData(job);
          setDropdownOptions(positionsArray);
        } else {
          throw new Error(`Failed to fetch data. Status: ${response.status}`);
        }
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };
    fetchData();
  }, [params.jobId]);

  const { user } = useSelector((state) => ({ ...state }));
  const handleApplyClick = () => {
    setIsApplyModalOpen(true);
  };

  const handleApplyModalClose = () => {
    setIsApplyModalOpen(false);
  };

  const handleDropdownSelect = (eventKey) => {
    setSelectedOption(eventKey);
  };

  const handleConfirmeApplyModal = async () => {
    try {
      if (selectedOption) {
        const applyWork = {
          job_id: jobData.post.job_id,
          position: selectedOption,
        };
        const response = await axios.post(
          "http://localhost:5500/api/createApply",
          applyWork,
          {
            headers: {
              authtoken: user.user.token,
            },
          }
        );
        setApiResponse(response.data);

        console.log(response);
        setIsApplyModalOpen(false);
        setIsResponseModalOpen(true);
      } else {
        console.error("No option selected");
      }
    } catch (error) {
      setIsApplyModalOpen(false);
      setIsResponseModalOpen(true);
      setApiResponse(error.response.data);
      console.error(error);
    }
  };

  const ResponseModal = () => {
    return (
      <Modal
        show={isResponseModalOpen}
        onHide={() => setIsResponseModalOpen(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Apply for Job</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {apiResponse ? <p>{apiResponse.message}</p> : <p>Loading...</p>}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setIsResponseModalOpen(false)}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };
  return (
    <>
      <div className="container p-2 p-lg-3 p-xl-5 mb-3 mb-xl-0">
        <div className="container p-1 p-sm-2 px-sm-4 bg-light container-card jobNavigationCard">
          <div className="d-flex justify-content-between">
            <a className={`a-text`} onClick={goBack}>
              ย้อนกลับ
            </a>
            <></>
          </div>
        </div>

        <div className="container p-2 p-sm-4 mt-3 container-card jobDetailCard">
          <div className="row justify-content-center">
            <div className="col-12">
              <div className="px-2 jobDetail">
                <div className="row">
                  <div className="col-12 col-md-3 col-lg-2 d-flex">
                    <div className="job-card-img mb-3 mb-md-0">
                      <img
                        src={
                          jobData
                            ? jobData.profile.company_pic
                            : employerDefaultImg
                        }
                        alt="Company Logo Image"
                        className="img-fluid"
                      />
                    </div>
                    <div className="job-header-hidden d-block d-md-none px-3">
                      <div className="job-card-title">
                        {jobData ? (
                          <h5 className="fw-bold">{jobData.post.job_title}</h5>
                        ) : (
                          <p className="text-muted">กำลังโหลดข้อมูล...</p>
                        )}
                      </div>
                      <small className="text-muted">
                        รับสมัคร :{" "}
                        {jobData ? (
                          <>
                            {jobData.post.dateStartPost} ถึง{" "}
                            {jobData.post.dateEndPost}
                          </>
                        ) : (
                          <>กำลังโหลดข้อมูล...</>
                        )}
                      </small>
                    </div>
                  </div>

                  <div className="col-12 col-md-6 col-lg-7">
                    <div className="job-card-details">
                      <div className="job-card-title d-none d-md-block fw-bold">
                        {jobData ? (
                          <h5 className="fw-bold">{jobData.post.job_title}</h5>
                        ) : (
                          <p className="text-muted">กำลังโหลดข้อมูล...</p>
                        )}
                      </div>
                      <div className="card-text mt-2">
                        <p className="fw-bold">
                          บริษัท/หน่วยงาน :{" "}
                          {jobData ? (
                            <span>{jobData.profile.company_name}</span>
                          ) : (
                            <span className="text-muted">
                              กำลังโหลดข้อมูล...
                            </span>
                          )}
                        </p>
                      </div>
                      {/* <p className="card-text mb-1">ประเภทธุรกิจ : </p> */}

                      <Link
                        to={`/employer/${
                          jobData ? jobData.post.emp_id : "PageNotFound"
                        }/profile`}
                        className={`d-none d-md-block w-25 text-center a-btn ${btn.btn_blue_outline}`}
                      >
                        ดูโปรไฟล์
                      </Link>
                      <Link
                        to={`/employer/${
                          jobData ? jobData.post.emp_id : "PageNotFound"
                        }/profile`}
                        className={`d-block d-md-none my-2 w-100 text-center a-btn ${btn.btn_blue_outline}`}
                      >
                        ดูโปรไฟล์
                      </Link>
                    </div>
                  </div>

                  <div className="col-12 col-md-3 col-lg-3">
                    <div className="job-actions">
                      <p className="card-text">
                        <small className="text-muted d-none d-md-block">
                          รับสมัคร :{" "}
                          {jobData ? (
                            <>
                              {jobData.post.dateStartPost} ถึง{" "}
                              {jobData.post.dateEndPost}
                            </>
                          ) : (
                            <>กำลังโหลดข้อมูล...</>
                          )}
                        </small>
                      </p>
                      {user &&
                      (user.user.role === "admin" ||
                        user.user.role === "head" ||
                        user.user.role === "teacher" ||
                        user.user.role === "employer") ? (
                        ""
                      ) : (
                        <>
                          <Button
                            variant="primary"
                            className={`${btn.btn_blue} w-100`}
                            onClick={handleApplyClick}
                          >
                            สมัครฝึกงาน
                          </Button>
                          <Modal
                            show={isApplyModalOpen}
                            onHide={handleApplyModalClose}
                            centered
                          >
                            <Modal.Header closeButton>
                              <Modal.Title>Apply for Job</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                              {/* เพิ่มเนื้อหาตรงนี้ */}
                              <p>คุณต้องการสมัครฝึกงานในตำเเหน่ง</p>
                              <Dropdown onSelect={handleDropdownSelect}>
                                <Dropdown.Toggle
                                  variant="secondary"
                                  id="dropdown-basic"
                                >
                                  {selectedOption || "Select Option"}
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                  {dropdownOptions.map((option, index) => (
                                    <Dropdown.Item
                                      key={index}
                                      eventKey={option}
                                    >
                                      {option}
                                    </Dropdown.Item>
                                  ))}
                                </Dropdown.Menu>
                              </Dropdown>
                            </Modal.Body>
                            <Modal.Footer>
                              <Button
                                variant="secondary"
                                onClick={handleApplyModalClose}
                              >
                                Close
                              </Button>
                              <Button
                                variant="secondary"
                                onClick={handleConfirmeApplyModal}
                              >
                                ยืนยัน
                              </Button>
                            </Modal.Footer>
                          </Modal>

                          <ResponseModal />
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <div className="row mt-4">
                  <div className="col-sm-12 jobAbout">
                    <p className="fw-bold">เกี่ยวกับเรา</p>

                    {jobData ? (
                      <h6>{jobData.profile.about}</h6>
                    ) : (
                      <p className="text-muted">-</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container px-2 px-sm-4 mt-2 container-card jobInfoCard1">
          <div className="d-flex flex-column flex-md-row justify-content-sm-between text-md-center p-2">
            {jobData ? (
              <>
                <div className="mt-2 mt-sm-0">
                  <p className="fw-bold">สถานที่ปฏิบัติงาน</p>
                  {jobData ? (
                    <h6>{jobData.post.province}</h6>
                  ) : (
                    <p className="text-muted">กำลังโหลดข้อมูล...</p>
                  )}
                </div>
                <div className="mt-2 mt-sm-0">
                  <p className="fw-bold">จำนวนรับ</p>
                  {jobData ? (
                    <h6>{jobData.post.position_num}</h6>
                  ) : (
                    <p className="text-muted">กำลังโหลดข้อมูล...</p>
                  )}
                </div>
                <div className="mt-2 mt-sm-0">
                  <p className="fw-bold">เบี้ยเลี้ยง</p>
                  {jobData ? (
                    <h6>{jobData.post.salary}</h6>
                  ) : (
                    <p className="text-muted">กำลังโหลดข้อมูล...</p>
                  )}
                </div>
                <div className="mt-2 mt-sm-0">
                  <p className="fw-bold">เวลาทำงาน</p>
                  {jobData ? (
                    <h6>{jobData.post.work_hours}</h6>
                  ) : (
                    <p className="text-muted">กำลังโหลดข้อมูล...</p>
                  )}
                </div>
              </>
            ) : (
              <p className="text-muted">กำลังโหลดข้อมูล...</p>
            )}
          </div>
        </div>

        <div className="container p-2 p-sm-4 mt-4 container-card jobInfoCard2">
          <div className="mb-5">
            <div className="d-flex justify-content-between mb-2">
              <h5 className="fw-bold">ตำแหน่งฝึกงานที่เปิดรับ</h5>
            </div>
            <div className="mt-2 mt-sm-0">
              {jobData ? (
                <>
                  {parsedPositions && (
                    <h6>
                      {Array.isArray(parsedPositions)
                        ? parsedPositions.join(", ")
                        : parsedPositions}
                    </h6>
                  )}
                </>
              ) : (
                <p>Loading...</p>
              )}
            </div>
          </div>

          <div className="mb-5">
            <div className="d-flex justify-content-between mb-2">
              <h5 className="fw-bold">รายละเอียดงาน</h5>
            </div>
            <div className="mt-2 mt-sm-0">
              {jobData ? (
                <h6>{jobData.post.desc}</h6>
              ) : (
                <p className="text-muted">กำลังโหลดข้อมูล...</p>
              )}
            </div>
          </div>

          <div className="mb-5">
            <div className="d-flex justify-content-between mb-2">
              <h5 className="fw-bold">คุณสมบัติผู้สมัคร</h5>
            </div>
            <div className="mt-2 mt-sm-0">
              {jobData ? (
                <h6>{jobData.post.qualifications}</h6>
              ) : (
                <p className="text-muted">กำลังโหลดข้อมูล...</p>
              )}
            </div>
          </div>

          <div className="mb-5">
            <div className="d-flex justify-content-between mb-2">
              <h5 className="fw-bold">สวัสดิการ</h5>
            </div>
            <div className="mt-2 mt-sm-0">
              {jobData ? (
                <h6>{jobData.post.welfare}</h6>
              ) : (
                <p className="text-muted">กำลังโหลดข้อมูล...</p>
              )}
            </div>
          </div>

          <div className="mb-5">
            <div className="d-flex justify-content-between mb-2">
              <h5 className="fw-bold">สถานที่ปฏิบัติงาน</h5>
            </div>
            <div className="mt-2 mt-sm-0">
              {jobData ? (
                <>
                  <span>{jobData.post.location}</span>
                  <br />
                  <span>
                    ตำบล/แขวง {jobData.post.subdistrict} อำเภอ/เขต{" "}
                    {jobData.post.district} จังหวัด {jobData.post.province}{" "}
                    รหัสไปรษณีย์ {jobData.post.pcode}
                  </span>
                </>
              ) : (
                <p className="text-muted">กำลังโหลดข้อมูล...</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* {jobData ? (
				<>
					<h3>Job ID: {jobData.job_id}</h3>
					<h4>{jobData.job_title}</h4>
					<p>Location: {jobData.location}</p>
					<p>Skill required: {jobData.skill}</p>
					<p>Work Hours: {jobData.work_hours}</p>
					<p>Salary: {jobData.salary}</p>
					<p>Contract: {jobData.contract}</p>
					<p>Qualifications: {jobData.qualifications}</p>
					<p>Description: {jobData.desc}</p>
					{parsedPositions && (
						<p className="card-text">
							ตำแหน่ง :{" "}
							{Array.isArray(parsedPositions)
								? parsedPositions.join(", ")
								: parsedPositions}
						</p>
					)}
					<p>Start Date: {jobData.dateStartPost}</p>
					<p>End Date: {jobData.dateEndPost}</p>
				</>
			) : (
				<p>Loading...</p>
			)} */}
    </>
  );
}
