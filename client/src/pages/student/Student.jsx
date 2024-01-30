import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../../components/Header";
import Job from "../../components/Job";
import btn from "../../components/btn.module.css";
import axios from "axios";
import { useSelector } from "react-redux";

function Student() {
  const [jobData, setJobData] = useState([]);
  const { user } = useSelector((state) => ({ ...state }));
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5500/api/myStatus", {
          headers: {
            authtoken: user.user.token,
          },
        });
        console.log(response.data.posts_job);
        setJobData([response.data.posts_job]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);
  return (
    <>
      {/* <Header /> */}
      <div className="container p-5">
        <br />
        <h2>บริษัทที่รอการตอบรับ</h2>
        <br />

        <div className="row justify-content-center gx-5">
          <div className="col-md-9">
            {Array.isArray(jobData) &&
              jobData.map((item) => (
                <Job
                  key={item.job_id}
                  id={item.job_id}
                  title={item.job_title}
                  company={item.location}
                  place={item.location}
                  allowance={item.salary}
                  positions={
                    Array.isArray(item.cat)
                      ? item.cat
                      : typeof item.cat === "string"
                      ? JSON.parse(item.cat)
                      : []
                  }
                  created={item.dateStartPost}
                />
              ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Student;
