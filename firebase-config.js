/**
 * EJaytech Concepts - Firebase Configuration & Compatibility Layer
 * Works offline out-of-the-box (LocalMock Mode) and integrates seamlessly
 * with Firestore, Auth, and Storage when provided with real credentials.
 */

// REPLACE WITH YOUR ACTUAL FIREBASE WEB CLIENT CONFIG FROM FIREBASE CONSOLE:
// https://console.firebase.google.com/
const firebaseConfig = {
  apiKey: "PLACEHOLDER_API_KEY",
  authDomain: "PLACEHOLDER_PROJECT_ID.firebaseapp.com",
  projectId: "PLACEHOLDER_PROJECT_ID",
  storageBucket: "PLACEHOLDER_PROJECT_ID.appspot.com",
  messagingSenderId: "PLACEHOLDER_MESSAGING_SENDER_ID",
  appId: "PLACEHOLDER_APP_ID"
};

let db, auth, storage;
let isRealFirebase = false;

// Check if credentials have been replaced with real ones and if the SDKs are imported
if (
  typeof firebase !== "undefined" && 
  firebaseConfig.apiKey && 
  firebaseConfig.apiKey !== "PLACEHOLDER_API_KEY" &&
  firebaseConfig.apiKey !== ""
) {
  try {
    firebase.initializeApp(firebaseConfig);
    db = firebase.firestore();
    auth = firebase.auth();
    storage = firebase.storage();
    isRealFirebase = true;
    console.log("Firebase initialized successfully in Live Mode.");
  } catch (e) {
    console.error("Live Firebase initialization failed, falling back to LocalMock:", e);
  }
}

