# Quick Start Guide

## 🚀 Quick Start (Recommended)

### Using the Start Script (Windows)
Double-click `start.bat` - This will automatically start both the backend server and frontend application in separate terminals.

### Manual Start

**Terminal 1 - Backend Server:**
```bash
cd server
npm run dev
```

**Terminal 2 - Frontend Application:**
```bash
npm run dev
```

## 📝 First Time Setup

1. **Install Dependencies:**
   ```bash
   # Install frontend dependencies
   npm install

   # Install backend dependencies
   cd server
   npm install
   cd ..
   ```

2. **Configure Backend:**
   - Edit `server/.env` if needed
   - Default configuration works for development

3. **Start Applications:**
   - Use `start.bat` or manual start commands above

## 🌐 Access Points

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3000
- **API Health Check**: http://localhost:3000/health

## 🔐 Testing Authentication

### Register a New User
1. Click "Register" in the navigation
2. Fill in the form:
   - Name: Your Name
   - Email: your@email.com
   - Password: password123 (min 6 characters)
3. Click "Register"
4. You'll be automatically logged in and redirected to home

### Login
1. Click "Login" in the navigation
2. Enter your credentials
3. Click "Login"
4. You'll be redirected to home page

### Logout
1. Click "Logout" in the navigation bar
2. You'll be logged out and can see the guest view

## 📚 Exploring the Application

### Pages
- **Home** (`/`): Welcome page with authentication status
- **Users** (`/users`): User management page
- **Login** (`/login`): User login form
- **Register** (`/register`): New user registration form

### Features to Try
1. **Register and Login**: Create an account and log in
2. **View Users**: See all registered users
3. **User Management**: Try the user CRUD operations
4. **Protected Routes**: Try accessing login/register while logged in
5. **Persistent Auth**: Refresh the page - you stay logged in!

## 🔧 API Testing with cURL

### Register a User
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d "{\"name\":\"Test User\",\"email\":\"test@example.com\",\"password\":\"password123\"}"
```

### Login
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"test@example.com\",\"password\":\"password123\"}"
```

### Get All Users
```bash
curl http://localhost:3000/api/users
```

### Get Current User (Replace TOKEN with actual token from login/register)
```bash
curl http://localhost:3000/api/auth/me \
  -H "Authorization: Bearer TOKEN"
```

## 🐛 Troubleshooting

### Port Already in Use
If port 3000 or 5173 is already in use:
- **Backend**: Edit `server/.env` and change `PORT=3000` to another port
- **Frontend**: It will automatically suggest another port

### CORS Errors
If you see CORS errors:
- Make sure backend server is running
- Check `server/.env` has `CORS_ORIGIN=http://localhost:5173`
- Restart the backend server

### Cannot Connect to API
1. Check if backend server is running: http://localhost:3000/health
2. Check frontend API URL in `src/data/datasources/ApiDataSource.js`
3. Verify no firewall is blocking the connection

### Login/Register Not Working
1. Check browser console for errors
2. Check backend server logs
3. Verify backend server is running
4. Try clearing localStorage: `localStorage.clear()` in browser console

## 📖 Understanding the Code

### Frontend Flow
```
View (LoginView.vue)
  ↓ calls
Store (authStore.js)
  ↓ calls
Use Case (LoginUserUseCase.js)
  ↓ calls
Repository (AuthRepositoryImpl.js)
  ↓ calls
Data Source (ApiDataSource.js)
  ↓ makes HTTP request to
Backend API
```

### Backend Flow
```
HTTP Request
  ↓
Express Router (authRoutes.js)
  ↓
Validation Middleware (validate.js)
  ↓
Controller (authController.js)
  ↓
Business Logic (password verification, JWT generation)
  ↓
Model (User.js - in-memory database)
  ↓
HTTP Response
```

## 🎯 Next Steps

1. Explore the code - every file has detailed comments
2. Try modifying the UI in the Vue components
3. Add new API endpoints in the backend
4. Implement additional features:
   - Password reset
   - Email verification
   - User profiles
   - Protected routes
   - Admin roles

## 📚 Learn More

- Read the main README.md for detailed architecture explanation
- Check server/README.md for backend API documentation
- Explore the code comments in each file
- Try the clean architecture patterns in your own projects!

## 💡 Tips

- Keep both terminals open to see real-time logs
- Use browser DevTools to inspect network requests
- Check the Vue DevTools extension for state inspection
- Use the Network tab to see API calls and responses
- Check localStorage to see the stored JWT token

Happy coding! 🚀
