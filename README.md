# WorkPulse - Faculty ERP System

A modern, responsive Faculty Enterprise Resource Planning (ERP) system designed to streamline academic administration and faculty management processes. Originally developed during a hackathon and now under active development for enhanced functionality.

## 🎯 Overview

WorkPulse is a comprehensive faculty management system that provides tools for academic institutions to efficiently manage faculty operations, schedules, statistics, and administrative tasks. What started as a hackathon project has evolved into a full-featured solution, built with modern web technologies and offering an intuitive interface for both administrators and faculty members.

## ✨ Features

- **Dashboard Analytics**: Comprehensive overview of faculty performance and institutional metrics
- **Faculty Management**: Complete faculty profile and information management system
- **Schedule Management**: Interactive scheduling system for classes, meetings, and events
- **Time Tracking**: Punch-in/out system for attendance and work hour tracking
- **Statistical Reports**: 
  - Monthly performance graphs and analytics
  - Weekly activity summaries and insights
  - Real-time statistics dashboard
- **User Authentication**: Secure login system with role-based access control
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Real-time Updates**: Live data synchronization across all modules

## 🚀 Project Journey

**Hackathon Origins**: WorkPulse was initially conceived and developed during a hackathon, where the core functionality and user interface were established.

**Ongoing Development**: Post-hackathon, the project has entered active development phase with plans for:
- Enhanced user experience and interface improvements
- Additional faculty management features
- Performance optimizations
- Code refactoring and best practices implementation
- Integration capabilities with external systems

- **Frontend Framework**: React 18
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Language**: JavaScript (ES6+)
- **Package Manager**: npm
- **Code Quality**: ESLint for code linting
- **Development**: PostCSS for CSS processing

## 📋 Prerequisites

Before running this project, ensure you have the following installed:

- **Node.js** (version 16.0 or higher)
- **npm** (version 7.0 or higher)
- Modern web browser (Chrome, Firefox, Safari, Edge)

## 🚀 Installation & Setup

1. **Clone the repository**:
```bash
git clone https://github.com/Chirag1724/WorkPulse.git
cd WorkPulse
```

2. **Install dependencies**:
```bash
npm install
```

3. **Install Recharts** (for chart components):
```bash
npm install recharts
```

4. **Start the development server**:
```bash
npm run dev
```

5. **Open your browser** and navigate to:
```
http://localhost:5173
```

## 📦 Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build the project for production
- `npm run preview` - Preview the production build locally
- `npm run lint` - Run ESLint to check code quality

## 📂 Project Structure

```
WorkPulse/
├── src/
│   ├── assets/              # Static assets (images, logos)
│   │   ├── Login.jpg
│   │   ├── Mainlogo.jpg
│   │   └── Navlogo.png
│   ├── components/          # Reusable UI components
│   ├── data/               # Static data and configurations
│   │   └── data.json
│   ├── pages/              # Application pages/views
│   │   ├── dashboard.jsx   # Main dashboard page
│   │   ├── login.jsx       # Authentication page
│   │   ├── monthlygraph.jsx # Monthly analytics
│   │   ├── punch-in.jsx    # Time tracking system
│   │   ├── schedule.jsx    # Schedule management
│   │   ├── stats.jsx       # Statistics overview
│   │   └── weeklygraph.jsx # Weekly analytics
│   ├── App.jsx             # Main application component
│   ├── main.jsx            # Application entry point
│   └── index.css           # Global styles
├── public/                 # Public assets
├── index.html              # HTML template
├── package.json            # Project dependencies
├── tailwind.config.js      # Tailwind CSS configuration
├── vite.config.js          # Vite configuration
└── README.md              # Project documentation
```

## 🎨 Key Components

### Dashboard
- Comprehensive overview of faculty metrics
- Quick access to all system modules
- Real-time data visualization

### Schedule Management
- Interactive calendar interface
- Class and meeting scheduling
- Conflict detection and resolution

### Analytics & Reports
- **Monthly Graphs**: Detailed monthly performance analytics
- **Weekly Summaries**: Week-over-week progress tracking
- **Statistical Dashboard**: Real-time institutional metrics

### Time Tracking
- Digital punch-in/out system
- Work hour calculation
- Attendance monitoring

## 🔧 Configuration

### Tailwind CSS
The project uses Tailwind CSS for styling. Configuration can be modified in `tailwind.config.js`.

### Vite Configuration
Build and development settings are configured in `vite.config.js`.

### ESLint
Code quality rules are defined in `eslint.config.js`.

## 🚀 Deployment

### Production Build
```bash
npm run build
```

### Deploy to Static Hosting
The `dist` folder can be deployed to any static hosting service:
- Netlify
- Vercel
- GitHub Pages
- AWS S3
- Firebase Hosting

## 🎯 Usage

1. **Login**: Access the system through the secure login page
2. **Dashboard**: Navigate through the main dashboard for system overview
3. **Schedule**: Manage faculty schedules and appointments
4. **Time Tracking**: Use punch-in/out for attendance tracking
5. **Analytics**: View monthly and weekly performance reports
6. **Statistics**: Monitor real-time institutional metrics

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/your-feature-name`
5. Open a Pull Request

### Development Guidelines
- Follow React best practices
- Use Tailwind CSS for styling
- Maintain consistent code formatting
- Add comments for complex logic
- Test your changes thoroughly

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Chirag**
- GitHub: [@Chirag1724](https://github.com/Chirag1724)
- Email: chiragdwivediji@gmail.com

## 🙏 Acknowledgments

- React community for excellent documentation
- Tailwind CSS for the utility-first framework
- Vite for the fast build tool
- All contributors and supporters of this project

## 📞 Support

For support, questions, or suggestions:
- Open an issue on [GitHub Issues](https://github.com/Chirag1724/WorkPulse/issues)
- Contact the maintainer directly

## 🔮 Future Enhancements

### Short-term Goals
- [ ] UI/UX improvements and refinements
- [ ] Code optimization and performance enhancements
- [ ] Enhanced data visualization components
- [ ] Improved responsive design
- [ ] Bug fixes and stability improvements

### Long-term Vision
- [ ] Database integration for persistent data storage
- [ ] Role-based access control implementation
- [ ] Email notification system
- [ ] Advanced reporting features
- [ ] Mobile application development
- [ ] Integration with external academic systems
- [ ] Multi-language support
- [ ] Dark mode theme option

---

⭐ **If you find WorkPulse helpful, please give it a star on GitHub!**

## 📊 Project Status

![Development Status](https://img.shields.io/badge/Status-Active%20Development-brightgreen)
![Project Origin](https://img.shields.io/badge/Origin-Hackathon%20Project-orange)
![GitHub repo size](https://img.shields.io/github/repo-size/Chirag1724/WorkPulse)
![GitHub language count](https://img.shields.io/github/languages/count/Chirag1724/WorkPulse)
![GitHub top language](https://img.shields.io/github/languages/top/Chirag1724/WorkPulse)
![License](https://img.shields.io/badge/License-MIT-blue)
![React](https://img.shields.io/badge/React-18-blue)
![Vite](https://img.shields.io/badge/Vite-Latest-purple)
