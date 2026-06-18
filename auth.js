/**
 * EJaytech Concepts - Authentication Module
 * Manages sign up, custom registrations, role checks, and session states.
 */

// Generate a unique sequential-style Student ID index: EJ-YEAR-4RANDOM
function generateStudentId() {
  const year = new Date().getFullYear();
  const randNum = Math.floor(1000 + Math.random() * 9000);
  return `EJ-${year}-${randNum}`;
}

/**
 * Handle student application registration
 */
async function registerStudentAccount(data) {
  const { fullname, email, phone, gender, dob, state, address, course, password } = data;
  
  if (!fullname || !email || !phone || !gender || !dob || !state || !address || !course || !password) {
    throw new Error("Missing required fields. All registration inputs are mandatory.");
  }
  
  // 1. Create standard Firebase Authentication login credential
  const credential = await auth.createUserWithEmailAndPassword(email, password);
  const user = credential.user;
  
  // 2. Formulate student record inside Firestore under the student's unique authentication UID
  const studentId = generateStudentId();
  const studentRecord = {
    uid: user.uid,
    studentId,
    fullname,
    email: email.toLowerCase().trim(),
    phone,
    gender,
    dob,
    state,
    address,
    course,
    status: "Pending", // Awaiting administrator approval
    createdAt: isRealFirebase ? firebase.firestore.FieldValue.serverTimestamp() : new Date().toISOString(),
    bio: "Enthusiastic EJaytech Concepts student.",
    lastDocumentSubmitted: ""
  };
  
  await db.collection("students").doc(user.uid).set(studentRecord);
  
  // 3. Create initial notification alert welcomed to their portal
  const welcomeNotif = {
    studentId: studentId,
    title: "Application Received Under Review",
    message: `Welcome ${fullname}! Your student identification ID is assigned as ${studentId}. It is currently under administrative audit. Checked back soon!`,
    status: "unread",
    createdAt: new Date().toISOString()
  };
  await db.collection("notifications").add(welcomeNotif);

  return studentRecord;
}

/**
 * Handle user email login
 */
async function loginUserAccount(email, password) {
  const credential = await auth.signInWithEmailAndPassword(email, password);
  const user = credential.user;
  
  // Check if they are admin
  if (email.toLowerCase().trim() === "admin@ejaytech.com") {
    return { user, role: "admin" };
  }

  // Retrieve student profile record
  const studentDoc = await db.collection("students").doc(user.uid).get();
  
  if (!studentDoc.exists) {
    // Check if we can find them in collection by search
    throw new Error("Student registration record not found in the database. Please contact support.");
  }
  
  const student = studentDoc.data();
  return { user, student, role: "student" };
}

/**
 * Send password reset email
 */
async function resetStudentPassword(email) {
  if (!email) throw new Error("Email address is required to reset passwords.");
  await auth.sendPasswordResetEmail(email);
}

/**
 * Logout session
 */
async function logoutSession() {
  await auth.signOut();
  window.location.href = "portal.html";
}

/**
 * Synchronize and enforce secure Session access on Student and Admin pages
 */
function protectPageAccess(requiredRole) {
  auth.onAuthStateChanged(async (user) => {
    if (!user) {
      console.log("No authenticated user session, redirecting to portal.");
      window.location.href = "portal.html";
      return;
    }

    if (requiredRole === "admin") {
      if (user.email !== "admin@ejaytech.com") {
        console.warn("Unauthorized administrative access attempt, booting to student page!");
        window.location.href = "student-dashboard.html";
      }
    } else if (requiredRole === "student") {
      if (user.email === "admin@ejaytech.com") {
        window.location.href = "admin-dashboard.html";
        return;
      }
      
      // Load current student record to check status
      try {
        const studentDoc = await db.collection("students").doc(user.uid).get();
        if (studentDoc.exists) {
          const student = studentDoc.data();
          if (student.status === "Rejected") {
            alert("Your student application details have been audited and rejected on administrative basis.");
            await auth.signOut();
            window.location.href = "portal.html";
          }
        } else {
          // If a student doesn't exist, sign out
          await auth.signOut();
          window.location.href = "portal.html";
        }
      } catch (err) {
        console.error("Session verification fetch failed:", err);
      }
    }
  });
}
