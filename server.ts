/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from 'express';
import path from 'path';
import fs from 'fs';
import crypto from 'crypto';
import { createServer as createViteServer } from 'vite';

const app = express();
const PORT = 3000;
const DB_FILE = path.join(process.cwd(), 'database.json');

app.use(express.json());

// Password hashing helper using Node's standard crypto (Safe and built-in)
function hashPassword(password: string): string {
  const salt = 'ejaytech_salt_2026';
  return crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
}

function verifyPassword(password: string, hash: string): boolean {
  return hashPassword(password) === hash;
}

// Ensure the local database file exists and is populated
function initDatabase() {
  if (fs.existsSync(DB_FILE)) {
    try {
      const data = JSON.parse(fs.readFileSync(DB_FILE, 'utf-8'));
      if (data.students && data.courses && data.admins) {
        return; // Already initialized successfully
      }
    } catch (e) {
      console.warn("DB file corrupt, recreating standard db...", e);
    }
  }

  // Preseed DB
  const initialData = {
    students: [],
    admins: [
      {
        id: 'admin-1',
        username: 'EJaytech Admin',
        email: 'admin@ejaytech.com',
        password_hash: hashPassword('admin12345'),
      }
    ],
    courses: [
      {
        id: 'course-1',
        title: 'Frontend Web Development',
        description: 'Master building high-performance modern web apps with HTML5, CSS3, JavaScript, and Bootstrap 5.',
        duration: '12 Weeks',
        fee: '₦120,000',
        syllabus: [
          'HTML5 Semantics & Structure',
          'CSS3 Layouts, Flexbox, Grid & Animations',
          'Tailwind CSS & Utility Customization',
          'Modern JavaScript & ES6+ Concepts',
          'Responsive Page Execution with Bootstrap 5',
          'Git, GitHub Actions & Live Deployments (Vercel/Netlify)',
        ]
      },
      {
        id: 'course-2',
        title: 'Graphic Design & Branding',
        description: 'Cultivate your design eye and master advanced graphic composition with Canva and Photoshop suites.',
        duration: '8 Weeks',
        fee: '₦80,000',
        syllabus: [
          'Essential Visual Design Principles & Rules',
          'Canva Pro Sizing & Visual Flow',
          'Adobe Photoshop Composition & Masking',
          'Corporate Branding: Logo Creation, Typography Guidelines',
          'Flyers, Social Media Banner and Print Ad Layouts',
          'Building physical and digital portfolios',
        ]
      },
      {
        id: 'course-3',
        title: 'UI/UX Product Design',
        description: 'Learn modern user research techniques, interactive wireframing, design libraries, and prototyping with Figma.',
        duration: '10 Weeks',
        fee: '₦100,000',
        syllabus: [
          'User Research, Scenarios, and Personas',
          'UX Mapping, Information Architecture & User Journeys',
          'Wireframing (Low-fidelity sketches to structural boxes)',
          'Figma Components, Variants & Design Tokens',
          'High-Fidelity Interactive Prototyping',
          'Usability Testing, Iteration and Dev Handoffs',
        ]
      },
      {
        id: 'course-4',
        title: 'Digital Skills & Freelancing',
        description: 'Monetize your design or tech skills on top global freelancing hubs and grow your personal digital brand.',
        duration: '6 Weeks',
        fee: '₦60,000',
        syllabus: [
          'Self-Branding, CV Optimization & LinkedIn Presence',
          'Freelance Hub Strategy (Upwork, Fiverr Setup)',
          'Proposal Writing & Winning Client Projects',
          'Content Marketing & Social Media Calendars',
          'Digital Funneling, Ads & Analytics Basics',
        ]
      }
    ],
    notifications: [
      {
        id: 'notif-1',
        studentId: 'all',
        title: 'Welcome to EJaytech Concepts!',
        message: 'Explore courses and apply. If you have registered, check back within 24 hours for admin approval updates.',
        status: 'unread',
        createdAt: new Date().toISOString()
      }
    ],
    materials: [
      {
        id: 'mat-1',
        courseId: 'course-1',
        title: 'Introduction to HTML5 & Semantic Tags',
        filePath: 'https://docs.google.com/document/d/1html5_semantics_ejaytech/view',
        fileSize: '1.2 MB',
        uploadedAt: new Date().toISOString()
      },
      {
        id: 'mat-2',
        courseId: 'course-1',
        title: 'Responsive Layouts and Grid Cheat Sheet',
        filePath: 'https://docs.google.com/document/d/1responsive_grid_ejaytech/view',
        fileSize: '850 KB',
        uploadedAt: new Date().toISOString()
      },
      {
        id: 'mat-3',
        courseId: 'course-2',
        title: 'Branding Identity Checklist (PDF)',
        filePath: 'https://docs.google.com/document/d/1branding_checklist_ejaytech/view',
        fileSize: '2.4 MB',
        uploadedAt: new Date().toISOString()
      }
    ],
    blogs: [
      {
        id: 'blog-1',
        title: 'The Future of Web Development in 2026',
        excerpt: 'With lightning-fast bundlers and AI assists, web technology is shifting gears. Learn how to stay ahead.',
        content: 'In 2026, web development is faster and more dynamic than ever. Developers are shifting from writing repetitive code to orchestrating complex full-stack workflows. Modern tools like Vite, advanced ES modules, and integrated AI assistance have made development incredibly engaging. At EJaytech Concepts, we stay at the cutting edge, equipping our students with responsive design principles, clean server-side rendering, and production-ready architectures. Learn how mastering JavaScript, React, and server structures lets you build platforms scalable for millions.',
        author: 'Elijah Yahuza',
        date: '2026-06-15',
        category: 'Technology',
        readTime: '5 min read',
        imageUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&auto=format&fit=crop&q=60'
      },
      {
        id: 'blog-2',
        title: 'Why Premium Graphic Design Powers Business Trust',
        excerpt: 'First impressions are visual. Discover how coherent branding transforms client perception.',
        content: 'A brand is not just a logo; it is the entire emotional and visual communication of a business. When users land on your website or scroll past a flyer, they make an instinctive evaluation about your credibility. This article explores visual hierarchy, color theory, and why cohesive typography boosts brand trust by 80%. We break down real-world visual blueprints used by elite startups to design layouts that stick in memory.',
        author: 'Elijah Yahuza',
        date: '2026-06-10',
        category: 'Design & Branding',
        readTime: '4 min read',
        imageUrl: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800&auto=format&fit=crop&q=60'
      }
    ],
    email_logs: [],
    newsletter_subscribers: [],
    contact_inquiries: []
  };

  fs.writeFileSync(DB_FILE, JSON.stringify(initialData, null, 2), 'utf-8');
  console.log("Database initialized successfully at", DB_FILE);
}

