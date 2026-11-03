import type { StudioConfig, ServiceItem, AppointmentItem, StatsOverview } from '../types';

const STORAGE_KEYS = {
  CONFIG: 'minha_beleza_config',
  SERVICES: 'minha_beleza_services',
  APPOINTMENTS: 'minha_beleza_appointments'
};

// Fallback initial data in case server is unreachable
const INITIAL_CONFIG: StudioConfig = {
  therapistName: 'Rosangel Benítez',
  therapistTitle: 'Masoterapeuta Certificada, Esteticista & Cosmetóloga',
  residenceTitle: 'Santuario Privado en Laureles',
  residenceSubtitle: 'Atención exclusiva e individual en suite residencial privada',
  residenceContext:
    'Para quienes valoran la privacidad, el silencio y la desconexión total. Rosangel brinda cada sesión desde su exclusiva suite residencial en Santa Teresita, un espacio concebido como un oasis de serenidad donde cada detalle —desde la aromaterapia botánica, la camilla ergonómica de espuma viscoelástica, sábanas de hilo egipcio y música neuroacústica— está curado para restaurar tu bienestar integral sin el ruido ni las prisas de los salones convencionales.',
  therapistBio:
    'Rosangel Benítez combina la precisión anatómica de la masoterapia clínica con el refinamiento de la cosmetología estética avanzada. Con más de 8 años de trayectoria perfeccionando protocolos de drenaje linfático, descontracturación muscular y renovación celular dérmica, su filosofía se fundamenta en realzar la belleza natural a través de la armonía corporal y la serenidad mental.',
  address: 'Calle 34A #84-35 Barrio Santa Teresita, Edificio Sagrado Corazón 2, Localidad Laureles, Medellín',
  city: 'Medellín, Antioquia',
  phone: '+57 304 4581959',
  whatsapp: '573044581959',
  email: 'contacto@minhabeleza.co',
  instagram: '@minhabelezaspa411',

  openingHours: 'Lunes a Sábado: 8:00 AM – 7:00 PM (Solo con reserva previa)',
  studioImage: '/images/studio-sanctuary.jpg',
  portraitImage: '/images/rosangel-portrait.jpg'
};

