import { asset } from '../lib/utils'

export const SAMPLES = [
  {
    id: 'tizon-temprano',
    crop: 'Tomate',
    cropScientific: 'Solanum lycopersicum',
    disease: 'Tizón temprano',
    scientificName: 'Alternaria solani',
    category: 'Hongo',
    severity: 'Alta',
    severityScore: 78,
    confidence: 96,
    image: asset('/samples/tizon-temprano.svg'),
    accent: '#c96a4a',
    summary:
      'Se detectaron lesiones necróticas con anillos concéntricos y halo amarillo en el tercio inferior de la planta. El patrón coincide con un avance activo de tizón temprano, favorecido por humedad foliar prolongada.',
    symptoms: [
      'Manchas café oscuro con anillos concéntricos',
      'Halo amarillo alrededor de las lesiones',
      'Defoliación en hojas bajas',
      'Necrosis en tallos y pecíolos',
    ],
    bioinput: {
      name: 'Bio-Fungicida Tri-Guard',
      type: 'Fungicida biológico',
      description:
        'Consorcio de Trichoderma y Bacillus formulado por nuestro equipo agronómico para frenar Alternaria y recuperar la microbiota del suelo.',
      ingredients: [
        { name: 'Trichoderma harzianum', qty: '200 g' },
        { name: 'Bacillus subtilis', qty: '150 g' },
        { name: 'Melaza orgánica', qty: '250 ml' },
        { name: 'Agua no clorada', qty: '20 L' },
      ],
      prep:
        'Activa el consorcio en agua tibia con melaza durante 24 h. Aplica en horas frescas, cubriendo el envés de la hoja. No mezclar con fungicidas químicos.',
      dose: '250 ml por planta',
      frequency: 'Cada 7 días · 3 aplicaciones',
      price: 145,
      readyIn: '48 h',
      coverage: '0.5 manzana',
    },
    prevention: [
      'Retira y quema las hojas con lesiones para reducir inóculo.',
      'Evita mojar el follaje al regar; usa goteo o riego al pie.',
      'Rota con maíz o frijol durante la siguiente temporada.',
      'Mantén tutorado y poda sanitaria para mejorar ventilación.',
    ],
  },
  {
    id: 'roya-cafe',
    crop: 'Café',
    cropScientific: 'Coffea arabica',
    disease: 'Roya del café',
    scientificName: 'Hemileia vastatrix',
    category: 'Hongo',
    severity: 'Media',
    severityScore: 54,
    confidence: 94,
    image: asset('/samples/roya-cafe.svg'),
    accent: '#e0a92e',
    summary:
      'Se observan pústulas anaranjadas en polvo sobre el envés de hojas maduras, con defoliación incipiente en ramas productivas. La severidad es moderada: una intervención temprana puede evitar pérdidas de floración.',
    symptoms: [
      'Pústulas anaranjadas en el envés',
      'Manchas cloróticas en el haz',
      'Caída prematura de hojas',
      'Menor llenado del grano',
    ],
    bioinput: {
      name: 'Bio-Royina Café',
      type: 'Fungicida preventivo-curativo',
      description:
        'Caldo biológico con microorganismos antagonistas y extracto de cola de caballo para contener la dispersión de uredosporas y fortalecer el tejido foliar.',
      ingredients: [
        { name: 'Trichoderma viride', qty: '180 g' },
        { name: 'Extracto de cola de caballo', qty: '300 ml' },
        { name: 'Jabón potásico', qty: '40 ml' },
        { name: 'Agua no clorada', qty: '20 L' },
      ],
      prep:
        'Mezcla los ingredientes colados y aplica dentro de las 6 horas siguientes. Prioriza el envés de las hojas y las ramas del tercio medio.',
      dose: '2 L por planta adulta',
      frequency: 'Cada 14 días · 2 aplicaciones',
      price: 165,
      readyIn: '48 h',
      coverage: '1 manzana',
    },
    prevention: [
      'Realiza poda de aireación para bajar la humedad en el cafetal.',
      'Registra la incidencia por parcela cada 15 días.',
      'Mantén sombra regulada y cobertura de hojarasca.',
      'Fertiliza con potasio para mejorar la resistencia del tejido.',
    ],
  },
  {
    id: 'pulgon-tomate',
    crop: 'Tomate',
    cropScientific: 'Solanum lycopersicum',
    disease: 'Pulgón verde',
    scientificName: 'Myzus persicae',
    category: 'Plaga',
    severity: 'Media',
    severityScore: 46,
    confidence: 92,
    image: asset('/samples/pulgon-tomate.svg'),
    accent: '#52b788',
    summary:
      'Se identificaron colonias de pulgón en brotes nuevos y hojas jóvenes, con enrollamiento foliar y presencia de melaza. El umbral de acción fue superado en 3 de 10 plantas muestreadas.',
    symptoms: [
      'Colonias de insectos verde claro en brotes',
      'Hojas jóvenes enrolladas o deformadas',
      'Melaza y fumagina negra',
      'Hormigas subiendo por el tallo',
    ],
    bioinput: {
      name: 'Bio-Repelente Neem-Ajo',
      type: 'Insecticida botánico',
      description:
        'Extracto botánico de acción repelente y de contacto suave, potenciado con jabón potásico para romper la cutícula del pulgón sin dañar polinizadores.',
      ingredients: [
        { name: 'Aceite de neem', qty: '60 ml' },
        { name: 'Extracto de ajo', qty: '150 ml' },
        { name: 'Jabón potásico', qty: '30 g' },
        { name: 'Agua no clorada', qty: '10 L' },
      ],
      prep:
        'Diluye el jabón antes de incorporar los extractos. Aplica al atardecer, cuando las abejas no están activas, y repite a los 5 días.',
      dose: '1 L por planta',
      frequency: 'Cada 5 días · 3 aplicaciones',
      price: 120,
      readyIn: '24 h',
      coverage: '0.5 manzana',
    },
    prevention: [
      'Instala trampas cromáticas amarillas para monitoreo.',
      'Conserva franjas de flores nativas que atraigan enemigos naturales.',
      'Revisa brotes nuevos dos veces por semana.',
      'Evita el exceso de nitrógeno, que atrae pulgón.',
    ],
  },
  {
    id: 'deficiencia-nitrogeno',
    crop: 'Maíz',
    cropScientific: 'Zea mays',
    disease: 'Deficiencia de nitrógeno',
    scientificName: 'Trastorno nutricional',
    category: 'Nutrición',
    severity: 'Baja',
    severityScore: 28,
    confidence: 89,
    image: asset('/samples/deficiencia-nitrogeno.svg'),
    accent: '#f4c95d',
    summary:
      'El amarillamiento en V de las hojas inferiores indica una disponibilidad limitada de nitrógeno. No hay signos de patógeno; una corrección foliar y un ajuste de fertilización pueden recuperar el cultivo sin pérdidas.',
    symptoms: [
      'Amarillamiento en forma de V desde la punta',
      'Hojas inferiores pálidas',
      'Crecimiento ligeramente uniforme y lento',
      'Tallos delgados en comparación al lote',
    ],
    bioinput: {
      name: 'Bio-Nitrón Foliar',
      type: 'Bio-fertilizante líquido',
      description:
        'Lixiviado de vermicompost enriquecido con extracto de algas y melaza para una absorción rápida de nitrógeno orgánico y microelementos.',
      ingredients: [
        { name: 'Lixiviado de vermicompost', qty: '5 L' },
        { name: 'Extracto de algas', qty: '200 ml' },
        { name: 'Melaza orgánica', qty: '300 ml' },
        { name: 'Agua no clorada', qty: '15 L' },
      ],
      prep:
        'Filtra el lixiviado y mezcla con los demás insumos. Aplica al follaje temprano en la mañana o al atardecer, evitando lluvia en las siguientes 6 horas.',
      dose: '1.5 L por bomba de 20 L',
      frequency: 'Dosis única + evaluación a 10 días',
      price: 110,
      readyIn: '24 h',
      coverage: '1 manzana',
    },
    prevention: [
      'Incorpora compost maduro antes de la siembra.',
      'Alterna maíz con leguminosas para fijar nitrógeno.',
      'Realiza análisis de suelo cada ciclo.',
      'Ajusta la fertilización según la etapa fenológica.',
    ],
  },
]

