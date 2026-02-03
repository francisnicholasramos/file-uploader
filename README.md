# Open Directory: Vault Storage

A cloud file management application with user authentication and file sharing capabilities built with Node.js, Express, and Supabase.

Live: https://file-uploader-t27g.onrender.com

### Features:
* **Folder/File Management**: File and folder management with hierarchical structure.
* **Access Control**: Access files and folders via shareable links.
* **Sorting**: Sort items by name, size, or creation date for ease of navigation. 
* **Session-based**: Authentication with Passport.js
* **RESTful API endpoints**: For file and folder operations
* **Modular Architecture**: Application structured by feature and split into layers for modularity and maintainability.

### Tech Stack:
#### Backend:
* Node.js with TypeScript
* Express.js framework
* Prisma ORM with PostgreSQL database
* Passport.js for authentication
* Multer for file upload handling
* Bcrypt for password hashing
* Zod for data validation

#### Frontend:
* EJS templating engine
* Vanilla JavaScript with TypeScript
* HTML/CSS

#### Storage & Database:
* Supabase for both cloud database and bucket storage
* PostgreSQL database with Prisma
