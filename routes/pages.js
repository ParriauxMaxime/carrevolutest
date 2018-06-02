import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  res.render('layout', { title: 'Carrevolutest' });
});

export default router;