const INITIAL_SERVICES: ServiceItem[] = [
  {
    id: 'srv-keratina',
    name: 'Keratina Orgánica & Brillo Espejo',
    category: 'Cabello & Terapia Capilar',
    duration: 150,
    price: 200000,
    featured: true,
    active: true,
    image: '/images/hair-styling.jpg',
    description: 'Alisado progresivo con keratina orgánica libre de formol. Sella la cutícula, elimina el frizz al 100%, aporta sedosidad extrema y un brillo espejo duradero protegiendo la fibra capilar.',
    benefits: [
      'Liso natural y manejable por hasta 4-6 meses',
      'Sellado térmico sin gases tóxicos ni irritación',
      'Nutrición profunda con aceites esenciales',
      'Reducción total del volumen y encrespamiento'
    ]
  },
  {
    id: 'srv-aminoacidos',
    name: 'Aminoácidos Restauradores',
    category: 'Cabello & Terapia Capilar',
    duration: 120,
    price: 180000,
    featured: true,
    active: true,
    image: '/images/hair-styling.jpg',
    description: 'Tratamiento termoactivo a base de complejos de aminoácidos esenciales y proteínas hidrolizadas que reestructuran los enlaces capilares desde el córtex, reduciendo ondas y frizz con acabado suave.',
    benefits: [
      'Restauración intensiva de cabellos porosos o sensibilizados',
      'Efecto antifrizz duradero y textura sedosa',
      'Apto para cabellos decolorados o procesados químicamente',
      'Aporte de elasticidad, fuerza y movimiento natural'
    ]
  },
  {
    id: 'srv-cirugia-capilar',
    name: 'Cirugía Capilar Plastificante',
    category: 'Cabello & Terapia Capilar',
    duration: 135,
    price: 170000,
    featured: false,
    active: true,
    image: '/images/hair-styling.jpg',
    description: 'Protocolo regenerador de choque que rellena fisuras en la hebra capilar. Ideal para cabellos rebeldes, gruesos o deshidratados, dejando una capa protectora brillante y ultra suave.',
    benefits: [
      'Control absoluto del volumen rebelde',
      'Blindaje capilar frente a humedad y calor',
      'Alineación de cutículas y luminosidad intensa',
      'Efecto de hidratación prolongada'
    ]
  },
  {
    id: 'srv-hidratacion-capilar',
    name: 'Hidratación Capilar Profunda & Nutrición',
    category: 'Cabello & Terapia Capilar',
    duration: 60,
    price: 95000,
    featured: false,
    active: true,
    image: '/images/hair-styling.jpg',
    description: 'Baño de hidratación botánica con mascarilla rica en ácido hialurónico, lípidos y vitaminas. Devuelve la humedad perdida por el sol, secadores o tinturas, revitalizando cada mechón.',
    benefits: [
      'Recuperación inmediata del agua y flexibilidad del cabello',
      'Tacto aterciopelado y desenredo instantáneo',
      'Vaporización con ozono para apertura de cutícula',
      'Sellado con sérum nutritivo de argán y macadamia'
    ]
  },
  {
    id: 'srv-terapia-capilar',
    name: 'Terapia Capilar Regenerativa & Cuero Cabelludo',
    category: 'Cabello & Terapia Capilar',
    duration: 75,
    price: 120000,
    featured: true,
    active: true,
    image: '/images/hair-styling.jpg',
    description: 'Tratamiento tricológico de alta gama para detoxificar el folículo piloso, oxigenar el cuero cabelludo, frenar la caída y estimular el crecimiento fuerte y vigoroso del cabello con masaje craneofacial neurosedante.',
    benefits: [
      'Exfoliación suave y detoxificación de impurezas',
      'Alta frecuencia germicida y bioestimulación capilar',
      'Estimulación de la microcirculación del bulbo',
      'Masaje craneal relajante con tónicos botánicos'
    ]
  },
  {
    id: 'srv-balayage',
    name: 'Balayage & Diseño de Iluminación',
    category: 'Color, Peinado & Extensiones',
    duration: 180,
    price: 280000,
    featured: true,
    active: true,
    image: '/images/hair-styling.jpg',
    description: 'Técnica francesa de aclarado a mano alzada para crear transiciones suaves, luminosas y personalizadas según la tonalidad de tu piel y rostro, cuidando la integridad de la fibra con plex protector.',
    benefits: [
      'Degradé fino y natural sin marcas agresivas',
      'Integración de plex protector antifractura',
      'Matización personalizada con tonos beige, miel o cenizos',
      'Incluye baño de brillo y cepillado final de ondas'
    ]
  },
  {
    id: 'srv-pintar-cabello',
    name: 'Coloración Completa & Tinte de Cabello',
    category: 'Color, Peinado & Extensiones',
    duration: 90,
    price: 130000,
    featured: false,
    active: true,
    image: '/images/hair-styling.jpg',
    description: 'Aplicación profesional de tinte de alta definición y cobertura impecable de canas. Fórmulas tratantes enriquecidas con aceites para no resecar el cabello y sellar un color vibrante.',
    benefits: [
      '100% cobertura de canas con matices multidimensionales',
      'Pigmentos de larga duración y resistencia al lavado',
      'Tratamiento post-color de sellado de cutícula',
      'Diagnóstico previo de colorimetría armónica'
    ]
  },
  {
    id: 'srv-cepillado-peinado',
    name: 'Cepillado & Peinado de Todo Tipo',
    category: 'Color, Peinado & Extensiones',
    duration: 50,
    price: 45000,
    featured: false,
    active: true,
    image: '/images/hair-styling.jpg',
    description: 'Brushing profesional y peinado personalizado: liso pulido extremo, ondas de agua, ondas glam o semirecogidos elegantes para el día a día o eventos especiales en Medellín.',
    benefits: [
      'Lavado con champú y acondicionador premium',
      'Protección térmica avanzada anti-humedad',
      'Fijación flexible sin efecto apelmazado',
      'Diseñado para resaltar las facciones de tu rostro'
    ]
  },
  {
    id: 'srv-postura-extensiones',
    name: 'Postura de Extensiones Capilares',
    category: 'Color, Peinado & Extensiones',
    duration: 120,
    price: 170000,
    featured: false,
    active: true,
    image: '/images/hair-styling.jpg',
    description: 'Colocación profesional y milimétrica de extensiones capilares con técnicas no invasivas (microrings, punto invisible o cosidas). Integración perfecta con tu cabello natural para ganar largo y volumen.',
    benefits: [
      'Distribución anatómica equilibrada sin tracción dañina',
      'Acabado indetectable a la vista y al tacto',
      'Asesoría de volumen, largo y textura adecuada',
      'Incluye corte de integración y peinado final'
    ]
  },
  {
    id: 'srv-mantenimiento-extensiones',
    name: 'Mantenimiento de Extensiones Capilares',
    category: 'Color, Peinado & Extensiones',
    duration: 90,
    price: 130000,
    featured: false,
    active: true,
    image: '/images/hair-styling.jpg',
    description: 'Retiro seguro, desenredo, lavado del cabello propio, hidratación profunda y subida o recolocación de las extensiones manteniendo la salud del cuero cabelludo.',
    benefits: [
      'Retiro libre de quiebre o dolor',
      'Higiene profunda y oxigenación folicular',
      'Reajuste de fijación para máxima seguridad',
      'Reacondicionamiento de las cortinas de cabello'
    ]
  },
  {
    id: 'srv-kanekalon',
    name: 'Peinados & Trenzas con Kanekalon',
    category: 'Color, Peinado & Extensiones',
    duration: 120,
    price: 110000,
    featured: false,
    active: true,
    image: '/images/hair-styling.jpg',
    description: 'Diseño artístico de trenzas africanas, boxeadoras o peinados protectores incorporando fibra sintética Kanekalon de alta calidad en tonos naturales o de fantasía.',
    benefits: [
      'Tensado cuidadoso que protege el folículo capilar',
      'Estilo duradero, fresco y de alto impacto visual',
      'Gran variedad de estilos y largos a tu gusto',
      'Sellado térmico de puntas con acabado impecable'
    ]
  },
  {
    id: 'srv-pestanas',
    name: 'Extensiones de Pestañas (Pelo a Pelo & Volumen)',
    category: 'Cejas & Pestañas',
    duration: 90,
    price: 125000,
    featured: true,
    active: true,
    image: '/images/lashes-brows.jpg',
    description: 'Aplicación artística pelo a pelo o volumen ruso ligero sobre cada pestaña natural. Mirada intensa, abierta y definida sin necesidad de máscara de pestañas a diario.',
    benefits: [
      'Adhesivos hipoalergénicos de grado médico',
      'Diseño personalizado según la forma de tu ojo',
      'Sensación liviana y aspecto elegante natural',
      'Durabilidad de 3 a 4 semanas con los cuidados recomendados'
    ]
  },
  {
    id: 'srv-lifting-pestanas',
    name: 'Lifting de Pestañas con Queratina & Tinte',
    category: 'Cejas & Pestañas',
    duration: 60,
    price: 85000,
    featured: true,
    active: true,
    image: '/images/lashes-brows.jpg',
    description: 'Curvatura y elevación de tus pestañas naturales desde la raíz, combinada con tinte negro intenso y nutrición con queratina. Efecto rímel y mirada despierta inmediata.',
    benefits: [
      'Apertura visual de los ojos sin extensiones artificiales',
      'Duración de 6 a 8 semanas',
      'Nutrición con queratina que engrosa la pestaña natural',
      'Totalmente resistente al agua y ejercicio físico'
    ]
  },
  {
    id: 'srv-cejas',
    name: 'Depilación & Diseño Armónico de Cejas',
    category: 'Cejas & Pestañas',
    duration: 30,
    price: 35000,
    featured: false,
    active: true,
    image: '/images/lashes-brows.jpg',
    description: 'Visagismo facial y depilación de cejas con cera suave o pinza de precisión. Definición de la curvatura y grosor ideal para armonizar la simetría de tus ojos y rostro.',
    benefits: [
      'Mapeo morfológico previo según proporciones faciales',
      'Retiro preciso sin dañar la delicada piel del párpado',
      'Loción calmante descongestiva con aloe y caléndula',
      'Acabado limpio y definido'
    ]
  },
  {
    id: 'srv-masaje-relajante',
    name: 'Masaje Corporal Relajante Neurosedante',
    category: 'Masoterapia & Corporal',
    duration: 60,
    price: 135000,
    featured: true,
    active: true,
    image: '/images/massage-therapy.jpg',
    description: 'Maniobras suaves y fluidas con aromaterapia botánica pura de lavanda y bergamota. Disminuye los niveles de estrés, relaja el sistema nervioso central y alivia tensiones musculares acumuladas.',
    benefits: [
      'Liberación de contracturas leves y fatiga física',
      'Estimulación de la circulación y oxigenación celular',
      'Música en frecuencia 432Hz y ambiente con luz tenue',
      'Compresas calientes herbales en espalda y cuello'
    ]
  },
  {
    id: 'srv-masaje-deportivo',
    name: 'Masaje Deportivo & Descarga Muscular',
    category: 'Masoterapia & Corporal',
    duration: 60,
    price: 145000,
    featured: false,
    active: true,
    image: '/images/massage-therapy.jpg',
    description: 'Técnica intensa orientada a deportistas o personas con alta exigencia muscular. Trabaja fascias profundas, drenaje de toxinas y puntos gatillo para acelerar la recuperación y prevenir sobrecargas.',
    benefits: [
      'Prevención y recuperación de contracturas y rigidez',
      'Mejora inmediata de la flexibilidad articular',
      'Termoterapia con toallas calientes y bálsamos antiinflamatorios',
      'Ideal pre o post-entrenamiento intenso'
    ]
  },
  {
    id: 'srv-masaje-reductivo',
    name: 'Masaje Reductivo & Moldeador de Silueta',
    category: 'Masoterapia & Corporal',
    duration: 60,
    price: 140000,
    featured: false,
    active: true,
    image: '/images/body-contour.jpg',
    description: 'Maniobras enérgicas, amasamientos profundos y drenaje linfático para estimular el metabolismo local, disolver nódulos adiposos y definir el contorno en abdomen, cintura y piernas.',
    benefits: [
      'Reactivación de la circulación sanguínea y linfática',
      'Disminución de líquidos retenidos y desinflamación',
      'Tonificación y reafirmación de los tejidos dérmicos',
      'Aplicación de principios activos lipolíticos botánicos'
    ]
  },
  {
    id: 'srv-maderoterapia',
    name: 'Maderoterapia Corporal Escultural',
    category: 'Masoterapia & Corporal',
    duration: 60,
    price: 135000,
    featured: true,
    active: true,
    image: '/images/body-contour.jpg',
    description: 'Terapia holística mediante accesorios anatómicos de madera noble (rodillo estriado, copa sueca, tabla moldeadora) que tonifican, combaten la celulitis y perfilan la silueta.',
    benefits: [
      'Moldeo intensivo de glúteos, cintura y muslos',
      'Estímulo natural de la elastina y colágeno dérmico',
      'Efecto reafirmante y drenante no invasivo',
      'Combinación con aceites aromaterapéuticos reafirmantes'
    ]
  },
  {
    id: 'srv-chocolaterapia',
    name: 'Chocolaterapia Sensorial & Envoltura Nutritiva',
    category: 'Masoterapia & Corporal',
    duration: 75,
    price: 160000,
    featured: true,
    active: true,
    image: '/images/chocolaterapia.jpg',
    description: 'Exquisito ritual de belleza y relajación. Inicia con exfoliación suave, continúa con masaje envolvente y envoltura corporal tibia de puro cacao orgánico antioxidante que nutre la piel e induce al descanso absoluto.',
    benefits: [
      'Poderosa acción antioxidante contra el envejecimiento cutáneo',
      'Estimulación de la producción de endorfinas (bienestar emocional)',
      'Nutrición extrema para pieles resecas o desvitalizadas',
      'Aroma irresistible y relajación multisensorial'
    ]
  },
  {
    id: 'srv-radiofrecuencia',
    name: 'Masaje con Radiofrecuencia Reafirmante',
    category: 'Masoterapia & Corporal',
    duration: 60,
    price: 150000,
    featured: false,
    active: true,
    image: '/images/body-contour.jpg',
    description: 'Sinergia entre masaje terapéutico manual y emisión controlada de ondas de radiofrecuencia que calientan de forma segura las capas profundas de la dermis para tensar la piel y combatir la flacidez.',
    benefits: [
      'Contracción inmediata de fibras de colágeno existentes',
      'Estimulación de nuevo colágeno a mediano y largo plazo',
      'Tratamiento efectivo de flacidez en abdomen, brazos o piernas',
      'Suavizado de la textura de la piel con calor agradable'
    ]
  },
  {
    id: 'srv-aparatologia',
    name: 'Aparatología Estética & Moldeamiento Corporal',
    category: 'Masoterapia & Corporal',
    duration: 60,
    price: 150000,
    featured: true,
    active: true,
    image: '/images/aparatologia-estetica.jpg',
    description: 'Tratamiento estético avanzado no invasivo mediante aparatología combinada (cavitación ultrasónica, vacumterapia, radiofrecuencia y electroestimulación). Actúa directamente sobre adiposidades localizadas, celulitis y flacidez dérmica, tonificando y esculpiendo la silueta de manera visible y segura.',
    benefits: [
      'Disolución focalizada de tejido adiposo y celulitis rebelde',
      'Efecto tensor dérmico y estimulación profunda de colágeno',
      'Activación del drenaje linfático para desinflamar y moldear',
      'Procedimiento indoloro, no invasivo y sin tiempo de recuperación'
    ]
  },
  {
    id: 'srv-depilacion-laser',
    name: 'Depilación Íntima con Láser Diodo (Hombre y Mujer)',
    category: 'Depilación Íntima (Láser & Cera)',
    duration: 45,
    price: 110000,
    featured: true,
    active: true,
    image: '/images/laser-depilation.jpg',
    description: 'Depilación definitiva de zona íntima (bikini, zona interglútea y pubis) con tecnología láser diodo de cabezal frío. Sesiones rápidas, seguras, higiénicas y altamente confortables para damas y caballeros.',
    benefits: [
      'Cabezal de enfriamiento sub-cero que minimiza las molestias',
      'Eliminación progresiva del folículo sin foliculitis ni pelos encarnados',
      'Privacidad absoluta en cabina higienizada',
      'Protocolo clínico apto para diferentes fototipos de piel'
    ]
  },
  {
    id: 'srv-depilacion-cera',
    name: 'Depilación Íntima con Cera Elástica (Hombre y Mujer)',
    category: 'Depilación Íntima (Láser & Cera)',
    duration: 35,
    price: 65000,
    featured: false,
    active: true,
    image: '/images/laser-depilation.jpg',
    description: 'Depilación íntima completa con cera tibia elástica española a base de resinas naturales y cera de abeja. Se adhiere al vello y no a la piel, retirándolo de raíz con suavidad y rapidez.',
    benefits: [
      'Cera elástica desechable de un solo uso por cliente',
      'Técnica rápida con menor sensación de molestia',
      'Piel suave y libre de vello por 3 a 4 semanas',
      'Aplicación final de loción calmante y bactericida'
    ]
  }
];


