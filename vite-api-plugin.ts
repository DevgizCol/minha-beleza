import type { Plugin, ViteDevServer } from 'vite';
import fs from 'node:fs';
import path from 'node:path';

interface StudioConfig {
  therapistName: string;
  therapistTitle: string;
  residenceTitle: string;
  residenceSubtitle: string;
  residenceContext: string;
  therapistBio: string;
  address: string;
  city: string;
  phone: string;
  whatsapp: string;
  email: string;
  instagram: string;
  openingHours: string;
  studioImage: string;
  portraitImage: string;
}

interface ServiceItem {
  id: string;
  name: string;
  category: string;
  duration: number;
  price: number;
  featured: boolean;
  active: boolean;
  image: string;
  description: string;
  benefits: string[];
}

interface AppointmentItem {
  id: string;
  clientName: string;
  clientPhone: string;
  clientEmail: string;
  serviceId: string;
  serviceName: string;
  date: string;
  time: string;
  duration: number;
  price: number;
  notes: string;
  adminNotes: string;
  status: 'confirmed' | 'pending' | 'completed' | 'cancelled';
  createdAt: string;
  updatedAt: string;
}

interface DatabaseSchema {
  config: StudioConfig;
  services: ServiceItem[];
  appointments: AppointmentItem[];
}

const dbPath = path.resolve(process.cwd(), 'data', 'db.json');


function readDb(): DatabaseSchema {
  try {
    if (!fs.existsSync(dbPath)) {
      throw new Error('Database file does not exist');
    }
    const raw = fs.readFileSync(dbPath, 'utf-8');
    return JSON.parse(raw);
  } catch (error) {
    console.error('[API] Error reading DB:', error);
    return {
      config: {} as StudioConfig,
      services: [],
      appointments: []
    };
  }
}

function writeDb(data: DatabaseSchema): void {
  try {
    const tempPath = `${dbPath}.tmp`;
    fs.writeFileSync(tempPath, JSON.stringify(data, null, 2), 'utf-8');
    fs.renameSync(tempPath, dbPath);
  } catch (error) {
    console.error('[API] Error writing DB:', error);
  }
}

function parseJsonBody(req: any): Promise<any> {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', (chunk: Buffer) => {
      body += chunk.toString();
    });
    req.on('end', () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (e) {
        reject(e);
      }
    });
    req.on('error', reject);
  });
}

