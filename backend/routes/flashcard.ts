import express from 'express';
import * as topicController from '../controllers/topicController';
import * as deckController from '../controllers/deckController';
import requireAuth from '../middleware/requireAuth';

const router = express.Router();
router.use(requireAuth);

// Topics
// Get all topics
router.get('/topics', topicController.getAllTopics);
// Get a particular topic
router.get('/topics/:topicId', topicController.getTopic);
// Add a new topic
router.post('/topics', topicController.createTopic);
// Rename topic
router.patch('/topics/:topicId', topicController.updateTopic);
// Delete topic
router.delete('/topics/:topicId', topicController.deleteTopic);

// Decks
// Get all decks
router.get('/topics/:topicId/decks', deckController.getAllDecks);
// Get a particular deck
router.get('/topics/:topicId/decks/:deckId', deckController.getDeck);
// Add a deck
router.post('/topics/:topicId/decks', deckController.createDeck);
// Rename a deck
router.patch('/topics/:topicId/decks/:deckId', deckController.updateDeck);
// Delete a deck
router.delete('/topics/:topicId/decks/:deckId', deckController.deleteDeck);

export default router;
