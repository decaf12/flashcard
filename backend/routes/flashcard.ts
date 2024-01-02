import express from 'express';
import * as topicController from '../controllers/topicController';

const router = express.Router();

// Topics
// Get all topics
router.get('/topic', topicController.getTopics);
// Add a new topic
router.post('/topic', topicController.createTopic);
// Rename topic
router.patch('/topic', topicController.updateTopic);

export default router;