export const api = {
  // CONFIG
  async getConfig(): Promise<StudioConfig> {
    try {
      const res = await fetch('/api/config');
      if (!res.ok) throw new Error('API unavailable');
      const data = await res.json();
      localStorage.setItem(STORAGE_KEYS.CONFIG, JSON.stringify(data));
      return data;
    } catch {
      const cached = localStorage.getItem(STORAGE_KEYS.CONFIG);
      return cached ? JSON.parse(cached) : INITIAL_CONFIG;
    }
  },

  async updateConfig(config: Partial<StudioConfig>): Promise<StudioConfig> {
    try {
      const res = await fetch('/api/config', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(config)
      });
      if (!res.ok) throw new Error('API error');
      const data = await res.json();
      localStorage.setItem(STORAGE_KEYS.CONFIG, JSON.stringify(data));
      return data;
    } catch {
      const current = await this.getConfig();
      const updated = { ...current, ...config };
      localStorage.setItem(STORAGE_KEYS.CONFIG, JSON.stringify(updated));
      return updated;
    }
  },

  // SERVICES
  async getServices(): Promise<ServiceItem[]> {
    try {
      const res = await fetch('/api/services');
      if (!res.ok) throw new Error('API unavailable');
      const data = await res.json();
      localStorage.setItem(STORAGE_KEYS.SERVICES, JSON.stringify(data));
      return data;
    } catch {
      const cached = localStorage.getItem(STORAGE_KEYS.SERVICES);
      return cached ? JSON.parse(cached) : INITIAL_SERVICES;
    }
  },

  async createService(service: Omit<ServiceItem, 'id'>): Promise<ServiceItem> {
    try {
      const res = await fetch('/api/services', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(service)
      });
      if (!res.ok) throw new Error('Error al crear servicio');
      return await res.json();
    } catch {
      const services = await this.getServices();
      const newService: ServiceItem = {
        ...service,
        id: `srv-${Date.now()}`
      };
      services.push(newService);
      localStorage.setItem(STORAGE_KEYS.SERVICES, JSON.stringify(services));
      return newService;
    }
  },

  async updateService(id: string, updates: Partial<ServiceItem>): Promise<ServiceItem> {
    try {
      const res = await fetch(`/api/services/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates)
      });
      if (!res.ok) throw new Error('Error al actualizar servicio');
      return await res.json();
    } catch {
      const services = await this.getServices();
      const idx = services.findIndex(s => s.id === id);
      if (idx !== -1) {
        services[idx] = { ...services[idx], ...updates };
        localStorage.setItem(STORAGE_KEYS.SERVICES, JSON.stringify(services));
        return services[idx];
      }
      throw new Error('Servicio no encontrado');
    }
  },

  async deleteService(id: string): Promise<void> {
    try {
      await fetch(`/api/services/${id}`, { method: 'DELETE' });
    } catch {
      const services = await this.getServices();
      const filtered = services.filter(s => s.id !== id);
      localStorage.setItem(STORAGE_KEYS.SERVICES, JSON.stringify(filtered));
    }
  },

  // APPOINTMENTS
  async getAppointments(date?: string): Promise<AppointmentItem[]> {
    try {
      const url = date ? `/api/appointments?date=${encodeURIComponent(date)}` : '/api/appointments';
      const res = await fetch(url);
      if (!res.ok) throw new Error('API unavailable');
      const data = await res.json();
      localStorage.setItem(STORAGE_KEYS.APPOINTMENTS, JSON.stringify(data));
      return data;
    } catch {
      const cached = localStorage.getItem(STORAGE_KEYS.APPOINTMENTS);
      let list: AppointmentItem[] = cached ? JSON.parse(cached) : [];
      if (date) {
        list = list.filter(a => a.date === date && a.status !== 'cancelled');
      }
      return list;
    }
  },

  async createAppointment(data: {
    clientName: string;
    clientPhone: string;
    clientEmail?: string;
    serviceId: string;
    serviceName: string;
    date: string;
    time: string;
    duration: number;
    price: number;
    notes?: string;
  }): Promise<AppointmentItem> {
    try {
      const res = await fetch('/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Error al agendar la cita');
      }
      return await res.json();
    } catch (err: any) {
      if (err.message && err.message.includes('disponible')) {
        throw err;
      }
      // Fallback
      const appointments = await this.getAppointments();
      const conflict = appointments.some(
        a => a.date === data.date && a.time === data.time && a.status !== 'cancelled'
      );
      if (conflict) {
        throw new Error('El horario seleccionado ya no está disponible.');
      }
      const randomCode = `MB-${Math.floor(1000 + Math.random() * 9000)}`;
      const newAppointment: AppointmentItem = {
        id: randomCode,
        ...data,
        status: 'confirmed',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      appointments.unshift(newAppointment);
      localStorage.setItem(STORAGE_KEYS.APPOINTMENTS, JSON.stringify(appointments));
      return newAppointment;
    }
  },

  async searchAppointments(query: string): Promise<AppointmentItem[]> {
    try {
      const res = await fetch(`/api/appointments/search?q=${encodeURIComponent(query)}`);
      if (!res.ok) throw new Error('Cita no encontrada');
      return await res.json();
    } catch {
      const appointments = await this.getAppointments();
      const cleanQ = query.trim().toLowerCase();
      const cleanDigits = cleanQ.replace(/\D/g, '');
      return appointments.filter(a => {
        const idMatch = a.id.toLowerCase() === cleanQ;
        const phoneMatch = cleanDigits.length >= 6 && a.clientPhone.replace(/\D/g, '').includes(cleanDigits);
        const emailMatch = a.clientEmail?.toLowerCase() === cleanQ;
        return idMatch || phoneMatch || emailMatch;
      });
    }
  },

  async updateAppointment(id: string, updates: Partial<AppointmentItem>): Promise<AppointmentItem> {
    try {
      const res = await fetch(`/api/appointments/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates)
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Error al actualizar cita');
      }
      return await res.json();
    } catch (err: any) {
      const appointments = await this.getAppointments();
      const idx = appointments.findIndex(a => a.id.toLowerCase() === id.toLowerCase());
      if (idx !== -1) {
        appointments[idx] = { ...appointments[idx], ...updates, updatedAt: new Date().toISOString() };
        localStorage.setItem(STORAGE_KEYS.APPOINTMENTS, JSON.stringify(appointments));
        return appointments[idx];
      }
      throw err;
    }
  },

  async cancelAppointment(id: string): Promise<void> {
    try {
      const res = await fetch(`/api/appointments/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Error al cancelar cita');
    } catch {
      await this.updateAppointment(id, { status: 'cancelled' });
    }
  },

  // STATS
  async getStats(): Promise<StatsOverview> {
    try {
      const res = await fetch('/api/stats');
      if (!res.ok) throw new Error('API stats error');
      return await res.json();
    } catch {
      const appointments = await this.getAppointments();
      const services = await this.getServices();
      const totalAppointments = appointments.length;
      const activeAppointments = appointments.filter(a => a.status === 'confirmed').length;
      const completedAppointments = appointments.filter(a => a.status === 'completed').length;
      const cancelledAppointments = appointments.filter(a => a.status === 'cancelled').length;
      const estimatedRevenue = appointments
        .filter(a => a.status === 'completed' || a.status === 'confirmed')
        .reduce((sum, a) => sum + (a.price || 0), 0);

      return {
        totalAppointments,
        activeAppointments,
        completedAppointments,
        cancelledAppointments,
        estimatedRevenue,
        servicesCount: services.length
      };
    }
  }
};
