-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 30, 2024 at 04:05 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `internship2`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `admin_id` int(100) NOT NULL,
  `username` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `password` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `role` varchar(55) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT 'admin'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`admin_id`, `username`, `password`, `role`) VALUES
(1, 'admin', '$2a$12$AE4w2JQSuSF9hzhbwAPsq.mw/6.htCXiYQUlPMrtlp2x.WHqoSs6C', 'admin');

-- --------------------------------------------------------

--
-- Table structure for table `apply`
--

CREATE TABLE `apply` (
  `apply_id` int(11) NOT NULL,
  `std_id` varchar(100) NOT NULL,
  `employer_id` int(11) NOT NULL,
  `job_id` int(11) NOT NULL,
  `position` varchar(255) NOT NULL,
  `date` date NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `apply`
--

INSERT INTO `apply` (`apply_id`, `std_id`, `employer_id`, `job_id`, `position`, `date`) VALUES
(24, '6310611006', 17, 10, 'Analysis', '2024-01-30');

-- --------------------------------------------------------

--
-- Table structure for table `employer`
--

CREATE TABLE `employer` (
  `employer_id` int(11) NOT NULL,
  `username` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `company_name` varchar(100) NOT NULL,
  `address` varchar(100) NOT NULL,
  `subdistrict` varchar(100) NOT NULL,
  `district` varchar(100) NOT NULL,
  `province` varchar(100) NOT NULL,
  `country` varchar(100) NOT NULL,
  `pcode` varchar(100) NOT NULL,
  `contact_name` varchar(100) NOT NULL,
  `contact_email` varchar(100) NOT NULL,
  `contact_tel` varchar(100) NOT NULL,
  `about` varchar(1000) DEFAULT NULL,
  `company_pic` varchar(100) DEFAULT NULL,
  `status` varchar(10) NOT NULL DEFAULT 'notverify',
  `role` varchar(100) DEFAULT 'employer'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `employer`
--

INSERT INTO `employer` (`employer_id`, `username`, `password`, `company_name`, `address`, `subdistrict`, `district`, `province`, `country`, `pcode`, `contact_name`, `contact_email`, `contact_tel`, `about`, `company_pic`, `status`, `role`) VALUES
(7, 'testemployer', '$2a$10$xCSXDv7Spug.AM4GBFCauuRZFUJpS/PcZxCTctczmDlRRPwRxaCT2', 'Example Company', '123 Main Street', 'Suburb', 'City', 'State', 'Country', '12345', 'John Doe', 'john.doe@example.com', '1234567890', NULL, 'https://example.com/company_logo.jpg', 'verified', 'employer'),
(8, 'test10', '$2a$10$s.BP4ncjWW1wfGJpiCteoegAUoGNSuB1XLlc4Rocmfw.hiOKlpRuy', 'Example Company Edit2', '123 Main Street', 'Suburb', 'City', 'State', 'Country', '12345', 'John Doe', 'john.doe@example.com', '1234567890', NULL, 'https://example.com/company_logo.jpg', 'notverify', 'employer'),
(9, 'wongsakron', '$2a$10$ATSJA43XKXSNVV0jUCIxc.HdbY99RTlPnA2Rlq.ubuAQNCh11l8Yi', 'test', 'test', 'test', 'test', 'bangkok', 'thai', '10222', 'wongsakron', 'test@gmail.com', '0987866360', NULL, NULL, 'verified', 'employer'),
(10, 'test', '$2a$10$DZbXqt7xCXzVKFsUlY3eZuK5sJxRn392bfe5d4iuYpTUPrJard98G', 'test grop', 'test', 'test', 'test', 'bangkok', 'test', '10222', 'wongsakron', 'test@gmail.com', '0987866360', NULL, NULL, 'verified', 'employer'),
(11, 'test20', '$2a$10$n0caColWMSklCTVL76A4QuzkPeYXIcgLoZTiTeei8/3vpEDegQsrS', 'Example Company', '123 Main Street', 'Suburb', 'City', 'State', 'Country', '12345', 'John Doe', 'john.doe@example.com', '1234567890', NULL, 'https://example.com/company_logo.jpg', 'notverify', 'employer'),
(12, 'test30', '$2a$10$NRKfZYV7aUYkfIzuQe5XcebXJXoAv55uptyhaMz0GSwfO6Gt/3xq6', 'test', 'wadawd', 'test', 'wdawd', 'bangkok', 'thai', '10222', 'wongsakron', 'test@gmail.com', '0987866360', NULL, NULL, 'notverify', 'employer'),
(13, 'company1', '$2a$10$RSsHvxdBOayQ3/RLltpR1eE5vtZYX7ZBp9Hnp5NsUZhozi3vnGfV2', 'Tech Solutions Co., Ltd.', '88/42 Sukhumvit Road', 'Khlong Toei Nuea', 'Watthana', 'Bangkok', 'Thailand', '10110', 'Siri Wong', 'siri.wong@example.com', '+6623456789', 'Tech Solutions Co., Ltd. is a leading technology company specializing in innovative software solutions and IT services. We are committed to delivering high-quality products to meet the evolving needs of our clients.', 'https://images.unsplash.com/photo-1533450718592-29d45635f0a9?q=80&w=2070&auto=format&fit=crop&ixlib=', 'notverify', 'employer'),
(14, 'company2', '$2a$10$QBHrphR1ZdeBLaukoS3Qm.FbjH9Weq1oETGMW/f9b0firAeIbujKS', 'Design Hub Ltd.', '55/18 Ratchadaphisek Road', 'Chom Phon', 'Chatuchak', 'Bangkok', 'Thailand', '10900', 'Aom Kittisak', 'aom.kittisak@example.com', '+6629876543', 'Design Hub Ltd. is a creative design agency specializing in user-centric designs for web and mobile applications. Our talented team of designers is dedicated to delivering visually appealing and intuitive solutions.', 'https://images.unsplash.com/photo-1633409361618-c73427e4e206?q=80&w=2080&auto=format&fit=crop&ixlib=', 'notverify', 'employer'),
(15, 'company3', '$2a$10$IyKuur14AbgY7lEeE.adzefV6KTY0HdXuXJO5pH.A6zi73HpZj7AK', 'Networking Solutions Co., Ltd.', '120/15 Phahonyothin Road', 'Phaya Thai', 'Samsen Nai', 'Bangkok', 'Thailand', '10400', 'Nat Kanya', 'nat.kanya@example.com', '+6621234567', 'Networking Solutions Co., Ltd. is a leading provider of network infrastructure solutions. We specialize in designing and implementing robust and secure networks to meet the connectivity needs of businesses.', 'https://images.unsplash.com/photo-1643270650324-f06418d5081a?q=80&w=1974&auto=format&fit=crop&ixlib=', 'notverify', 'employer'),
(16, 'company4', '$2a$10$QOFyJOI1cU4XsmC3B6pm/.83RxFqSKNdbFtOzD8bSjdy47XNsnHli', 'Marketing Plus Co., Ltd.', '30/14 Silom Road', 'Silom', 'Bang Rak', 'Bangkok', 'Thailand', '10500', 'Mike Phongchai', 'mike.phongchai@example.com', '+6623456789', 'Marketing Plus Co., Ltd. is a dynamic marketing agency specializing in strategic marketing solutions. Our team is passionate about creating impactful campaigns to elevate brands and drive business success.', 'https://images.unsplash.com/photo-1574169208507-84376144848b?q=80&w=2079&auto=format&fit=crop&ixlib=', 'notverify', 'employer'),
(17, 'company5', '$2a$10$ppm/rR2frTvsGChHFlS5U.I6nWDkBMt6ibwaFascMKo5rEymfmW..', 'Finance Solutions Ltd.', '75/21 Charoen Krung Road', 'Wat Phraya Krai', 'Bang Kho Laem', 'Bangkok', 'Thailand', '10120', 'Nina Somchai', 'nina.somchai@example.com', '+6629876543', 'Finance Solutions Ltd. is a reputable financial consulting firm providing expert analysis and solutions. Our dedicated team is committed to helping businesses achieve financial success and stability.', 'https://images.unsplash.com/photo-1477238134895-98438ad85c30?q=80&w=2070&auto=format&fit=crop&ixlib=', 'notverify', 'employer');

-- --------------------------------------------------------

--
-- Table structure for table `file_student`
--

CREATE TABLE `file_student` (
  `file_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `file_type` varchar(255) NOT NULL,
  `file_url` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `file_student`
--

INSERT INTO `file_student` (`file_id`, `name`, `file_type`, `file_url`) VALUES
(1, 'demo3.png', 'image/png', 'http://localhost:5000/api/images/demo3.png'),
(2, 'demo3.png', 'image/png', 'uploads/demo3.png'),
(3, 'demo3.png', 'image/png', 'uploads/demo3.png');

-- --------------------------------------------------------

--
-- Table structure for table `posts_job`
--

CREATE TABLE `posts_job` (
  `job_id` int(11) NOT NULL,
  `emp_id` int(11) NOT NULL,
  `job_title` varchar(255) NOT NULL,
  `location` varchar(255) NOT NULL,
  `district` varchar(255) NOT NULL,
  `subdistrict` varchar(255) NOT NULL,
  `province` varchar(255) NOT NULL,
  `country` varchar(255) NOT NULL,
  `pcode` varchar(255) NOT NULL,
  `contact_email` varchar(255) NOT NULL,
  `contact_tel` varchar(255) NOT NULL,
  `position_num` varchar(255) DEFAULT NULL,
  `work_hours` varchar(255) NOT NULL,
  `salary` varchar(255) NOT NULL,
  `welfare` varchar(255) NOT NULL,
  `qualifications` varchar(255) NOT NULL,
  `desc` varchar(1000) NOT NULL,
  `cat` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`cat`)),
  `dateStartPost` date NOT NULL DEFAULT current_timestamp(),
  `dateEndPost` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `posts_job`
--

INSERT INTO `posts_job` (`job_id`, `emp_id`, `job_title`, `location`, `district`, `subdistrict`, `province`, `country`, `pcode`, `contact_email`, `contact_tel`, `position_num`, `work_hours`, `salary`, `welfare`, `qualifications`, `desc`, `cat`, `dateStartPost`, `dateEndPost`) VALUES
(5, 8, 'Software Engineer2', '123/234 main road 2th funbuilding', 'Example District', 'Example Subdistrict', 'Example Province', 'Example Country', '12345', 'example@email.com', '+1234567890', 'SE123', '8:00 - 17:00', '80000', 'candy', 'Bachelor\'s Degree in Computer Science', 'Exciting software engineering opportunity!', '\"[\\\"Programming\\\",\\\"Engineering\\\"]\"', '2024-01-25', '2024-02-25'),
(6, 13, 'Software Developer', '88/42 Sukhumvit Road', 'Watthana', 'Khlong Toei Nuea', 'Bangkok', 'Thailand', '10110', 'devjob@example.com', '+6623456789', '3', '9:00 - 18:00', '300', 'health insurance', 'Bachelor\'s Degree in Computer Science', 'Exciting software development opportunity!', '\"[\\\"Programming\\\",\\\"Engineering\\\"]\"', '2024-01-25', '2024-02-25'),
(7, 14, 'Web Designer', '55/18 Ratchadaphisek Road', 'Chatuchak', 'Chom Phon', 'Bangkok', 'Thailand', '10900', 'designer@example.com', '+6629876543', '2', '10:00 - 19:00', '200', 'flexible work schedule', 'Bachelor\'s Degree in Design', 'Exciting web design opportunity!', '\"[\\\"Design\\\",\\\"Web Development\\\"]\"', '2024-01-20', '2024-02-20'),
(8, 15, 'Network Engineer', '120/15 Phahonyothin Road', 'Samsen Nai', 'Phaya Thai', 'Bangkok', 'Thailand', '10400', 'network@example.com', '+6621234567', '4', '8:30 - 17:30', '400', 'bonus incentives', 'Bachelor\'s Degree in Information Technology', 'Exciting network engineering opportunity!', '\"[\\\"IT\\\",\\\"Networking\\\"]\"', '2024-01-22', '2024-02-22'),
(9, 16, 'Digital Marketing Specialist', '30/14 Silom Road', 'Bang Rak', 'Silom', 'Bangkok', 'Thailand', '10500', 'marketing@example.com', '+6623456789', '2', '9:00 - 18:00', '200', 'health coverage', 'Bachelor\'s Degree in Marketing', 'Exciting digital marketing opportunity!', '\"[\\\"Marketing\\\",\\\"Digital Marketing\\\"]\"', '2024-01-18', '2024-02-18'),
(10, 17, 'Financial Analyst', '75/21 Charoen Krung Road', 'Bang Kho Laem', 'Wat Phraya Krai', 'Bangkok', 'Thailand', '10120', 'finance@example.com', '+6629876543', '3', '8:00 - 17:00', '300', '401(k) matching', 'Bachelor\'s Degree in Finance', 'Exciting financial analysis opportunity!', '\"[\\\"Finance\\\",\\\"Analysis\\\"]\"', '2024-01-25', '2024-02-25');

-- --------------------------------------------------------

--
-- Table structure for table `student`
--

CREATE TABLE `student` (
  `std_id` varchar(11) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `displayname_th` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `displayname_en` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `email` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `department` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `faculty` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `experience` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `skill` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `gpa` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `status` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '1',
  `role` varchar(55) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `student`
--

INSERT INTO `student` (`std_id`, `displayname_th`, `displayname_en`, `email`, `department`, `faculty`, `experience`, `skill`, `gpa`, `status`, `role`) VALUES
('6310611006', 'edit name2', 'wongsakron kongkamud', 'wongsakron.kon@dome.tu.ac.th', 'engineer', 'computer', 'no experience', 'sleep', '5.00', '0', 'student');

-- --------------------------------------------------------

--
-- Table structure for table `studentcsv`
--

CREATE TABLE `studentcsv` (
  `permission_id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `studentcsv`
--

INSERT INTO `studentcsv` (`permission_id`, `username`) VALUES
(155, '6310611006'),
(156, '6310611029'),
(157, '6310611030'),
(158, '6310611031'),
(159, '6310611032'),
(160, '6310611033'),
(161, '6310611034'),
(162, '6310611035'),
(163, '6310611036'),
(164, '6310611037'),
(165, '6310611025'),
(166, '6310611026'),
(167, '6310611027'),
(168, '6310611028'),
(169, '6310611038'),
(170, '6310611039'),
(171, '6310611040'),
(172, '6310611041'),
(173, '6310611042');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`admin_id`);

--
-- Indexes for table `apply`
--
ALTER TABLE `apply`
  ADD PRIMARY KEY (`apply_id`),
  ADD KEY `fk_apply_employer_id` (`employer_id`),
  ADD KEY `fk_apply_student_id` (`std_id`),
  ADD KEY `fk_apply_post_id` (`job_id`);

--
-- Indexes for table `employer`
--
ALTER TABLE `employer`
  ADD PRIMARY KEY (`employer_id`);

--
-- Indexes for table `file_student`
--
ALTER TABLE `file_student`
  ADD PRIMARY KEY (`file_id`);

--
-- Indexes for table `posts_job`
--
ALTER TABLE `posts_job`
  ADD PRIMARY KEY (`job_id`),
  ADD KEY `emp_id` (`emp_id`);

--
-- Indexes for table `student`
--
ALTER TABLE `student`
  ADD PRIMARY KEY (`std_id`);

--
-- Indexes for table `studentcsv`
--
ALTER TABLE `studentcsv`
  ADD PRIMARY KEY (`permission_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `admin_id` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `apply`
--
ALTER TABLE `apply`
  MODIFY `apply_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `employer`
--
ALTER TABLE `employer`
  MODIFY `employer_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `file_student`
--
ALTER TABLE `file_student`
  MODIFY `file_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `posts_job`
--
ALTER TABLE `posts_job`
  MODIFY `job_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `studentcsv`
--
ALTER TABLE `studentcsv`
  MODIFY `permission_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=174;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `apply`
--
ALTER TABLE `apply`
  ADD CONSTRAINT `fk_apply_employer_id` FOREIGN KEY (`employer_id`) REFERENCES `employer` (`employer_id`),
  ADD CONSTRAINT `fk_apply_post_id` FOREIGN KEY (`job_id`) REFERENCES `posts_job` (`job_id`),
  ADD CONSTRAINT `fk_apply_student_id` FOREIGN KEY (`std_id`) REFERENCES `student` (`std_id`);

--
-- Constraints for table `posts_job`
--
ALTER TABLE `posts_job`
  ADD CONSTRAINT `fk_posts_employer_id` FOREIGN KEY (`emp_id`) REFERENCES `employer` (`employer_id`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
