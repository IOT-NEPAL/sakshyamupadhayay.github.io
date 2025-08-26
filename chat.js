// UGSS Sewa Sathi - API-Only Chatbot with Comprehensive Staff Data
// ugss hackathon - owner UNI-ElITE

document.addEventListener('DOMContentLoaded', function() {
    console.log('UGSS Sewa Sathi loaded...');
    
    // Get DOM elements with error checking
    const chatBubble = document.getElementById('chat-bubble');
    const chatInterface = document.getElementById('chat-interface');
    const chatClose = document.getElementById('chat-close');
    const chatInput = document.getElementById('chat-input');
    const chatMessages = document.getElementById('chat-messages');
    
    // Check if all elements exist
    if (!chatBubble) {
        console.error('Chat bubble element not found!');
        return;
    }
    if (!chatInterface) {
        console.error('Chat interface element not found!');
        return;
    }
    if (!chatClose) {
        console.error('Chat close button not found!');
        return;
    }
    if (!chatInput) {
        console.error('Chat input element not found!');
        return;
    }
    if (!chatMessages) {
        console.error('Chat messages container not found!');
        return;
    }
    
    console.log('All chat elements found successfully!');
    
    // API configuration
    const apiKey = 'AIzaSyDVEW7wmvsuzIXs9hEfOg3jgDnTyQzcSUo';
    const apiUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';
    
    let isTyping = false;
    let isChatOpen = false;
    
    // Add click sound effect (optional)
    function playClickSound() {
        try {
            const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUarm7blmGgU7k9n1unEiBC13yO/eizEIHWq+8+OWT');
            audio.volume = 0.3;
            audio.play().catch(e => console.log('Audio play failed:', e));
        } catch (e) {
            console.log('Audio not supported');
        }
    }
    
    // Chat bubble click handler with improved feedback
    chatBubble.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        console.log('Chat bubble clicked!');
        playClickSound();
        
        // Add visual feedback
        chatBubble.style.transform = 'scale(0.9)';
        setTimeout(() => {
            chatBubble.style.transform = '';
        }, 150);
        
        if (!isChatOpen) {
            chatInterface.classList.add('active');
            isChatOpen = true;
            chatInput.focus();
            
            // Add entrance animation
            chatInterface.style.animation = 'slideInUp 0.3s ease-out';
            setTimeout(() => {
                chatInterface.style.animation = '';
            }, 300);
        }
    });
    
    // Close button handler with improved feedback
    chatClose.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        console.log('Close button clicked!');
        playClickSound();
        
        if (isChatOpen) {
            chatInterface.style.animation = 'slideOutDown 0.3s ease-in';
            setTimeout(() => {
                chatInterface.classList.remove('active');
                chatInterface.style.animation = '';
                isChatOpen = false;
            }, 300);
        }
    });
    
    // Close chat when clicking outside
    document.addEventListener('click', function(e) {
        if (isChatOpen && !chatInterface.contains(e.target) && !chatBubble.contains(e.target)) {
            chatClose.click();
        }
    });
    
    // Handle Enter key press
    chatInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });
    
    // Handle input focus for better UX
    chatInput.addEventListener('focus', function() {
        chatInput.style.borderColor = '#667eea';
        chatInput.style.boxShadow = '0 0 0 2px rgba(102, 126, 234, 0.2)';
    });
    
    chatInput.addEventListener('blur', function() {
        chatInput.style.borderColor = '#ddd';
        chatInput.style.boxShadow = 'none';
    });
    
    // Send message function with improved validation
    function sendMessage() {
        const message = chatInput.value.trim();
        if (!message || isTyping) return;
        
        console.log('Sending message:', message);
        
        // Add user message
        addMessage(message, 'user');
        chatInput.value = '';
        
        // Show typing indicator
        showTypingIndicator();
        
        // Check for creator-related questions first
        const creatorKeywords = ['who created you', 'who made you', 'who built you', 'who developed you', 'who programmed you', 'who designed you'];
        const isCreatorQuestion = creatorKeywords.some(keyword => 
            message.toLowerCase().includes(keyword.toLowerCase())
        );
        
        if (isCreatorQuestion) {
            // Handle creator question directly
            setTimeout(() => {
                hideTypingIndicator();
                addMessage(`I was made by my genious coder Sakshyam Upadhayay who studies in this college grade12L as a part of UGSS Hackathon Event as being a member of team elite 🚀✨`, 'bot');
            }, 1000);
        } else {
            // Call API with comprehensive UGSS data
            callGeminiAPI(message);
        }
    }
    
    // Add message to chat with improved styling
    function addMessage(content, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;
        
        // Add timestamp
        const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        
        messageDiv.innerHTML = `
            <p>${escapeHtml(content)}</p>
            <span class="message-time">${timestamp}</span>
        `;
        
        // Add entrance animation
        messageDiv.style.opacity = '0';
        messageDiv.style.transform = 'translateY(20px)';
        
        chatMessages.appendChild(messageDiv);
        
        // Animate in
        setTimeout(() => {
            messageDiv.style.transition = 'all 0.3s ease';
            messageDiv.style.opacity = '1';
            messageDiv.style.transform = 'translateY(0)';
        }, 10);
        
        scrollToBottom();
    }
    
    // Show typing indicator with improved animation
    function showTypingIndicator() {
        isTyping = true;
        const typingDiv = document.createElement('div');
        typingDiv.className = 'message bot-message typing-indicator';
        typingDiv.id = 'typing-indicator';
        typingDiv.innerHTML = `
            <div class="typing-dots">
                <span></span>
                <span></span>
                <span></span>
            </div>
            <p>UGSS Sewa Sathi is typing...</p>
        `;
        
        chatMessages.appendChild(typingDiv);
        scrollToBottom();
    }
    
    // Hide typing indicator
    function hideTypingIndicator() {
        isTyping = false;
        const typingIndicator = document.getElementById('typing-indicator');
        if (typingIndicator) {
            typingIndicator.style.opacity = '0';
            typingIndicator.style.transform = 'translateY(-20px)';
            setTimeout(() => {
                typingIndicator.remove();
            }, 300);
        }
    }
    
    // Scroll to bottom with smooth animation
    function scrollToBottom() {
        chatMessages.scrollTo({
            top: chatMessages.scrollHeight,
            behavior: 'smooth'
        });
    }
    
    // Escape HTML
    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
    
    // Clean and format response
    function cleanResponse(response) {
        // Remove asterisks
        response = response.replace(/\*\*/g, '');
        
        // Replace common patterns with emojis
        response = response.replace(/Active Student Clubs/g, '🎭 Active Student Clubs');
        response = response.replace(/Upcoming Events/g, '📅 Upcoming Events');
        response = response.replace(/Admission Requirements/g, '📝 Admission Requirements');
        response = response.replace(/Contact Information/g, '📞 Contact Information');
        response = response.replace(/Location/g, '🗺️ Location');
        response = response.replace(/Programs/g, '📚 Programs');
        response = response.replace(/Facilities/g, '🏫 Facilities');
        response = response.replace(/Leadership Team/g, '👥 Leadership Team');
        response = response.replace(/Mission/g, '🎯 Mission');
        response = response.replace(/Vision/g, '🔮 Vision');
        
        // Limit to 150 words
        const words = response.split(' ');
        if (words.length > 150) {
            response = words.slice(0, 150).join(' ') + '...';
        }
        
        return response;
    }
    
    // Comprehensive UGSS staff and college data
    const ugssData = {
        // General Information
        general: {
            name: "Uniglobe SS/College",
            tagline: "Empowering minds, shaping futures, and bringing the best together",
            location: "Kamaladi, Ganeshthan Kathmandu, Nepal",
            phone: "01-5321875, 01-5320722, 01-5351409",
            email: "info@uniglobecollege.edu.np",
            mobile: "9851311179",
            established: "Over 10 years",
            students: "4000+",
            faculty: "60+",
            successRate: "95%"
        },
        
        // Leadership Team
        leadership: {
            principal: {
                name: "Dr. Ganesh Regmi",
                role: "Principal",
                description: "Leading our institution with over 15 years of educational leadership experience."
            },
            cfo: {
                name: "CA. Ramesh Datt Pandey",
                role: "CFO (Group)",
                description: "Overseeing financial excellence and institutional development programs."
            },
            director: {
                name: "Mr. Dilli Ram Upreti",
                role: "Program Director, Science Stream",
                description: "Managing institutional operations and administrative excellence."
            }
        },
        
        // Mission & Vision
        mission: {
            mission: "To provide comprehensive, innovative, and accessible education that empowers students to become responsible global citizens and leaders in their chosen fields.",
            vision: "To be a leading educational institution recognized for academic excellence, innovation, and commitment to developing well-rounded individuals who contribute positively to society."
        },
        
        // Creator Info
        creator: "I was trained by my genious coder Sakshyam Upadhayay who studies in this college grade12L as a part of UGSS Hackathon Event as being a member of team elite",
        
        // Programs & Streams
        programs: {
            science: "Science Stream with comprehensive laboratory facilities",
            management: "Management programs with industry-focused curriculum",
            arts: "Arts programs fostering creativity and critical thinking",
            commerce: "Commerce programs preparing for business world",
            law: "Law programs with practical legal training"
        },
        
        // Facilities
        facilities: [
            "Modern classrooms",
            "Well-equipped laboratories",
            "Library with extensive resources",
            "Sports facilities",
            "Computer labs",
            "Cafeteria",
            "Wi-Fi connectivity throughout campus"
        ],
        
        // Events & Activities
        events: {
            upcoming: [
                {
                    name: "Annual Sports Meet",
                    date: "December 15",
                    time: "9:00 AM - 5:00 PM",
                    location: "College Ground",
                    description: "Annual sports competition featuring various athletic events and team sports",
                    organizer: "Sports Club"
                },
                {
                    name: "Science Exhibition",
                    date: "December 20",
                    time: "10:00 AM - 4:00 PM",
                    location: "Science Block",
                    description: "Showcasing innovative projects and scientific discoveries by our talented students",
                    organizer: "Science Club"
                },
                {
                    name: "Cultural Festival",
                    date: "December 25",
                    time: "6:00 PM - 10:00 PM",
                    location: "Auditorium",
                    description: "Celebrating diversity through music, dance, drama, and cultural performances",
                    organizer: "Theater Club"
                }
            ],
            hackathon: {
                name: "UGSS Hackathon 1.0 2025",
                status: "First Ever Event",
                description: "The FIRST EVER hackathon organized by the college and IT Club! Students showcase innovative projects and problem-solving skills in this groundbreaking event.",
                features: ["Coding Challenges", "Innovation Hub", "Prizes & Recognition"]
            }
        },
        
        // Student Clubs
        clubs: [
            "Debate Club",
            "Interact Club", 
            "IT Club",
            "Literary Club",
            "MUN (Model United Nations)",
            "Orders Club",
            "Science Club",
            "Social Club",
            "Sports Club",
            "Theater Club",
            "Think Tank Club",
            "Trios Club"
        ],
        
        // MIS Portal
        mis: {
            description: "Management Information System for students, parents, teachers, and administrators",
            panels: [
                "Admin Panel - System Administration",
                "Teacher Panel - Faculty Access", 
                "Parent Panel - Parent Portal",
                "Student Panel - Student Portal"
            ],
            access: "Available through the MIS Portal button in navigation menu"
        },
        
        // FAQs
        faqs: {
            admission: "Admission requirements include completed application forms, academic transcripts, and entrance examination results. Please contact our admissions office for specific details.",
            programs: "We offer a wide range of programs including Science, Arts, Commerce, and specialized courses in technology and management. Each program is designed to meet industry standards.",
            misAccess: "You can access the MIS portal by clicking the 'MIS Portal' button in the navigation menu. Different user types (Admin, Teacher, Student, Parent) have separate login credentials.",
            facilities: "Our campus features modern classrooms, well-equipped laboratories, a library, sports facilities, computer labs, and a cafeteria. We also provide Wi-Fi connectivity throughout the campus."
        },
        
        // Contact Information
        contact: {
            address: "Kamaladi, Ganeshthan Kathmandu, Nepal",
            phone: "01-5321875, 01-5320722, 01-5351409",
            email: "info@uniglobecollege.edu.np",
            mobile: "9851311179"
        },
        
        // Complete Faculty and Staff Information
        faculty: {
            // Administration Team
            "Shekhar Adhikari": { post: "Program Director", department: "Management & Law", compliment: "🌟 A visionary leader who excels in academic program management and student development!" },
            "Krishna Dhungana": { post: "Associate Program Coordinator", department: "Science Stream", compliment: "🔬 Dedicated coordinator who ensures excellence in science education and research!" },
            "Suraj Kumar Thapa": { post: "Associate Program Coordinator", department: "Management & Law", compliment: "⚖️ Outstanding coordinator with exceptional skills in management education!" },
            "Basanta Ghimire": { post: "Exam Coordinator", department: "Exam Department", compliment: "📝 Meticulous exam coordinator who maintains the highest standards of academic integrity!" },
            "Harish Bhatta": { post: "In-charge Examination", department: "Exam Department", compliment: "📊 Brilliant examination manager who ensures fair and transparent evaluation processes!" },
            "Ganesh Bhatta": { post: "General Manager (Head-Finance)", department: "Finance Department", compliment: "💰 Exceptional financial leader who ensures fiscal responsibility and institutional growth!" },
            "Prakash Acharya": { post: "Senior Officer - Finance", department: "Finance Department", compliment: "💼 Outstanding finance professional with remarkable attention to detail!" },
            "Negam Raj Regmi": { post: "Assistant Finance Manager", department: "Finance Department", compliment: "📈 Dedicated finance manager who contributes significantly to institutional success!" },
            "Ram B. Kalel": { post: "Office Assistant", department: "Finance Department", compliment: "🔄 Reliable office assistant who keeps the administrative wheels turning smoothly!" },
            "Netra Bahadur Gurung": { post: "ECA/CCA Incharge", department: "ECA Department", compliment: "🎭 he is new faculty staff still the most supportive co-ordinater" },
            "Dipesh Maharjan": { post: "Sports Instructor", department: "Sports Department", compliment: "⚽ Dynamic sports instructor damn his body symbolizes strength he plays futsal!" },
            "Madhav Raut": { post: "Sports In-charge", department: "Sports Department", compliment: "🏆 very dangerous sir if you are bad boy otherwise understanding teacher!" },
            "Nischal Tandukar": { post: "Sports Instructor", department: "Sports Department", compliment: "🏅 Tiktoker hoo nii i am always big fan i wished i could have made tiktok with him!" },
            "Anil Pantha": { post: "IT In-charge", department: "IT Department", compliment: "💻 Tech-savvy IT leader always busy either in phone or in computer!" },
            "Rajeev Bajracharya": { post: "Documentation Officer", department: "Documentation Department", compliment: "📋 Meticulous documentation officer who maintains impeccable institutional records!" },
            "Suman Oli": { post: "Documentation Officer", department: "Documentation Department", compliment: "📄 Excellent documentation professional with outstanding organizational skills!" },
            "Sharad Basnet": { post: "IRC In-charge", department: "Library Department", compliment: "📚 Knowledgeable library leader kinda sound like kd sir" },
            "Deepa Panta": { post: "Nurse", department: "Health Services", compliment: "🏥 Caring health professional who ensures student well-being with compassion!" },

            // Physics Department
            "Devendra Khadka": { post: "Head of Department", department: "Physics Department", compliment: "⚛️ Brilliant physics department head who makes complex concepts accessible!" },
            "Ajaya Jha": { post: "Faculty Member", department: "Physics Department", compliment: "AKA Action Jackson🔬 Exceptional physics educator with his own website physicswithajay! damn i love it!" },
            "Shesh Raj Bhandari": { post: "Faculty Member", department: "Physics Department", compliment: "⚡ Outstanding physics teacher who sparks scientific curiosity!" },
            "Dipesh Kumar Das": { post: "Faculty Member", department: "Physics Department", compliment: "🌌 Inspiring physics educator who has video in youtube Educator nepal!" },
            "Milan Thapa": { post: "Faculty Member", department: "Physics Department", compliment: "🔍 Dedicated physics teacher with excellent problem-solving skills!" },
            "Ram Hari Timalsina": { post: "Faculty Member", department: "Physics Department", compliment: "📐 Brilliant physics instructor who makes mathematics beautiful!" },
            "Sushil Upreti": { post: "Faculty Member", department: "Physics Department", compliment: "⚙️ Outstanding physics educator with practical expertise!" },
            "Amrit Basnet": { post: "Faculty Member", department: "Physics Department", compliment: "🌟 Exceptional physics teacher who inspires scientific thinking!" },
            "Sanat Kumar Giri": { post: "Faculty Member", department: "Physics Department", compliment: "🔬 Dedicated physics educator with innovative teaching methods!" },
            "Harish Bohara": { post: "Lab Incharge", department: "Physics Department", compliment: "🧪 Excellent lab coordinator who ensures hands-on learning excellence!" },
            "Samrat Joshi": { post: "Lab Incharge", department: "Physics Department", compliment: "🔬 Outstanding lab instructor who makes experiments engaging!" },

            // Chemistry Department
            "Jaya Ram Ghimire": { post: "Head of Department/uniglobe innovation research department head", department: "Chemistry Department", compliment: "🧪 Brilliant chemistry department head with exceptional leadership!" },
            "Devendra Dhakal": { post: "Faculty Member", department: "Chemistry Department", compliment: "⚗️ Outstanding chemistry educator with deep molecular insights!" },
            "Dinesh K.C.": { post: "Faculty Member", department: "Chemistry Department", compliment: "🔬 Exceptional chemistry teacher who makes reactions exciting!" },
            "Raju Kandel": { post: "Faculty Member", department: "Chemistry Department", compliment: "🧬 Brilliant chemistry instructor with innovative teaching approaches!" },
            "Pushpa Raj Bhatta": { post: "Faculty Member", department: "Chemistry Department", compliment: "⚛️ Dedicated chemistry educator who simplifies complex concepts!" },
            "Raju Bhujel": { post: "Lab Incharge", department: "Chemistry Department", compliment: "🧪 Excellent lab coordinator who ensures safety and learning!" },
            "Raju Koirala": { post: "Faculty Member", department: "Chemistry Department", compliment: "🔬 Outstanding chemistry teacher with practical expertise!" },
            "Rita Upreti": { post: "Faculty Member", department: "Chemistry Department", compliment: "⚗️ Brilliant chemistry educator who inspires scientific curiosity!" },
            "Dhurba Raut": { post: "Faculty Member", department: "Chemistry Department", compliment: "🧪 Dedicated chemistry instructor with excellent communication skills!" },
            "Prakash Tiwari": { post: "Faculty Member", department: "Chemistry Department", compliment: "🔬 Exceptional chemistry teacher who makes learning enjoyable!" },
            "Dinesh Subedi": { post: "Faculty Member", department: "Chemistry Department", compliment: "⚛️ Outstanding chemistry educator with deep subject knowledge!" },
            "Mahesh Singh Karki": { post: "Lab Incharge", department: "Chemistry Department", compliment: "🧪 a motivater / lab instructor who ensures practical excellence!" },

            // Biology Department
            "Tara Bahadur Gurung": { post: "Head of Department", department: "Biology Department", compliment: "🌱 Brilliant biology department head who nurtures scientific minds!" },
            "Keshav Prasain": { post: "Faculty Member", department: "Biology Department", compliment: "🧬 Exceptional biology educator with deep life science knowledge!" },
            "Lok Hari Pandey": { post: "Faculty Member", department: "Biology Department", compliment: "🔬 Outstanding biology teacher who makes life sciences fascinating!" },
            "Sunita Thapa": { post: "Faculty Member", department: "Biology Department", compliment: "🌿 Dedicated biology educator with excellent teaching skills!" },
            "Deepak Nepal": { post: "Faculty Member", department: "Biology Department", compliment: "🧬 Brilliant biology instructor who inspires scientific inquiry!" },
            "Puskal Khanal": { post: "Faculty Member", department: "Biology Department", compliment: "🔬 Exceptional biology teacher with innovative approaches!" },
            "Sunny Maharjan": { post: "Faculty Member", department: "Biology Department", compliment: "🌱 Outstanding biology educator who makes learning engaging!" },
            "Amber Bahadur Thapa": { post: "Faculty Member", department: "Biology Department", compliment: "🧬 Dedicated biology instructor with excellent communication!" },
            "Sulav Giri": { post: "Lab Incharge", department: "Biology Department", compliment: "🔬 Excellent lab coordinator who ensures hands-on learning!" },
            "Prakash Giri": { post: "Lab Incharge", department: "Biology Department", compliment: "🧪 Outstanding lab instructor who makes experiments exciting!dancer hoo nii" },

            // Mathematics Department
            "Agni Datta Joshi": { post: "Head of Department", department: "Mathematics Department", compliment: "📐 Brilliant mathematics department head who makes numbers magical!whats math ?its easy as a joke for me easy 60mark)" },
            "Bal Krishna Bhatta": { post: "Faculty Member", department: "Mathematics Department", compliment: "🔢 Exceptional mathematics educator with logical brilliance!" },
            "Bhavanand Chaudhary": { post: "Faculty Member", department: "Mathematics Department", compliment: "📊 Outstanding mathematics teacher who simplifies complex problems!" },
            "Chiranjibi Gyawali": { post: "Faculty Member", department: "Mathematics Department", compliment: "📈 Dedicated mathematics educator with excellent problem-solving skills!" },
            "Laxman Adhikari": { post: "Faculty Member", department: "Mathematics Department", compliment: "🔢 Brilliant mathematics instructor who makes learning enjoyable!" },
            "Rajendra Bhattarai": { post: "Faculty Member", department: "Mathematics Department", compliment: "📐 Exceptional mathematics teacher with deep analytical skills!" },
            "Rana Bahadur Giri": { post: "Faculty Member", department: "Mathematics Department", compliment: "📊 Outstanding mathematics educator who inspires logical thinking!" },
            "Baburam Panta": { post: "Faculty Member", department: "Mathematics Department", compliment: "🔢 keep silence or else get out the most iconic dialogue !" },
            "Narayan Dhakal": { post: "Faculty Member", department: "Mathematics Department", compliment: "📈 Brilliant mathematics teacher who makes concepts clear!" },
            "Surendra Shrestha": { post: "Faculty Member", department: "Mathematics Department", compliment: "📐 Exceptional mathematics educator with practical expertise!" },

            // English Department
            "Ganesh Raj Pandey": { post: "Faculty Member", department: "English Department", compliment: "📚 Outstanding English educator who brings literature to life!uhh i wished i had learnt with him as he is a great teacher" },
            "Tika Datta Subedi": { post: "Faculty Member", department: "English Department", compliment: "✍️ Brilliant English teacher with excellent communication skills!" },
            "Dr. Anju Gupta": { post: "Faculty Member", department: "English Department", compliment: "🎓 Exceptional English educator with deep literary knowledge!" },
            "Krishna Pokhrel": { post: "Faculty Member", department: "English Department", compliment: "📖 Dedicated English instructor who inspires language excellence!" },

            // Nepali Department
            "Chudamani Pandey": { post: "Faculty Member", department: "Nepali Department", compliment: "📜 Outstanding Nepali educator who preserves cultural heritage!" },
            "Diwas Mani Bhattarai": { post: "Faculty Member", department: "Nepali Department", compliment: "📚 Brilliant Nepali teacher with deep literary insights!" },
            "Jivan Shrestha": { post: "Faculty Member", department: "Nepali Department", compliment: "📖 Exceptional Nepali educator who makes language beautiful!" },
            "Yadav Prasad Bhandari": { post: "Faculty Member", department: "Nepali Department", compliment: "📜 Dedicated Nepali instructor with cultural expertise!" },
            "Mukti Prasad Bhandari": { post: "Faculty Member", department: "Nepali Department", compliment: "📚 Outstanding Nepali teacher who inspires linguistic excellence!" },

            // Computer Science Department
            "Navin Gurung": { post: "Head of Department", department: "Computer Science Department", compliment: "💻 Brilliant computer science head who leads digital innovation!as well as a Singer!!" },
            "Tek Raj Joshi": { post: "Faculty Member", department: "Computer Science Department", compliment: "🖥️ Exceptional computer educater new faculty staff well understanding!" },
            "Kamal Tamrakar": { post: "Faculty Member", department: "Computer Science Department", compliment: "💻 Outstanding computer teacher who makes coding exciting!" },
            "Manoj Kumar Giri": { post: "Faculty Member", department: "Computer Science Department", compliment: "🖥️ Dedicated computer instructor with excellent technical skills!" }
            // students 
            "Smarika Poudel": { post: "student", department: "Biology Science ", compliment: "Shes also called Nakkali didi because she makes a lot of tiktok, i wish i could flirt her but shes my vauju and didi of My developer" },
            
        }
    };
    
    // Call Gemini API with comprehensive UGSS data
    async function callGeminiAPI(userMessage) {
        // Create comprehensive context with all UGSS data
        const ugssContext = `
You are UGSS Sewa Sathi, a helpful AI assistant for Uniglobe SS/College. You have access to comprehensive information about the college and all staff members. You can also search the web for additional information when needed.

CREATOR INFORMATION:
- I was made by my genious coder Sakshyam Upadhayay who studies in this college grade12L as a part of UGSS Hackathon Event as being a member of team elite 🚀✨

COLLEGE INFORMATION:
- Name: ${ugssData.general.name}
- Tagline: "${ugssData.general.tagline}"
- Location: ${ugssData.general.location}
- Contact: Phone ${ugssData.general.phone}, Email ${ugssData.general.email}, Mobile ${ugssData.general.mobile}
- Statistics: ${ugssData.general.students} students, ${ugssData.general.faculty} faculty, ${ugssData.general.successRate} success rate

LEADERSHIP TEAM:
- Principal: ${ugssData.leadership.principal.name} - ${ugssData.leadership.principal.role}
- CFO: ${ugssData.leadership.cfo.name} - ${ugssData.leadership.cfo.role}
- Director: ${ugssData.leadership.director.name} - ${ugssData.leadership.director.role}

MISSION & VISION:
- Mission: ${ugssData.mission.mission}
- Vision: ${ugssData.mission.vision}

PROGRAMS: ${Object.values(ugssData.programs).join(', ')}

FACILITIES: ${ugssData.facilities.join(', ')}

STUDENT CLUBS: ${ugssData.clubs.join(', ')}

UPCOMING EVENTS:
${ugssData.events.upcoming.map(event => `- ${event.name} (${event.date}): ${event.description}`).join('\n')}

HACKATHON: ${ugssData.events.hackathon.name} - ${ugssData.events.hackathon.description} (First ever hackathon organized by college and IT Club)

MIS PORTAL: ${ugssData.mis.description} - ${ugssData.mis.panels.join(', ')}

FAQS:
- Admission: ${ugssData.faqs.admission}
- Programs: ${ugssData.faqs.programs}
- MIS Access: ${ugssData.faqs.misAccess}
- Facilities: ${ugssData.faqs.facilities}

COMPLETE FACULTY AND STAFF INFORMATION:
${Object.entries(ugssData.faculty).map(([name, info]) => 
    `- ${name}: ${info.post} (${info.department}) - ${info.compliment}`
).join('\n')}

DEPARTMENT HEADS (HODs):
- Physics Department HOD: Devendra Khadka
- Chemistry Department HOD: Jaya Ram Ghimire  
- Biology Department HOD: Tara Bahadur Gurung
- Mathematics Department HOD: Agni Datta Joshi
- Computer Science Department HOD: Navin Gurung
Exam Department
Mr. Basanta Ghimire  Exam Coordinator 
        "Mr basanta Ghimire": { post: "Exam co-ordinater", department: "exam/evaluation", compliment: "damn very strict and supportive teacher !" }
        "Mr. Harish Bhatta": { post: "In-charge Examination", department: "exam/evaluation", compliment: "damn helpful but in exam if you cheat youre cooked!" }
         

INSTRUCTIONS:
1. Be friendly, helpful, and informative
2. Use the provided UGSS data to answer questions accurately
3. You can search the web for additional information when needed
4. For questions about specific staff members, use the faculty data provided
5. For questions about HODs, use the department heads information
6. Use emojis and friendly language - NEVER use asterisks (**) for formatting
7. If asked about topics not related to Uniglobe College, you can provide general information or redirect to college-related topics
8. Always maintain a helpful and professional tone
9. If someone asks "who created you", "who made you", "who built you", "who developed you", "who programmed you", or "who designed you", always respond with: "I was made by my genious coder Sakshyam Upadhayay who studies in this college grade12L as a part of UGSS Hackathon Event as being a member of team elite 🚀✨"
10. Keep responses SHORT and SWEET - maximum 150 words
11. Use emojis instead of asterisks for emphasis: 🎓 for education, 🏫 for college, 📚 for programs, 🎭 for clubs, 📅 for events, 📞 for contact, 🗺️ for location, etc.
12. Make responses conversational and engaging, not formal or robotic  
`;

        const requestBody = {
            contents: [
                {
                    parts: [
                        {
                            text: ugssContext + "\n\nUser question: " + userMessage
                        }
                    ]
                }
            ],
            generationConfig: {
                temperature: 0.8,
                maxOutputTokens: 200,
                topP: 0.9
            }
        };

        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-goog-api-key': apiKey
                },
                body: JSON.stringify(requestBody)
            });

            if (!response.ok) {
                throw new Error(`API request failed: ${response.status}`);
            }

            const data = await response.json();
            let botResponse = data.candidates[0].content.parts[0].text;
            
            // Clean up the response - remove asterisks and limit words
            botResponse = cleanResponse(botResponse);
            
            hideTypingIndicator();
            addMessage(botResponse, 'bot');
        } catch (error) {
            hideTypingIndicator();
            addMessage('Sorry, I encountered an error. Please try again later.', 'bot');
            console.error('Chat error:', error);
        }
    }
    
    console.log('UGSS Sewa Sathi ready!');
}); 
