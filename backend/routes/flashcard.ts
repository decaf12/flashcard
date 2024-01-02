import express from 'express';
import * as topicController from '../controllers/topicController';
import * as deckController from '../controllers/deckController';
import requireAuth from '../middleware/requireAuth';

const router = express.Router();
router.use(requireAuth);

// Topics
// Get all topics
router.get('/topics', topicController.getAllTopics);
// Add a new topic
router.post('/topics', topicController.createTopic);
// Rename topic
router.patch('/topics/:topicId', topicController.updateTopic);
// Delete topic
router.delete('/topics/:topicId', topicController.deleteTopic);

// Decks
// Get all decks for a given topic
router.get('/topics/:topicId/decks', deckController.getAllDecks);
// Add a deck
router.post('/topics/:topicId/decks', deckController.createDeck);
// Rename a deck
router.patch('/topics/:topicId/decks/:deckId', deckController.updateDeck);
// Delete a deck
router.delete('/topics/:topicId/decks/:deckId', deckController.deleteDeck);

// // Cards
// // Get all cards for a given deck
// router.get('/topics/:topicId/decks/:deckId', deckController.getAllDecks);
// // Add card
// router.post('/topics/:topicId/decks', deckController.createDeck);
// // Rename a card
// router.patch('/topics/:topicId/decks/:deckId', deckController.updateDeck);
// // Delete a card
// router.delete('/topics/:topicId/decks/:deckId', deckController.deleteDeck);

export default router;
