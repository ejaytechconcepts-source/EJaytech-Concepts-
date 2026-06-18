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
    message: "Your application could not be verified or approved at this time. Please contact our local Capital Plaza Abuja office.",
    status: "unread",
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
    title: courseData.title,
    description: courseData.description,
    duration: courseData.duration,
    fee: courseData.fee,
    requirements: courseData.requirements || "",
    syllabus: Array.isArray(courseData.syllabus) ? courseData.syllabus : courseData.syllabus.split(",").map(s => s.trim()).filter(Boolean),
    thingsYouWillLearn: courseData.thingsYouWillLearn || ""
  };
  
  await db.collection("courses").doc(id).set(courseRecord);
  
  // Dispatch notification mapping announcement
  await db.collection("notifications").add({
    studentId: "all",
    title: "New Course Open!",
    message: `EJaytech has unlocked the new syllabus tracking: "${courseRecord.title}". Inquire about registration now!`,
    status: "unread",
    createdAt: new Date().toISOString()
  });

  return courseRecord;
}

/**
 * Add Study Learning Material attachment after uploading file to Storage
 */
async function createLearningMaterialAdmin(title, description, courseId, fileObj) {
  let downloadUrl = "#";
  let sizeLabel = "1.2 MB";

  if (fileObj) {
    sizeLabel = (fileObj.size / (1024 * 1024)).toFixed(1) + " MB";
    const storagePath = `learning_materials/${courseId}/${Date.now()}_${fileObj.name}`;
    const uploadTask = await storage.ref().child(storagePath).put(fileObj);
    downloadUrl = await uploadTask.ref.getDownloadURL();
  }

  const materialRecord = {
    id: "material-" + Date.now(),
    courseId,
    title,
    description: description || "No description provided.",
    filePath: downloadUrl,
    fileSize: sizeLabel,
    uploadedAt: new Date().toISOString()
  };

  await db.collection("materials").doc(materialRecord.id).set(materialRecord);

  // Broadcast alert to everyone in that course
  await db.collection("notifications").add({
    studentId: "all", // Broadcast notifications handles course mapping on client side
    title: "Syllabus files uploaded!",
    message: `New class reading material cataloged: "${title}". Browse yours under study space materials dashboards.`,
    status: "unread",
    createdAt: new Date().toISOString()
  });

  return materialRecord;
}

/**
 * Push customized notification or administrative global alerts
 */
async function createSystemAnnouncement(title, message, studentId) {
  const finalId = studentId || "all";
  await db.collection("notifications").add({
    id: "ann-" + Date.now(),
    studentId: finalId,
    title,
    message,
    status: "unread",
    createdAt: new Date().toISOString()
  });
}
