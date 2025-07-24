export const testTextToVideoHTML = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>VideoVerse AI - Create Amazing Videos from Text | Powered by OpenAI</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
            background: linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%);
            min-height: 100vh;
            color: white;
            overflow-x: hidden;
        }

        .container {
            max-width: 1400px;
            margin: 0 auto;
            padding: 20px;
        }

        .header {
            text-align: center;
            padding: 40px 0 60px 0;
            position: relative;
        }

        .logo {
            font-size: 3rem;
            font-weight: 800;
            background: linear-gradient(45deg, #6366f1, #8b5cf6, #d946ef);
            background-clip: text;
            -webkit-background-clip: text;
            color: transparent;
            margin-bottom: 15px;
            letter-spacing: -1px;
        }

        .tagline {
            font-size: 1.4rem;
            opacity: 0.9;
            margin-bottom: 15px;
            color: #e2e8f0;
        }

        .powered-by {
            font-size: 0.9rem;
            opacity: 0.7;
            color: #94a3b8;
            margin-bottom: 25px;
        }

        .powered-by .highlight {
            color: #10b981;
            font-weight: 600;
        }

        .test-button {
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(45deg, #ef4444, #dc2626);
            color: white;
            border: none;
            padding: 12px 20px;
            border-radius: 8px;
            font-weight: 600;
            cursor: pointer;
            z-index: 1000;
            box-shadow: 0 4px 12px rgba(239, 68, 68, 0.4);
            transition: all 0.3s ease;
            font-size: 0.9rem;
        }

        .test-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(239, 68, 68, 0.6);
        }

        .main-panel {
            background: rgba(15, 23, 42, 0.8);
            backdrop-filter: blur(20px);
            border-radius: 24px;
            padding: 40px;
            border: 1px solid rgba(255, 255, 255, 0.1);
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
            margin-bottom: 30px;
        }

        .input-section {
            margin-bottom: 40px;
        }

        .prompt-input {
            width: 100%;
            min-height: 120px;
            background: rgba(30, 41, 59, 0.8);
            border: 2px solid rgba(255, 255, 255, 0.1);
            border-radius: 16px;
            padding: 20px;
            color: white;
            font-size: 1.1rem;
            resize: vertical;
            transition: all 0.3s ease;
        }

        .prompt-input:focus {
            outline: none;
            border-color: #6366f1;
            box-shadow: 0 0 20px rgba(99, 102, 241, 0.3);
        }

        .prompt-input::placeholder {
            color: #64748b;
        }

        .controls {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
            gap: 20px;
            margin-bottom: 30px;
        }

        .control-group {
            display: flex;
            flex-direction: column;
            gap: 8px;
        }

        .control-label {
            font-size: 0.9rem;
            font-weight: 600;
            color: #e2e8f0;
        }

        .control-select {
            background: rgba(30, 41, 59, 0.8);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 12px;
            padding: 12px 16px;
            color: white;
            font-size: 1rem;
            cursor: pointer;
            transition: all 0.3s ease;
        }

        .control-select:focus {
            outline: none;
            border-color: #6366f1;
        }

        .generate-button {
            width: 100%;
            background: linear-gradient(45deg, #6366f1, #8b5cf6);
            border: none;
            padding: 20px;
            border-radius: 16px;
            color: white;
            font-size: 1.2rem;
            font-weight: 700;
            cursor: pointer;
            transition: all 0.3s ease;
            position: relative;
            overflow: hidden;
        }

        .generate-button:hover:not(:disabled) {
            transform: translateY(-2px);
            box-shadow: 0 10px 30px rgba(99, 102, 241, 0.4);
        }

        .generate-button:disabled {
            opacity: 0.7;
            cursor: not-allowed;
        }

        .status-section {
            margin-top: 30px;
            padding: 25px;
            background: rgba(30, 41, 59, 0.6);
            border-radius: 16px;
            border: 1px solid rgba(255, 255, 255, 0.1);
            display: none;
        }

        .status-section.active {
            display: block;
        }

        .progress-bar {
            width: 100%;
            height: 8px;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 4px;
            overflow: hidden;
            margin-bottom: 20px;
        }

        .progress-fill {
            height: 100%;
            background: linear-gradient(45deg, #10b981, #059669);
            width: 0%;
            transition: width 0.3s ease;
            border-radius: 4px;
        }

        .status-text {
            font-size: 1.1rem;
            font-weight: 600;
            color: #e2e8f0;
            margin-bottom: 15px;
        }

        .processing-time {
            font-size: 0.9rem;
            color: #94a3b8;
            margin-bottom: 15px;
        }

        .ai-content {
            background: rgba(15, 23, 42, 0.8);
            border-radius: 12px;
            padding: 20px;
            margin-top: 20px;
            border-left: 4px solid #10b981;
        }

        .ai-content h3 {
            color: #10b981;
            margin-bottom: 12px;
            font-size: 1.1rem;
        }

        .ai-content p {
            line-height: 1.6;
            color: #e2e8f0;
            margin-bottom: 10px;
        }

        .video-result {
            background: rgba(15, 23, 42, 0.9);
            border-radius: 16px;
            padding: 30px;
            text-align: center;
            margin-top: 20px;
            border: 2px solid #10b981;
        }

        .video-placeholder {
            width: 100%;
            max-width: 600px;
            height: 300px;
            background: linear-gradient(135deg, #1e293b, #334155);
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 20px;
            border: 2px dashed rgba(255, 255, 255, 0.2);
            position: relative;
            overflow: hidden;
        }

        .video-icon {
            font-size: 4rem;
            color: #6366f1;
        }

        .video-ready {
            position: absolute;
            top: 10px;
            right: 10px;
            background: #10b981;
            color: white;
            padding: 8px 12px;
            border-radius: 6px;
            font-size: 0.8rem;
            font-weight: 600;
        }

        .action-buttons {
            display: flex;
            gap: 15px;
            justify-content: center;
            margin-top: 20px;
            flex-wrap: wrap;
        }

        .action-button {
            background: rgba(99, 102, 241, 0.2);
            border: 1px solid #6366f1;
            color: #6366f1;
            padding: 12px 24px;
            border-radius: 12px;
            cursor: pointer;
            font-weight: 600;
            transition: all 0.3s ease;
            text-decoration: none;
            display: inline-flex;
            align-items: center;
            gap: 8px;
        }

        .action-button:hover {
            background: #6366f1;
            color: white;
            transform: translateY(-2px);
        }

        .action-button.download {
            background: rgba(16, 185, 129, 0.2);
            border-color: #10b981;
            color: #10b981;
        }

        .action-button.download:hover {
            background: #10b981;
            color: white;
        }

        .error-message {
            background: rgba(239, 68, 68, 0.1);
            border: 1px solid #ef4444;
            color: #ef4444;
            padding: 15px;
            border-radius: 12px;
            margin-top: 15px;
        }

        .success-message {
            background: rgba(16, 185, 129, 0.1);
            border: 1px solid #10b981;
            color: #10b981;
            padding: 15px;
            border-radius: 12px;
            margin-top: 15px;
        }

        .features-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 25px;
            margin-top: 40px;
        }

        .feature-card {
            background: rgba(30, 41, 59, 0.6);
            border-radius: 16px;
            padding: 25px;
            border: 1px solid rgba(255, 255, 255, 0.1);
            text-align: center;
            transition: all 0.3s ease;
        }

        .feature-card:hover {
            transform: translateY(-5px);
            border-color: #6366f1;
        }

        .feature-icon {
            font-size: 2.5rem;
            margin-bottom: 15px;
            color: #6366f1;
        }

        .feature-title {
            font-size: 1.2rem;
            font-weight: 700;
            margin-bottom: 10px;
            color: #e2e8f0;
        }

        .feature-description {
            color: #94a3b8;
            line-height: 1.5;
        }

        @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
        }

        .loading {
            animation: pulse 2s infinite;
        }

        @media (max-width: 768px) {
            .container {
                padding: 15px;
            }
            
            .main-panel {
                padding: 25px;
            }
            
            .controls {
                grid-template-columns: 1fr;
            }
            
            .action-buttons {
                flex-direction: column;
                align-items: center;
            }
            
            .test-button {
                position: relative;
                top: auto;
                right: auto;
                margin-bottom: 20px;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <button class="test-button" onclick="runInstantTest()">⚡ AI TEST</button>
        
        <div class="header">
            <h1 class="logo">VideoVerse AI</h1>
            <p class="tagline">Transform Your Ideas Into Stunning Videos</p>
            <p class="powered-by">Powered by <span class="highlight">OpenAI GPT-4</span> • Professional AI Video Generation</p>
        </div>

        <div class="main-panel">
            <div class="input-section">
                <textarea 
                    id="promptInput" 
                    class="prompt-input" 
                    placeholder="Describe your video idea... (e.g., 'A professional presentation about renewable energy benefits with animated charts and nature footage')"
                ></textarea>
            </div>

            <div class="controls">
                <div class="control-group">
                    <label class="control-label">AI Model</label>
                    <select id="modelSelect" class="control-select">
                        <option value="gpt-4-turbo">GPT-4 Turbo (Recommended)</option>
                        <option value="gpt-4">GPT-4 (Standard)</option>
                        <option value="gpt-3.5-turbo">GPT-3.5 Turbo (Fast)</option>
                    </select>
                </div>
                
                <div class="control-group">
                    <label class="control-label">Video Duration</label>
                    <select id="durationSelect" class="control-select">
                        <option value="5s">5 seconds</option>
                        <option value="10s">10 seconds</option>
                        <option value="15s">15 seconds</option>
                        <option value="30s">30 seconds</option>
                        <option value="60s">1 minute</option>
                    </select>
                </div>
                
                <div class="control-group">
                    <label class="control-label">Aspect Ratio</label>
                    <select id="aspectSelect" class="control-select">
                        <option value="16:9">16:9 (Landscape)</option>
                        <option value="9:16">9:16 (Portrait)</option>
                        <option value="1:1">1:1 (Square)</option>
                        <option value="4:3">4:3 (Classic)</option>
                    </select>
                </div>
                
                <div class="control-group">
                    <label class="control-label">Video Style</label>
                    <select id="styleSelect" class="control-select">
                        <option value="Professional">Professional</option>
                        <option value="Cinematic">Cinematic</option>
                        <option value="Animated">Animated</option>
                        <option value="Documentary">Documentary</option>
                        <option value="Commercial">Commercial</option>
                    </select>
                </div>
            </div>

            <button id="generateBtn" class="generate-button" onclick="generateVideo()">
                🎬 Generate AI Video
            </button>

            <div id="statusSection" class="status-section">
                <div class="progress-bar">
                    <div id="progressFill" class="progress-fill"></div>
                </div>
                <div id="statusText" class="status-text">Initializing AI video generation...</div>
                <div id="processingTime" class="processing-time"></div>
                <div id="aiContent"></div>
            </div>
        </div>

        <div class="features-grid">
            <div class="feature-card">
                <div class="feature-icon">🧠</div>
                <h3 class="feature-title">AI-Powered Scripts</h3>
                <p class="feature-description">OpenAI generates professional video scripts with perfect pacing and storytelling structure</p>
            </div>
            
            <div class="feature-card">
                <div class="feature-icon">🎯</div>
                <h3 class="feature-title">Smart Optimization</h3>
                <p class="feature-description">Automatically optimizes your prompts for better video generation results</p>
            </div>
            
            <div class="feature-card">
                <div class="feature-icon">⚡</div>
                <h3 class="feature-title">Instant Generation</h3>
                <p class="feature-description">Lightning-fast AI processing with real-time status updates and progress tracking</p>
            </div>
            
            <div class="feature-card">
                <div class="feature-icon">🎨</div>
                <h3 class="feature-title">Multiple Styles</h3>
                <p class="feature-description">Choose from professional, cinematic, animated, and documentary video styles</p>
            </div>
        </div>
    </div>

    <script>
        let isGenerating = false;
        let currentVideoData = null;

        async function generateVideo() {
            if (isGenerating) return;

            const prompt = document.getElementById('promptInput').value.trim();
            if (!prompt) {
                showError('Please enter a video prompt to generate content');
                return;
            }

            isGenerating = true;
            const button = document.getElementById('generateBtn');
            const statusSection = document.getElementById('statusSection');
            const progressFill = document.getElementById('progressFill');
            const statusText = document.getElementById('statusText');
            const processingTime = document.getElementById('processingTime');
            const aiContent = document.getElementById('aiContent');

            // Update UI
            button.disabled = true;
            button.textContent = 'Generating...';
            statusSection.classList.add('active');
            progressFill.style.width = '0%';
            statusText.textContent = 'Connecting to OpenAI servers...';
            processingTime.textContent = '';
            aiContent.innerHTML = '';

            const startTime = Date.now();

            try {
                // Show progress updates
                const progressSteps = [
                    { progress: 15, text: 'Analyzing your prompt with AI...' },
                    { progress: 30, text: 'Generating professional video script...' },
                    { progress: 50, text: 'Creating optimized metadata...' },
                    { progress: 70, text: 'Processing video generation...' },
                    { progress: 85, text: 'Finalizing video content...' },
                    { progress: 100, text: 'Video generation complete!' }
                ];

                for (let i = 0; i < progressSteps.length; i++) {
                    await new Promise(resolve => setTimeout(resolve, 800));
                    progressFill.style.width = progressSteps[i].progress + '%';
                    statusText.textContent = progressSteps[i].text;
                    
                    const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
                    processingTime.textContent = 'Processing time: ' + elapsed + 's';
                }

                // Make API call to our text-to-video endpoint
                const response = await fetch('/api/text-to-video', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        prompt: prompt,
                        model: document.getElementById('modelSelect').value,
                        duration: document.getElementById('durationSelect').value,
                        aspectRatio: document.getElementById('aspectSelect').value,
                        quality: 'HD',
                        style: document.getElementById('styleSelect').value
                    })
                });

                if (!response.ok) {
                    const errorData = await response.json().catch(() => ({}));
                    throw new Error(errorData.message || 'Server error: ' + response.status);
                }

                const result = await response.json();

                if (result.success) {
                    currentVideoData = result;
                    showSuccess(result.message);
                    displayAIContent(result);
                    
                    const totalTime = ((Date.now() - startTime) / 1000).toFixed(1);
                    processingTime.textContent = 'Total processing time: ' + totalTime + 's';
                } else {
                    throw new Error(result.message || 'Failed to generate video content');
                }

            } catch (error) {
                console.error('Video generation error:', error);
                
                let errorMessage = 'Failed to connect to AI servers. ';
                
                if (error.message.includes('quota') || error.message.includes('rate')) {
                    errorMessage = 'API quota exceeded. Please try again later or check your OpenAI subscription.';
                } else if (error.message.includes('timeout')) {
                    errorMessage = 'Request timed out. Please try again with a shorter prompt.';
                } else if (error.message.includes('401')) {
                    errorMessage = 'API authentication failed. Please check your OpenAI API key configuration.';
                } else if (error.message) {
                    errorMessage = error.message;
                } else {
                    errorMessage += 'Please check your API configuration and try again.';
                }
                
                showError(errorMessage);
            } finally {
                isGenerating = false;
                button.disabled = false;
                button.textContent = '🎬 Generate AI Video';
            }
        }

        function displayAIContent(result) {
            const aiContent = document.getElementById('aiContent');
            
            const html = 
                '<div class="ai-content">' +
                    '<h3>📝 AI-Generated Video Script</h3>' +
                    '<p>' + escapeHtml(result.videoScript) + '</p>' +
                '</div>' +
                
                '<div class="ai-content">' +
                    '<h3>🎯 Video Metadata</h3>' +
                    '<p><strong>Title:</strong> ' + escapeHtml(result.metadata.title) + '</p>' +
                    '<p><strong>Description:</strong> ' + escapeHtml(result.metadata.description) + '</p>' +
                    '<p><strong>Tags:</strong> ' + escapeHtml(result.metadata.tags.join(', ')) + '</p>' +
                    '<p><strong>Style:</strong> ' + escapeHtml(result.metadata.style) + '</p>' +
                    '<p><strong>Duration:</strong> ' + escapeHtml(result.metadata.duration) + '</p>' +
                '</div>' +
                
                '<div class="ai-content">' +
                    '<h3>✨ Optimized Prompt</h3>' +
                    '<p>' + escapeHtml(result.optimizedPrompt) + '</p>' +
                '</div>' +
                
                '<div class="video-result">' +
                    '<div class="video-placeholder">' +
                        '<div class="video-icon">🎬</div>' +
                        '<div class="video-ready">READY</div>' +
                    '</div>' +
                    '<h3>AI Video Generation Complete!</h3>' +
                    '<p>Your professional video has been generated and is ready for download</p>' +
                    (result.processingTime ? '<p class="processing-time">Generated in ' + result.processingTime + ' seconds</p>' : '') +
                    '<div class="action-buttons">' +
                        '<button class="action-button download" onclick="downloadVideo()">📥 Download Video</button>' +
                        '<button class="action-button" onclick="generateAnother()">🔄 Generate Another</button>' +
                        '<button class="action-button" onclick="copyScript()">📋 Copy Script</button>' +
                        '<button class="action-button" onclick="shareContent()">📤 Share</button>' +
                    '</div>' +
                '</div>';
            
            aiContent.innerHTML = html;
        }

        function downloadVideo() {
            if (!currentVideoData || !currentVideoData.downloadUrl) {
                showError('No video available for download. Please generate a video first.');
                return;
            }

            // Create a temporary download link
            const link = document.createElement('a');
            link.href = currentVideoData.downloadUrl;
            link.download = 'ai-generated-video.mp4';
            link.style.display = 'none';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            
            showSuccess('Video download started! Check your downloads folder.');
        }

        function escapeHtml(text) {
            const div = document.createElement('div');
            div.textContent = text;
            return div.innerHTML;
        }

        function showError(message) {
            const statusSection = document.getElementById('statusSection');
            const aiContent = document.getElementById('aiContent');
            
            statusSection.classList.add('active');
            aiContent.innerHTML = '<div class="error-message">❌ ' + escapeHtml(message) + '</div>';
        }

        function showSuccess(message) {
            const aiContent = document.getElementById('aiContent');
            aiContent.innerHTML = '<div class="success-message">✅ ' + escapeHtml(message) + '</div>' + aiContent.innerHTML;
        }

        function runInstantTest() {
            document.getElementById('promptInput').value = 'Create a professional video explaining the benefits of renewable energy with animated graphics and inspiring visuals';
            generateVideo();
        }

        function generateAnother() {
            document.getElementById('promptInput').value = '';
            document.getElementById('statusSection').classList.remove('active');
            currentVideoData = null;
        }

        function copyScript() {
            if (!currentVideoData || !currentVideoData.videoScript) {
                showError('No script available to copy.');
                return;
            }
            
            navigator.clipboard.writeText(currentVideoData.videoScript).then(() => {
                showSuccess('Video script copied to clipboard!');
            }).catch(() => {
                showError('Failed to copy script to clipboard.');
            });
        }

        function shareContent() {
            if (navigator.share && currentVideoData) {
                navigator.share({
                    title: 'AI Generated Video Content',
                    text: 'Check out this AI-generated video: ' + currentVideoData.metadata.title,
                    url: window.location.href
                });
            } else {
                showSuccess('Share URL copied to clipboard!');
                navigator.clipboard.writeText(window.location.href);
            }
        }

        // Auto-test after page load
        window.addEventListener('load', () => {
            setTimeout(() => {
                if (!document.getElementById('promptInput').value) {
                    runInstantTest();
                }
            }, 3000);
        });

        // Handle Enter key in textarea
        document.getElementById('promptInput').addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && e.ctrlKey) {
                generateVideo();
            }
        });
    </script>
</body>
</html>`; 