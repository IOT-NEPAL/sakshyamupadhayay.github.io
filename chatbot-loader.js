// Chatbot Component Loader
// ugss hackathon - owner UNI-ElITE

document.addEventListener('DOMContentLoaded', function() {
    console.log('Loading chatbot component...');
    
    // Load chatbot HTML component
    fetch('chatbot-component.html')
        .then(response => response.text())
        .then(html => {
            // Insert chatbot HTML before closing body tag
            document.body.insertAdjacentHTML('beforeend', html);
            
            // Load chatbot CSS
            loadChatbotCSS();
            
            // Initialize chatbot functionality
            initializeChatbot();
        })
        .catch(error => {
            console.error('Error loading chatbot component:', error);
        });
});

// Load chatbot CSS
function loadChatbotCSS() {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'homepage.css'; // Using existing CSS file
    document.head.appendChild(link);
}

// Comprehensive Faculty Database
const facultyDatabase = {
    // Administrative Staff
    "Shekhar Adhikari": { post: "Program Director", department: "Management & Law", compliment: "🌟 A visionary leader who excels in academic program management and student development!" },
    "Krishna Dhungana": { post: "Associate Program Coordinator", department: "Science Stream", compliment: "🔬 Dedicated coordinator who ensures excellence in science education and research!" },
    "Suraj Kumar Thapa": { post: "Associate Program Coordinator", department: "Management & Law", compliment: "⚖️ Outstanding coordinator with exceptional skills in management education!" },
    "Basanta Ghimire": { post: "Exam Coordinator", department: "Exam Department", compliment: "📝 Meticulous exam coordinator who maintains the highest standards of academic integrity!" },
    "Harish Bhatta": { post: "In-charge Examination", department: "Exam Department", compliment: "📊 Brilliant examination manager who ensures fair and transparent evaluation processes!" },
    "Ganesh Bhatta": { post: "General Manager (Head-Finance)", department: "Finance Department", compliment: "💰 Exceptional financial leader who ensures fiscal responsibility and institutional growth!" },
    "Prakash Acharya": { post: "Senior Officer - Finance", department: "Finance Department", compliment: "💼 Outstanding finance professional with remarkable attention to detail!" },
    "Negam Raj Regmi": { post: "Assistant Finance Manager", department: "Finance Department", compliment: "📈 Dedicated finance manager who contributes significantly to institutional success!" },
    "Ram B. Kalel": { post: "Office Assistant", department: "Finance Department", compliment: "🔄 Reliable office assistant who keeps the administrative wheels turning smoothly!" },
    "Netra Bahadur Gurung": { post: "ECA/CCA Incharge", department: "ECA Department", compliment: "🎭 Creative ECA coordinator who brings out the best in student talents!" },
    "Dipesh Maharjan": { post: "Sports Instructor", department: "Sports Department", compliment: "⚽ Dynamic sports instructor who inspires athletic excellence and team spirit!" },
    "Madhav Raut": { post: "Sports In-charge", department: "Sports Department", compliment: "🏆 Outstanding sports leader who promotes physical fitness and sportsmanship!" },
    "Nischal Tandukar": { post: "Sports Instructor", department: "Sports Department", compliment: "🏅 Dedicated sports instructor who nurtures athletic talent and discipline!" },
    "Anil Pantha": { post: "IT In-charge", department: "IT Department", compliment: "💻 Tech-savvy IT leader who keeps our digital infrastructure cutting-edge!" },
    "Rajeev Bajracharya": { post: "Documentation Officer", department: "Documentation Department", compliment: "📋 Meticulous documentation officer who maintains impeccable institutional records!" },
    "Suman Oli": { post: "Documentation Officer", department: "Documentation Department", compliment: "📄 Excellent documentation professional with outstanding organizational skills!" },
    "Sharad Basnet": { post: "IRC In-charge", department: "Library Department", compliment: "📚 Knowledgeable library leader who fosters a culture of learning and research!" },
    "Deepa Panta": { post: "Nurse", department: "Health Services", compliment: "🏥 Caring health professional who ensures student well-being with compassion!" },

    // Physics Department
    "Devendra Khadka": { post: "Head of Department", department: "Physics Department", compliment: "⚛️ Brilliant physics department head who makes complex concepts accessible!" },
    "Ajaya Jha": { post: "Faculty Member", department: "Physics Department", compliment: "🔬 Exceptional physics educator with deep theoretical knowledge!" },
    "Shesh Raj Bhandari": { post: "Faculty Member", department: "Physics Department", compliment: "⚡ Outstanding physics teacher who sparks scientific curiosity!" },
    "Dipesh Kumar Das": { post: "Faculty Member", department: "Physics Department", compliment: "🌌 Inspiring physics educator who brings the universe to the classroom!" },
    "Milan Thapa": { post: "Faculty Member", department: "Physics Department", compliment: "🔍 Dedicated physics teacher with excellent problem-solving skills!" },
    "Ram Hari Timalsina": { post: "Faculty Member", department: "Physics Department", compliment: "📐 Brilliant physics instructor who makes mathematics beautiful!" },
    "Sushil Upreti": { post: "Faculty Member", department: "Physics Department", compliment: "⚙️ Outstanding physics educator with practical expertise!" },
    "Amrit Basnet": { post: "Faculty Member", department: "Physics Department", compliment: "🌟 Exceptional physics teacher who inspires scientific thinking!" },
    "Sanat Kumar Giri": { post: "Faculty Member", department: "Physics Department", compliment: "🔬 Dedicated physics educator with innovative teaching methods!" },
    "Harish Bohara": { post: "Lab Incharge", department: "Physics Department", compliment: "🧪 Excellent lab coordinator who ensures hands-on learning excellence!" },
    "Samrat Joshi": { post: "Lab Incharge", department: "Physics Department", compliment: "🔬 Outstanding lab instructor who makes experiments engaging!" },

    // Chemistry Department
    "Jaya Ram Ghimire": { post: "Head of Department", department: "Chemistry Department", compliment: "🧪 Brilliant chemistry department head with exceptional leadership!" },
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
    "Mahesh Singh Karki": { post: "Lab Incharge", department: "Chemistry Department", compliment: "🧪 Excellent lab instructor who ensures practical excellence!" },

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
    "Prakash Giri": { post: "Lab Incharge", department: "Biology Department", compliment: "🧪 Outstanding lab instructor who makes experiments exciting!" },

    // Mathematics Department
    "Agni Datta Joshi": { post: "Head of Department", department: "Mathematics Department", compliment: "📐 Brilliant mathematics department head who makes numbers magical!" },
    "Bal Krishna Bhatta": { post: "Faculty Member", department: "Mathematics Department", compliment: "🔢 Exceptional mathematics educator with logical brilliance!" },
    "Bhavanand Chaudhary": { post: "Faculty Member", department: "Mathematics Department", compliment: "📊 Outstanding mathematics teacher who simplifies complex problems!" },
    "Chiranjibi Gyawali": { post: "Faculty Member", department: "Mathematics Department", compliment: "📈 Dedicated mathematics educator with excellent problem-solving skills!" },
    "Laxman Adhikari": { post: "Faculty Member", department: "Mathematics Department", compliment: "🔢 Brilliant mathematics instructor who makes learning enjoyable!" },
    "Rajendra Bhattarai": { post: "Faculty Member", department: "Mathematics Department", compliment: "📐 Exceptional mathematics teacher with deep analytical skills!" },
    "Rana Bahadur Giri": { post: "Faculty Member", department: "Mathematics Department", compliment: "📊 Outstanding mathematics educator who inspires logical thinking!" },
    "Baburam Panta": { post: "Faculty Member", department: "Mathematics Department", compliment: "🔢 Dedicated mathematics instructor with excellent teaching methods!" },
    "Narayan Dhakal": { post: "Faculty Member", department: "Mathematics Department", compliment: "📈 Brilliant mathematics teacher who makes concepts clear!" },
    "Surendra Shrestha": { post: "Faculty Member", department: "Mathematics Department", compliment: "📐 Exceptional mathematics educator with practical expertise!" },

    // English Department
    "Ganesh Raj Pandey": { post: "Faculty Member", department: "English Department", compliment: "📚 Outstanding English educator who brings literature to life!" },
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
    "Navin Gurung": { post: "Head of Department", department: "Computer Science Department", compliment: "💻 Brilliant computer science head who leads digital innovation!" },
    "Tek Raj Joshi": { post: "Faculty Member", department: "Computer Science Department", compliment: "🖥️ Exceptional computer educator with cutting-edge knowledge!" },
    "Kamal Tamrakar": { post: "Faculty Member", department: "Computer Science Department", compliment: "💻 Outstanding computer teacher who makes coding exciting!" },
    "Manoj Kumar Giri": { post: "Faculty Member", department: "Computer Science Department", compliment: "🖥️ Dedicated computer instructor with excellent technical skills!" }
};

