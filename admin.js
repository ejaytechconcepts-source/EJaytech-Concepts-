/**
 * EJaytech Concepts - Administrator Dashboard Logic
 * Integrates admin capabilities: approving/rejecting accounts, managing courses list,
 * posting public notifications, and uploading study resource files.
 */

/**
 * Fetch list of all registered students in the system
 */
async function getRegisteredStudentsList() {
  const snapshot = await db.collection("students").get();
  const list = [];
  snapshot.forEach(doc => {
    list.push({ uid: doc.id, ...doc.data() });
  });
  return list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
}

/**
 * Approve student registration
 */
async function approveStudentApplication(uid, studentId) {
  await db.collection("students").doc(uid).update({ status: "Approved" });
  
  // Create success notification record for the approved user
  await db.collection("notifications").add({
    studentId: studentId,
    title: "Application Approved!",
    message: "Congratulations! Your registration has been approved. You now have full access to study materials and certification courses.",
    status: "unread",
    type: "Approval Notification",
    createdAt: new Date().toISOString()
  });

  console.log(`[Email Simulation]: Registration confirmation sent successfully to verified student: ID ${studentId}`);
}

/**
 * Reject student registration
 */
async function rejectStudentApplication(uid, studentId) {
  await db.collection("students").doc(uid).update({ status: "Rejected" });
  
  // Create audit failure warning trigger
  await db.collection("notifications").add({
    studentId: studentId,
    title: "Application Audited",
    message: "Your application could not be verified or approved at this time. Please contact our local Capital Plaza Abeokuta office.",
    status: "unread",
    type: "Rejection Notification",
    createdAt: new Date().toISOString()
  });
}

/**
 * Update registry indexes of student records
 */
async function editStudentRecordAdmin(uid, data) {
  await db.collection("students").doc(uid).update(data);
}

/**
 * Permanently purge student records (Administrative clearance)
 */
async function deleteStudentRecordAdmin(uid) {
  await db.collection("students").doc(uid).delete();
}

/**
 * Retrieve courses list catalogue from database 
 */
async function getCoursesList() {
  const snapshot = await db.collection("courses").get();
  const list = [];
  snapshot.forEach(doc => {
    list.push({ id: doc.id, ...doc.data() });
  });
  return list;
}

/**
 * Create or save courses list detail specifications inside database
 */
async function createCourseAdmin(courseData) {
  const id = "course-" + Date.now();
  const courseRecord = {
    id,
    courseName: courseData.courseName || courseData.title,
    title: courseData.title || courseData.courseName,
    description: courseData.description,
    duration: courseData.duration,
    fee: courseData.fee,
    requirements: courseData.requirements || "",
    learningOutcomes: courseData.learningOutcomes || "",
    courseImage: courseData.courseImage || "",
    isArchived: false,
    syllabus: Array.isArray(courseData.syllabus) ? courseData.syllabus : (courseData.syllabus || "").split(",").map(s => s.trim()).filter(Boolean),
    thingsYouWillLearn: courseData.thingsYouWillLearn || courseData.learningOutcomes || ""
  };
  
  await db.collection("courses").doc(id).set(courseRecord);
  
  // Dispatch notification mapping announcement
  await db.collection("notifications").add({
    studentId: "all",
    title: "New Course Open!",
    message: `EJaytech has unlocked the new syllabus tracking: "${courseRecord.title}". Inquire about registration now!`,
    status: "unread",
    type: "Course Update",
    createdAt: new Date().toISOString()
  });

  return courseRecord;
}

/**
 * Update course details
 */
async function updateCourseAdmin(courseId, courseData) {
  const courseRecord = {
    courseName: courseData.courseName || courseData.title,
    title: courseData.title || courseData.courseName,
    description: courseData.description,
    duration: courseData.duration,
    fee: courseData.fee,
    requirements: courseData.requirements || "",
    learningOutcomes: courseData.learningOutcomes || "",
    courseImage: courseData.courseImage || "",
    isArchived: courseData.isArchived === true,
    syllabus: Array.isArray(courseData.syllabus) ? courseData.syllabus : (courseData.syllabus || "").split(",").map(s => s.trim()).filter(Boolean),
    thingsYouWillLearn: courseData.thingsYouWillLearn || courseData.learningOutcomes || ""
  };
  await db.collection("courses").doc(courseId).update(courseRecord);
}

/**
 * Archive/Unarchive course
 */
async function archiveCourseAdmin(courseId, isArchived) {
  await db.collection("courses").doc(courseId).update({ isArchived: !!isArchived });
}

/**
 * Delete course permanently
 */
async function deleteCourseAdmin(courseId) {
  await db.collection("courses").doc(courseId).delete();
}

/**
 * Retrieve learning materials list
 */
