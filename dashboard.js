// sakshyam: yo ta shared dashboard js ho, nishav tero functions thik cha?
// nishav: anup yo dashboard functions thik cha? sakshyam: ha perfect cha

// Section management function
function showSection(sectionId) {
    // Hide all sections
    const sections = document.querySelectorAll('.content-section, .section');
    sections.forEach(section => {
        section.style.display = 'none';
        section.classList.remove('active');
    });

    // Show selected section
    const selectedSection = document.getElementById(sectionId);
    if (selectedSection) {
        selectedSection.style.display = 'block';
        selectedSection.classList.add('active');
    }

    // Update navigation active state
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.classList.remove('active');
    });

    // Add active class to clicked link
    event.target.classList.add('active');

    // Update page header if function exists
    if (typeof updatePageHeader === 'function') {
        updatePageHeader(sectionId);
    }
}

// Mobile sidebar toggle function
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    if (sidebar) {
        sidebar.classList.toggle('open');
    }
}

// Close sidebar when clicking outside on mobile
document.addEventListener('click', function(event) {
    const sidebar = document.getElementById('sidebar');
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    
    if (window.innerWidth <= 768 && sidebar && mobileToggle) {
        if (!sidebar.contains(event.target) && !mobileToggle.contains(event.target)) {
            sidebar.classList.remove('open');
        }
    }
});

// Initialize dashboard
document.addEventListener('DOMContentLoaded', function() {
    // Show dashboard by default
    showSection('dashboard');
    
    // Add mobile menu toggle if it exists
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    if (mobileToggle) {
        mobileToggle.addEventListener('click', toggleSidebar);
    }
});

// Attendance marking function (for teacher dashboard)
function markAttendance(button, status) {
    const buttonContainer = button.parentElement;
    const buttons = buttonContainer.querySelectorAll('button');
    
    // Reset all buttons
    buttons.forEach(btn => {
        btn.classList.remove('btn-primary');
        btn.classList.add('btn-secondary');
    });
    
    // Mark selected button
    if (status === 'present') {
        button.classList.remove('btn-secondary');
        button.classList.add('btn-primary');
    } else {
        button.classList.remove('btn-secondary');
        button.classList.add('btn-primary');
    }
    
    // Show feedback
    const studentName = button.closest('div').querySelector('div[style*="font-weight: 600"]')?.textContent;
    if (studentName) {
        console.log(`${studentName} marked as ${status}`);
    }
}

// Page header update function (for admin/teacher dashboards)
function updatePageHeader(sectionId) {
    const pageTitle = document.getElementById('pageTitle');
    const pageSubtitle = document.getElementById('pageSubtitle');
    
    if (!pageTitle || !pageSubtitle) return;
    
    const titles = {
        'dashboard': { title: 'Dashboard', subtitle: 'Welcome back! Here\'s your overview for today.' },
        'schedule': { title: 'Class Schedule', subtitle: 'Manage your daily class schedule and timings.' },
        'students': { title: 'Student Management', subtitle: 'View and manage your student information.' },
        'attendance': { title: 'Attendance Management', subtitle: 'Mark and track student attendance.' },
        'grades': { title: 'Grade Management', subtitle: 'Assign and review student grades.' },
        'assignments': { title: 'Assignment Management', subtitle: 'Create and manage class assignments.' },
        'communication': { title: 'Messages & Communication', subtitle: 'Communicate with parents and students.' },
        'analytics': { title: 'Performance Analytics', subtitle: 'View detailed performance reports and trends.' },
        'notices': { title: 'Important Notices', subtitle: 'Stay updated with school announcements.' },
        'profile': { title: 'My Profile', subtitle: 'View and manage your personal information.' },
        'academic-progress': { title: 'Academic Progress', subtitle: 'Track your academic performance and progress.' },
        'courses': { title: 'Course Information', subtitle: 'View your course details and schedule.' }
    };

    if (titles[sectionId]) {
        pageTitle.textContent = titles[sectionId].title;
        pageSubtitle.textContent = titles[sectionId].subtitle;
    }
} 