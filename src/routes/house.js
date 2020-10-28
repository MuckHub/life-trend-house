const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  // otobrazhajutsja vse doma
});

router.get('/:id', (req, res) => {
  // vse texsty zamenjajutsja na formochki/ vozmozhno 4erez fetch zaprosy)
});

router.get('/:id/edit', (req, res) => {
  // vse texsty zamenjajutsja na formochki/ vozmozhno 4erez fetch zaprosy)
});

router.get('/:id/delete', (req, res) => {
  //chistim bazu dannyh?
});

router.post('/:id/save', (req, res) => {
  //zapisyvaem v bazu danny
});




module.exports = router;