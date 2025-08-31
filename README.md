# Mavu - Contracting Management App

A comprehensive web application for managing contracting operations, including team management, expense tracking, payroll management, and worker scheduling.

## Features

### 🔐 Authentication & User Types
- **Customer Login**: Browse contractors, manage projects, and communicate
- **Contractor Login**: Access to full management dashboard
- **Worker Login**: Access to worker-specific features
- Beautiful login interface with user type selection
- Secure authentication system

### 🏠 Customer Dashboard
- **Dashboard Overview**: Project statistics, saved contractors, quick actions
- **Browse Contractors**: Search and filter by service, region, price, and rating
- **My Projects**: Manage ongoing and completed projects with milestones
- **Chats**: Communicate with contractors
- **My Profile**: Manage personal information and preferences

### 👷‍♂️ Contractor Dashboard
- **Team Management**: Add, edit, and manage workers
- **Expense Tracker**: Monitor project and operational expenses
- **Payroll Manager**: Handle worker salaries and payments
- **Schedule Manager**: Create and manage worker schedules
- **Reports & Analytics**: Financial overview and project progress
- **Settings**: Company and account configuration

### 👷 Worker Dashboard
- **Schedule View**: Weekly and daily schedule views
- **Expense Submission**: Submit work-related expenses
- **Profile Management**: Personal and work information
- **Time Tracking**: Clock in/out and hours management

## Technology Stack

- **Frontend**: React 18 with Material-UI (MUI)
- **Routing**: React Router v6
- **State Management**: React Context API
- **UI Components**: Material-UI with custom theming
- **Charts**: Recharts for data visualization
- **Date Handling**: date-fns library
- **Build Tool**: Vite for fast development and building

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd mavu-contracting-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues

## Project Structure

```
src/
├── components/
│   ├── customer/           # Customer-specific components
│   │   ├── CustomerOverview.jsx
│   │   ├── ContractorBrowse.jsx
│   │   ├── ProjectManagement.jsx
│   │   └── CustomerProfile.jsx
│   ├── contractor/          # Contractor-specific components
│   │   ├── DashboardOverview.jsx
│   │   ├── TeamManagement.jsx
│   │   ├── ExpenseTracker.jsx
│   │   ├── PayrollManager.jsx
│   │   └── ScheduleManager.jsx
│   ├── worker/             # Worker-specific components
│   │   ├── WorkerOverview.jsx
│   │   ├── WorkerSchedule.jsx
│   │   ├── ExpenseSubmission.jsx
│   │   └── WorkerProfile.jsx
│   └── LoadingScreen.jsx
├── contexts/
│   └── AuthContext.jsx     # Authentication context
├── pages/
│   ├── LoginPage.jsx       # Login page with user type selection
│   ├── CustomerDashboard.jsx
│   ├── ContractorDashboard.jsx
│   └── WorkerDashboard.jsx
├── App.jsx                 # Main app component
└── main.jsx               # App entry point
```

## Key Components

### LoginPage
- User type selection (Customer/Contractor/Worker)
- Email and password authentication
- Demo login functionality
- Responsive design with Material-UI

### CustomerDashboard
- Sidebar navigation for customer features
- Overview dashboard with project statistics
- Contractor browsing with advanced filtering
- Project management with milestones
- Profile management with preferences

### ContractorDashboard
- Sidebar navigation with all management features
- Overview dashboard with key metrics
- Team management with worker CRUD operations
- Expense tracking with categorization
- Payroll management with calculations
- Schedule management with calendar views

### WorkerDashboard
- Simplified navigation for workers
- Schedule viewing (weekly/daily)
- Expense submission form
- Profile management
- Time tracking interface

## Data Management

The application currently uses mock data for demonstration purposes. To integrate with a real backend:

1. Replace mock data arrays with API calls
2. Implement proper error handling
3. Add loading states
4. Implement data persistence
5. Add real-time updates

## Styling & Theming

- **Material-UI**: Consistent design system
- **Custom Theme**: Branded color scheme
- **Responsive Design**: Mobile-first approach
- **Gradient Cards**: Modern visual elements
- **Typography**: Clear hierarchy and readability

## Security Features

- Protected routes based on user type
- Authentication context management
- Session persistence with localStorage
- Role-based access control

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support and questions, please contact the development team.

---

**Built with ❤️ for the contracting industry**