// -------------------------------------------------------------
// LOCAL MOCK BACKEND (High-Fidelity client-side emulation)
// -------------------------------------------------------------
if (!isRealFirebase) {
  console.log("Using EJaytech Concepts LocalMock Mode. Data persists inside localStorage.");

  // Seed default databases in localStorage
  if (!localStorage.getItem("mock_admins")) {
    const defaultAdmins = [
      {
        uid: "admin-master",
        email: "admin@ejaytech.com",
        username: "EJaytech Chief Admin",
        profilePictureUrl: "",
        darkModeEnabled: false,
        websiteSettings: {
          siteName: "EJaytech Concepts",
          contactPhone: "07033719342",
          contactEmail: "ejaytechconcepts@gmail.com",
          headOfficeAddress: "04 Akande Oke Street, Eleweran, Abeokuta"
        },
        createdAt: new Date().toISOString()
      }
    ];
    localStorage.setItem("mock_admins", JSON.stringify(defaultAdmins));
  }
  
  if (!localStorage.getItem("mock_courses")) {
    const defaultCourses = [
      {
        id: "course-1",
        courseName: "Frontend Web Development",
        title: "Frontend Web Development",
        description: "Master building high-performance modern web apps with HTML5, CSS3, JavaScript, and Bootstrap 5.",
        duration: "12 Weeks",
        fee: "₦120,000",
        requirements: "Personal laptop (at least 4GB RAM), and commitment to 6 hours classes weekly.",
        learningOutcomes: "Build responsive websites, master modern JavaScript, and deploy apps.",
        courseImage: "https://images.unsplash.com/photo-1547082299-de196ea013d6?w=800&auto=format&fit=crop&q=60",
        isArchived: false,
        syllabus: [
          "HTML5 Semantics & Structure",
          "CSS3 Layouts, Flexbox, Grid & Animations",
          "Bootstrap 5 Responsive Grid Systems",
          "Vanilla JavaScript & ES6+ Core Concepts",
          "Responsive App Layouts & Visual Aesthetics",
          "Git, GitHub & Live Server hosting (GitHub Pages, Netlify)",
        ],
        thingsYouWillLearn: "Semantic HTML markup, CSS styling models, DOM manipulation, responsive views, interactive Bootstrap components, and GitHub publishing channels."
      },
      {
        id: "course-2",
        courseName: "Graphic Design",
        title: "Graphic Design",
        description: "Cultivate your professional design eyes and master visual artwork with Canva Pro and Photoshop.",
        duration: "8 Weeks",
        fee: "₦80,000",
        requirements: "Personal web-enabled computer, Figma, or Photoshop application installed.",
        learningOutcomes: "Become a proficient graphic designer with production grade portfolios.",
        courseImage: "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800&auto=format&fit=crop&q=60",
        isArchived: false,
        syllabus: [
          "Layout theory, typography mappings, and visual hierarchies",
          "Canva Pro composition, templating, and rapid flyer creations",
          "Adobe Photoshop composition, masking, layer clipping and assets",
          "Corporate identity branding guidelines and branding sheets",
          "Pre-press setups and physical print-ready layout preparations"
        ],
        thingsYouWillLearn: "Visual branding theory, social flyers, brand manuals, raster cropping, vector aesthetics, and color wheels."
      },
      {
        id: "course-3",
        courseName: "UI/UX Design",
        title: "UI/UX Design",
        description: "Master modern user research techniques, interactive wireframing, styling presets, and prototyping with Figma.",
        duration: "10 Weeks",
        fee: "₦100,000",
        requirements: "Laptop (8GB RAM recommended), Figma account, and creative workflows.",
        learningOutcomes: "Build beautiful layouts, construct comprehensive wireframes and conduct user tests.",
        courseImage: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=800&auto=format&fit=crop&q=60",
        isArchived: false,
        syllabus: [
          "User persona formulations, empathy labs, and journey charting",
          "Low-fidelity structural wireframing (skeletal drawings)",
          "Figma components, variables, typography style libraries, and tokens",
          "High-fidelity clickable prototypes and transition animations",
          "Client presentations, development handoffs, and feedback reviews"
        ],
        thingsYouWillLearn: "Wireframing, clickable screen mockups, responsive layouts, Figma designs, and layout components."
      },
      {
        id: "course-4",
        courseName: "Digital Skills & Freelancing",
        title: "Digital Skills & Freelancing",
        description: "Learn to market and monetize your digital design, supporting, or software developments in global channels.",
        duration: "6 Weeks",
        fee: "₦60,000",
        requirements: "A smartphone or basic PC, and an open mind.",
        learningOutcomes: "Earn from digital skills using Upwork, LinkedIn, and Fiverr platforms.",
        courseImage: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&auto=format&fit=crop&q=60",
        isArchived: false,
        syllabus: [
          "Freelance profiling (Upwork, Fiverr accounts setups)",
          "Portfolio page creation and customized proposals development",
          "Linkedln branding and organic content pipeline tracking",
          "Introduction to cold outreaching and business workflows"
        ],
        thingsYouWillLearn: "Self-branding, custom proposals, LinkedIn optimization, profile ranking, and digital contracts."
      }
    ];
    localStorage.setItem("mock_courses", JSON.stringify(defaultCourses));
  }

  if (!localStorage.getItem("mock_announcements")) {
    const defaultAnns = [
      {
        id: "ann-default-1",
        title: "EJaytech Concepts Abeokuta Physical Training Center",
        message: "We are pleased to introduce our fully integrated administrative and vocational student panel systems. Learn modern graphics fabrication, Figma prototypes, or frontend programming from scratch.",
        createdAt: new Date().toISOString()
      }
    ];
    localStorage.setItem("mock_announcements", JSON.stringify(defaultAnns));
  }

  if (!localStorage.getItem("mock_notifications")) {
    const defaultNotifs = [
      {
        id: "notif-default-1",
        studentId: "all",
        title: "Welcome to EJaytech Concepts!",
        message: "We have unlocked specialized vocational design and programming tracks. Explore courses and register today to begin a tech career.",
        status: "unread",
        type: "General Notice",
        createdAt: new Date().toISOString()
      }
    ];
    localStorage.setItem("mock_notifications", JSON.stringify(defaultNotifs));
  }

  if (!localStorage.getItem("mock_students")) {
    localStorage.setItem("mock_students", JSON.stringify([]));
  }
  if (!localStorage.getItem("mock_materials")) {
    const defaultMaterials = [
      {
        id: "mat-1",
        courseId: "course-1",
        title: "Introduction to HTML5 Semantics & Standard Tags",
        description: "EJaytech Concepts frontend course manual Chapter 1.",
        filePath: "#",
        fileSize: "1.4 MB",
        uploadedAt: new Date().toISOString()
      },
      {
        id: "mat-2",
        courseId: "course-1",
        title: "CSS3 Grid and Flexbox Quick Reference Guide",
        description: "Visual flex architectures workbook.",
        filePath: "#",
        fileSize: "850 KB",
        uploadedAt: new Date().toISOString()
      },
      {
        id: "mat-3",
        courseId: "course-2",
        title: "Color Theory & Creative Flyers Checklist",
        description: "Top parameters for high-performing client campaign designs.",
        filePath: "#",
        fileSize: "2.1 MB",
        uploadedAt: new Date().toISOString()
      }
    ];
    localStorage.setItem("mock_materials", JSON.stringify(defaultMaterials));
  }

  // -------------------------------------------------------------
  // High-Fidelity Mock Implementation Objects (Fakes)
  // -------------------------------------------------------------

  // Simulates Firebase Auth
  const mockAuth = {
    currentUser: null,
    onAuthStateChangedCallbacks: [],
    
    setCurrentUser(user) {
      this.currentUser = user;
      if (user) {
        localStorage.setItem("mock_current_user", JSON.stringify(user));
      } else {
        localStorage.removeItem("mock_current_user");
      }
      this.onAuthStateChangedCallbacks.forEach(cb => cb(user));
    },

    onAuthStateChanged(callback) {
      this.onAuthStateChangedCallbacks.push(callback);
      // Retrieve session on load
      const saved = localStorage.getItem("mock_current_user");
      const userObj = saved ? JSON.parse(saved) : null;
      this.currentUser = userObj;
      callback(userObj);
      return () => {
        this.onAuthStateChangedCallbacks = this.onAuthStateChangedCallbacks.filter(cb => cb !== callback);
      };
    },

    createUserWithEmailAndPassword(email, password) {
      return new Promise((resolve, reject) => {
        const students = JSON.parse(localStorage.getItem("mock_students") || "[]");
        const exists = students.some(s => s.email.toLowerCase() === email.toLowerCase());
        if (exists) {
          reject(new Error("Email address already registered. Please login."));
          return;
        }
        
        // Generate a synthetic uid
        const uid = "mock-uid-" + Math.floor(Math.random() * 1000000);
        const testUser = {
          uid,
          email: email.toLowerCase(),
          emailVerified: false
        };
        
        // Temporarily store the credentials for authentication validation
        const credentialsList = JSON.parse(localStorage.getItem("mock_creds") || "[]");
        credentialsList.push({ uid, email: email.toLowerCase(), password });
        localStorage.setItem("mock_creds", JSON.stringify(credentialsList));
        
        this.setCurrentUser(testUser);
        resolve({ user: testUser });
      });
    },

    signInWithEmailAndPassword(email, password) {
      return new Promise((resolve, reject) => {
        const emailLower = email.toLowerCase().trim();
        
        // Check for admin
        if (emailLower === "admin@ejaytech.com" && password === "admin12345") {
          const adminUser = {
            uid: "admin-master",
            email: "admin@ejaytech.com",
            displayName: "EJaytech Chief Admin",
            isAdmin: true
          };
          this.setCurrentUser(adminUser);
          resolve({ user: adminUser });
          return;
        }

        // Check students lists
        const students = JSON.parse(localStorage.getItem("mock_students") || "[]");
        const credentialsList = JSON.parse(localStorage.getItem("mock_creds") || "[]");
        
        const matchedCred = credentialsList.find(c => c.email.toLowerCase() === emailLower && c.password === password);
        const mathingStudent = students.find(s => s.email.toLowerCase() === emailLower);
        
        if (matchedCred || (mathingStudent && password === "student123")) {
          const uid = matchedCred ? matchedCred.uid : (mathingStudent.uid || "mock-uid-legacy");
          const verifiedStudent = mathingStudent || { fullname: "Student Profile", email: emailLower };
          
          const studentUser = {
            uid: uid,
            email: emailLower,
            displayName: verifiedStudent.fullname,
            isAdmin: false,
            studentId: verifiedStudent.studentId,
            status: verifiedStudent.status || "Pending"
          };
          this.setCurrentUser(studentUser);
          resolve({ user: studentUser });
        } else {
          reject(new Error("Invalid login credentials. Note: Default newly made student accounts can use student123 or registered password."));
        }
      });
    },

    signOut() {
      return new Promise((resolve) => {
        this.setCurrentUser(null);
        resolve();
      });
    },

    sendPasswordResetEmail(email) {
      return new Promise((resolve) => {
        console.log(`[LocalMock Password Reset]: Standard reset link mailed to ${email}`);
        resolve();
      });
    }
  };

  // Simulates Firestore querying & document management
  const mockFirestore = {
    collection(collectionName) {
      const storageKey = `mock_${collectionName}`;
      
      const refreshData = () => {
        return JSON.parse(localStorage.getItem(storageKey) || "[]");
      };

      return {
        add(docData) {
          return new Promise((resolve) => {
            const list = refreshData();
            const id = "mock-doc-id-" + Math.floor(Math.random() * 900000);
            const newDoc = { id, ...docData };
            list.push(newDoc);
            localStorage.setItem(storageKey, JSON.stringify(list));
            resolve({ id, get: () => Promise.resolve({ data: () => newDoc, exists: true }) });
          });
        },
        doc(docId) {
          return {
            get() {
              return new Promise((resolve) => {
                const list = refreshData();
                // Match either on uid or id
                const record = list.find(item => item.uid === docId || item.id === docId);
                if (record) {
                  resolve({
                    id: docId,
                    exists: true,
                    data: () => record
                  });
                } else {
                  // Fallback for students directly indexed by AUTH UID
                  if (collectionName === "students") {
                    const studentRecord = list.find(s => s.uid === docId || s.studentId === docId);
                    if (studentRecord) {
                      resolve({ id: docId, exists: true, data: () => studentRecord });
                      return;
                    }
                  }
                  resolve({
                    id: docId,
                    exists: false,
                    data: () => null
                  });
                }
              });
            },
            set(docData, options) {
              return new Promise((resolve) => {
                const list = refreshData();
                const index = list.findIndex(item => item.uid === docId || item.id === docId);
                
                const newRecord = { ...docData };
                if (!newRecord.id) newRecord.id = docId;
                if (!newRecord.uid && collectionName === "students") newRecord.uid = docId;

                if (index !== -1) {
                  if (options && options.merge) {
                    list[index] = { ...list[index], ...newRecord };
                  } else {
                    list[index] = newRecord;
                  }
                } else {
                  list.push(newRecord);
                }
                localStorage.setItem(storageKey, JSON.stringify(list));
                resolve();
              });
            },
            update(fieldsToUpdate) {
              return new Promise((resolve, reject) => {
                const list = refreshData();
                const index = list.findIndex(item => item.uid === docId || item.id === docId || item.studentId === docId);
                
                if (index !== -1) {
                  list[index] = { ...list[index], ...fieldsToUpdate };
                  localStorage.setItem(storageKey, JSON.stringify(list));
                  resolve();
                } else {
                  reject(new Error("Document not found for update update."));
                }
              });
            },
            delete() {
              return new Promise((resolve) => {
                const list = refreshData();
                const filtered = list.filter(item => item.uid !== docId && item.id !== docId && item.studentId !== docId);
                localStorage.setItem(storageKey, JSON.stringify(filtered));
                resolve();
              });
            }
          };
        },
        get() {
          return new Promise((resolve) => {
            const list = refreshData();
            const snapshots = list.map(item => ({
              id: item.uid || item.id,
              data: () => item
            }));
            resolve({
              empty: list.length === 0,
              size: list.length,
              docs: snapshots,
              forEach: function(cb) {
                snapshots.forEach(cb);
              }
            });
          });
        }
      };
    }
  };

  // Simulates Firebase Storage
  const mockStorage = {
    ref(filePath) {
      return {
        child(subPath) {
          const combined = `${filePath}/${subPath}`;
          return mockStorage.ref(combined);
        },
        put(fileBlob) {
          return new Promise((resolve) => {
            console.log(`[LocalMock Storage]: Uploaded standard file size of ${fileBlob ? fileBlob.size : 'emulated'} bytes to ${filePath}`);
            resolve({
              ref: {
                getDownloadURL: () => Promise.resolve(`https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=60`)
              }
            });
          });
        },
        getDownloadURL() {
          return Promise.resolve(`https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=60`);
        }
      };
    }
  };

  // Re-map variables
  db = mockFirestore;
  auth = mockAuth;
  storage = mockStorage;

  // Emulate global window objects so standard scripts can resolve them
  window.db = db;
  window.auth = auth;
  window.storage = storage;
}
