import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // Import the styles for the DatePicker

import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { addPost } from "../../services/employer.service";

import btn from "../../components/btn.module.css";
import JobPreview from "./JobPreview";

function EmCreateJob() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    job_title: "",
    location: "",
    district: "",
    subdistrict: "",
    province: "",
    country: "",
    pcode: "",
    work_hours: "",
    salary: "",
    contact_tel: "",
    contact_email: "",
    welfare: "",
    qualifications: "",
    desc: "",
    position_num: "",
    cats: [],
    dateStartPost: new Date(),
    dateEndPost: new Date(),
  });

  const [errors, setErrors] = useState({
    job_title: "",
    location: "",
    district: "",
    subdistrict: "",
    province: "",
    country: "",
    pcode: "",
    work_hours: "",
    salary: "",
    contact_tel: "",
    contact_email: "",
    welfare: "",
    qualifications: "",
    desc: "",
    position_num: "",
    cats: "",
  });

  const handleInputChange = (e) => {
    e.preventDefault();

    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: "",
    });
  };
  const handleStartDateChange = (date) => {
    setFormData({
      ...formData,
      dateStartPost: date,
    });
  };

  const handleEndDateChange = (date) => {
    setFormData({
      ...formData,
      dateEndPost: date,
    });
  };

  const handleQuillChange = (value) => {
    setFormData({
      ...formData,
      desc: value,
    });
  };

  const handleCategoryChange = (category) => {
    const updatedCats = formData.cats.includes(category)
      ? formData.cats.filter((cat) => cat !== category)
      : [...formData.cats, category];

    setFormData({
      ...formData,
      cats: updatedCats,
    });
  };

  const { user } = useSelector((state) => ({ ...state }));

  const handlePublish = async (e) => {
    e.preventDefault();

    if (formData.cats.length === 0) {
      alert("กรุณาเลือกตำแหน่งฝึกงานที่ต้องการจะรับสมัคร");
      return;
    }

    await addPost(user.user.token, formData)
      .then((res) => {
        navigate("/employer/all-job");
      })
      .catch((err) => {
        console.error(
          "Add post failed: ",
          err.response ? err.response.data : err.message
        );
      });
  };

  return (
    <div className="row">
      <div className="col-12 col-lg-8">
        <div className="container p-3 p-sm-4 container-card">
          <div className="d-flex justify-content-between mb-4">
            <h3 className="employerJobTitle fw-bold">สร้างประกาศรับฝึกงาน</h3>
          </div>
          <div className="content">
            <form
              id="create-job-form"
              className="form-outline mb-4"
              onSubmit={handlePublish}
            >
              <div className="row">
                <div className="col-sm mx-2">
                  <div className="form-group">
                    <label className="form-label fw-bold" htmlFor="job_title">
                      หัวข้อประกาศรับฝึกงาน{" "}
                      <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      id="job_title"
                      className="form-control mb-3"
                      name="job_title"
                      value={formData.job_title}
                      onChange={handleInputChange}
                      maxLength={100}
                      required
                    />
                    {errors.job_title && (
                      <p className="text-danger">{errors.job_title}</p>
                    )}
                  </div>

                  <br />

                  <div className="form-group">
                    <label className="form-label fw-bold" htmlFor="location">
                      สถานที่ปฏิบัติงาน <span className="text-danger">*</span>
                    </label>
                    <textarea
                      type="text"
                      id="location"
                      className="form-control mb-3"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      rows={2}
                      maxLength={100}
                      required
                    />
                    {errors.location && (
                      <p className="text-danger">{errors.location}</p>
                    )}
                  </div>
                  <div className="row">
                    <div className="col-6 form-group">
                      <label
                        className="form-label fw-bold"
                        htmlFor="a_subdistrict"
                      >
                        ตำบล/แขวง <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        id="a_subdistrict"
                        className="form-control mb-3"
                        name="subdistrict"
                        value={formData.subdistrict}
                        onChange={handleInputChange}
                        maxLength={50}
                        required
                      />
                      {errors.subdistrict && (
                        <p className="text-danger">{errors.subdistrict}</p>
                      )}
                    </div>
                    <div className="col-6 form-group">
                      <label
                        className="form-label fw-bold"
                        htmlFor="a_district"
                      >
                        อำเภอ/เขต <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        id="a_district"
                        className="form-control mb-3"
                        name="district"
                        value={formData.district}
                        onChange={handleInputChange}
                        maxLength={50}
                        required
                      />
                      {errors.district && (
                        <p className="text-danger">{errors.district}</p>
                      )}
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-6 form-group">
                      <label
                        className="form-label fw-bold"
                        htmlFor="a_province"
                      >
                        จังหวัด <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        id="a_province"
                        className="form-control mb-3"
                        name="province"
                        value={formData.province}
                        onChange={handleInputChange}
                        maxLength={50}
                        required
                      />
                      {errors.province && (
                        <p className="text-danger">{errors.province}</p>
                      )}
                    </div>
                    <div className="col-6 form-group">
                      <label className="form-label fw-bold" htmlFor="a_pcode">
                        รหัสไปรษณีย์ <span className="text-danger">*</span>
                      </label>
                      <input
                        onKeyDown={(e) => {
                          if (
                            e.target.value.length === 5 &&
                            e.key !== "Backspace"
                          ) {
                            e.preventDefault();
                          }
                        }}
                        pattern="/^-?\d+\.?\d*$/"
                        type="number"
                        id="a_pcode"
                        className="form-control mb-3"
                        name="pcode"
                        value={formData.pcode}
                        onChange={handleInputChange}
                        required
                      />
                      {errors.pcode && (
                        <p className="text-danger">{errors.pcode}</p>
                      )}
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-6 form-group">
                      <label
                        className="form-label fw-bold"
                        htmlFor="work_hours"
                      >
                        เวลาทำงาน <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        id="work_hours"
                        className="form-control mb-3"
                        name="work_hours"
                        value={formData.work_hours}
                        onChange={handleInputChange}
                        maxLength={50}
                        required
                      />
                      {errors.work_hours && (
                        <p className="text-danger">{errors.work_hours}</p>
                      )}
                    </div>
                    <div className="col-6 form-group">
                      <label className="form-label fw-bold" htmlFor="salary">
                        เบี้ยเลี้ยง (ต่อวัน){" "}
                        <span className="text-danger">*</span>
                      </label>
                      <input
                        type="number"
                        id="a_salary"
                        className="form-control mb-3"
                        name="salary"
                        value={formData.salary}
                        onChange={handleInputChange}
                        required
                      />
                      {errors.salary && (
                        <p className="text-danger">{errors.salary}</p>
                      )}
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="form-label fw-bold" htmlFor="welfare">
                      สวัสดิการ <span className="text-danger">*</span>
                    </label>
                    <textarea
                      type="text"
                      id="welfare"
                      className="form-control mb-3"
                      name="welfare"
                      value={formData.welfare}
                      onChange={handleInputChange}
                      rows={2}
                      maxLength={100}
                      required
                    />
                    {errors.welfare && (
                      <p className="text-danger">{errors.welfare}</p>
                    )}
                  </div>
                  <div className="form-group">
                    <label
                      className="form-label fw-bold"
                      htmlFor="qualifications"
                    >
                      คุณสมบัติผู้สมัคร <span className="text-danger">*</span>
                    </label>
                    <textarea
                      type="text"
                      id="qualifications"
                      className="form-control mb-3"
                      name="qualifications"
                      value={formData.qualifications}
                      onChange={handleInputChange}
                      rows={2}
                      maxLength={100}
                      required
                    />
                    {errors.qualifications && (
                      <p className="text-danger">{errors.qualifications}</p>
                    )}
                  </div>
                  <div className="row">
                    <div className="col-6 form-group d-flex flex-column">
                      <label
                        className="form-label fw-bold"
                        htmlFor="dateStartPost"
                      >
                        วันที่เปิดรับสมัคร{" "}
                        <span className="text-danger">*</span>
                      </label>
                      <DatePicker
                        id="dateStartPost"
                        selected={formData.dateStartPost}
                        onChange={handleStartDateChange}
                        className="form-control mb-3"
                        name="dateStartPost"
                      />
                      {errors.dateStartPost && (
                        <p className="text-danger">{errors.dateStartPost}</p>
                      )}
                    </div>
                    <div className="col-6 form-group d-flex flex-column">
                      <label
                        className="form-label fw-bold"
                        htmlFor="dateEndPost"
                      >
                        วันที่ปิดรับสมัคร <span className="text-danger">*</span>
                      </label>
                      <DatePicker
                        id="dateEndPost"
                        selected={formData.dateEndPost}
                        onChange={handleEndDateChange}
                        className="form-control mb-3"
                        name="dateEndPost"
                      />
                      {errors.salary && (
                        <p className="text-danger">{errors.salary}</p>
                      )}
                    </div>
                  </div>

                  <br />

                  <div className="row">
                    <div className="col-6 form-group">
                      <label
                        className="form-label fw-bold"
                        htmlFor="a_contact_tel"
                      >
                        เบอร์ติดต่อ <span className="text-danger">*</span>
                      </label>
                      <input
                        type="tel"
                        id="a_contact_tel"
                        className="form-control mb-3"
                        name="contact_tel"
                        value={formData.contact_tel}
                        onChange={handleInputChange}
                        maxLength={20}
                        required
                      />
                      {errors.contact_tel && (
                        <p className="text-danger">{errors.contact_tel}</p>
                      )}
                    </div>
                    <div className="col-6 form-group">
                      <label
                        className="form-label fw-bold"
                        htmlFor="a_contact_email"
                      >
                        อีเมลติดต่อ <span className="text-danger">*</span>
                      </label>
                      <input
                        type="email"
                        id="a_contact_email"
                        className="form-control mb-3"
                        name="contact_email"
                        value={formData.contact_email}
                        onChange={handleInputChange}
                        maxLength={255}
                        required
                      />
                      {errors.contact_email && (
                        <p className="text-danger">{errors.contact_email}</p>
                      )}
                    </div>
                  </div>

                  <br />

                  <div className="editorContainer">
                    <label className="form-label fw-bold" htmlFor="a_desc">
                      รายละเอียดงาน <span className="text-danger">*</span>
                    </label>
                    <ReactQuill
                      id="a_desc"
                      className="editor"
                      theme="snow"
                      value={formData.desc}
                      onChange={handleQuillChange}
                    />
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="col-lg-4">
        <div className="container p-3 p-sm-4 mt-4 mt-lg-0 container-card">
          <div className="card-body">
            <div className="d-flex justify-content-between mb-4">
              <h5 className="card-title fw-bold">Publish</h5>
            </div>
            {/* <p className="card-text">
							<b>Status:</b> Draft
						</p>
						<p className="card-text">
							<b>Visibility:</b> Public
						</p> */}

            <div className="buttons">
              <div className="row">
                <div className="col-12 col-xl-6 mb-2">
                  <button
                    className={`btn btn-sm ${btn.btn_grey_outline} w-100`}
                  >
                    Save as a draft
                  </button>
                </div>
                <div className="col-12 col-xl-6">
                  <JobPreviewModal />
                </div>
              </div>

              <hr />

              <div className="d-flex justify-content-center">
                <button
                  type="submit"
                  form="create-job-form"
                  className={`${btn.btn_blue} w-100`}
                >
                  Publish
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="container p-3 p-sm-4 mt-4 mt-lg-4 container-card">
          <div className="card-body">
            <h5 className="card-title fw-bold mb-3">
              ตำแหน่ง <span className="text-danger">*</span>
            </h5>

            <div className="mb-4">
              {[
                "Front-End",
                "Back-End",
                "Data Sci",
                "Data Engineer",
                "DepOps",
                "Network Engineer",
                "IT Support",
                "IT Security",
                "อื่น ๆ",
              ].map((cat) => (
                <div key={cat} className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    checked={formData.cats.includes(cat)}
                    id={cat}
                    onChange={() => handleCategoryChange(cat)}
                  />
                  <label className="form-check-label" htmlFor={cat}>
                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </label>
                </div>
              ))}
            </div>

            <div className="form-group">
              <label className="form-label fw-bold" htmlFor="position_num">
                จำนวนรับ (คน)
              </label>
              <input
                type="number"
                id="position_num"
                className="form-control mb-3"
                name="position_num"
                value={formData.position_num}
                onChange={handleInputChange}
              />
              {errors.position_num && (
                <p className="text-danger">{errors.position_num}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  function JobPreviewModal() {
    return (
      <>
        <button
          type="button"
          className={`btn btn-sm ${btn.btn_grey} w-100`}
          data-bs-toggle="modal"
          data-bs-target="#jobPreviewModal"
        >
          Preview
        </button>

        <div
          className="modal fade"
          id="jobPreviewModal"
          tabindex="-1"
          aria-labelledby="jobPreviewModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-xl modal-fullscreen-lg-down">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="jobPreviewModalLabel">
                  Preview
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body bg-light">
                <JobPreview formData={formData} />
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className={`btn btn-sm ${btn.btn_grey}`}
                  data-bs-dismiss="modal"
                >
                  ปิดหน้าต่าง
                </button>
                {/* <button
									type="button"
									className={`btn btn-sm ${btn.btn_blue}`}
									onClick={handlePublish}
								>
									Publish Now
								</button> */}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default EmCreateJob;
