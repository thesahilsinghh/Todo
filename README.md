<body>

<h1>Task Management API</h1>

<p>A simple API for managing tasks, including user authentication and task operations.</p>

<div>Please note Swagger documention is incomplete and in progress</div>
<h2>Setup</h2>

<ol>
    <li><strong>Install dependencies:</strong>
        <pre><code>npm i</code></pre>
    </li>
    <li>Create a <code>.env</code> file with database and JWT configurations:
        <pre><code>
DB_HOST="___________"
DB_USER="__________"
DB_PASSWORD="_______"
DB_NAME="________"
JWT_SECRET="_____________"
</code></pre>
    </li>
    <li>Start the server:
        <pre><code>node server.js</code></pre>
    </li>
</ol>

<h2>API Endpoints</h2>

<h3>User</h3>
<ul>
    <li><strong>POST</strong> /api/user/signup - Register a new user</li>
    <li><strong>POST</strong> /api/user/login - Login and get a JWT</li>
</ul>

<h3>Tasks (Authentication required)</h3>
<ul>
    <li><strong>GET</strong> /api/tasks/ - Get tasks (filter by title, description, status, priority, due date)</li>
    <li><strong>POST</strong> /api/tasks/ - Add a new task</li>
    <li><strong>PUT</strong> /api/tasks/update - Update a task(task id with it's update should be passed in body)</li>
    <li><strong>DELETE</strong> /api/tasks/delete - Delete a task(task id should be passed in body)</li>
</ul>

</body>
