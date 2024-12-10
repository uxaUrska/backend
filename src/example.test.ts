import request from 'supertest';
import app from './index'; // Glavna aplikacija
import mongoose from 'mongoose';
import express, { Application, Request, Response } from 'express';
// =====================
// Testiranje aplikacije
// =====================
describe('Application Server', () => {
  // Zapiranje povezave z bazo po testih
  afterAll(async () => {
    await mongoose.connection.close(); // Zapri povezavo z MongoDB
  });

  // Preverjanje nedoločenih poti
  it('should respond with a 404 on undefined routes', async () => {
    const response = await request(app).get('/non-existing-route'); // Testiraj neobstoječo pot
    expect(response.status).toBe(404); // Pričakuj status 404 Not Found
  });
});

// =====================
// Validacija podatkov
// =====================
// Funkcija za validacijo
export const validateExpense = (data: { name: string; amount: number }) => {
  if (!data.name || typeof data.name !== 'string') {
    throw new Error('Invalid name');
  }
  if (!data.amount || typeof data.amount !== 'number') {
    throw new Error('Invalid amount');
  }
  return true;
};

// Testiranje validacije
describe('validateExpense Function', () => {
  it('should pass for valid data', () => {
    const data = { name: 'Expense 1', amount: 100 };

    expect(() => validateExpense(data)).not.toThrow(); // Preveri, da validacija uspe
  });

  it('should throw an error for invalid name', () => {
    const data = { name: 123, amount: 100 } as unknown as { name: string; amount: number }; // Napačen tip za ime
    expect(() => validateExpense(data)).toThrow('Invalid name'); // Preveri napako za ime
  });

  it('should throw an error for invalid amount', () => {
    const data = { name: 'Expense 1', amount: 'not-a-number' } as unknown as { name: string; amount: number }; // Napačen tip za znesek
    expect(() => validateExpense(data)).toThrow('Invalid amount'); // Preveri napako za znesek
  });
});

// =====================
// Testiranje usmerjevalnika (Router)
// =====================
const router = express.Router();

// Mock kontroler za testiranje
router.get('/test-route', (req: Request, res: Response) => {
  res.status(200).json({ message: 'Test route is working' });
});

// Testiranje usmerjevalnika
describe('Router', () => {
  it('should return 200 for GET /test-route', async () => {
    const app = express(); // Lokalna aplikacija za testiranje routerja
    app.use(router);

    const response = await request(app).get('/test-route');

    expect(response.status).toBe(200); // Preveri status 200
    expect(response.body).toEqual({ message: 'Test route is working' }); // Preveri odgovor
  });
});

// =====================
// Testiranje obdelave napak
// =====================
describe('Error Handling', () => {
  const app = express();

  // Mock endpoint, ki vrže napako
  app.get('/error', (req: Request, res: Response) => {
    throw new Error('Test Error');
  });

  // Globalni middleware za obdelavo napak
  app.use((err: Error, req: Request, res: Response, next: Function) => {
    res.status(500).json({ error: err.message });
  });

  it('should handle thrown errors gracefully', async () => {
    const response = await request(app).get('/error');
    expect(response.status).toBe(500);
    expect(response.body).toEqual({ error: 'Test Error' });
  });
});

// =====================
// Testiranje API odgovorov
// =====================
describe('API Response Validation', () => {
  it('should return JSON with the correct structure', async () => {
    const mockResponse = { id: 1, name: 'Test Item', price: 100 };
    const app = express();
    app.get('/item', (req: Request, res: Response) => {
      res.status(200).json(mockResponse);
    });

    const response = await request(app).get('/item');
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id', 1);
    expect(response.body).toHaveProperty('name', 'Test Item');
    expect(response.body).toHaveProperty('price', 100);
  });
});

// =====================
// Testiranje avtentikacije
// =====================
describe('Authentication Middleware', () => {
  // Mock middleware za avtentikacijo
  const mockAuthMiddleware = (req: Request, res: Response, next: Function) => {
    if (req.headers.authorization === 'Bearer valid-token') {
      next(); // Nadaljuj
    } else {
      res.status(401).json({ error: 'Unauthorized' });
    }
  };

  const app = express();
  app.use('/protected', mockAuthMiddleware, (req: Request, res: Response) => {
    res.status(200).json({ message: 'Authorized' });
  });

  it('should allow access with valid token', async () => {
    const response = await request(app)
      .get('/protected')
      .set('Authorization', 'Bearer valid-token'); // Nastavi veljaven token

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: 'Authorized' });
  });

  it('should deny access with invalid token', async () => {
    const response = await request(app)
      .get('/protected')
      .set('Authorization', 'Bearer invalid-token'); // Nastavi neveljaven token

    expect(response.status).toBe(401);
    expect(response.body).toEqual({ error: 'Unauthorized' });
  });
});


// ==========================
// Tesiranje porta
// ==========================
describe('Server Port Test', () => {
  let app: Application; // Spremenljivka za Express aplikacijo
  let server: any; // Spremenljivka za strežnik
  const PORT = 3000; // Port, na katerem bo aplikacija poslušala

  // ==========================
  // Inicializacija pred testi
  // ==========================
  beforeAll((done) => {
    app = express(); // Inicializacija Express aplikacije

    // Dummy endpoint, ki vrača preprosto sporočilo
    app.get('/', (req: Request, res: Response) => {
      res.status(200).send('Server is running on port ' + PORT); // Pošlji odgovor s portom
    });

    // Začni poslušati na določenem portu
    server = app.listen(PORT, () => done());
  });

  // ==========================
  // Zapiranje strežnika po testih
  // ==========================
  afterAll((done) => {
    server.close(() => done()); // Zapri strežnik po vseh testih
  });

  // ==========================
  // Testiranje odziva na portu
  // ==========================
  it(`should respond on port ${PORT}`, async () => {
    // Pošlji GET zahtevo na root endpoint
    const response = await request(app).get('/');

    // Preveri, ali strežnik vrača status 200 (OK)
    expect(response.status).toBe(200);

    // Preveri, ali se strežnik odzove z ustreznim sporočilom
    expect(response.text).toBe(`Server is running on port ${PORT}`);
  });
});