async function getMaterialsList() {
  const snapshot = await db.collection("materials").get();
  const list = [];
  snapshot.forEach(doc => {
    list.push({ id: doc.id, ...doc.data() });
  });
  return list;
}

/**
 * Put Study Learning Material attachment after uploading file to Storage
 */
async function createLearningMaterialAdmin(title, description, courseId, fileObj, fileType = "PDF") {
  let downloadUrl = "#";
  let sizeLabel = "1.2 MB";

  if (fileObj && fileObj.size) {
    sizeLabel = (fileObj.size / (1024 * 1024)).toFixed(1) + " MB";
    const storagePath = `learning_materials/${courseId}/${Date.now()}_${fileObj.name}`;
    try {
      const uploadTask = await storage.ref().child(storagePath).put(fileObj);
      downloadUrl = await uploadTask.ref.getDownloadURL();
    } catch (err) {
      console.warn("Storage upload skipped or failed, using a simulation URL.", err);
      downloadUrl = "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf";
    }
  } else {
    // simulation or standard fallback file
    downloadUrl = "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf";
  }

  const materialRecord = {
    id: "material-" + Date.now(),
    courseId,
    title,
    description: description || "No description provided.",
    filePath: downloadUrl,
    fileSize: sizeLabel,
    fileType: fileType, // PDF, Video, Image, Assignment
    uploadedAt: new Date().toISOString()
  };

  await db.collection("materials").doc(materialRecord.id).set(materialRecord);

  // Broadcast alert to everyone in that course
  await db.collection("notifications").add({
    studentId: "all",
    title: "New study material file uploaded!",
    message: `New class reading material cataloged: "${title}". Browse yours under study space materials dashboards.`,
    status: "unread",
    type: "Assignment Notification",
    createdAt: new Date().toISOString()
  });

  return materialRecord;
}

/**
 * Delete a study material record
 */
async function deleteLearningMaterialAdmin(materialId) {
  await db.collection("materials").doc(materialId).delete();
}

/**
 * Fetch campus Announcements
 */
async function getAnnouncementsList() {
  const snapshot = await db.collection("announcements").get();
  const list = [];
  snapshot.forEach(doc => {
    list.push({ id: doc.id, ...doc.data() });
  });
  return list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
}

/**
 * Create Announcement
 */
async function createAnnouncementAdmin(title, message) {
  const id = "ann-" + Date.now();
  const announcementRecord = {
    id,
    title,
    message,
    createdAt: new Date().toISOString()
  };
  
  // Write to announcements collection
  await db.collection("announcements").doc(id).set(announcementRecord);

  // Broadly syndicate as a global notification
  await db.collection("notifications").add({
    studentId: "all",
    title: `Announcement: ${title}`,
    message,
    status: "unread",
    type: "General Notice",
    createdAt: new Date().toISOString()
  });

  return announcementRecord;
}

/**
 * Edit announcement
 */
async function editAnnouncementAdmin(annId, data) {
  await db.collection("announcements").doc(annId).update(data);
}

/**
 * Delete announcement
 */
async function deleteAnnouncementAdmin(annId) {
  await db.collection("announcements").doc(annId).delete();
}

/**
 * Fetch all notifications for notification management history
 */
async function getNotificationsHistoryList() {
  const snapshot = await db.collection("notifications").get();
  const list = [];
  snapshot.forEach(doc => {
    list.push({ id: doc.id, ...doc.data() });
  });
  return list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
}

/**
 * Delete notice
 */
async function deleteNotificationAdmin(notifId) {
  await db.collection("notifications").doc(notifId).delete();
}

/**
 * Create custom administrative system alert
 */
async function createSystemAnnouncement(title, message, studentId) {
  const finalId = studentId || "all";
  await db.collection("notifications").add({
    studentId: finalId,
    title,
    message,
    status: "unread",
    type: "General Notice",
    createdAt: new Date().toISOString()
  });
}

/**
 * Fetch logged Admin document
 */
async function getAdminProfile(uid) {
  const docRef = await db.collection("admins").doc(uid).get();
  if (docRef.exists) {
    return docRef.data();
  }
  // Default fallback if not found
  return {
    username: "EJaytech Chief Admin",
    email: "admin@ejaytech.com",
    darkModeEnabled: false,
    profilePictureUrl: "",
    websiteSettings: {
      siteName: "EJaytech Concepts",
      contactPhone: "07033719342",
      contactEmail: "ejaytechconcepts@gmail.com",
      headOfficeAddress: "04 Akande Oke Street, Eleweran, Abeokuta"
    }
  };
}

/**
 * Edit administrator settings profile details
 */
async function updateAdminProfile(uid, data) {
  await db.collection("admins").doc(uid).update(data);
}

/**
 * Change authenticated user's password
 */
async function changeAdminPassword(newPassword) {
  const user = auth.currentUser;
  if (!user) throw new Error("No active admin user session.");
  await user.updatePassword(newPassword);
}
