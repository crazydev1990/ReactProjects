
import React, { useEffect, useMemo, useRef, useState } from "react";

const HOST_IMAGE =
  "https://mir-s3-cdn-cf.behance.net/projects/404/d7f97b27537763.5592478232f2c.jpg";

const TOTAL_QUESTIONS = 360;
const GRAND_PRIZE = 70000000;
const WRONG_PENALTY = 1000;
const TIME_LIMIT = 30;

const technologies = [
  "PHP", "Yii", "WordPress", "Laravel", "CodeIgniter",
  "HTML", "CSS", "JavaScript", "Bootstrap", "jQuery",
  "Tailwind CSS", "React", "Next.js", "Node.js",
  "Express.js", "MongoDB", "Git", "OOP"
];

const questionBanks = {
  PHP: [
    ["Which symbol starts a PHP variable?", "$"],
    ["Which function displays output in PHP?", "echo"],
    ["Which function returns the length of a string?", "strlen()"],
    ["Which function counts elements in an array?", "count()"],
    ["Which superglobal stores form data submitted with POST?", "$_POST"],
    ["Which superglobal stores URL query parameters?", "$_GET"],
    ["Which function starts a PHP session?", "session_start()"],
    ["Which function includes a file and stops on failure?", "require()"],
    ["Which operator checks both value and type?", "==="],
    ["Which function converts JSON into a PHP value?", "json_decode()"],
    ["Which function converts a PHP value into JSON?", "json_encode()"],
    ["Which keyword defines a class in PHP?", "class"],
    ["Which keyword creates an object?", "new"],
    ["Which visibility allows access only inside a class?", "private"],
    ["Which keyword inherits a class?", "extends"],
    ["Which method runs when an object is created?", "__construct()"],
    ["Which interface supports iteration over an object?", "Iterator"],
    ["Which function safely escapes HTML special characters?", "htmlspecialchars()"],
    ["Which PDO method prepares an SQL statement?", "prepare()"],
    ["Which keyword declares a namespace?", "namespace"]
  ],
  Yii: [
    ["Which architecture does Yii follow?", "MVC"],
    ["Which command creates a Yii application?", "composer create-project"],
    ["Which directory commonly stores controllers?", "controllers"],
    ["Which base class do Yii controllers extend?", "Controller"],
    ["Which component handles database access?", "DB connection"],
    ["Which Yii feature handles URL routing?", "UrlManager"],
    ["Which method renders a view?", "render()"],
    ["Which method redirects to another route?", "redirect()"],
    ["Which component handles user authentication?", "User component"],
    ["Which class defines database migrations?", "Migration"],
    ["Which method saves an ActiveRecord model?", "save()"],
    ["Which method validates a model?", "validate()"],
    ["Which rule validates an email?", "email"],
    ["Which method finds a record by primary key?", "findOne()"],
    ["Which Yii feature supports RBAC?", "AccessControl"],
    ["Which file commonly configures the application?", "web.php"],
    ["Which helper creates URLs?", "Url::to()"],
    ["Which method loads model data?", "load()"],
    ["Which class supports REST controllers?", "ActiveController"],
    ["Which command applies migrations?", "yii migrate"]
  ],
  WordPress: [
    ["Which function loads the WordPress header?", "get_header()"],
    ["Which function loads the footer?", "get_footer()"],
    ["Which file contains theme information?", "style.css"],
    ["Which file controls a theme's main template?", "index.php"],
    ["Which function registers a navigation menu?", "register_nav_menus()"],
    ["Which function registers a sidebar?", "register_sidebar()"],
    ["Which hook runs when WordPress initializes?", "init"],
    ["Which hook is used to add frontend assets?", "wp_enqueue_scripts"],
    ["Which function loads a stylesheet?", "wp_enqueue_style()"],
    ["Which function loads JavaScript?", "wp_enqueue_script()"],
    ["Which function creates a custom post type?", "register_post_type()"],
    ["Which function creates a taxonomy?", "register_taxonomy()"],
    ["Which file stores plugin information?", "Plugin PHP file header"],
    ["Which function checks user capability?", "current_user_can()"],
    ["Which function checks whether a user is logged in?", "is_user_logged_in()"],
    ["Which function escapes HTML output?", "esc_html()"],
    ["Which function escapes an attribute?", "esc_attr()"],
    ["Which function creates a nonce?", "wp_create_nonce()"],
    ["Which API handles REST endpoints?", "WordPress REST API"],
    ["Which file controls rewrite rules?", ".htaccess"]
  ],
  Laravel: [
    ["Which architecture does Laravel follow?", "MVC"],
    ["Which command creates a Laravel project?", "laravel new"],
    ["Which command starts the development server?", "php artisan serve"],
    ["Which file defines web routes?", "routes/web.php"],
    ["Which file defines API routes?", "routes/api.php"],
    ["Which command creates a controller?", "make:controller"],
    ["Which command creates a model?", "make:model"],
    ["Which ORM is used by Laravel?", "Eloquent"],
    ["Which command creates a migration?", "make:migration"],
    ["Which command runs migrations?", "php artisan migrate"],
    ["Which method validates incoming data?", "validate()"],
    ["Which feature protects forms from CSRF?", "CSRF middleware"],
    ["Which file stores environment configuration?", ".env"],
    ["Which facade handles cache operations?", "Cache"],
    ["Which facade handles events?", "Event"],
    ["Which queue driver stores jobs in a database?", "database"],
    ["Which method dispatches a job?", "dispatch()"],
    ["Which feature defines user authorization rules?", "Policies"],
    ["Which command clears the application cache?", "php artisan cache:clear"],
    ["Which tool manages PHP dependencies?", "Composer"]
  ],
  CodeIgniter: [
    ["Which architecture does CodeIgniter use?", "MVC"],
    ["Which file commonly defines routes?", "Routes.php"],
    ["Which method loads a view?", "view()"],
    ["Which method redirects a request?", "redirect()"],
    ["Which class handles database queries?", "Database"],
    ["Which helper handles form operations?", "Form helper"],
    ["Which helper creates URLs?", "URL helper"],
    ["Which file configures the database?", "Database.php"],
    ["Which command creates a controller in CI4?", "make:controller"],
    ["Which command creates a model in CI4?", "make:model"],
    ["Which method validates data in CI4?", "validateData()"],
    ["Which feature protects against CSRF?", "CSRF protection"],
    ["Which class handles HTTP requests?", "IncomingRequest"],
    ["Which class handles HTTP responses?", "Response"],
    ["Which file contains environment settings?", ".env"],
    ["Which feature supports RESTful routes?", "Resource routes"],
    ["Which method inserts database records?", "insert()"],
    ["Which method updates database records?", "update()"],
    ["Which method deletes database records?", "delete()"],
    ["Which tool manages PHP packages?", "Composer"]
  ],
  HTML: [
    ["Which tag defines the largest heading?", "h1"],
    ["Which tag creates a hyperlink?", "a"],
    ["Which attribute specifies an image source?", "src"],
    ["Which tag displays an image?", "img"],
    ["Which tag creates an unordered list?", "ul"],
    ["Which tag creates a table row?", "tr"],
    ["Which tag defines a table cell?", "td"],
    ["Which tag creates a form?", "form"],
    ["Which attribute submits form data to a URL?", "action"],
    ["Which input type hides entered characters?", "password"],
    ["Which tag defines page metadata?", "meta"],
    ["Which tag links an external stylesheet?", "link"],
    ["Which tag includes JavaScript?", "script"],
    ["Which semantic tag represents navigation?", "nav"],
    ["Which semantic tag represents the main content?", "main"],
    ["Which attribute provides alternative image text?", "alt"],
    ["Which attribute makes a field mandatory?", "required"],
    ["Which attribute connects a label to an input?", "for"],
    ["Which element provides expandable details?", "details"],
    ["Which attribute opens a link in a new tab?", "target"]
  ],
  CSS: [
    ["Which property changes text color?", "color"],
    ["Which property changes background color?", "background-color"],
    ["Which property controls font size?", "font-size"],
    ["Which property makes text bold?", "font-weight"],
    ["Which selector targets an ID?", "#"],
    ["Which selector targets a class?", "."],
    ["Which property adds inner spacing?", "padding"],
    ["Which property adds outer spacing?", "margin"],
    ["Which property creates a flex container?", "display: flex"],
    ["Which property creates a grid container?", "display: grid"],
    ["Which property controls stacking order?", "z-index"],
    ["Which property controls element positioning?", "position"],
    ["Which property rounds corners?", "border-radius"],
    ["Which property adds a shadow to a box?", "box-shadow"],
    ["Which property controls overflow?", "overflow"],
    ["Which rule defines a media query?", "@media"],
    ["Which property controls animation duration?", "animation-duration"],
    ["Which property controls transition timing?", "transition"],
    ["Which unit is relative to the root font size?", "rem"],
    ["Which pseudo-class targets an element on hover?", ":hover"]
  ],
  JavaScript: [
    ["Which keyword declares a block-scoped variable?", "let"],
    ["Which keyword declares a constant?", "const"],
    ["Which method prints to the console?", "console.log()"],
    ["Which method selects an element by ID?", "getElementById()"],
    ["Which method selects the first matching CSS selector?", "querySelector()"],
    ["Which method selects all matching CSS selectors?", "querySelectorAll()"],
    ["Which method converts JSON text into an object?", "JSON.parse()"],
    ["Which method converts an object into JSON text?", "JSON.stringify()"],
    ["Which array method creates a new transformed array?", "map()"],
    ["Which array method filters elements?", "filter()"],
    ["Which array method accumulates a single result?", "reduce()"],
    ["Which method adds an item to the end of an array?", "push()"],
    ["Which method removes the last array item?", "pop()"],
    ["Which operator checks strict equality?", "==="],
    ["Which syntax creates an arrow function?", "() => {}"],
    ["Which keyword pauses an async function?", "await"],
    ["Which object handles asynchronous results?", "Promise"],
    ["Which method registers an event listener?", "addEventListener()"],
    ["Which method prevents default browser behavior?", "preventDefault()"],
    ["Which keyword handles exceptions?", "try...catch"]
  ],
  Bootstrap: [
    ["Which class creates a responsive fixed-width container?", "container"],
    ["Which class creates a full-width container?", "container-fluid"],
    ["Which class defines a row?", "row"],
    ["Which class defines a column?", "col"],
    ["Which class creates a primary button?", "btn-primary"],
    ["Which class hides an element?", "d-none"],
    ["Which class displays an element as flex?", "d-flex"],
    ["Which class adds margin on all sides?", "m-3"],
    ["Which class adds padding on all sides?", "p-3"],
    ["Which class creates a responsive image?", "img-fluid"],
    ["Which component creates a navigation bar?", "Navbar"],
    ["Which component creates a modal dialog?", "Modal"],
    ["Which component creates a dropdown menu?", "Dropdown"],
    ["Which class creates a card?", "card"],
    ["Which class creates a rounded pill badge?", "rounded-pill"],
    ["Which breakpoint starts at 576px?", "sm"],
    ["Which class aligns text to the center?", "text-center"],
    ["Which class adds a shadow?", "shadow"],
    ["Which class makes a button full width?", "w-100"],
    ["Which attribute triggers a Bootstrap modal?", "data-bs-toggle"]
  ],
  jQuery: [
    ["Which symbol is commonly used as a jQuery alias?", "$"],
    ["Which method selects elements?", "$()"],
    ["Which method hides an element?", "hide()"],
    ["Which method shows an element?", "show()"],
    ["Which method toggles visibility?", "toggle()"],
    ["Which method changes text content?", "text()"],
    ["Which method changes HTML content?", "html()"],
    ["Which method gets an input value?", "val()"],
    ["Which method adds a CSS class?", "addClass()"],
    ["Which method removes a CSS class?", "removeClass()"],
    ["Which method registers a click handler?", "click()"],
    ["Which method registers general events?", "on()"],
    ["Which method removes event handlers?", "off()"],
    ["Which method performs an AJAX request?", "ajax()"],
    ["Which method gets JSON data?", "getJSON()"],
    ["Which method traverses to a parent?", "parent()"],
    ["Which method finds descendants?", "find()"],
    ["Which method iterates over matched elements?", "each()"],
    ["Which method checks whether a class exists?", "hasClass()"],
    ["Which event runs when the DOM is ready?", "ready()"]
  ],
  "Tailwind CSS": [
    ["Which utility makes text bold?", "font-bold"],
    ["Which utility centers text?", "text-center"],
    ["Which utility creates a flex container?", "flex"],
    ["Which utility creates a grid container?", "grid"],
    ["Which utility adds padding?", "p-4"],
    ["Which utility adds margin?", "m-4"],
    ["Which utility rounds corners?", "rounded"],
    ["Which utility adds a shadow?", "shadow"],
    ["Which utility sets width to full?", "w-full"],
    ["Which utility sets height to full?", "h-full"],
    ["Which utility hides an element?", "hidden"],
    ["Which utility creates a responsive breakpoint variant?", "md:"],
    ["Which utility changes background color?", "bg-blue-500"],
    ["Which utility changes text color?", "text-white"],
    ["Which utility adds a gap between grid or flex items?", "gap-4"],
    ["Which utility makes an element sticky?", "sticky"],
    ["Which utility sets position to absolute?", "absolute"],
    ["Which utility controls stacking order?", "z-10"],
    ["Which utility adds hover styling?", "hover:"],
    ["Which directive defines a custom theme in Tailwind v4?", "@theme"]
  ],
  React: [
    ["Which function creates a React component?", "function"],
    ["Which hook manages component state?", "useState"],
    ["Which hook handles side effects?", "useEffect"],
    ["Which hook accesses context?", "useContext"],
    ["Which hook stores a mutable reference?", "useRef"],
    ["Which hook memoizes a calculation?", "useMemo"],
    ["Which hook memoizes a callback?", "useCallback"],
    ["Which method renders a React application?", "createRoot()"],
    ["Which prop is used to identify list items?", "key"],
    ["Which syntax embeds JavaScript in JSX?", "{}"],
    ["Which component groups children without a DOM node?", "Fragment"],
    ["Which prop passes data to a child component?", "props"],
    ["Which pattern shares state with a common parent?", "Lifting state up"],
    ["Which tool checks component props at runtime?", "PropTypes"],
    ["Which API shares data across a component tree?", "Context API"],
    ["Which component handles deferred loading fallback?", "Suspense"],
    ["Which API lazily loads a component?", "lazy()"],
    ["Which hook reads the current router location?", "useLocation"],
    ["Which feature catches rendering errors in a subtree?", "Error Boundary"],
    ["Which mode helps identify potential problems in development?", "StrictMode"]
  ],
  "Next.js": [
    ["Which framework is built on React?", "Next.js"],
    ["Which directory supports the App Router?", "app"],
    ["Which file defines the root layout?", "layout.js"],
    ["Which file defines a route page?", "page.js"],
    ["Which component navigates between routes?", "Link"],
    ["Which function reads route parameters on the server?", "params"],
    ["Which directive marks a Client Component?", "\"use client\""],
    ["Which function redirects a request?", "redirect()"],
    ["Which file defines middleware?", "middleware.js"],
    ["Which feature creates dynamic routes?", "[slug]"],
    ["Which component optimizes images?", "Image"],
    ["Which function generates page metadata?", "generateMetadata()"],
    ["Which function handles not-found pages?", "notFound()"],
    ["Which file defines loading UI?", "loading.js"],
    ["Which file defines route error UI?", "error.js"],
    ["Which convention defines API endpoints in App Router?", "route.js"],
    ["Which rendering method generates HTML at build time?", "Static generation"],
    ["Which rendering method generates HTML per request?", "Dynamic rendering"],
    ["Which feature caches fetched data?", "Data Cache"],
    ["Which command starts a Next.js production server?", "next start"]
  ],
  "Node.js": [
    ["What is Node.js?", "JavaScript runtime"],
    ["Which engine runs JavaScript in Node.js?", "V8"],
    ["Which object accesses environment variables?", "process.env"],
    ["Which module handles file operations?", "fs"],
    ["Which module creates HTTP servers?", "http"],
    ["Which method imports CommonJS modules?", "require()"],
    ["Which keyword exports a CommonJS value?", "module.exports"],
    ["Which file defines npm scripts and dependencies?", "package.json"],
    ["Which command installs dependencies?", "npm install"],
    ["Which object provides command-line arguments?", "process.argv"],
    ["Which method schedules a callback?", "setTimeout()"],
    ["Which API handles asynchronous I/O?", "Event loop"],
    ["Which module handles paths?", "path"],
    ["Which module handles operating system information?", "os"],
    ["Which module creates streams?", "stream"],
    ["Which object emits and listens for events?", "EventEmitter"],
    ["Which method reads a file asynchronously?", "fs.readFile()"],
    ["Which command initializes a package?", "npm init"],
    ["Which file stores installed dependency lock details?", "package-lock.json"],
    ["Which global provides the current module directory in CommonJS?", "__dirname"]
  ],
  "Express.js": [
    ["Which method creates an Express application?", "express()"],
    ["Which method handles GET requests?", "app.get()"],
    ["Which method handles POST requests?", "app.post()"],
    ["Which method registers middleware?", "app.use()"],
    ["Which object contains route parameters?", "req.params"],
    ["Which object contains query parameters?", "req.query"],
    ["Which object contains parsed request body data?", "req.body"],
    ["Which method sends a JSON response?", "res.json()"],
    ["Which method sends an HTTP response status?", "res.status()"],
    ["Which method moves to the next middleware?", "next()"],
    ["Which middleware parses JSON bodies?", "express.json()"],
    ["Which middleware serves static files?", "express.static()"],
    ["Which method creates a router?", "express.Router()"],
    ["Which property stores the request URL?", "req.originalUrl"],
    ["Which method redirects a response?", "res.redirect()"],
    ["Which middleware handles errors?", "Error-handling middleware"],
    ["Which method defines route-specific middleware?", "router.use()"],
    ["Which method starts an HTTP server?", "app.listen()"],
    ["Which header controls cross-origin requests?", "Access-Control-Allow-Origin"],
    ["Which package commonly enables CORS?", "cors"]
  ],
  MongoDB: [
    ["What type of database is MongoDB?", "Document database"],
    ["Which format represents MongoDB documents?", "BSON"],
    ["Which method inserts one document?", "insertOne()"],
    ["Which method inserts multiple documents?", "insertMany()"],
    ["Which method finds documents?", "find()"],
    ["Which method finds one document?", "findOne()"],
    ["Which method updates one document?", "updateOne()"],
    ["Which method deletes one document?", "deleteOne()"],
    ["Which operator increments a numeric field?", "$inc"],
    ["Which operator matches values in an array?", "$in"],
    ["Which operator matches a field value?", "$eq"],
    ["Which pipeline stage filters documents?", "$match"],
    ["Which pipeline stage groups documents?", "$group"],
    ["Which pipeline stage sorts documents?", "$sort"],
    ["Which pipeline stage limits results?", "$limit"],
    ["Which feature enforces unique field values?", "Unique index"],
    ["Which method creates an index?", "createIndex()"],
    ["Which feature relates documents across collections?", "$lookup"],
    ["Which tool provides a graphical MongoDB interface?", "MongoDB Compass"],
    ["Which object identifier is commonly used as a default _id?", "ObjectId"]
  ],
  Git: [
    ["Which command initializes a repository?", "git init"],
    ["Which command copies a remote repository?", "git clone"],
    ["Which command checks working tree status?", "git status"],
    ["Which command stages changes?", "git add"],
    ["Which command creates a commit?", "git commit"],
    ["Which command displays commit history?", "git log"],
    ["Which command uploads commits to a remote?", "git push"],
    ["Which command downloads and integrates remote changes?", "git pull"],
    ["Which command downloads remote changes without merging?", "git fetch"],
    ["Which command creates a branch?", "git branch"],
    ["Which command switches branches?", "git switch"],
    ["Which command merges another branch?", "git merge"],
    ["Which command temporarily stores uncommitted changes?", "git stash"],
    ["Which command shows differences?", "git diff"],
    ["Which command reverses a commit with a new commit?", "git revert"],
    ["Which command resets the current branch pointer?", "git reset"],
    ["Which file excludes untracked paths?", ".gitignore"],
    ["Which command displays remote repositories?", "git remote -v"],
    ["Which command creates a lightweight tag?", "git tag"],
    ["Which command applies a commit from another branch?", "git cherry-pick"]
  ],
  OOP: [
    ["What does OOP stand for?", "Object-Oriented Programming"],
    ["Which concept hides internal implementation details?", "Encapsulation"],
    ["Which concept allows one class to inherit another?", "Inheritance"],
    ["Which concept allows multiple forms of behavior?", "Polymorphism"],
    ["Which concept exposes essential features only?", "Abstraction"],
    ["What is a blueprint for objects?", "Class"],
    ["What is an instance of a class?", "Object"],
    ["Which method initializes an object?", "Constructor"],
    ["Which keyword refers to the current object in PHP?", "$this"],
    ["Which access modifier restricts access to a class?", "private"],
    ["Which access modifier allows subclass access?", "protected"],
    ["Which access modifier allows public access?", "public"],
    ["Which relationship represents an IS-A relationship?", "Inheritance"],
    ["Which relationship represents a HAS-A relationship?", "Composition"],
    ["Which keyword prevents a class from being extended in PHP?", "final"],
    ["Which PHP keyword defines an interface?", "interface"],
    ["Which PHP keyword uses a trait?", "use"],
    ["Which method is called when an object is destroyed?", "__destruct()"],
    ["Which concept means one interface with different implementations?", "Polymorphism"],
    ["Which design principle recommends depending on abstractions?", "Dependency Inversion"]
  ]
};

