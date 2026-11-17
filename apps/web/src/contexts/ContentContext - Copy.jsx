import React, { createContext, useState, useEffect } from 'react';

export const ContentContext = createContext();

const defaultContent = {
   hero: {
    title: 'Tus datos ya saben lo que tu negocio aún no ha descubierto.',
    subtitle: 'Un solo equipo para diagnosticar, estructurar y optimizar los procesos mas importantes de tu empresa',
  },
  problems: [
  {
    id: 1,
    problem: '¿Sigues tomando decisiones importantes desde un Excel?',
    solution: 'Construimos el sistema que te da visibilidad total de tu negocio en tiempo real.',
  },
  {
    id: 2,
    problem: '¿Inviertes en publicidad pero no ves resultados?',
    solution: 'Auditamos tu pauta, eliminamos fugas de presupuesto y redistribuimos tu inversión donde realmente genera retorno.',
  },
  {
    id: 3,
    problem: '¿Atraes visitas pero no logras convertirlas en clientes?',
    solution: 'Identificamos los cuellos de botella en tu embudo y aplicamos estrategias de conversión probadas para multiplicar tus resultados.',
  },
  ],
  benefits: [
    {
      id: 1,
      icon: 'TrendingUp',
      title: 'Enfoque en resultados',
      description: 'Sin resultados medibles, no cobramos. Nuestra garantía no es un slogan, si no logramos los resultados esperados, devolvemos el dinero.',
    },
    {
      id: 2,
      icon: 'Target',
      title: 'Soluciones personalizadas',
      description: 'No usamos plantillas. Cada estrategia se diseña específicamente para tu negocio',
    },
    {
      id: 1,
      icon: 'BarChart3',
      title: 'Estrategias basadas en datos',
      description: 'Cada decisión respaldada por análisis profundo de tu mercado y competencia',
    },
    {
      id: 4,
      icon: 'Users',
      title: 'Equipo multidisciplinario',
      description: 'Expertos en análisis, marketing, ventas y desarrollo de negocios',
    },
    {
      id: 5,
      icon: 'Headphones',
      title: 'Acompañamiento continuo',
      description: 'Soporte constante durante la implementación y optimización de estrategias',
    },
        {
      id: 6,
      icon: 'LineChart',
      title: 'Resultados medibles y transparentes',
      description: 'Sabrás exactamente qué estamos haciendo, por qué lo hacemos y qué impacto tiene en tu negocio.',
    },
  ],
  testimonials: [
    {
      id: 1,
      name: 'Wilson Pepito',
      company: 'JW Auditorias',
      comment: 'Antes de DOMAKEA tomábamos decisiones financieras basadas en intuición. Hoy tenemos un sistema de datos que nos permite identificar riesgos y oportunidades con precisión. Nuestra firma creció un 34% en facturación en menos de un año.',
    },
    {
      id: 2,
      name: 'Erika Lorena',
      company: 'DiagnosticVet | Veterinaria',
      comment: 'No imaginábamos que los datos de nuestra clínica podían decirnos tanto. DOMAKEA nos ayudó a entender el comportamiento de nuestros pacientes, optimizar nuestros procesos y aumentar la retención de clientes en un 41%.',
    },
    {
      id: 3,
      name: 'Julián Giraldo',
      company: 'Julián Giraldo Diseño de Cejas',
      comment: 'Mi negocio siempre tuvo clientes, pero no tenía claridad sobre qué funcionaba y qué no. Con DOMAKEA estructuramos toda la operación y en 4 meses duplicamos las agendas sin aumentar el equipo.',
    },
  ],
  services: [
    {
      id: 1,
    category: 'DomaField',
    shortDescription: 'Construimos el sistema de captura de datos que su empresa necesita para dejar de operar con información incompleta.',
    description: 'Diseñamos e implementamos el sistema de recolección de datos que su empresa necesita para decidir con información real. Desde encuestas estructuradas y formularios digitales hasta procesos de captura en campo y levantamiento de bases de datos desde cero.',
    totalPrice: '$600.000 — $2.000.000',
    benefits: [
      'Obtención de información confiable directamente desde la fuente',
      'Eliminación de procesos manuales y registros dispersos',
      'Mayor velocidad y precisión en la captura de datos',
      'Estandarización de formularios, encuestas y procesos de recolección',
      'Construcción de bases de datos listas para análisis y toma de decisiones',
      'Visibilidad en tiempo real de la información recolectada',
      ],
      useCases: [
        'Estudios de mercado y validación de nuevas oportunidades de negocio',
      'Encuestas de satisfacción y experiencia de clientes',
      'Levantamiento de información comercial en campo',
      'Censos de clientes, proveedores o puntos de venta',
      'Auditorías operativas y control de calidad',
      'Inventarios físicos y verificaciones en terreno',
      ],
      subservices: [
        {
             id: 1,
        name: 'Diseño de encuestas y formularios',
        description: 'Diseño estructurado de instrumentos de captura para clientes, equipo interno, proveedores o mercado objetivo.',
        price: '$300.000',
        },
        {
        id: 2,
        name: 'Protocolo de recolección en campo',
        description: 'Diseño del proceso de captura presencial o remota para equipos comerciales u operativos.',
        price: '$350.000',
      },
      {
        id: 3,
        name: 'Integración al CRM o sistema de análisis',
        description: 'Conexión de los flujos de recolección con el CRM o las herramientas de analítica de la empresa.',
        price: '$400.000',
      },
    ],
  },
  {
    id: 2,
    category: 'Doma Advisory',
    shortDescription: 'Analizamos integralmente su empresa para identificar dónde está perdiendo valor y qué decisiones pueden transformar su rentabilidad.',
    description: 'Realizamos un análisis integral de su empresa para identificar oportunidades de crecimiento, ineficiencias operativas, debilidades comerciales y vacíos financieros. Evaluamos cómo funciona realmente el negocio, detectamos dónde se pierde valor y entregamos recomendaciones claras y accionables para optimizar la rentabilidad y fortalecer la toma de decisiones.',
    totalPrice: '$1.000.000 — $1.800.000',
    benefits: [
      'Mayor capacidad para anticipar cambios del mercado. ',
      'Identificación temprana de oportunidades y amenazas. ',
      'Identificación de fugas de dinero y rentabilidad.',
      'Estrategias alineadas con tendencias reales del sector. ',
      'Ventaja competitiva basada en información y análisis. ',
      'Decisiones estratégicas respaldadas por datos clave y evidencia de mercado. ',
    ],
    useCases: [
      'El mercado está cambiando y la empresa no tiene claridad sobre cómo adaptarse',
      'Han aparecido nuevos competidores y se desconoce su impacto en el negocio',
      'La empresa quiere identificar nuevas oportunidades de crecimiento en su sector',
      'La empresa vende bien, pero no sabe exactamente dónde está perdiendo dinero',
      'Existen problemas entre áreas y no está claro dónde se originan',
      'La dirección necesita información estratégica para anticiparse a cambios del mercado',
    ],
    subservices: [
      {
        id: 1,
        name: 'Auditoría comercial',
        description: 'Revisión de canales de venta, procesos de atención, embudo comercial y calidad del pipeline.',
        price: '$400.000',
      },
      {
        id: 2,
        name: 'Diagnóstico de inversión publicitaria',
        description: 'CAC real, ROAS por canal, eficiencia de presupuesto y fugas identificadas con datos.',
        price: '$450.000',
      },
      {
        id: 3,
        name: 'Análisis de vacíos financieros',
        description: 'Identificación de costos ocultos, ineficiencias operativas y gastos no justificados por área.',
        price: '$500.000',
      },
    ],
  },
  {
    id: 3,
    category: 'DomaAnalytics',
    shortDescription: 'Convertimos los datos históricos de su empresa en modelos predictivos e inteligencia accionable.',
    description: 'Convertimos el historial de datos de su empresa en inteligencia accionable. Aplicamos minería de datos para descubrir patrones ocultos en su operación, clustering para agrupar clientes según comportamiento real, y modelos de forecasting para anticipar la demanda futura por línea de negocio, canal o temporada.',
    totalPrice: '$1.200.000 — $4.000.000',
    benefits: [
      'Predicción de ventas y demanda',
      'Segmentación inteligente de clientes',
      'Identificación de oportunidades ocultas en los datos',
      'Reducción del riesgo en decisiones comerciales',
      'Mayor precisión en presupuestos y proyecciones',
    ],
    useCases: [
      'La empresa tiene datos en Excel o CRM pero no los utiliza estratégicamente',
      'No saben cuáles clientes son los más rentables',
      'No pueden predecir ventas o demanda futura',
      'Necesitan entender patrones de compra o comportamiento de clientes',
      'Quieren reducir la incertidumbre en la planificación comercial',
    ],
    subservices: [
      {
        id: 1,
        name: 'Limpieza y estructuración de datos',
        description: 'Auditoría de calidad, normalización y organización de bases de datos existentes para su uso estratégico.',
        price: '$500.000',
      },
      {
        id: 2,
        name: 'Clustering de clientes',
        description: 'Agrupación de clientes por comportamiento real, valor económico y probabilidad de conversión o abandono.',
        price: '$700.000',
      },
      {
        id: 3,
        name: 'Forecasting de demanda',
        description: 'Proyecciones de demanda por producto, canal o temporada usando datos históricos reales de la empresa.',
        price: '$800.000',
      },
    ],
  },
  {
    id: 4,
    category: 'DomaCore',
    shortDescription: 'Implementamos y estructuramos el CRM de su empresa para que toda la información comercial fluya desde un único lugar confiable.',
    description: 'Implementamos y estructuramos el sistema de inteligencia comercial (SIC) de su empresa. Construimos la arquitectura correcta de CRM, organizamos y aseguramos los datos existentes, y dejamos todo listo para que la toma de decisiones fluya desde un único lugar confiable.',
    totalPrice: '$800.000 — $2.500.000',
    benefits: [
      'Centralización de la información',
      'Mayor control sobre clientes y oportunidades',
      'Procesos comerciales estandarizados',
      'Información confiable para la toma de decisiones',
      'Base sólida para implementar analítica avanzada',
      'Protección de datos clave de su negocio',
    ],
    useCases: [
      'La información está dispersa entre Excel, WhatsApp y múltiples plataformas',
      'El equipo comercial no registra adecuadamente los clientes',
      'No existe un CRM o el actual no se utiliza correctamente',
      'Los reportes toman demasiado tiempo en construirse',
      'La empresa quiere profesionalizar su gestión comercial',
    ],
    subservices: [
      {
        id: 1,
        name: 'Implementación de CRM',
        description: 'Selección, configuración e implementación del CRM correcto para el tamaño y modelo de negocio del cliente.',
        price: '$600.000',
      },
      {
        id: 2,
        name: 'Migración y limpieza de datos',
        description: 'Traslado, depuración y normalización de datos desde Excel, hojas de cálculo o sistemas anteriores.',
        price: '$400.000',
      },
      {
        id: 3,
        name: 'Organización de base de datos',
        description: 'Estructuración de la base de clientes, leads y contactos con campos, etiquetas y segmentos claros.',
        price: '$350.000',
      },
    ],
  },
  {
    id: 5,
    category: 'DomaGrowth',
    shortDescription: 'Evaluamos sus canales de captación y embudo de conversión para decirle exactamente qué cambiar y por qué.',
    description: 'Evaluamos la efectividad de sus canales de captación, el rendimiento real de su inversión publicitaria y los puntos de fuga en el embudo de conversión. El resultado es una estrategia accionable que le dice exactamente qué cambiar, en qué orden y por qué.',
    totalPrice: '$800.000 — $2.500.000',
    benefits: [
      'Reducción del costo de adquisición de clientes',
      'Mayor retorno sobre inversión publicitaria',
      'Incremento de conversiones',
      'Mejora de la retención y fidelización',
      'Optimización del embudo comercial',
    ],
    useCases: [
      'Se invierte en publicidad pero los resultados son inconsistentes',
      'Los prospectos llegan pero no compran',
      'La empresa no sabe cuál canal genera mejores clientes',
      'Existe una alta pérdida de clientes',
      'Se busca aumentar ventas sin incrementar excesivamente el presupuesto publicitario',
    ],
    subservices: [
      {
        id: 1,
        name: 'Auditoría de campañas activas',
        description: 'Análisis profundo del rendimiento real de Meta Ads, Google Ads u otras plataformas activas con datos reales.',
        price: '$400.000',
      },
      {
        id: 2,
        name: 'Estrategia de captación de leads',
        description: 'Diseño de la estrategia de adquisición: ICP, canales, embudos y métricas de control. Sin ejecución.',
        price: '$600.000',
      },
      {
        id: 3,
        name: 'Análisis de retención y churn',
        description: 'Diagnóstico de por qué se van los clientes, en qué momento del proceso ocurre y cómo prevenirlo.',
        price: '$500.000',
      },
      ],
    },
  ],
  about: {
    quienesSomos: 'DOMAKEA es una consultora especializada en transformación digital y crecimiento empresarial. Combinamos análisis de datos, marketing estratégico y desarrollo comercial para ayudar a empresas a alcanzar sus objetivos de negocio de manera medible y sostenible.',
    queHacemos: 'Diseñamos e implementamos estrategias personalizadas que integran análisis de datos, marketing digital y optimización comercial. Trabajamos codo a codo con nuestros clientes para entender sus desafíos únicos y crear soluciones que generen resultados reales.',
    porQueLoHacemos: 'Creemos que cada empresa tiene un potencial sin explotar. Nuestra misión es ayudar a las organizaciones a descubrir y aprovechar ese potencial mediante decisiones basadas en datos y estrategias probadas. Nos apasiona ver crecer a nuestros clientes.',
    vision: 'Ser la consultora de referencia en América Latina para empresas que buscan crecimiento sostenible basado en datos y estrategias innovadoras. Queremos democratizar el acceso a herramientas y conocimientos que antes solo estaban al alcance de grandes corporaciones.',
    metodologia: 'Nuestra metodología se basa en cinco pilares: Diagnóstico profundo, Estrategia personalizada, Implementación ágil, Medición continua y Optimización constante. Este enfoque iterativo nos permite adaptarnos rápidamente a los cambios del mercado y garantizar resultados sostenibles.',
  },
  team: [
  {
    id: 1,
    name: 'Samuel Ramirez',
    role: 'CEO & BI (Head of Business Intelligence)',
    description: 'Breve descripción de lo que hace esta persona en el equipo.',
    photo: '/sa.png',
    linkedin: 'https://www.linkedin.com/in/samuel-jeronimo-ramirez-calle-04b73233b/',
  },
  {
    id: 2,
    name: 'Juan Triana',
    role: 'CEO & Lead Data Scientist',
    description: 'Breve descripción de lo que hace esta persona en el equipo.',
    photo:'/ja.png',
    linkedin: 'https://www.linkedin.com/in/juan-triana-olarte-70b436222/',
  },
  ],
  portfolio: [
    {
      id: 1,
      title: ' Morans Capital Solutions',
      client: 'Sector inmobiliario · Estrategia de captación y conversión',
      description: 'A través de un análisis profundo de los canales de captación activos, identificamos oportunidades de mejora en la segmentación de prospectos, redistribución del presupuesto publicitario y optimización de los embudos de conversión. Morans Capital Solutions pudo tomar decisiones estratégicas respaldadas por datos verificables, maximizando el retorno de cada peso invertido.',
      results: [
        { metric: 'Tasa de conversión de leads', value: '+28%' },
        { metric: 'Costo por prospecto calificado', value: '-22%' },
        { metric: 'Retorno sobre inversión publicitaria', value: '+41%' },
      ],
      image: '/fondo.png',
      testimonial: 'Trabajar con este equipo transformó por completo nuestra toma de decisiones. Pasamos de operar por pura intuición a respaldar cada movimiento con datos reales. Los resultados en el retorno de inversión hablan por sí solos.',
      testimonialAuthor: 'CEO - Morans Capital Solution',
    },
    {
      id: 2,
      title: 'Clínica Odontológica',
      client: 'Salud · Odontología',
      description: 'La clínica tenía pauta activa en Meta pero no tenía claridad de cuántos pacientes realmente llegaban por ese canal. El proceso de contacto era manual y la tasa de conversión de consulta a paciente era desconocida.',
      results: [
        { metric: 'Visibilidad digital', value: '+65%' },
        { metric: 'Tasa de conversión', value: '+30%' },
        { metric: 'Tiempo de ejecución', value: '4 sem' },
      ],
      image: '/serv_odo.JPG',
      testimonial: 'Los profesionales nos ayudaron a conectar la consulta física con la pauta digital de forma impecable. Ahora sabemos de dónde viene cada paciente y el flujo es mucho más ordenado.',
      testimonialAuthor: 'Director Comercial',
    },
    {
      id: 3,
      title: 'Estetica y Belleza',
      client: 'Servicios personales',
      description: 'Estructuramos su marca personal desde el diagnóstico, identificamos su servicio de mayor rentabilidad y redefinimos toda su comunicación alrededor de ese diferenciador. El resultado fue una percepción de valor más alta y un perfil de cliente mucho más alineado con lo que ella realmente ofrece.',
      results: [
        { metric: 'Consultas calificadas', value: '+40%' },
        { metric: 'Valor por cliente', value: '18.3%' },
        { metric: 'Tiempo de entrega', value: '5 sem' },
      ],
      image: '/serv_est.JPG',
      testimonial: 'Entendieron a la perfección la esencia de mi marca y cómo potenciar el servicio que más me rentaba. Logramos atraer al perfil de cliente ideal en tiempo récord.',
      testimonialAuthor: 'CEO & Founder',
    },
    {
      id: 4,
      title: 'Auditoría de Pauta · 3 empresas',
      client: 'Multisectorial · Inversión publicitaria',
      description: 'A través de auditorías de campañas activas, identificamos fugas de presupuesto relacionadas con segmentaciones incorrectas, mala asignación de inversión y baja optimización de métricas clave. Los tres clientes pudieron tomar decisiones de redistribución de presupuesto con datos verificables.',
      results: [
        { metric: 'Presupuesto recuperado', value: '20-35%' },
        { metric: 'Costo por cliente', value: '-15%' },
        { metric: 'Retorno sobre pauta', value: '+34%' },
      ],
      image: '/serv_audi.png',
      testimonial: 'Gracias al rigor analítico del equipo, logramos frenar de inmediato el desperdicio en publicidad y reasignar el presupuesto donde de verdad generaba cierres.',
      testimonialAuthor: 'Gerente de Ventas',
    },
  ],
};

const isDev = import.meta.env.DEV;

export const ContentProvider = ({ children }) => {
  const [content, setContent] = useState(() => {
    if (isDev) return defaultContent; // ← en desarrollo siempre usa el código
    const saved = localStorage.getItem('domakea_content');
    return saved ? JSON.parse(saved) : defaultContent;
  });



  const [isAdmin, setIsAdmin] = useState(() => {
    return localStorage.getItem('domakea_admin') === 'true';
  });

  useEffect(() => {
    if (isDev) return; // ← en desarrollo no guarda nada
    localStorage.setItem('domakea_content', JSON.stringify(content));
  }, [content]);

  const updateContent = (section, data) => {
    setContent(prev => ({ ...prev, [section]: data }));
  };

  const login = (password) => {
    if (password === 'domakea2026') {
      setIsAdmin(true);
      localStorage.setItem('domakea_admin', 'true');
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAdmin(false);
    localStorage.removeItem('domakea_admin');
  };

  const resetContent = () => {
    setContent(defaultContent);
    localStorage.setItem('domakea_content', JSON.stringify(defaultContent));
  };

  return (
    <ContentContext.Provider value={{ content, updateContent, isAdmin, login, logout, resetContent }}>
      {children}
    </ContentContext.Provider>
  );
};