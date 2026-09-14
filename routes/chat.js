/**
 * Chat Routes
 * Handles chat sessions and message management
 */

const express = require('express');
const router = express.Router();

// Mock chat database
const chatSessions = new Map();
const messages = new Map();

/**
 * POST /api/chat/sessions
 * Create a new chat session
 */
router.post('/sessions', (req, res) => {
  try {
    const { title = 'New Chat' } = req.body;

    const sessionId = Date.now().toString();
    const session = {
      id: sessionId,
      title,
      createdAt: new Date(),
      updatedAt: new Date(),
      messageCount: 0
    };

    chatSessions.set(sessionId, session);
    messages.set(sessionId, []);

    res.status(201).json({
      success: true,
      data: session
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * GET /api/chat/sessions
 * Get all chat sessions
 */
router.get('/sessions', (req, res) => {
  try {
    const sessionList = Array.from(chatSessions.values());
    res.json({
      success: true,
      data: sessionList
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * GET /api/chat/sessions/:sessionId
 * Get specific chat session
 */
router.get('/sessions/:sessionId', (req, res) => {
  try {
    const session = chatSessions.get(req.params.sessionId);

    if (!session) {
      return res.status(404).json({ error: 'Session not found' });
    }

    res.json({
      success: true,
      data: session
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * POST /api/chat/sessions/:sessionId/messages
 * Send a message in a chat session
 */
router.post('/sessions/:sessionId/messages', (req, res) => {
  try {
    const { sessionId } = req.params;
    const { content, role = 'user' } = req.body;

    if (!content) {
      return res.status(400).json({ error: 'Message content is required' });
    }

    const session = chatSessions.get(sessionId);
    if (!session) {
      return res.status(404).json({ error: 'Session not found' });
    }

    const message = {
      id: Date.now().toString(),
      sessionId,
      role,
      content,
      createdAt: new Date()
    };

    const sessionMessages = messages.get(sessionId) || [];
    sessionMessages.push(message);
    messages.set(sessionId, sessionMessages);

    // Update session
    session.messageCount = sessionMessages.length;
    session.updatedAt = new Date();

    // Mock AI response
    let aiResponse = null;
    if (role === 'user') {
      aiResponse = {
        id: Date.now().toString() + '1',
        sessionId,
        role: 'assistant',
        content: `I received your message: "${content}". How can I assist you further?`,
        createdAt: new Date()
      };
      sessionMessages.push(aiResponse);
      session.messageCount = sessionMessages.length;
    }

    res.status(201).json({
      success: true,
      data: {
        userMessage: message,
        aiResponse: aiResponse
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * GET /api/chat/sessions/:sessionId/messages
 * Get all messages in a chat session
 */
router.get('/sessions/:sessionId/messages', (req, res) => {
  try {
    const { sessionId } = req.params;

    if (!chatSessions.has(sessionId)) {
      return res.status(404).json({ error: 'Session not found' });
    }

    const sessionMessages = messages.get(sessionId) || [];
    res.json({
      success: true,
      data: sessionMessages
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * DELETE /api/chat/sessions/:sessionId
 * Delete a chat session
 */
router.delete('/sessions/:sessionId', (req, res) => {
  try {
    const { sessionId } = req.params;

    if (!chatSessions.has(sessionId)) {
      return res.status(404).json({ error: 'Session not found' });
    }

    chatSessions.delete(sessionId);
    messages.delete(sessionId);

    res.json({
      success: true,
      message: 'Session deleted successfully'
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
