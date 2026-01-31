Support Ticketing System

This project is a secure support ticketing system where users log in using a one-time Support PIN instead of passwords.
It demonstrates how support teams can give customers temporary and controlled access without maintaining traditional login credentials.

--------------------------------------------------

Tech Stack

Backend
- Django
- Django REST Framework
- SimpleJWT (JWT Authentication)
- SQLite

Frontend
- React (Vite)
- Axios
- Tailwind CSS

The backend provides REST APIs, and the React frontend consumes them using JWT-based authentication.

--------------------------------------------------

Authentication Flow

1. Support staff generates a one-time Support PIN.
2. User logs in using that PIN.
3. The backend validates the PIN and immediately marks it as used.
4. JWT access and refresh tokens are issued.
5. The access token is used for API requests.
6. When it expires, the refresh token renews the session automatically.

This approach avoids password handling while still maintaining secure access.

--------------------------------------------------

Admin Role (Support Staff)

Support staff manage the system through the Django Admin panel.

Admin panel URL:
http://127.0.0.1:8000/admin/

Create an admin account locally using:
python manage.py createsuperuser

Admin responsibilities include:
- Creating customer users
- Generating Support PINs
- Monitoring tickets and file attachments

--------------------------------------------------

Ticket Features

Users are able to:
- Create support tickets
- Upload multiple attachments
- View all their tickets
- See ticket details
- Track ticket status

Ticket fields include:
Title, Description, Priority, Category, Status, Attachments

--------------------------------------------------

File Upload Rules

- Multiple files allowed per ticket
- Max file size: 5MB
- Allowed formats: pdf, jpg, png, docx
- Stored in: /media/tickets/<ticket_id>/

--------------------------------------------------

Security Measures

- Support PINs can be used only once
- All ticket APIs require JWT authentication
- Users can access only their own tickets
- File type and size validation is enforced

--------------------------------------------------

Running the Project

Backend
cd backend
python -m venv venv
venv\Scripts\activate
pip install django djangorestframework djangorestframework-simplejwt pillow django-cors-headers
python manage.py migrate
python manage.py runserver

Frontend
cd frontend
npm install
npm run dev

Frontend runs on:
http://localhost:5173/

--------------------------------------------------

API Endpoints

POST   /api/users/login/      Login using Support PIN
POST   /api/token/refresh/    Refresh JWT access token
GET    /api/tickets/          List user tickets
POST   /api/tickets/          Create ticket with attachments
GET    /api/tickets/{id}/     Ticket details

--------------------------------------------------

What This Project Demonstrates

- One-time PIN authentication
- JWT session handling
- Secure file uploads
- Role-based access control
- User data isolation
