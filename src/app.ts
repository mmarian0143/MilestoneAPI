import express, { Request, Response } from 'express';
import mysql from 'mysql';
import bodyParser from 'body-parser';


const app = express();
const port = 3000;

app.use(bodyParser.json());

const db = mysql.createConnection({
      host: '127.0.0.1',
      user: 'sqluser',
      password: 'password',
      database: 'christianbibleversejournal'
    });

    // Create a new user
app.post('/users', (req: Request, res: Response) => {
  const { username, password, email } = req.body;
  const query = 'INSERT INTO User (Username, Password, Email) VALUES (?, ?, ?)';
  db.query(query, [username, password, email], (err) => {
    if (err) {
      return res.status(500).json({ error: 'Error creating user' });
    }
    res.status(201).json({ message: 'User created successfully' });
  });
});

// Read users
app.get('/users', (req: Request, res: Response) => {
  const query = 'SELECT * FROM User';
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Error fetching users' });
    }
    res.status(200).json(results);
  });
});

// Update a user
app.put('/users/:id', (req: Request, res: Response) => {
  const userId = req.params.id;
  const { username, password, email } = req.body;
  const query = 'UPDATE User SET Username = ?, Password = ?, Email = ? WHERE UserID = ?';
  db.query(query, [username, password, email, userId], (err) => {
    if (err) {
      return res.status(500).json({ error: 'Error updating user' });
    }
    res.status(200).json({ message: 'User updated successfully' });
  });
});

// Delete a user
app.delete('/users/:id', (req: Request, res: Response) => {
  const userId = req.params.id;
  const query = 'DELETE FROM User WHERE UserID = ?';

  console.log('Executing query:', query);
  console.log('User ID:', userId);
  db.query(query, [userId], (err) => {
    if (err) {
      return res.status(500).json({ error: 'Error deleting user' });
    }
    res.status(200).json({ message: 'User deleted successfully' });
  });
});

app.post('/bible-verses', (req: Request, res: Response) => {
    const { text, reference } = req.body;
    const query = 'INSERT INTO BibleVerse (Text, Reference) VALUES (?, ?)';
    db.query(query, [text, reference], (err) => {
      if (err) {
        return res.status(500).json({ error: 'Error creating Bible verse' });
      }
      res.status(201).json({ message: 'Bible verse created successfully' });
    });
  });
  
  // Read Bible verses
  app.get('/bible-verses', (req: Request, res: Response) => {
    const query = 'SELECT * FROM BibleVerse';
    db.query(query, (err, results) => {
      if (err) {
        return res.status(500).json({ error: 'Error fetching Bible verses' });
      }
      res.status(200).json(results);
    });
  });

  // Update a Bible verse
app.put('/bible-verses/:id', (req: Request, res: Response) => {
    const verseId = req.params.id;
    const { text, reference } = req.body;
    const query = 'UPDATE BibleVerse SET Text = ?, Reference = ? WHERE VerseID = ?';
    db.query(query, [text, reference, verseId], (err) => {
      if (err) {
        return res.status(500).json({ error: 'Error updating Bible verse' });
      }
      res.status(200).json({ message: 'Bible verse updated successfully' });
    });
  });
  
  // Delete a Bible verse
  app.delete('/bible-verses/:id', (req: Request, res: Response) => {
    const verseId = req.params.id;
    const query = 'DELETE FROM BibleVerse WHERE VerseID = ?';
    db.query(query, [verseId], (err) => {
      if (err) {
        return res.status(500).json({ error: 'Error deleting Bible verse' });
      }
      res.status(200).json({ message: 'Bible verse deleted successfully' });
    });
  });

  // Create a new journal entry
app.post('/journal-entries', (req: Request, res: Response) => {
    const { title, content, date, userId, verseId } = req.body;
    const query = 'INSERT INTO JournalEntry (Title, Content, Date, UserID, VerseID) VALUES (?, ?, ?, ?, ?)';
    db.query(query, [title, content, date, userId, verseId], (err) => {
      if (err) {
        return res.status(500).json({ error: 'Error creating journal entry' });
      }
      res.status(201).json({ message: 'Journal entry created successfully' });
    });
  });
  
  // Read journal entries
  app.get('/journal-entries', (req: Request, res: Response) => {
    const query = 'SELECT * FROM JournalEntry';
    db.query(query, (err, results) => {
      if (err) {
        return res.status(500).json({ error: 'Error fetching journal entries' });
      }
      res.status(200).json(results);
    });
  });
  
  // Update a journal entry
  app.put('/journal-entries/:id', (req: Request, res: Response) => {
    const entryId = req.params.id;
    const { title, content, date, userId, verseId } = req.body;
    const query = 'UPDATE JournalEntry SET Title = ?, Content = ?, Date = ?, UserID = ?, VerseID = ? WHERE EntryID = ?';
    db.query(query, [title, content, date, userId, verseId, entryId], (err) => {
      if (err) {
        return res.status(500).json({ error: 'Error updating journal entry' });
      }
      res.status(200).json({ message: 'Journal entry updated successfully' });
    });
  });
  
  // Delete a journal entry
  app.delete('/journal-entries/:id', (req: Request, res: Response) => {
    const entryId = req.params.id;
    const query = 'DELETE FROM JournalEntry WHERE EntryID = ?';
    db.query(query, [entryId], (err) => {
      if (err) {
        return res.status(500).json({ error: 'Error deleting journal entry' });
      }
      res.status(200).json({ message: 'Journal entry deleted successfully' });
    });
  });

app.get('/', (req: Request, res: Response) => {
res.send('Welcome to the Bible Verse Journal!');
});

app.listen(port, () => {
console.log(`Example app listening at http://localhost:${port}`)
});