// Faculty search and response functions
function searchFaculty(query) {
    query = query.toLowerCase();
    const results = [];
    
    // Handle common variations and abbreviations
    const searchTerms = [
        query,
        query.replace('hod', 'head of department'),
        query.replace('head of department', 'hod'),
        query.replace('dept', 'department'),
        query.replace('department', 'dept')
    ];
    
    for (const [name, info] of Object.entries(facultyDatabase)) {
        const nameLower = name.toLowerCase();
        const postLower = info.post.toLowerCase();
        const deptLower = info.department.toLowerCase();
        
        // Check if any search term matches
        const matches = searchTerms.some(term => 
            nameLower.includes(term) || 
            postLower.includes(term) || 
            deptLower.includes(term)
        );
        
        if (matches) {
            results.push({ name, info });
        }
    }
    
    return results;
}

function getFacultyInfo(name) {
    return facultyDatabase[name] || null;
}

function generateCompliment(name) {
    const faculty = facultyDatabase[name];
    if (faculty) {
        return faculty.compliment;
    }
    return "🌟 Thank you for your dedication to education and student development!";
}

// Initialize chatbot functionality
function initializeChatbot() {
    console.log('Initializing enhanced chatbot...');
    
    const chatBubble = document.getElementById('chat-bubble');
    const chatInterface = document.getElementById('chat-interface');
    const chatClose = document.getElementById('chat-close');
    const chatInput = document.getElementById('chat-input');
    const chatMessages = document.getElementById('chat-messages');
    
    // No external API needed - using local database and Google search
    
    let isTyping = false;
    
    // Chat bubble click handler
    chatBubble.addEventListener('click', function() {
        console.log('Chat bubble clicked!');
        chatInterface.classList.add('active');
        chatInput.focus();
    });
    
    // Close button handler
    chatClose.addEventListener('click', function() {
        console.log('Close button clicked!');
        chatInterface.classList.remove('active');
    });
    
    // Handle Enter key press
    chatInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });
    
    // Send message function
    function sendMessage() {
        const message = chatInput.value.trim();
        if (!message || isTyping) return;
        
        console.log('Sending message:', message);
        
        // Add user message
        addMessage(message, 'user');
        chatInput.value = '';
        
        // Show typing indicator
        showTypingIndicator();
        
        // Process message and generate response
        processMessage(message);
    }
    
    // Process message and generate intelligent response
    async function processMessage(userMessage) {
        const lowerMessage = userMessage.toLowerCase();
        
        // Check for department-specific HOD queries FIRST (more specific)
        const departments = ['physics', 'chemistry', 'biology', 'mathematics', 'english', 'nepali', 'computer', 'management', 'law'];
        for (const dept of departments) {
            if (lowerMessage.includes(dept) && (lowerMessage.includes('hod') || lowerMessage.includes('head'))) {
                const deptHOD = Object.entries(facultyDatabase).filter(([name, info]) => 
                    info.department.toLowerCase().includes(dept) && 
                    (info.post.toLowerCase().includes('head of department') || info.post.toLowerCase().includes('hod'))
                );
                
                if (deptHOD.length > 0) {
                    let response = `🎓 **${dept.charAt(0).toUpperCase() + dept.slice(1)} Department Head**\n\n`;
                    deptHOD.forEach(([name, info]) => {
                        response += `**${name}**\n`;
                        response += `📋 Post: ${info.post}\n`;
                        response += `🏢 Department: ${info.department}\n`;
                        response += `${info.compliment}\n\n`;
                    });
                    
                    hideTypingIndicator();
                    addMessage(response, 'bot');
                    return;
                }
            }
        }
        
        // Check for general HOD/Head of Department queries
        if (lowerMessage.includes('hod') || lowerMessage.includes('head of department') || 
            lowerMessage.includes('department head') || lowerMessage.includes('head of') ||
            (lowerMessage.includes('this faculty') && lowerMessage.includes('hod'))) {
            
            const hodFaculty = Object.entries(facultyDatabase).filter(([name, info]) => 
                info.post.toLowerCase().includes('head of department') || 
                info.post.toLowerCase().includes('hod')
            );
            
            if (hodFaculty.length > 0) {
                let response = "🎓 **Heads of Departments**\n\n";
                hodFaculty.forEach(([name, info]) => {
                    response += `**${name}**\n`;
                    response += `📋 Post: ${info.post}\n`;
                    response += `🏢 Department: ${info.department}\n`;
                    response += `${info.compliment}\n\n`;
                });
                
                response += "💡 You can also ask about specific departments like 'Who is HOD of Physics?' or 'Show me Chemistry department head'";
                
                hideTypingIndicator();
                addMessage(response, 'bot');
                return;
            }
        }
        
        // Check for faculty-related queries
        if (lowerMessage.includes('faculty') || lowerMessage.includes('staff') || 
            lowerMessage.includes('teacher') || lowerMessage.includes('professor') ||
            lowerMessage.includes('who') || lowerMessage.includes('name')) {
            
            // Search for specific faculty members
            const searchResults = searchFaculty(userMessage);
            
            if (searchResults.length > 0) {
                let response = "🎓 Here's what I found about our faculty:\n\n";
                
                searchResults.forEach(({ name, info }) => {
                    response += `**${name}**\n`;
                    response += `📋 Post: ${info.post}\n`;
                    response += `🏢 Department: ${info.department}\n`;
                    response += `${info.compliment}\n\n`;
                });
                
                if (searchResults.length === 1) {
                    response += "💡 You can ask me about any other faculty member or their specific roles!";
                } else {
                    response += "💡 Need more specific information about any of these faculty members?";
                }
                
                hideTypingIndicator();
                addMessage(response, 'bot');
                return;
            }
            
            // General faculty information
            if (lowerMessage.includes('all') || lowerMessage.includes('list') || lowerMessage.includes('complete')) {
                const departments = {};
                for (const [name, info] of Object.entries(facultyDatabase)) {
                    if (!departments[info.department]) {
                        departments[info.department] = [];
                    }
                    departments[info.department].push({ name, info });
                }
                
                let response = "🎓 **Complete Faculty Directory**\n\n";
                
                for (const [dept, faculty] of Object.entries(departments)) {
                    response += `**${dept}**\n`;
                    faculty.forEach(({ name, info }) => {
                        response += `• ${name} - ${info.post}\n`;
                    });
                    response += "\n";
                }
                
                response += "💡 Ask me about any specific faculty member for detailed information and compliments!";
                
                hideTypingIndicator();
                addMessage(response, 'bot');
                return;
            }
        }
        
        // Check for compliment requests
        if (lowerMessage.includes('compliment') || lowerMessage.includes('praise') || 
            lowerMessage.includes('appreciate') || lowerMessage.includes('thank')) {
            
            const searchResults = searchFaculty(userMessage);
            if (searchResults.length > 0) {
                let response = "🌟 **Faculty Appreciation**\n\n";
                searchResults.forEach(({ name, info }) => {
                    response += `**${name}**\n`;
                    response += `${info.compliment}\n\n`;
                });
                
                hideTypingIndicator();
                addMessage(response, 'bot');
                return;
            }
        }
        
        // Check for general department faculty queries (non-HOD)
        for (const dept of departments) {
            if (lowerMessage.includes(dept) && !lowerMessage.includes('hod') && !lowerMessage.includes('head')) {
                // General department faculty
                const deptFaculty = Object.entries(facultyDatabase).filter(([name, info]) => 
                    info.department.toLowerCase().includes(dept)
                );
                
                if (deptFaculty.length > 0) {
                    let response = `🎓 **${dept.charAt(0).toUpperCase() + dept.slice(1)} Department Faculty**\n\n`;
                    deptFaculty.forEach(([name, info]) => {
                        response += `**${name}**\n`;
                        response += `📋 Post: ${info.post}\n`;
                        response += `${info.compliment}\n\n`;
                    });
                    
                    hideTypingIndicator();
                    addMessage(response, 'bot');
                    return;
                }
            }
        }
        
        // If no specific faculty query, provide Google search
        handleNonFacultyQuery(userMessage);
    }
    
    // Add message to chat
    function addMessage(content, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;
        
        // Convert markdown-style formatting to HTML
        const formattedContent = content
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/\n/g, '<br>');
        
        messageDiv.innerHTML = `<p>${formattedContent}</p>`;
        
        chatMessages.appendChild(messageDiv);
        scrollToBottom();
    }
    
    // Show typing indicator
    function showTypingIndicator() {
        isTyping = true;
        const typingDiv = document.createElement('div');
        typingDiv.className = 'message bot-message';
        typingDiv.id = 'typing-indicator';
        typingDiv.innerHTML = '<p>UGSS Sewa Sathi is typing...</p>';
        
        chatMessages.appendChild(typingDiv);
        scrollToBottom();
    }
    
    // Hide typing indicator
    function hideTypingIndicator() {
        isTyping = false;
        const typingIndicator = document.getElementById('typing-indicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }
    
    // Scroll to bottom
    function scrollToBottom() {
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    // Escape HTML
    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
    
    // Handle non-faculty queries with Google search
    async function handleNonFacultyQuery(userMessage) {
        try {
            // Create a Google search URL
            const searchQuery = encodeURIComponent(userMessage);
            const googleSearchUrl = `https://www.google.com/search?q=${searchQuery}`;
            
            // Provide a short, helpful response with search link
            const response = `🔍 **Quick Search Result**\n\nI don't have specific information about that in my database. Here's a Google search for you:\n\n**${userMessage}**\n\n🌐 [Search on Google](${googleSearchUrl})\n\n💡 *For faculty information, try asking about specific names, departments, or HODs!*`;
            
            hideTypingIndicator();
            addMessage(response, 'bot');
        } catch (error) {
            hideTypingIndicator();
            addMessage('🔍 Try searching on Google for that information. For faculty queries, I can help you directly!', 'bot');
        }
    }
    
    console.log('Enhanced chatbot component ready with faculty database!');
} 