const shuffle = (items) => {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
};

const getPrize = (questionNumber) =>
  Math.round((GRAND_PRIZE * questionNumber) / TOTAL_QUESTIONS);

const formatMoney = (amount) =>
  `₹${Math.max(0, amount).toLocaleString("en-IN")}`;

const allQuestions = Object.entries(questionBanks).flatMap(
  ([technology, questions]) =>
    questions.map(([question, answer], index) => ({
      technology,
      question: `${question}`,
      answer,
      level:
        index < 7 ? "BASIC" : index < 14 ? "INTERMEDIATE" : "ADVANCED"
    }))
);

const answerPool = [
  ...new Set(
    Object.values(questionBanks).flatMap((questions) =>
      questions.map((item) => item[1])
    )
  )
];

function createOptions(correctAnswer) {
  const wrongAnswers = shuffle(
    answerPool.filter((answer) => answer !== correctAnswer)
  ).slice(0, 3);

  return shuffle([correctAnswer, ...wrongAnswers]);
}

function HostImage({ className = "" }) {
  return (
    <img
      className={`bigb-face ${className}`}
      src={HOST_IMAGE}
      alt="KBC Host"
    />
  );
}

export default function KbcQuiz() {
  const [screen, setScreen] = useState("welcome");
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [winningAmount, setWinningAmount] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [answerStatus, setAnswerStatus] = useState("");
  const [timeLeft, setTimeLeft] = useState(TIME_LIMIT);
  const [usedLifelines, setUsedLifelines] = useState([]);
  const [hiddenOptions, setHiddenOptions] = useState([]);
  const [message, setMessage] = useState(
    "Welcome to Kaun Banega Crorepati!"
  );
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [showPoll, setShowPoll] = useState(false);

  const timerRef = useRef(null);
  const speechRef = useRef(null);
  const gameEndedRef = useRef(false);

  const currentQuestion = questions[currentIndex];

  const styles = useMemo(
    () => `
      .kbc-app {
        min-height: 100vh;
        background: radial-gradient(circle at top, #173d87, #07152e 70%);
        color: #fff;
        font-family: Arial, sans-serif;
        padding: 24px;
        box-sizing: border-box;
      }
      .kbc-app * { box-sizing: border-box; }
      .kbc-container { max-width: 1200px; margin: auto; }
      .kbc-header { display:flex; justify-content:space-between; align-items:center; gap:15px; flex-wrap:wrap; }
      .kbc-logo { font-size:clamp(25px,4vw,42px); font-weight:900; color:#ffd45b; text-shadow:0 3px 12px #000; }
      .kbc-card { background:rgba(8,26,68,.94); border:2px solid #e8bd52; border-radius:20px; padding:25px; box-shadow:0 12px 35px #0007; }
      .kbc-welcome { max-width:750px; margin:55px auto; text-align:center; }
      .bigb-face { width:105px; height:105px; object-fit:cover; object-position:center; border:4px solid #f3ca61; border-radius:50%; background:#243d7d; flex-shrink:0; }
      .kbc-host { display:flex; align-items:center; justify-content:center; gap:18px; margin-bottom:20px; }
      .kbc-host-message { background:#fff; color:#17264c; border-radius:18px; padding:18px 22px; font-size:18px; font-weight:bold; max-width:600px; }
      .kbc-button { background:linear-gradient(#ffe88a,#dca52d); border:2px solid #fff0a8; color:#17254d; border-radius:30px; padding:13px 27px; font-size:16px; font-weight:800; cursor:pointer; margin:5px; }
      .kbc-button:disabled { opacity:.4; cursor:not-allowed; }
      .kbc-button.secondary { background:#173d87; color:#fff; border-color:#e6bd55; }
      .kbc-main { display:grid; grid-template-columns:minmax(0,1fr) 260px; gap:20px; margin-top:25px; }
      .kbc-question-box { text-align:center; margin:20px 0; }
      .kbc-tech { color:#ffd76c; font-size:15px; letter-spacing:2px; font-weight:bold; }
      .kbc-question { font-size:clamp(19px,3vw,27px); line-height:1.5; margin:15px 0; }
      .kbc-options { display:grid; grid-template-columns:1fr 1fr; gap:13px; margin-top:25px; }
      .kbc-option { padding:17px; border:2px solid #e4bd5d; background:#102e6d; color:white; border-radius:12px; cursor:pointer; font-size:16px; text-align:left; min-height:60px; }
      .kbc-option:hover:not(:disabled) { background:#2353a1; }
      .kbc-option.selected { background:#9b6a16; }
      .kbc-option.correct { background:#187c45; }
      .kbc-option.wrong { background:#9d2525; }
      .kbc-option:disabled { cursor:default; opacity:.9; }
      .kbc-topline { display:flex; justify-content:space-between; align-items:center; gap:10px; flex-wrap:wrap; }
      .kbc-timer { font-size:24px; font-weight:900; color:#ffdf70; }
      .kbc-progress { height:9px; background:#ffffff30; border-radius:20px; overflow:hidden; margin:18px 0; }
      .kbc-progress > div { height:100%; background:#ffd45b; transition:width .3s; }
      .kbc-lifelines { display:flex; flex-wrap:wrap; justify-content:center; margin:12px 0; }
      .kbc-ladder { max-height:650px; overflow:auto; }
      .kbc-ladder h3 { color:#ffd45b; text-align:center; }
      .kbc-prize { display:flex; justify-content:space-between; padding:8px 10px; border-bottom:1px solid #ffffff20; font-size:13px; }
      .kbc-prize.active { background:#b47d1c; border-radius:6px; font-weight:bold; }
      .kbc-prize.done { color:#77e7a0; }
      .kbc-balance { color:#ffe17b; font-size:25px; font-weight:900; }
      .kbc-status { min-height:25px; text-align:center; color:#ffe58d; font-weight:bold; margin:12px; }
      .kbc-result { max-width:750px; margin:50px auto; text-align:center; }
      .kbc-poll { background:#ffffff12; padding:15px; border-radius:12px; margin-top:15px; }
      .kbc-poll-row { display:grid; grid-template-columns:40px 1fr 45px; align-items:center; gap:8px; margin:8px 0; }
      .kbc-poll-track { height:13px; background:#ffffff30; border-radius:20px; overflow:hidden; }
      .kbc-poll-fill { height:100%; background:#ffd45b; }
      @media(max-width:800px) { .kbc-main { grid-template-columns:1fr; } .kbc-ladder { max-height:250px; } }
      @media(max-width:520px) { .kbc-app { padding:12px; } .kbc-options { grid-template-columns:1fr; } .kbc-host { flex-direction:column; } .kbc-card { padding:17px; } }
    `,
    []
  );

  useEffect(() => {
    const id = "kbc-quiz-styles";
    if (!document.getElementById(id)) {
      const style = document.createElement("style");
      style.id = id;
      style.textContent = styles;
      document.head.appendChild(style);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if ("speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, [styles]);

  const speak = (text) => {
    if (!soundEnabled || !("speechSynthesis" in window)) return;

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-IN";
    utterance.rate = 0.9;
    utterance.pitch = 0.95;
    utterance.volume = 1;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    speechRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  };

  const stopSpeech = () => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
    setIsSpeaking(false);
  };

  const speakQuestion = (question) => {
    if (!question) return;
    speak(
      `Question number ${currentIndex + 1}. ${question.technology}. ${question.question}`
    );
  };

  const startGame = () => {
    stopSpeech();
    const shuffledQuestions = shuffle(allQuestions).map((item) => ({
      ...item,
      options: createOptions(item.answer)
    }));

    setQuestions(shuffledQuestions);
    setCurrentIndex(0);
    setWinningAmount(0);
    setSelectedAnswer(null);
    setAnswerStatus("");
    setTimeLeft(TIME_LIMIT);
    setUsedLifelines([]);
    setHiddenOptions([]);
    setShowPoll(false);
    gameEndedRef.current = false;
    setMessage("Welcome! Let's play KBC.");
    setScreen("game");

    setTimeout(() => {
      speak(
        "Welcome to Kaun Banega Crorepati. Let's begin the game. Here is your first question."
      );
    }, 200);
  };

  const finishGame = (reason) => {
    if (gameEndedRef.current) return;
    gameEndedRef.current = true;
    clearInterval(timerRef.current);
    stopSpeech();
    setMessage(reason);
    setScreen("result");
  };

  const nextQuestion = () => {
    stopSpeech();
    setSelectedAnswer(null);
    setAnswerStatus("");
    setHiddenOptions([]);
    setShowPoll(false);
    setTimeLeft(TIME_LIMIT);

    if (currentIndex + 1 >= TOTAL_QUESTIONS) {
      finishGame("Congratulations! You have completed all 360 questions!");
      return;
    }

    const nextIndex = currentIndex + 1;
    setCurrentIndex(nextIndex);
    setMessage("Here is your next question.");

    setTimeout(() => {
      const next = questions[nextIndex];
      if (next) {
        speak(
          `Question number ${nextIndex + 1}. ${next.technology}. ${next.question}`
        );
      }
    }, 150);
  };

  const submitAnswer = (answer) => {
    if (selectedAnswer !== null || gameEndedRef.current) return;

    clearInterval(timerRef.current);
    setSelectedAnswer(answer);
    stopSpeech();

    if (answer === currentQuestion.answer) {
      const currentPrize = getPrize(currentIndex + 1);
      const previousPrize = getPrize(currentIndex);
      const difference = currentPrize - previousPrize;

      setWinningAmount((previous) => previous + difference);
      setAnswerStatus("correct");
      setMessage(
        `Absolutely correct! You won ${formatMoney(difference)} for this question.`
      );

      speak("Absolutely correct. That is the right answer. Congratulations!");

      if (currentIndex + 1 === TOTAL_QUESTIONS) {
        setTimeout(
          () => finishGame("Congratulations! You have won 7 Crore Rupees!"),
          1800
        );
      }
    } else {
      setAnswerStatus("wrong");
      setWinningAmount((previous) =>
        Math.max(0, previous - WRONG_PENALTY)
      );
      setMessage(
        `Sorry! Wrong answer. ₹1,000 has been deducted. Correct answer: ${currentQuestion.answer}`
      );
      speak(
        `Sorry, that is incorrect. The correct answer is ${currentQuestion.answer}.`
      );

      setTimeout(() => {
        finishGame("Game Over! Thank you for playing KBC.");
      }, 2500);
    }
  };

  useEffect(() => {
    if (screen !== "game" || selectedAnswer !== null || !currentQuestion) {
      return;
    }

    timerRef.current = setInterval(() => {
      setTimeLeft((previous) => {
        if (previous <= 1) {
          clearInterval(timerRef.current);
          setTimeout(() => {
            finishGame("Time is up! Your game has ended.");
          }, 0);
          return 0;
        }
        return previous - 1;
      });
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, [screen, currentIndex, selectedAnswer, currentQuestion]);

  const useLifeline = (name) => {
    if (
      usedLifelines.includes(name) ||
      selectedAnswer !== null ||
      !currentQuestion
    ) return;

    setUsedLifelines((previous) => [...previous, name]);

    if (name === "50:50") {
      const wrongOptions = currentQuestion.options.filter(
        (option) => option !== currentQuestion.answer
      );
      const removed = shuffle(wrongOptions).slice(0, 2);
      setHiddenOptions(removed);
      setMessage("50:50 activated. Two incorrect options have been removed.");
      speak("Fifty fifty lifeline activated.");
    }

    if (name === "Audience Poll") {
      const options = currentQuestion.options;
      const correctIndex = options.indexOf(currentQuestion.answer);
      const percentages = [15, 15, 15, 15];
      percentages[correctIndex] = 55;

      let remaining = 45;
      for (let i = 0; i < percentages.length; i++) {
        if (i !== correctIndex) {
          const value = Math.min(remaining, 15);
          percentages[i] = value;
          remaining -= value;
        }
      }

      setShowPoll(true);
      setMessage("The audience has voted. Check the poll results.");
      setTimeout(() => {
        setPollPercentages(percentages);
      }, 0);
      speak("Here is the audience poll result.");
    }

    if (name === "Expert Advice") {
      setMessage(
        `Expert says: The likely correct answer is ${currentQuestion.answer}.`
      );
      speak(
        `Our expert suggests the answer is ${currentQuestion.answer}.`
      );
    }
  };

  const [pollPercentages, setPollPercentages] = useState([25, 25, 25, 25]);

  const questionNumber = currentIndex + 1;
  const progress = (questionNumber / TOTAL_QUESTIONS) * 100;

  if (screen === "welcome") {
    return (
      <div className="kbc-app">
        <div className="kbc-container">
          <div className="kbc-header">
            <div className="kbc-logo">KBC QUIZ</div>
            <div>Technology Special Edition</div>
          </div>

          <div className="kbc-card kbc-welcome">
            <div className="kbc-host">
              <HostImage />
              <div className="kbc-host-message">
                Welcome to Kaun Banega Crorepati! Are you ready to play?
              </div>
            </div>

            <h1 style={{ color: "#ffd45b" }}>KAUN BANEGA CROREPATI</h1>
            <h2>Technology Quiz Challenge</h2>
            <div className="kbc-balance">{formatMoney(GRAND_PRIZE)}</div>
            <p>Grand Prize</p>

            <p>
              18 Technologies • 360 Questions • 30 Seconds Per Question
            </p>
            <p>Wrong Answer Penalty: ₹1,000</p>
            <p>Three Lifelines: 50:50, Audience Poll, Expert Advice</p>

            <button className="kbc-button" onClick={startGame}>
              START GAME
            </button>

            <div style={{ marginTop: 15 }}>
              <button
                className="kbc-button secondary"
                onClick={() => setSoundEnabled((value) => !value)}
              >
                {soundEnabled ? "Voice: ON" : "Voice: OFF"}
              </button>
            </div>
            <small>
              Voice uses your browser's English speech engine. Voice availability
              depends on your device and browser.
            </small>
          </div>
        </div>
      </div>
    );
  }

  if (screen === "result") {
    return (
      <div className="kbc-app">
        <div className="kbc-container">
          <div className="kbc-card kbc-result">
            <HostImage />
            <h1 style={{ color: "#ffd45b" }}>GAME OVER</h1>
            <h2>{message}</h2>
            <p>Your Final Winning Amount</p>
            <div className="kbc-balance">{formatMoney(winningAmount)}</div>
            <p>Questions Completed: {currentIndex + (answerStatus === "correct" ? 1 : 0)} / 360</p>

            <button className="kbc-button" onClick={startGame}>
              PLAY AGAIN
            </button>
            <button
              className="kbc-button secondary"
              onClick={() => setScreen("welcome")}
            >
              HOME
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="kbc-app">
      <div className="kbc-container">
        <div className="kbc-header">
          <div className="kbc-logo">KBC TECHNOLOGY QUIZ</div>
          <div className="kbc-balance">{formatMoney(winningAmount)}</div>
        </div>

        <div className="kbc-progress">
          <div style={{ width: `${progress}%` }} />
        </div>

        <div className="kbc-main">
          <main className="kbc-card">
            <div className="kbc-host">
              <HostImage />
              <div className="kbc-host-message">
                {message}
              </div>
            </div>

            <div className="kbc-topline">
              <strong>
                Question {questionNumber} / {TOTAL_QUESTIONS}
              </strong>
              <span className="kbc-tech">
                {currentQuestion?.technology}
              </span>
              <span className="kbc-timer">
                <span>⏱</span> {timeLeft}s
              </span>
            </div>

            <div className="kbc-question-box">
              <span className="kbc-tech">
                {currentQuestion?.level}
              </span>
              <h2 className="kbc-question">
                {currentQuestion?.question}
              </h2>
            </div>

            <div className="kbc-options">
              {currentQuestion?.options.map((option, index) => {
                const hidden = hiddenOptions.includes(option);
                let className = "kbc-option";

                if (selectedAnswer === option) {
                  className +=
                    answerStatus === "correct" ? " correct" : " wrong";
                } else if (
                  selectedAnswer !== null &&
                  option === currentQuestion.answer
                ) {
                  className += " correct";
                }

                return (
                  <button
                    key={`${currentIndex}-${index}`}
                    className={className}
                    disabled={selectedAnswer !== null || hidden}
                    onClick={() => submitAnswer(option)}
                    style={{ visibility: hidden ? "hidden" : "visible" }}
                  >
                    {String.fromCharCode(65 + index)}. {option}
                  </button>
                );
              })}
            </div>

            <div className="kbc-lifelines">
              {["50:50", "Audience Poll", "Expert Advice"].map((name) => (
                <button
                  key={name}
                  className="kbc-button secondary"
                  disabled={
                    usedLifelines.includes(name) ||
                    selectedAnswer !== null
                  }
                  onClick={() => useLifeline(name)}
                >
                  {usedLifelines.includes(name) ? "USED" : name}
                </button>
              ))}
            </div>

            {showPoll && (
              <div className="kbc-poll">
                <strong>Audience Poll</strong>
                {currentQuestion.options.map((option, index) => (
                  <div className="kbc-poll-row" key={option}>
                    <span>{String.fromCharCode(65 + index)}</span>
                    <div className="kbc-poll-track">
                      <div
                        className="kbc-poll-fill"
                        style={{ width: `${pollPercentages[index]}%` }}
                      />
                    </div>
                    <span>{pollPercentages[index]}%</span>
                  </div>
                ))}
                <small>Sample audience poll for demonstration.</small>
              </div>
            )}

            <div className="kbc-status">{message}</div>

            <div style={{ textAlign: "center" }}>
              <button
                className="kbc-button secondary"
                onClick={() => speakQuestion(currentQuestion)}
                disabled={!soundEnabled}
              >
                🔊 Repeat Question
              </button>

              <button
                className="kbc-button secondary"
                onClick={stopSpeech}
                disabled={!isSpeaking}
              >
                Stop Voice
              </button>

              {selectedAnswer !== null && answerStatus === "correct" && (
                <button className="kbc-button" onClick={nextQuestion}>
                  NEXT QUESTION
                </button>
              )}
            </div>
          </main>

          <aside className="kbc-card kbc-ladder">
            <h3>PRIZE LADDER</h3>
            {Array.from({ length: TOTAL_QUESTIONS }, (_, index) => {
              const number = index + 1;
              const active = number === questionNumber;
              const completed = number < questionNumber;

              return (
                <div
                  key={number}
                  className={`kbc-prize ${active ? "active" : ""} ${completed ? "done" : ""}`}
                >
                  <span>{number}.</span>
                  <span>{formatMoney(getPrize(number))}</span>
                </div>
              );
            })}
          </aside>
        </div>
      </div>
    </div>
  );
}
