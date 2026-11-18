import React, { createContext, useState, useEffect } from 'react';

export const ContentContext = createContext();

const defaultContent = {
  hero: {
    title1: 'No tenemos un manual.',
    title2: "Nuestro equipo se adapta a tu negocio para elegir el camino correcto.",
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
      id: 3,
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
      category: 'DomaAdvisory | Consultoría',
      hook: 'Define la dirección estratégica del negocio.',
      shortDescription: 'Análisis exhaustivo de las áreas clave del negocio: operación, estructura comercial, eficiencia publicitaria y vacíos financieros.',
      description: 'Mapeamos cómo funciona realmente la empresa, dónde pierde valor y qué decisiones podrían transformar su rentabilidad. El entregable no es un informe — es un sistema de decisión con cada hallazgo cuantificado en COP y una hoja de ruta ordenada por impacto.',
      totalPrice: '$1.000.000 — $1.800.000',
      benefits: [
        'Identificación precisa de fugas de dinero y rentabilidad',
        'Mapa de ineficiencias operativas y vacíos financieros cuantificados',
        'Hoja de ruta priorizada por impacto vs. costo de implementación',
        'Base de datos lista para alimentar DomaAnalytics o DomaCore',
        'Capacidad para anticipar cambios del mercado con información real',
        'Decisiones estratégicas respaldadas por evidencia, no por intuición',
      ],
      useCases: [
        'La empresa vende bien pero no sabe exactamente dónde está perdiendo dinero',
        'Existen problemas entre áreas y no está claro dónde se originan',
        'Han aparecido nuevos competidores y se desconoce su impacto real',
        'La dirección necesita información estratégica para tomar decisiones de inversión',
        'Se quiere escalar el negocio pero sin claridad sobre qué priorizar primero',
      ],
      subservices: [
        {
          id: 1,
          name: 'Auditoría comercial',
          description: 'Revisión de canales de venta, procesos de atención, embudo comercial y calidad del pipeline.',
        },
        {
          id: 2,
          name: 'Diagnóstico de inversión publicitaria',
          description: 'CAC real, ROAS por canal, eficiencia de presupuesto y fugas identificadas con datos.',
        },
        {
          id: 3,
          name: 'Análisis de vacíos financieros',
          description: 'Identificación de costos ocultos, ineficiencias operativas y gastos no justificados por área.',
        },
        {
          id: 4,
          name: 'Benchmarking sectorial',
          description: 'Comparación del desempeño de la empresa vs. estándares del sector en Colombia.',
        },
              {
        id: 5,
        name: 'Optimización y automatización operativa',
        description: 'Rediseño de flujos de trabajo, eliminación de cuellos de botella y automatización de tareas repetitivas para maximizar la eficiencia.',
      },
      {
        id: 6,
        name: 'Gobernanza y calidad de datos',
        description: 'Auditoría de fuentes de información, limpieza de bases de datos y aseguramiento del cumplimiento legal para decisiones confiables.',
      },
      ],
    },
    {
      id: 6,
      category: 'DomaFinance | Consultoría financiera',
      hook: 'Sabe si tu proyecto funciona antes de invertir.',
      shortDescription:
        'Evaluación financiera de proyectos, análisis de riesgos, sistemas de costeo, proyecciones y presupuestos para decidir con números claros.',
      description:
        'Modelamos la parte financiera de tu negocio: cuánto cuesta realmente operar, qué proyectos valen la inversión y qué pasa con tu caja si el escenario cambia. El entregable no es un informe de cifras: es un modelo financiero vivo, con cada supuesto documentado, cada escenario cuantificado en COP y una recomendación clara de go / no-go.',
      totalPrice: '$1.200.000 — $2.800.000',
      benefits: [
        'Decisión de inversión respaldada por VPN, TIR y periodo de recuperación',
        'Punto de equilibrio y márgenes reales por producto o servicio',
        'Riesgos medidos con escenarios y análisis de sensibilidad',
        'Costos claros para fijar precios sin adivinar',
        'Proyecciones listas para presentar ante bancos, socios o inversionistas',
        'Modelos en Excel que tu equipo puede usar y actualizar solo',
        'Tableros de seguimiento conectables a DomaAnalytics',
      ],
      useCases: [
        'Vas a abrir una sede, comprar maquinaria o lanzar una línea y no sabes si se paga sola',
        'Vendes bien, pero no conoces el costo ni el margen real de cada producto',
        'Necesitas proyecciones para solicitar un crédito o buscar un socio',
        'No tienes presupuesto, o lo tienes y nunca se cumple',
        'Hay un proyecto inmobiliario o una expansión en la mesa y falta saber si es viable',
      ],
      subservices: [
        {
          id: 1,
          name: 'Evaluación financiera de proyectos',
          description:
            'Flujo de caja libre, VPN, TIR, WACC y periodo de recuperación para decidir si invertir.',
        },
        {
          id: 2,
          name: 'Estudio de viabilidad',
          description:
            'Análisis de mercado, técnico y financiero con punto de equilibrio y recomendación go / no-go.',
        },
        {
          id: 3,
          name: 'Análisis de riesgos financieros',
          description:
            'Escenarios, sensibilidades y riesgos de liquidez, crédito, tasa y tipo de cambio, con plan de mitigación.',
        },
        {
          id: 4,
          name: 'Sistemas de costeo',
          description:
            'Diseño e implementación de costeo por absorción, variable, ABC o por proyectos, con capacitación al equipo.',
        },
        {
          id: 5,
          name: 'Proyecciones financieras',
          description: 'P&G, flujo de caja y balance proyectados a 12–60 meses con escenarios dinámicos.',
        },
        {
          id: 6,
          name: 'Presupuestos y seguimiento',
          description: 'Presupuesto anual por área o proyecto, con tablero mensual de ejecución vs. real.',
        },
      ],
    },
    {
      id: 2,
      category: 'DomaField',
      hook: 'Recolectamos los datos.',
      shortDescription: 'Diseñamos e implementamos el sistema de captura de datos que tu empresa necesita para dejar de operar con información incompleta o dispersa, garantizando el manejo responsable de la información conforme a la normativa de protección de datos vigente.',
      description: 'Con datos de baja calidad, cada decisión es una apuesta. Diseñamos e implementamos el sistema de captura de datos que tu empresa necesita para operar con información confiable, no incompleta ni dispersa.',
      totalPrice: '$600.000 — $2.000.000',
      retainer: '$300.000 — $700.000 COP/mes',
      benefits: [
        'Obtención información confiable obtenida directamente desde la fuente',
        'Eliminación de procesos manuales y registros dispersos',
        'Mayor velocidad y precisión en la captura de datos operativos',
        'Estandarización formularios y encuestas estandarizados y replicables',
        'Construcción bases de datos listas para análisis desde el primer día',
        'Integración directa con CRM o herramientas de analítica existentes',
        "Reducción de errores en el levantamiento de información",
        "Visibilidad en tiempo real de la información recolectada"
      ],
      useCases: [
        "Estudios de mercado y validación de nuevas oportunidades de negocio",
        'La empresa no tiene datos históricos organizados para tomar decisiones',
        'La información está en papel, en conversaciones o en la memoria del equipo',
        'Se necesita levantar una base de clientes, prospectos o puntos de venta desde cero',
        'Caracterización de clientes y segmentación de mercados. ',
        'Se quiere hacer un estudio de mercado o encuesta estructurada sin saber cómo',
        'Los datos llegan pero en formatos inconsistentes que no sirven para análisis',
      ],
      subservices: [
        {
          id: 1,
          name: 'Diseño de encuestas y formularios',
          description: 'Instrumentos de captura estructurados para clientes, equipo interno, proveedores o mercado objetivo, con validaciones automáticas y lógica de branching.',
        },
        {
          id: 2,
          name: 'Implementación de herramientas de captura',
          description: 'Configuración de plataformas digitales de recolección (Google Forms, Typeform, Airtable, Notion o CRM integrado) con almacenamiento automático.',
        },
        {
          id: 3,
          name: 'Protocolo de recolección en campo',
          description: 'Diseño del proceso de captura presencial o remota para equipos comerciales u operativos: qué datos recoger, cuándo, cómo y en qué sistema registrarlos.',
        },
        {
          id: 4,
          name: 'Levantamiento de base de datos desde cero',
          description: 'Construcción de una base estructurada a partir de fuentes dispersas o inexistentes: entrevistas, visitas, formularios físicos u otros medios no digitalizados.',
        },
        {
          id: 5,
          name: 'Validación y limpieza de datos recolectados',
          description: 'Revisión de consistencia, completitud y calidad. Identificación de errores, duplicados y campos críticos faltantes con informe de calidad.',
        },
        {
          id: 6,
          name: 'Integración al CRM o sistema de análisis',
          description: 'Conexión de los flujos de recolección con el CRM o las herramientas de analítica para que los datos entren de forma automática, limpia y estructurada.',
        },
      ],
    },
    {
      id: 3,
      category: 'DomaCore',
      hook: 'Organizamos los datos.',
      shortDescription: 'Implementamos y estructuramos el CRM de tu empresa para que toda la información comercial fluya desde un único lugar confiable para facilitar la toma de decisiones.',
      description: 'Cuando la información comercial vive en la cabeza de tu equipo, tu negocio depende de personas, no de procesos. Implementamos y estructuramos tu CRM para que esa información comercial deje de estar fragmentada y fluya desde un único lugar confiable y bajo tu control.',
      totalPrice: '$1.000.000 — $3.000.000',
      retainer: '$400.000 — $900.000 COP/mes',
      benefits: [
        'Centralización de toda la información comercial en un solo lugar',
        'Mayor control sobre clientes, leads y oportunidades',
        'Procesos comerciales estandarizados y replicables',
        'Información confiable y en tiempo real para la toma de decisiones',
        'Base sólida para implementar analítica avanzada',
        'Protección y respaldo de los datos clave del negocio',
      ],
      useCases: [
        'La información está dispersa entre Excel, WhatsApp y múltiples plataformas',
        'El equipo comercial no registra adecuadamente los clientes ni el seguimiento',
        'No existe un CRM o el actual no se utiliza correctamente',
        'Los reportes toman demasiado tiempo en construirse manualmente',
        'La empresa quiere profesionalizar su gestión comercial antes de escalar',
      ],
      subservices: [
        {
          id: 1,
          name: 'Implementación de CRM',
          description: 'Selección, configuración e implementación del CRM correcto para el tamaño y modelo de negocio del cliente.',
        },
        {
          id: 2,
          name: 'Migración y limpieza de datos',
          description: 'Traslado, depuración y normalización de datos desde Excel, hojas de cálculo o sistemas anteriores.',
        },
        {
          id: 3,
          name: 'Organización de base de datos',
          description: 'Estructuración de la base de clientes, leads y contactos con campos, etiquetas y segmentos claros.',
        },
        {
          id: 4,
          name: 'Seguridad y respaldo de datos',
          description: 'Protocolos de acceso, permisos por rol, respaldo periódico y cumplimiento básico de Ley 1581.',
        },
        {
          id: 5,
          name: 'Dashboard operativo',
          description: 'Panel de indicadores del negocio conectado al CRM, actualizable en tiempo real por el equipo interno.',
        },
        {
          id: 6,
          name: 'Capacitación del equipo',
          description: '3 sesiones prácticas, material personalizado, guía rápida PDF y 30 días de soporte post-implementación.',
          included: true,
        },
      ],
    },
    {
      id: 4,
      category: 'DomaAnalytics',
      hook: 'Analizamos los datos.',
      shortDescription: 'Convertimos el historial de datos de tu empresa en modelos predictivos e inteligencia accionable para activar alertas tempranas que mitiguen riesgos y detecten oportunidades a tiempo.',
      description: 'Anticipar te cuesta menos que reaccionar. Convertimos el historial de tu empresa en modelos predictivos e inteligencia accionable, para que sepas qué va a pasar antes que tu competencia.',
      totalPrice: '$1.200.000 — $4.000.000',
      retainer: '$600.000 — $1.200.000 COP/mes',
      benefits: [
        'Predicción de ventas y demanda.',
        'Segmentación inteligente de clientes por comportamiento y valor real.',
        'Identificación de oportunidades ocultas.',
        'Reducción del riesgo en decisiones comerciales y de inversión',
        'Mayor precisión en presupuestos y proyecciones financieras',
        'Alertas tempranas sobre clientes en riesgo de abandono',
      ],
      useCases: [
        'La empresa tiene datos en Excel o CRM pero no los utiliza estratégicamente',
        'No saben cuáles clientes son los más rentables ni la razón',
        'No pueden predecir ventas o demanda futura con suficiente confiabilidad',
        'Necesitan entender patrones de compra o comportamiento de clientes',
        'Quieren reducir la incertidumbre en la planificación comercial',
      ],
      subservices: [
        {
          id: 1,
          name: 'Limpieza y estructuración de datos',
          description: 'Auditoría de calidad, normalización y organización de bases de datos existentes para su uso estratégico.',
        },
        {
          id: 2,
          name: 'Clustering de clientes',
          description: 'Agrupación de clientes por comportamiento real, valor económico y probabilidad de conversión o abandono.',
        },
        {
          id: 3,
          name: 'Forecasting de demanda',
          description: 'Proyecciones de demanda por producto, canal o temporada usando datos históricos reales de la empresa.',
        },
        {
          id: 4,
          name: 'Modelo de riesgo de churn',
          description: 'Identificación de clientes en riesgo de abandono con suficiente anticipación para actuar antes de perderlos.',
        },
        {
          id: 5,
          name: 'Segmentación estratégica',
          description: 'Definición de segmentos accionables para campañas, ofertas o estrategias de retención diferenciadas por perfil.',
        },
        {
          id: 6,
          name: 'Dashboard de analítica',
          description: 'Panel visual con indicadores clave del negocio, actualizable mensualmente con los datos del cliente.',
        },
      ],
    },
    {
      id: 5,
      category: 'DomaGrowth',
      hook: 'Convierte los hallazgos en crecimiento comercial. ',
      shortDescription: 'Evaluamos tus canales de captación, el rendimiento de tu inversión publicitaria y los puntos de fuga en el embudo de conversión.',
      description: 'El rendimiento real de la inversión publicitaria solo se puede medir evaluando cada canal y etapa del embudo . Evaluamos tus canales de captación, el rendimiento de tu inversión publicitaria y los puntos de fuga en el embudo de conversión.',
      totalPrice: '$800.000 — $2.500.000',
      retainer: '$500.000 — $1.000.000 COP/mes',
      agencyNote: {
        title: 'DomaGrowth para agencias de marketing',
        body: 'Si tu agencia ejecuta campañas pero tus clientes necesitan un análisis más profundo del rendimiento, DOMAKEA puede ser tu capa analítica. Ustedes ejecutan, nosotros analizamos y diagnosticamos. Al contar con nuestro equipo experto en ciencia de datos, garantizamos diagnósticos de alta precisión que optimizan el retorno de inversión. El cliente recibe una visión mucho más completa y tu agencia diferencia su oferta con analítica real.',
      },
      benefits: [
        'Reducción del costo de adquisición de clientes (CAC)',
        'Mayor retorno real sobre inversión publicitaria (ROAS)',
        'Incremento de conversiones en el embudo comercial',
        'Mejora de la retención y fidelización de clientes activos',
        "Optimización del embudo comercial",
        'Identificación precisa de los canales que generan mejores clientes',
        'Estrategia accionable priorizada por impacto y costo',
      ],
      useCases: [
        'Se invierte en publicidad pero los resultados son inconsistentes o decrecientes',
        'Los prospectos llegan pero no convierten en el proceso de venta',
        'La empresa no sabe cuál canal genera los mejores clientes a menor costo',
        'Existe una alta tasa de abandono de clientes sin causa clara',
        'Se busca aumentar ventas sin incrementar excesivamente el presupuesto publicitario',
      ],
      subservices: [
        {
          id: 1,
          name: 'Auditoría de campañas activas',
          description: 'Análisis profundo del rendimiento real de Meta Ads, Google Ads u otras plataformas activas con datos reales.',
        },
        {
          id: 2,
          name: 'Estrategia de captación de leads',
          description: 'Diseño de la estrategia de adquisición: ICP, canales, embudos y métricas de control. Sin ejecución.',
        },
        {
          id: 3,
          name: 'Análisis de retención y churn',
          description: 'Diagnóstico de por qué se van los clientes, en qué momento del proceso ocurre y cómo prevenirlo.',
        },
        {
          id: 4,
          name: 'Estrategia de fidelización',
          description: 'Diseño de programas y procesos para convertir clientes activos en clientes recurrentes y referidores.',
        },
        {
          id: 5,
          name: 'Análisis de ROI publicitario',
          description: 'Reporte mensual de retorno real sobre inversión en pauta por canal, con recomendaciones de redistribución.',
        },
        {
          id: 6,
          name: 'Diseño de embudo de conversión',
          description: 'Mapeo y rediseño del proceso de venta desde el primer contacto hasta el cierre con métricas de control.',
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
      description: 'Ayudo a las empresas a entender su mercado, identificar oportunidades y tomar decisiones estratégicas a través del análisis financiero, la inteligencia de negocios y el desarrollo empresarial.',
      photo: '/sa.png',
      linkedin: 'https://www.linkedin.com/in/samuel-jeronimo-ramirez-calle-04b73233b/',
      email: 'domakea.cons@gmail.com',
      emailInactive: true,
    },
    {
      id: 2,
      name: 'Juan Triana',
      role: 'CEO & Lead Data Scientist',
      description: 'Transformo los datos en información útil para las empresas mediante programación, analítica y ciencia de datos, desarrollando soluciones que optimizan procesos y respaldan la toma de decisiones.',
      photo: '/ja.png',
      linkedin: 'https://www.linkedin.com/in/juan-triana-olarte-70b436222/',
      github: 'https://github.com/Agarslok',
    },
  ],
  portfolio: [
    {
      id: 1,
      title: "Moran's Capital Solutions",
      client: 'Sector inmobiliario · Estructura interna, datos y captación',
      description:
        'Organizamos la estructura interna de la agencia con sistemas integrados, almacenamiento centralizado de datos de clientes y aprovechamiento de las alianzas del sector. En paralelo, desplegamos una estrategia de captación de prospectos, tanto compradores como propietarios de inmuebles, que le permitió ganar presencia en Bogotá y la Sabana en menos de un año. Moran\'s Capital Solutions pasó de operar por intuición a decidir con datos verificables, maximizando el retorno de cada peso invertido.',
      results: [
        { metric: 'Prospectos captados', value: '+45%' },
        { metric: 'Propietarios captados', value: '+30%' },
        { metric: 'Tasa de conversión de leads', value: '+28%' },
        { metric: 'Costo por prospecto calificado', value: '-22%' },
        { metric: 'Cobertura Bogotá y Sabana', value: '<12 meses' },
      ],
      image: '/fondo.png',
      testimonial: 'Trabajar con DOMAKEA transformó la manera en que tomamos decisiones. Pasamos de operar por intuición a hacerlo con datos reales. Los resultados hablan por sí solos.',
      testimonialAuthor: 'CEO & Cofounder',
    },
    {
      id: 2,
      title: 'Clínica Odontológica',
      client: 'Salud · Odontología',
      description:
        'La clínica tenía pauta activa en Meta, pero no tenía claridad de cuántos pacientes llegaban realmente por ese canal, y el proceso de contacto era manual. Digitalizamos los embudos de venta y los canales digitales, y los integramos con la operación física. El resultado fue una mayor rotación de pacientes, más fidelización y una marca fortalecida, con una conversión de consulta a paciente que antes no se podía medir.',
      results: [
        { metric: 'Rotación de pacientes', value: '+32%' },
        { metric: 'Fidelización', value: '+27%' },
        { metric: 'Visibilidad digital', value: '+65%' },
        { metric: 'Conversión de consulta a paciente', value: '+30%' },
        { metric: 'Tiempo de ejecución', value: '4 sem' },
      ],
      image: '/serv_odo.JPG',
      testimonial: 'DOMAKEA nos ayudó a integrar nuestros canales físicos y digitales de manera efectiva. Los resultados superaron nuestras expectativas.',
      testimonialAuthor: 'Director Comercial',
    },
    {
      id: 3,
      title: 'Estética y Belleza',
      client: 'Servicios personales · Fidelización y generación de demanda',
      description:
        'Estructuramos su marca personal desde el diagnóstico, identificamos el servicio de mayor rentabilidad y redefinimos toda su comunicación alrededor de ese diferenciador. Sobre esa base generamos demanda nueva, fidelizamos a las clientas actuales y optimizamos el embudo de ventas, desde la primera consulta hasta la recompra.',
      results: [
        { metric: 'Consultas calificadas', value: '+40%' },
        { metric: 'Clientas recurrentes', value: '+35%' },
        { metric: 'Conversión del embudo', value: '+25%' },
        { metric: 'Valor por cliente', value: '+18%' },
        { metric: 'Tiempo de entrega', value: '5 sem' },
      ],
      image: '/serv_est.JPG',
      testimonial: 'El equipo de DOMAKEA entendió perfectamente nuestro modelo de negocio y diseñó una estrategia que nos permitió escalar rápidamente.',
      testimonialAuthor: 'CEO & Founder',
    },
    {
      id: 4,
      title: 'Consultoría y Auditoría de Modelos de Negocio · 3 empresas',
      client: 'Multisectorial · Analítica de datos e innovación',
      description:
        'Auditamos modelos de negocio y aplicamos analítica de datos para identificar vacíos en la operación digital, directamente en el proceso de ventas. Implementamos estrategias de innovación y modernización de modelos de negocio, y además fortalecimos la inversión publicitaria corrigiendo segmentaciones incorrectas, mala asignación de presupuesto y baja optimización de métricas clave.',
      results: [
        { metric: 'Presupuesto recuperado', value: '20–35%' },
        { metric: 'Tiempo de cierre', value: '-20%' },
        { metric: 'Retorno sobre inversión', value: '+34%' },
        { metric: 'Costo por cliente', value: '-15%' },
        { metric: 'Empresas auditadas', value: '3' },
      ],
      image: '/serv_audi.png',
      testimonial: 'La optimización de nuestros procesos comerciales nos permitió cerrar más negocios en menos tiempo. Excelente trabajo.',
      testimonialAuthor: 'Gerente de Ventas',
    },
  ],
};

const isDev = import.meta.env.DEV;

export const ContentProvider = ({ children }) => {
  const [content, setContent] = useState(() => {
    if (isDev) return defaultContent;
    const saved = localStorage.getItem('domakea_content');
    return saved ? JSON.parse(saved) : defaultContent;
  });

  const [isAdmin, setIsAdmin] = useState(() => {
    return localStorage.getItem('domakea_admin') === 'true';
  });

  useEffect(() => {
    if (isDev) return;
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