export const UPLOAD_DIAGNOSIS = {
  id: 'mancha-bacteriana',
  crop: 'Cultivo por confirmar',
  cropScientific: 'Análisis de imagen',
  disease: 'Mancha foliar bacteriana',
  scientificName: 'Xanthomonas spp. (probable)',
  category: 'Bacteria',
  severity: 'Media',
  severityScore: 51,
  confidence: 87,
  image: null,
  accent: '#74c69d',
  summary:
    'La imagen muestra lesiones acuosas con borde amarillo compatibles con una infección bacteriana. Para elevar la precisión al 95 %, un ingeniero agrónomo validará la muestra y el resultado de laboratorio.',
  symptoms: [
    'Lesiones oscuras de apariencia húmeda',
    'Bordes amarillos irregulares',
    'Progresión desde las hojas bajas',
    'Posible exudado bacteriano',
  ],
  bioinput: {
    name: 'Bio-Bactericida Cobre-Verde',
    type: 'Bactericida biológico',
    description:
      'Formulación de cobre de baja concentración con microorganismos benéficos y extractos vegetales para contener bacterias sin sellar el suelo.',
    ingredients: [
      { name: 'Bacillus amyloliquefaciens', qty: '150 g' },
      { name: 'Oxicloruro de cobre', qty: '80 g' },
      { name: 'Extracto de cítricos', qty: '120 ml' },
      { name: 'Agua no clorada', qty: '20 L' },
    ],
    prep:
      'Nuestro equipo confirma la dosis de cobre después de la validación. Aplica en la mañana, con equipo limpio y sin mezclar con productos alcalinos.',
    dose: 'Sujeta a validación agronómica',
    frequency: 'Según confirmación del especialista',
    price: 135,
    readyIn: '48 h',
    coverage: '0.5 manzana',
  },
  prevention: [
    'Desinfecta herramientas entre parcelas.',
    'Evita el riego por aspersión sobre follaje enfermo.',
    'Retira residuos de cosecha infectados.',
    'Solicita validación de laboratorio para confirmar la bacteria.',
  ],
}