export function apiPlugin(): Plugin {
  return {
    name: 'minha-beleza-api',
    configureServer(server: ViteDevServer) {
      server.middlewares.use(async (req, res, next) => {
        if (!req.url?.startsWith('/api')) {
          return next();
        }

        const url = new URL(req.url, `http://${req.headers.host}`);
        const pathname = url.pathname;
        const method = req.method?.toUpperCase();

        const sendJson = (statusCode: number, data: any) => {
          res.statusCode = statusCode;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify(data));
        };

        try {
          // --- CONFIG ENDPOINTS ---
          if (pathname === '/api/config') {
            if (method === 'GET') {
              const db = readDb();
              return sendJson(200, db.config);
            }
            if (method === 'PUT') {
              const body = await parseJsonBody(req);
              const db = readDb();
              db.config = { ...db.config, ...body };
              writeDb(db);
              return sendJson(200, db.config);
            }
          }

          // --- SERVICES ENDPOINTS ---
          if (pathname === '/api/services') {
            if (method === 'GET') {
              const db = readDb();
              return sendJson(200, db.services);
            }
            if (method === 'POST') {
              const body = await parseJsonBody(req);
              const db = readDb();
              const newService: ServiceItem = {
                id: `srv-${Date.now()}`,
                name: body.name || 'Nuevo Servicio',
                category: body.category || 'Masoterapia',
                duration: Number(body.duration) || 60,
                price: Number(body.price) || 120000,
                featured: Boolean(body.featured),
                active: true,
                image: body.image || '/images/massage-therapy.jpg',
                description: body.description || '',
                benefits: Array.isArray(body.benefits) ? body.benefits : []
              };
              db.services.push(newService);
              writeDb(db);
              return sendJson(201, newService);
            }
          }

          if (pathname.startsWith('/api/services/')) {
            const serviceId = pathname.replace('/api/services/', '');
            const db = readDb();
            const index = db.services.findIndex(s => s.id === serviceId);

            if (index === -1) {
              return sendJson(404, { error: 'Servicio no encontrado' });
            }

            if (method === 'PUT') {
              const body = await parseJsonBody(req);
              db.services[index] = { ...db.services[index], ...body, id: serviceId };
              writeDb(db);
              return sendJson(200, db.services[index]);
            }

            if (method === 'DELETE') {
              // Soft delete or remove
              db.services.splice(index, 1);
              writeDb(db);
              return sendJson(200, { success: true, message: 'Servicio eliminado' });
            }
          }

          // --- APPOINTMENTS ENDPOINTS ---
          if (pathname === '/api/appointments') {
            if (method === 'GET') {
              const db = readDb();
              const dateParam = url.searchParams.get('date');
              if (dateParam) {
                const filtered = db.appointments.filter(a => a.date === dateParam && a.status !== 'cancelled');
                return sendJson(200, filtered);
              }
              return sendJson(200, db.appointments);
            }

            if (method === 'POST') {
              const body = await parseJsonBody(req);
              const db = readDb();

              // Check if slot is occupied
              const isOccupied = db.appointments.some(
                a => a.date === body.date && a.time === body.time && a.status !== 'cancelled'
              );

              if (isOccupied) {
                return sendJson(409, {
                  error: 'El horario seleccionado ya no está disponible. Por favor selecciona otro horario.'
                });
              }

              // Generate friendly luxury reservation code e.g. MB-4921
              const randomNum = Math.floor(1000 + Math.random() * 9000);
              const id = `MB-${randomNum}`;

              const now = new Date().toISOString();
              const newAppointment: AppointmentItem = {
                id,
                clientName: body.clientName,
                clientPhone: body.clientPhone,
                clientEmail: body.clientEmail || '',
                serviceId: body.serviceId,
                serviceName: body.serviceName,
                date: body.date,
                time: body.time,
                duration: Number(body.duration) || 60,
                price: Number(body.price) || 0,
                notes: body.notes || '',
                adminNotes: body.adminNotes || '',
                status: 'confirmed',
                createdAt: now,
                updatedAt: now
              };

              db.appointments.unshift(newAppointment);
              writeDb(db);
              return sendJson(201, newAppointment);
            }
          }

          // Client Search: by code (e.g. MB-8419) or phone number
          if (pathname.startsWith('/api/appointments/search')) {
            const query = url.searchParams.get('q')?.trim().toLowerCase() || '';
            if (!query) {
              return sendJson(400, { error: 'Debes proporcionar un código o número de teléfono' });
            }

            const db = readDb();
            // Clean phone string for comparison
            const cleanQuery = query.replace(/\D/g, '');

            const matches = db.appointments.filter(a => {
              const idMatch = a.id.toLowerCase() === query;
              const cleanPhone = a.clientPhone.replace(/\D/g, '');
              const phoneMatch = cleanQuery.length >= 6 && cleanPhone.includes(cleanQuery);
              const emailMatch = a.clientEmail.toLowerCase() === query;
              return idMatch || phoneMatch || emailMatch;
            });

            return sendJson(200, matches);
          }

          if (pathname.startsWith('/api/appointments/')) {
            const appointmentId = pathname.replace('/api/appointments/', '');
            const db = readDb();
            const index = db.appointments.findIndex(a => a.id.toLowerCase() === appointmentId.toLowerCase());

            if (index === -1) {
              return sendJson(404, { error: 'Cita no encontrada' });
            }

            if (method === 'GET') {
              return sendJson(200, db.appointments[index]);
            }

            if (method === 'PATCH' || method === 'PUT') {
              const body = await parseJsonBody(req);
              
              // If rescheduling, check conflict
              if (body.date && body.time && (body.date !== db.appointments[index].date || body.time !== db.appointments[index].time)) {
                const conflict = db.appointments.some(
                  a => a.id !== db.appointments[index].id && a.date === body.date && a.time === body.time && a.status !== 'cancelled'
                );
                if (conflict) {
                  return sendJson(409, { error: 'El nuevo horario seleccionado ya está ocupado.' });
                }
              }

              db.appointments[index] = {
                ...db.appointments[index],
                ...body,
                updatedAt: new Date().toISOString()
              };
              writeDb(db);
              return sendJson(200, db.appointments[index]);
            }

            if (method === 'DELETE') {
              db.appointments[index].status = 'cancelled';
              db.appointments[index].updatedAt = new Date().toISOString();
              writeDb(db);
              return sendJson(200, { success: true, message: 'Cita cancelada con éxito' });
            }
          }

          // Stats Endpoint for Admin
          if (pathname === '/api/stats' && method === 'GET') {
            const db = readDb();
            const totalAppointments = db.appointments.length;
            const activeAppointments = db.appointments.filter(a => a.status === 'confirmed').length;
            const completedAppointments = db.appointments.filter(a => a.status === 'completed').length;
            const cancelledAppointments = db.appointments.filter(a => a.status === 'cancelled').length;
            const estimatedRevenue = db.appointments
              .filter(a => a.status === 'completed' || a.status === 'confirmed')
              .reduce((sum, a) => sum + (a.price || 0), 0);

            return sendJson(200, {
              totalAppointments,
              activeAppointments,
              completedAppointments,
              cancelledAppointments,
              estimatedRevenue,
              servicesCount: db.services.length
            });
          }

          // Unhandled API
          return sendJson(404, { error: 'Ruta de API no encontrada' });
        } catch (err: any) {
          console.error('[API Server Error]', err);
          return sendJson(500, { error: 'Error interno del servidor', details: err?.message });
        }
      });
    }
  };
}