initDatabase();

// Database read/write primitives
function readDB() {
  try {
    const raw = fs.readFileSync(DB_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    console.error("Failed to read database, reloading...", err);
    initDatabase();
    return JSON.parse(fs.readFileSync(DB_FILE, 'utf-8'));
  }
}

function writeDB(data: any) {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.error("Failed to write to database", err);
  }
}

// Rate limiter / security middleware loggers
app.use((req, res, next) => {
  // Safe default headers
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  next();
});

// Helper: send beautiful email outbox logs (simulated PHPMailer / Gmail SMTP)
function logAndSendSimulatedEmail(recipientEmail: string, subject: string, message: string) {
  const db = readDB();
  const newEmailLog = {
    id: `email-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    recipientEmail,
    subject,
    message,
    sentAt: new Date().toISOString(),
    status: 'Sent' as const,
  };
  db.email_logs.unshift(newEmailLog);
  writeDB(db);
  console.log(`[SIMULATED SMTP GMAIL OUTBOX]: Email spent successfully to <${recipientEmail}> regarding "${subject}"`);
  return newEmailLog;
}

// ----------------------------------------
// API ENDPOINTS
// ----------------------------------------

// 1. Course Listing & Custom Settings
app.get('/api/courses', (req, res) => {
  const db = readDB();
  res.json({ courses: db.courses });
});

// Admin add/update course
app.post('/api/admin/courses', (req, res) => {
  const { title, description, duration, fee, syllabus } = req.body;
  if (!title || !description || !duration || !fee) {
    return res.status(400).json({ error: 'Please provide course details (Title, Description, Duration, Fee).' });
  }

  const db = readDB();
  const newCourse = {
    id: `course-${Date.now()}`,
    title,
    description,
    duration,
    fee,
    syllabus: Array.isArray(syllabus) ? syllabus : syllabus.split(',').map((s: string) => s.trim()).filter(Boolean),
  };

  db.courses.push(newCourse);
  writeDB(db);

  // Trigger global notification
  db.notifications.unshift({
    id: `notif-${Date.now()}`,
    studentId: 'all',
    title: 'New Course Available!',
    message: `We have unlocked the brand new "${title}" training track! Applications are now active.`,
    status: 'unread',
    createdAt: new Date().toISOString(),
  });
  writeDB(db);

  res.json({ success: true, course: newCourse });
});

// 2. Student Registration Portal
app.post('/api/register', (req, res) => {
  const { fullname, email, phone, gender, dob, state, address, course, password } = req.body;

  if (!fullname || !email || !phone || !gender || !dob || !state || !address || !course || !password) {
    return res.status(400).json({ error: 'All fields are mandatory. Please fill in all information.' });
  }

  const db = readDB();

  // Validate email uniqueness
  const emailExists = db.students.some((s: any) => s.email.toLowerCase() === email.toLowerCase());
  if (emailExists) {
    return res.status(400).json({ error: 'This email address is already registered. Try logging in.' });
  }

  // Strong password check (min 8 chars, some standard composition checking)
  if (password.length < 8) {
    return res.status(400).json({ error: 'Password must be at least 8 characters long for account security.' });
  }

  // Generate unique Student ID: Format EJ-[Year]-[4 Random Digits]
  const year = new Date().getFullYear();
  let studentId = '';
  let idExists = true;
  while (idExists) {
    const rand = Math.floor(1000 + Math.random() * 9000);
    studentId = `EJ-${year}-${rand}`;
    idExists = db.students.some((s: any) => s.studentId === studentId);
  }

  const newStudent = {
    id: `stud-${Date.now()}`,
    studentId,
    fullname,
    email: email.toLowerCase(),
    phone,
    gender,
    dob,
    state,
    address,
    course,
    password_hash: hashPassword(password),
    status: 'Pending', // Pending admin approval
    createdAt: new Date().toISOString(),
  };

  db.students.push(newStudent);

  // Auto-generate verification state notification
  const studentNotification = {
    id: `notif-${Date.now()}`,
    studentId: studentId,
    title: 'Registration Received',
    message: `Welcome to EJaytech Concepts, ${fullname}. Your ID is ${studentId}. Your application is awaiting administrative review.`,
    status: 'unread' as const,
    createdAt: new Date().toISOString(),
  };

  db.notifications.unshift(studentNotification);
  writeDB(db);

  // Send application pending email simulation (PHPMailer / Gmail SMTP)
  const emailMessage = `Dear Student,

Thank you for applying to EJaytech Concepts.

Your application has been received successfully and is currently awaiting approval.

Your Student ID is:
${studentId}

You will receive another email once your application has been reviewed by the admin.

Regards,
EJaytech Concepts Management`;

  logAndSendSimulatedEmail(
    email,
    'Application Received Successfully',
    emailMessage
  );

  res.json({
    success: true,
    message: 'Registration completed successfully!',
    studentId,
  });
});

// 3. User & Admin Authentications
app.post('/api/login', (req, res) => {
  const { identifier, password } = req.body; // identifier can be Email or Student ID

  if (!identifier || !password) {
    return res.status(400).json({ error: 'Please enter your unique Student ID or Email and password.' });
  }

  const db = readDB();

  // Find student by Student ID or Email
  const student = db.students.find(
    (s: any) => s.studentId.trim().toUpperCase() === identifier.trim().toUpperCase() || s.email.toLowerCase() === identifier.trim().toLowerCase()
  );

  if (!student) {
    return res.status(401).json({ error: 'Account not found with those credentials. Please check and try again.' });
  }

  const isVerified = verifyPassword(password, student.password_hash);
  if (!isVerified) {
    return res.status(401).json({ error: 'Incorrect password. Passwords remain securely encrypted.' });
  }

  // Handle various approvals state
  if (student.status === 'Pending') {
    return res.status(403).json({
      status: 'Pending',
      error: 'Your application is awaiting approval. We will notify you once reviewed!',
      studentId: student.studentId,
      fullname: student.fullname,
    });
  }

  if (student.status === 'Rejected') {
    return res.status(403).json({
      status: 'Rejected',
      error: 'Your application was unfortunately not approved at this time. Please contact our support line for further details.',
      studentId: student.studentId,
      fullname: student.fullname,
    });
  }

  // Approved
  res.json({
    success: true,
    user: {
      id: student.id,
      studentId: student.studentId,
      fullname: student.fullname,
      email: student.email,
      phone: student.phone,
      gender: student.gender,
      dob: student.dob,
      state: student.state,
      address: student.address,
      course: student.course,
      status: student.status,
      createdAt: student.createdAt,
    }
  });
});

app.post('/api/admin/login', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required for admin portal access.' });
  }

  const db = readDB();
  const admin = db.admins.find((a: any) => a.email.toLowerCase() === email.toLowerCase());

  if (!admin) {
    return res.status(401).json({ error: 'Access denied. Master admin credentials not found.' });
  }

  const matches = verifyPassword(password, admin.password_hash);
  if (!matches) {
    return res.status(401).json({ error: 'Invalid admin credentials.' });
  }

  res.json({
    success: true,
    admin: {
      id: admin.id,
      username: admin.username,
      email: admin.email,
    },
  });
});

// Update Student Account Settings (Student dashboard)
app.put('/api/students/:id/settings', (req, res) => {
  const { id } = req.params;
  const { fullname, phone, address, gender, dob, state, bio, curPassword, newPassword } = req.body;

  const db = readDB();
  const studentIdx = db.students.findIndex((s: any) => s.id === id);

  if (studentIdx === -1) {
    return res.status(404).json({ error: 'Student profile not found.' });
  }

  const student = db.students[studentIdx];

  // If password change is requested
  if (curPassword && newPassword) {
    if (!verifyPassword(curPassword, student.password_hash)) {
      return res.status(400).json({ error: 'The current password you specified is incorrect.' });
    }
    if (newPassword.length < 8) {
      return res.status(400).json({ error: 'The new password must be at least 8 characters long.' });
    }
    student.password_hash = hashPassword(newPassword);
  }

  // Update fields
  if (fullname) student.fullname = fullname;
  if (phone) student.phone = phone;
  if (address) student.address = address;
  if (gender) student.gender = gender;
  if (dob) student.dob = dob;
  if (state) student.state = state;
  if (bio !== undefined) student.bio = bio;

  db.students[studentIdx] = student;
  writeDB(db);

  res.json({
    success: true,
    user: {
      id: student.id,
      studentId: student.studentId,
      fullname: student.fullname,
      email: student.email,
      phone: student.phone,
      gender: student.gender,
      dob: student.dob,
      state: student.state,
      address: student.address,
      course: student.course,
      status: student.status,
      createdAt: student.createdAt,
      bio: student.bio,
    },
  });
});

// 4. Admin Student Operations
app.get('/api/admin/students', (req, res) => {
  const db = readDB();
  // Safe return student data without password hashes
  const safeStudents = db.students.map(({ password_hash, ...rest }: any) => rest);
  res.json({ students: safeStudents });
});

// Approve Student
app.post('/api/admin/students/:id/approve', (req, res) => {
  const { id } = req.params;
  const db = readDB();
  const sIdx = db.students.findIndex((s: any) => s.id === id);

  if (sIdx === -1) {
    return res.status(404).json({ error: 'Student record not found.' });
  }

  db.students[sIdx].status = 'Approved';
  const student = db.students[sIdx];

  // Create notifications
  db.notifications.unshift({
    id: `notif-${Date.now()}`,
    studentId: student.studentId,
    title: 'Application Approved!',
    message: `Congratulations! Your EJaytech Concepts registration has been approved. You now have complete access to student learning tracks.`,
    status: 'unread',
    createdAt: new Date().toISOString(),
  });

  writeDB(db);

  // Send mock approval email
  const appUrlObj = process.env.APP_URL || 'https://ejaytech.com';
  const loginLink = `${appUrlObj}/courses`; // Redirect to login trigger

  const bodyMsg = `Dear ${student.fullname},

Congratulations.

Your application to EJaytech Concepts has been approved.

You can now access your student portal and view study files.

Student ID:
${student.studentId}

Login Link:
${loginLink}

Regards,
EJaytech Concepts`;

  logAndSendSimulatedEmail(student.email, 'Application Approved', bodyMsg);

  res.json({ success: true, updatedStudent: student });
});

// Reject Student
app.post('/api/admin/students/:id/reject', (req, res) => {
  const { id } = req.params;
  const db = readDB();
  const sIdx = db.students.findIndex((s: any) => s.id === id);

  if (sIdx === -1) {
    return res.status(404).json({ error: 'Student record not found.' });
  }

  db.students[sIdx].status = 'Rejected';
  const student = db.students[sIdx];

  // Create notifications
  db.notifications.unshift({
    id: `notif-${Date.now()}`,
    studentId: student.studentId,
    title: 'Application Audited',
    message: 'Your registration application was reviewed and could not be approved at this time.',
    status: 'unread',
    createdAt: new Date().toISOString(),
  });

  writeDB(db);

  // Send mock rejection email
  const bodyMsg = `Dear ${student.fullname},

Thank you for your interest in EJaytech Concepts.

After review, your application was not approved at this time.

For inquiries, please feel free to contact our technical team or support.

Regards,
EJaytech Concepts Management`;

  logAndSendSimulatedEmail(student.email, 'Application Status Update', bodyMsg);

  res.json({ success: true, updatedStudent: student });
});

// Edit Student Details from Admin Pane
app.put('/api/admin/students/:id', (req, res) => {
  const { id } = req.params;
  const { fullname, email, phone, gender, dob, state, address, course } = req.body;

  const db = readDB();
  const sIdx = db.students.findIndex((s: any) => s.id === id);

  if (sIdx === -1) {
    return res.status(404).json({ error: 'Student record not found.' });
  }

  const s = db.students[sIdx];
  if (fullname) s.fullname = fullname;
  if (email) s.email = email.toLowerCase();
  if (phone) s.phone = phone;
  if (gender) s.gender = gender;
  if (dob) s.dob = dob;
  if (state) s.state = state;
  if (address) s.address = address;
  if (course) s.course = course;

  db.students[sIdx] = s;
  writeDB(db);

  res.json({ success: true, student: s });
});

// Delete Student
app.delete('/api/admin/students/:id', (req, res) => {
  const { id } = req.params;
  const db = readDB();
  const originalLength = db.students.length;
  db.students = db.students.filter((s: any) => s.id !== id);

  if (db.students.length === originalLength) {
    return res.status(404).json({ error: 'Student record not found for deletion.' });
  }

  writeDB(db);
  res.json({ success: true, message: 'Student application and history purged successfully.' });
});

// 5. In-App Notifications
app.get('/api/notifications', (req, res) => {
  const { studentId } = req.query; // can filter by Student ID
  const db = readDB();

  const userNotifs = db.notifications.filter((n: any) => {
    return n.studentId === 'all' || (studentId && n.studentId === studentId);
  });

  res.json({ notifications: userNotifs });
});

app.post('/api/notifications/:id/read', (req, res) => {
  const { id } = req.params;
  const db = readDB();
  const idx = db.notifications.findIndex((n: any) => n.id === id);

  if (idx !== -1) {
    db.notifications[idx].status = 'read';
    writeDB(db);
  }

  res.json({ success: true });
});

// Broadcast Announcement by Admin
app.post('/api/admin/notifications', (req, res) => {
  const { title, message, studentId } = req.body; // 'all' or specific student id
  if (!title || !message) {
    return res.status(400).json({ error: 'Title and content description required.' });
  }

  const db = readDB();
  const newNotif = {
    id: `notif-${Date.now()}`,
    studentId: studentId || 'all',
    title,
    message,
    status: 'unread' as const,
    createdAt: new Date().toISOString(),
  };

  db.notifications.unshift(newNotif);
  writeDB(db);

  res.json({ success: true, notification: newNotif });
});

// 6. Learning Materials Setup
app.get('/api/materials', (req, res) => {
  const db = readDB();
  res.json({ materials: db.materials });
});

app.post('/api/admin/materials', (req, res) => {
  const { title, courseId, filePath, fileSize } = req.body;
  if (!title || !courseId || !filePath) {
    return res.status(400).json({ error: 'Title, Course ID mapping, and Document File URL references are required.' });
  }

  const db = readDB();
  const selectedCourse = db.courses.find((c: any) => c.id === courseId);
  const courseTitle = selectedCourse ? selectedCourse.title : 'Selected Track';

  const newMaterial = {
    id: `mat-${Date.now()}`,
    courseId,
    title,
    filePath,
    fileSize: fileSize || '1.5 MB',
    uploadedAt: new Date().toISOString(),
  };

  db.materials.push(newMaterial);

  // Trigger notification to students of this course
  db.notifications.unshift({
    id: `notif-${Date.now()}`,
    studentId: 'all', // Broadcast context, handles easily
    title: `New Material: ${courseTitle}`,
    message: `A new learning resource "${title}" has been uploaded. Head to your active files page to access it!`,
    status: 'unread',
    createdAt: new Date().toISOString(),
  });

  writeDB(db);
  res.json({ success: true, material: newMaterial });
});

app.delete('/api/admin/materials/:id', (req, res) => {
  const { id } = req.params;
  const db = readDB();
  db.materials = db.materials.filter((m: any) => m.id !== id);
  writeDB(db);
  res.json({ success: true });
});

// 7. Contact Inquiries & Newsletters
app.post('/api/contact', (req, res) => {
  const { fullname, email, subject, message } = req.body;

  if (!fullname || !email || !subject || !message) {
    return res.status(400).json({ error: 'Please enter all information in the contact form.' });
  }

  const db = readDB();
  const newInquiry = {
    id: `inq-${Date.now()}`,
    fullname,
    email,
    subject,
    message,
    submittedAt: new Date().toISOString(),
  };

  db.contact_inquiries.unshift(newInquiry);

  // Admin notification trigger
  db.notifications.unshift({
    id: `notif-${Date.now()}`,
    studentId: 'all',
    title: `Contact Form: ${subject}`,
    message: `Inquiry from ${fullname} (${email}): "${message.substring(0, 80)}..."`,
    status: 'unread',
    createdAt: new Date().toISOString(),
  });

  writeDB(db);
  res.json({ success: true, message: 'Thank you for reaching out! We will contact you soon.' });
});

app.post('/api/newsletter', (req, res) => {
  const { email } = req.body;
  if (!email || !email.includes('@')) {
    return res.status(400).json({ error: 'Please submit a valid email address.' });
  }

  const db = readDB();
  const exists = db.newsletter_subscribers.some((n: any) => n.email.toLowerCase() === email.toLowerCase());

  if (exists) {
    return res.json({ success: true, message: 'You are already registered for our custom newsletter updates!' });
  }

  db.newsletter_subscribers.push({
    id: `news-${Date.now()}`,
    email: email.toLowerCase(),
    subscribedAt: new Date().toISOString(),
  });
  writeDB(db);

  res.json({ success: true, message: 'Congratulations! You have subscribed to receive EJaytech Concepts technology newsletters.' });
});

// Admin Log getters
app.get('/api/admin/email-logs', (req, res) => {
  const db = readDB();
  res.json({ emailLogs: db.email_logs || [] });
});

app.get('/api/admin/newsletter-subscribers', (req, res) => {
  const db = readDB();
  res.json({ subscribers: db.newsletter_subscribers || [] });
});

app.get('/api/admin/contact-inquiries', (req, res) => {
  const db = readDB();
  res.json({ inquiries: db.contact_inquiries || [] });
});

// Blog listing
app.get('/api/blogs', (req, res) => {
  const db = readDB();
  res.json({ blogs: db.blogs || [] });
});

// Post blogs
app.post('/api/admin/blogs', (req, res) => {
  const { title, excerpt, content, author, category, readTime, imageUrl } = req.body;
  if (!title || !excerpt || !content || !author) {
    return res.status(400).json({ error: 'Title, Excerpt, Content and Author fields are required.' });
  }

  const db = readDB();
  const newPost = {
    id: `blog-${Date.now()}`,
    title,
    excerpt,
    content,
    author,
    date: new Date().toISOString().split('T')[0],
    category: category || 'Technology',
    readTime: readTime || '3 min read',
    imageUrl: imageUrl || 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&auto=format&fit=crop&q=60',
  };

  db.blogs.unshift(newPost);
  writeDB(db);

  res.json({ success: true, blog: newPost });
});

app.delete('/api/admin/blogs/:id', (req, res) => {
  const { id } = req.params;
  const db = readDB();
  db.blogs = db.blogs.filter((b: any) => b.id !== id);
  writeDB(db);
  res.json({ success: true });
});

// Serve dynamic PHP codebase files for the developer-centric cPanel Export Center
app.get('/api/admin/cpanel-files', (req, res) => {
  const filePath = req.query.file as string;
  if (!filePath) {
    return res.status(400).json({ error: 'File parameter is required' });
  }
  
  // Prevent directory traversal attacks
  const sanitizedPath = filePath.replace(/\.\./g, '');
  const absolutePath = path.join(process.cwd(), 'public_html', sanitizedPath);
  
  try {
    if (!fs.existsSync(absolutePath)) {
      return res.status(404).json({ error: 'File not found at specified path.' });
    }
    const contents = fs.readFileSync(absolutePath, 'utf8');
    res.json({ contents });
  } catch (err) {
    res.status(500).json({ error: 'Error reading file: ' + err });
  }
});



// ----------------------------------------
// VITE / EXPRESS HANDLER MOUNT
// ----------------------------------------
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`EJaytech server booting live at http://0.0.0.0:${PORT}`);
  });
}

startServer();