export const SAMPLE_FILTERS = ['Todos', 'Hongo', 'Plaga', 'Nutrición', 'Bacteria']

export const TESTIMONIALS = [
  {
    quote:
      'Antes esperaba dos semanas por un técnico. Con AgroGen tomé la foto en la parcela, supe qué tenía el tomate y en tres días tenía el bio-insumo listo.',
    name: 'María Ixcoy',
    role: 'Productora de tomate · Chimaltenango',
    initials: 'MI',
    metric: '32 % más cosecha',
  },
  {
    quote:
      'La cooperativa dejó de comprar fungicidas genéricos. Ahora cada receta llega según lo que necesita cada parcela y el costo por manzana bajó.',
    name: 'Carlos Mejía',
    role: 'Presidente · Cooperativa El Valle',
    initials: 'CM',
    metric: 'Q240 ahorrados / manzana',
  },
  {
    quote:
      'Me gusta que explique todo en palabras sencillas y que el primer diagnóstico sea gratis. Así perdí el miedo a probarlo.',
    name: 'Rosa Chub',
    role: 'Productora de maíz · Quiché',
    initials: 'RC',
    metric: '2 min por diagnóstico',
  },
]

export const METRICS = {
  mrr: 15000,
  arr: 180000,
  ltv: 2160,
  cac: 300,
  ltvCac: 7.2,
  grossMargin: 68,
  churn: 4.2,
  subscribers: 100,
  activePlots: 312,
  diagnoses: 1247,
  nps: 62,
  paybackMonths: 3,
  avgTicket: 150,
  bioinputRepeat: 74,
  months: [
    { month: 'Jun', mrr: 7200, farmers: 48 },
    { month: 'Jul', mrr: 9000, farmers: 60 },
    { month: 'Ago', mrr: 10500, farmers: 70 },
    { month: 'Sep', mrr: 12000, farmers: 80 },
    { month: 'Oct', mrr: 13800, farmers: 92 },
    { month: 'Nov', mrr: 15000, farmers: 100 },
  ],
  revenueMix: [
    { label: 'Suscripciones', value: 52, color: '#1b4332' },
    { label: 'Bio-insumos', value: 38, color: '#52b788' },
    { label: 'Datos y cooperativas', value: 10, color: '#f4c95d' },
  ],
  funnel: [
    { label: 'Personas alcanzadas', value: 4200, hint: 'Campañas y ferias agrícolas' },
    { label: 'Primer diagnóstico gratis', value: 1840, hint: '43.8 % del alcance' },
    { label: 'Bio-insumo solicitado', value: 420, hint: '22.8 % de diagnósticos' },
    { label: 'Suscripción activa', value: 100, hint: '24 % de conversión a pago' },
  ],
  useOfFunds: [
    { label: 'I+D en IA y mapeo MAGA', value: 45 },
    { label: 'Expansión a 3 departamentos', value: 30 },
    { label: 'Logística de bio-insumos', value: 15 },
    { label: 'Operaciones y soporte', value: 10 },
  ],
}
