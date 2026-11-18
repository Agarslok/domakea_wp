import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, Shield, FileText, Lock, User, Mail, Phone } from 'lucide-react';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';

const Section = ({ number, title, icon: Icon, children }) => {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="border border-border/60 rounded-2xl overflow-hidden"
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-5 bg-card hover:bg-muted/40 transition-colors duration-200 text-left"
      >
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
            {Icon ? <Icon className="h-5 w-5 text-primary" /> : (
              <span className="text-primary font-bold text-sm">{number}</span>
            )}
          </div>
          <span className="font-semibold text-lg text-foreground">{title}</span>
        </div>
        {open ? <ChevronUp className="h-5 w-5 text-muted-foreground flex-shrink-0" /> : <ChevronDown className="h-5 w-5 text-muted-foreground flex-shrink-0" />}
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="px-6 py-6 border-t border-border/40 text-muted-foreground leading-relaxed space-y-4 text-[15px]">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const BulletList = ({ items }) => (
  <ul className="space-y-1">
    {items.map((item, i) => (
      <li key={i} className="flex items-start gap-2">
        <span className="text-primary mt-1.5 text-xs">●</span>
        <span>{item}</span>
      </li>
    ))}
  </ul>
);

const PoliticaPrivacidad = () => {
  return (
    <>
      <Helmet>
        <title>Política de Privacidad — DOMAKEA</title>
        <meta name="description" content="Política de Privacidad y Protección de Datos Personales de DOMAKEA, en cumplimiento de la Ley 1581 de 2012." />
      </Helmet>

      <Header />

      <main className="min-h-screen bg-background">

        {/* Hero */}
        <section className="py-20 bg-secondary text-secondary-foreground">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Shield className="h-14 w-14 text-primary mx-auto mb-6" />
              <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight" style={{ letterSpacing: '-0.02em' }}>
                Política de Privacidad
              </h1>
              <p className="text-xl text-secondary-foreground/80 max-w-2xl mx-auto leading-relaxed">
                Protección de Datos Personales — Ley 1581 de 2012
              </p>
            </motion.div>
          </div>
        </section>

        {/* Info del documento */}
        <section className="py-10 bg-muted/30 border-b border-border/40">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-sm">
              {[
                { label: 'Versión', value: '1.1' },
                { label: 'Fecha de emisión', value: 'Junio 2026' },
                { label: 'Vigencia', value: 'Indefinida, revisión anual' },
                { label: 'Autoridad de control', value: 'SIC Colombia' },
              ].map((item, i) => (
                <div key={i}>
                  <p className="text-xs uppercase tracking-wider text-muted-foreground/60 mb-1">{item.label}</p>
                  <p className="font-medium text-foreground">{item.value}</p>
                </div>
              ))}
            </div>
            <p className="text-xs text-muted-foreground/50 mt-6">
              Marco legal: Ley 1581 de 2012 · Decreto 1377 de 2013 · Ley 1266 de 2008 · Ley 1098 de 2006 · Circular SIC 002 de 2021 · Art. 15 Constitución Política de Colombia
            </p>
          </div>
        </section>

        {/* Secciones */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">

            {/* 1 */}
            <Section number="1" title="Introducción">
              <p>
                La presente Política de Privacidad y Protección de Datos Personales establece los lineamientos, principios y procedimientos mediante los cuales DOMAKEA realiza el tratamiento de los datos personales de sus titulares, en cumplimiento de la normativa vigente en Colombia.
              </p>
              <p>
                Esta política se fundamenta en el derecho constitucional consagrado en el Artículo 15 de la Constitución Política de Colombia, que establece el derecho al habeas data, y da cumplimiento estricto a la Ley Estatutaria 1581 de 2012, su decreto reglamentario 1377 de 2013, la Ley 1266 de 2008 y las instrucciones impartidas por la Superintendencia de Industria y Comercio (SIC).
              </p>
              <p>
                Como empresa especializada en consultoría de datos, reconocemos que la protección de la información personal no es solamente una obligación legal, sino un valor fundamental que sustenta la confianza de nuestros clientes, colaboradores y aliados estratégicos.
              </p>
            </Section>

            {/* 2 */}
            <Section number="2" title="Identificación del Responsable del Tratamiento">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { label: 'Razón Social', value: 'DOMAKEA' },
                  { label: 'NIT', value: '1034518036-4' },
                  { label: 'Ciudad', value: 'Bogotá, Colombia' },
                  { label: 'Correo electrónico', value: 'domakea.cons@gmail.com' },
                  { label: 'Dirección', value: 'Bogotá D.C., Colombia. Operación virtual. Las comunicaciones físicas podrán remitirse a la dirección registrada ante la Cámara de Comercio.' },
                  { label: 'Sitio web', value: 'https://domakea.netlify.app/' },
                  { label: 'Responsable designado', value: 'Juan Angel Triana - Samuel Jeronimo Ramirez' },
                ].map((item, i) => (
                  <div key={i} className="bg-muted/40 rounded-xl px-4 py-3">
                    <p className="text-xs uppercase tracking-wider text-muted-foreground/60 mb-1">{item.label}</p>
                    <p className="font-medium text-foreground text-sm">{item.value}</p>
                  </div>
                ))}
              </div>
            </Section>

            {/* 3 */}
            <Section number="3" title="Definiciones">
              <div className="space-y-4">
                {[
                  { term: 'Autorización', def: 'Consentimiento previo, expreso e informado del Titular para llevar a cabo el Tratamiento de datos personales.' },
                  { term: 'Base de Datos', def: 'Conjunto organizado de datos personales que sea objeto de Tratamiento, ya sea en formato electrónico o físico.' },
                  { term: 'Dato Personal', def: 'Cualquier información vinculada o que pueda asociarse a una o varias personas naturales determinadas o determinables.' },
                  { term: 'Dato Sensible', def: 'Aquel que afecta la intimidad del Titular o cuyo uso indebido puede generar discriminación. Son datos sensibles los que revelan origen racial o étnico, orientación política, convicciones religiosas, datos de salud, vida sexual y datos biométricos.' },
                  { term: 'Encargado del Tratamiento', def: 'Persona natural o jurídica que realice el Tratamiento de datos personales por cuenta del Responsable del Tratamiento.' },
                  { term: 'Responsable del Tratamiento', def: 'Persona natural o jurídica que decida sobre la base de datos y/o el Tratamiento de los datos.' },
                  { term: 'Titular', def: 'Persona natural cuyos datos personales sean objeto de Tratamiento.' },
                  { term: 'Tratamiento', def: 'Cualquier operación sobre datos personales, tales como recolección, almacenamiento, uso, circulación o supresión.' },
                  { term: 'Habeas Data', def: 'Derecho fundamental que tiene toda persona a conocer, actualizar y rectificar las informaciones que se hayan recogido sobre ella en bases de datos o archivos.' },
                  { term: 'Cookie', def: 'Archivo de texto que un sitio web almacena en el dispositivo del usuario con el fin de recordar preferencias, analizar el comportamiento de navegación o habilitar funcionalidades del sitio.' },
                ].map((item, i) => (
                  <div key={i} className="border-l-2 border-primary/30 pl-4">
                    <span className="font-semibold text-foreground">{item.term}: </span>
                    <span>{item.def}</span>
                  </div>
                ))}
              </div>
            </Section>

            {/* 4 */}
            <Section number="4" title="Principios Rectores del Tratamiento">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { p: 'Legalidad', d: 'El tratamiento se sujeta a las disposiciones legales vigentes aplicables.' },
                  { p: 'Finalidad', d: 'El tratamiento obedece a una finalidad legítima informada al Titular.' },
                  { p: 'Libertad', d: 'Solo podrá realizarse con el consentimiento previo, expreso e informado del Titular.' },
                  { p: 'Veracidad / Calidad', d: 'La información debe ser veraz, completa, exacta, actualizada y comprobable.' },
                  { p: 'Transparencia', d: 'El Titular tiene derecho a obtener información sobre sus datos en todo momento.' },
                  { p: 'Acceso Restringido', d: 'Solo podrá suministrarse a quienes estén autorizados según la ley.' },
                  { p: 'Seguridad', d: 'Se adoptarán medidas técnicas, administrativas y humanas para proteger los datos.' },
                  { p: 'Confidencialidad', d: 'Las personas que realicen el tratamiento deben guardar reserva de la información.' },
                ].map((item, i) => (
                  <div key={i} className="bg-muted/40 rounded-xl px-4 py-3">
                    <p className="font-semibold text-foreground text-sm mb-1">{item.p}</p>
                    <p className="text-sm">{item.d}</p>
                  </div>
                ))}
              </div>
            </Section>

            {/* 5 */}
            <Section number="5" title="Categorías de Datos Personales Tratados">
              <div className="space-y-5">
                {[
                  {
                    cat: 'Clientes y Prospectos',
                    items: [
                      'Nombre completo y datos de identificación (CC, NIT, pasaporte)',
                      'Información de contacto: correo electrónico, teléfono, dirección',
                      'Datos profesionales: cargo, empresa, sector económico',
                      'Información contractual y de facturación',
                      'Historial de servicios contratados',
                    ],
                  },
                  {
                    cat: 'Empleados y Colaboradores',
                    items: [
                      'Identificación personal y datos demográficos',
                      'Información laboral, salarial y de seguridad social',
                      'Datos bancarios para pago de nómina',
                      'Registros de desempeño y capacitación',
                    ],
                  },
                  {
                    cat: 'Proveedores y Aliados',
                    items: [
                      'Datos de identificación del proveedor (natural o jurídico)',
                      'Información bancaria para pago de servicios',
                      'Datos de contacto de representantes legales',
                    ],
                  },
                ].map((cat, i) => (
                  <div key={i}>
                    <p className="font-semibold text-foreground mb-2">{cat.cat}</p>
                    <BulletList items={cat.items} />
                  </div>
                ))}
                <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl px-4 py-3 text-sm">
                  <span className="font-semibold text-foreground">Datos Sensibles: </span>
                  La empresa podrá, de forma excepcional y con autorización explícita del Titular, tratar datos sensibles cuando sea estrictamente necesario. En ningún caso se condicionará ningún servicio a que el Titular suministre datos sensibles. El titular no está obligado a suministrar datos sensibles.
                </div>
              </div>
            </Section>

            {/* 6 — MODIFICADA */}
            <Section number="6" title="Finalidades del Tratamiento">
              <div className="space-y-6">

                {/* Clientes */}
                <div>
                  <p className="font-semibold text-foreground mb-2">Para clientes</p>
                  <BulletList items={[
                    'Prestación y gestión de los servicios de consultoría contratados.',
                    'Envío de propuestas comerciales, cotizaciones e información relevante sobre nuestros servicios.',
                    'Gestión de facturación, cobros y relaciones contractuales.',
                    'Atención de peticiones, quejas y reclamos.',
                    'Cumplimiento de obligaciones legales y regulatorias.',
                    'Seguimiento postventa y medición de satisfacción con los servicios prestados.',
                  ]} />
                </div>

                {/* Prospectos — NUEVA */}
                <div className="bg-primary/5 border border-primary/20 rounded-xl px-5 py-4 space-y-3">
                  <p className="font-semibold text-foreground">Para prospectos — contacto comercial proactivo</p>
                  <p className="text-sm">
                    DOMAKEA realiza actividades de prospección comercial activa dirigida exclusivamente a personas jurídicas (empresas) y a sus representantes legales o responsables de decisión. En el marco de esta actividad, DOMAKEA podrá recopilar y tratar datos de contacto profesional —nombre, cargo, correo electrónico corporativo y teléfono— obtenidos de las siguientes fuentes de acceso público:
                  </p>
                  <BulletList items={[
                    'Perfiles profesionales y publicaciones en LinkedIn, en los que el titular ha hecho pública su información de forma voluntaria.',
                    'Meta Ads Library, directorio público de anunciantes activos en plataformas de Meta.',
                    'Avisos de empleo publicados en plataformas como  LinkedIn Jobs u otras bolsas de trabajo, que constituyen señales comerciales de actividad empresarial.',
                    'Registros públicos de la Cámara de Comercio de Bogotá y del RUES (Registro Único Empresarial y Social).',
                    'Sitios web corporativos y directorios empresariales de acceso libre.',
                  ]} />
                  <p className="text-sm">
                    El tratamiento de estos datos tiene como única finalidad el contacto comercial inicial para presentar los servicios de DOMAKEA a la persona jurídica representada por el titular. En ningún caso se utilizarán para finalidades distintas a las aquí declaradas, ni se compartirán con terceros para fines propios de estos.
                  </p>
                  <p className="text-sm">
                    El titular de estos datos tiene derecho a oponerse al tratamiento en cualquier momento, solicitando su supresión a través de <span className="font-medium text-foreground">domakea.cons@gmail.com</span>. Una vez recibida la solicitud, DOMAKEA eliminará los datos en un plazo máximo de cinco (5) días hábiles y se abstendrá de realizar nuevos contactos.
                  </p>
                  <p className="text-sm">
                    Los datos de prospectos que no se conviertan en clientes serán conservados por un máximo de dos (2) años desde el primer contacto, o hasta que el titular solicite su supresión, lo que ocurra primero, conforme a lo establecido en la Sección 11.
                  </p>
                </div>

                {/* Empleados */}
                <div>
                  <p className="font-semibold text-foreground mb-2">Para empleados y colaboradores</p>
                  <BulletList items={[
                    'Gestión de la relación laboral y contractual.',
                    'Pago de salarios, prestaciones sociales y demás obligaciones laborales.',
                    'Afiliación a entidades de seguridad social.',
                    'Capacitación y desarrollo profesional.',
                  ]} />
                </div>

                {/* Proveedores */}
                <div>
                  <p className="font-semibold text-foreground mb-2">Para proveedores y aliados estratégicos</p>
                  <BulletList items={[
                    'Gestión de contratos y pagos de servicios.',
                    'Evaluación y calificación de proveedores y aliados.',
                    'Coordinación operativa de proyectos en modalidad de co-ejecución, White Label o referidos.',
                    'Cumplimiento de obligaciones legales y tributarias.',
                  ]} />
                </div>

              </div>
            </Section>

            {/* 7 */}
            <Section number="7" title="Derechos de los Titulares">
              <p className="mb-4">De conformidad con el Artículo 8 de la Ley 1581 de 2012, el Titular de los datos personales tiene los siguientes derechos:</p>
              <div className="space-y-3">
                {[
                  { derecho: 'Conocer, actualizar y rectificar sus datos personales', detalle: 'Solicitar corrección de información inexacta, incompleta, fraccionada o que induzca a error.' },
                  { derecho: 'Solicitar prueba de la autorización otorgada', detalle: 'Salvo que sea uno de los casos exceptuados por ley.' },
                  { derecho: 'Ser informado sobre el uso de sus datos', detalle: 'A petición, sobre el uso que se ha dado a sus datos personales.' },
                  { derecho: 'Presentar quejas ante la SIC', detalle: 'Cuando considere que se han vulnerado sus derechos como Titular.' },
                  { derecho: 'Revocar la autorización y/o solicitar la supresión', detalle: 'Cuando el tratamiento no respete los principios, derechos y garantías constitucionales y legales.' },
                  { derecho: 'Acceder gratuitamente a sus datos personales', detalle: 'Al menos una vez al mes y cada vez que existan modificaciones sustanciales.' },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3 bg-muted/30 rounded-xl px-4 py-3">
                    <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-foreground text-sm">{item.derecho}</p>
                      <p className="text-sm mt-0.5">{item.detalle}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Section>

            {/* 8 */}
            <Section number="8" title="Autorización para el Tratamiento">
              <p>La recolección de datos personales se realizará previa autorización libre, previa, expresa e informada del Titular. Dicha autorización podrá obtenerse mediante:</p>
              <BulletList items={[
                'Documento físico firmado por el Titular.',
                'Mecanismos electrónicos (correo electrónico, formularios en línea con casilla de aceptación, firma digital).',
                'Grabación de voz en procesos telefónicos, cuando aplique.',
                'Conductas inequívocas del Titular que permitan concluir razonablemente su autorización.',
              ]} />
              <div className="mt-4 bg-muted/40 rounded-xl px-4 py-3">
                <p className="font-semibold text-foreground text-sm mb-2">Casos en que no se requiere autorización previa</p>
                <BulletList items={[
                  'La información sea requerida por una entidad pública o administrativa en ejercicio de sus funciones.',
                  'Se trate de datos de naturaleza pública.',
                  'Sea necesario para salvaguardar el interés vital del Titular.',
                  'El tratamiento sea autorizado por ley para fines históricos, estadísticos o científicos.',
                ]} />
              </div>
            </Section>

            {/* 9 */}
            <Section number="9" title="Transferencia Internacional de Datos">
              <p>
                La empresa podrá transferir datos personales a terceros países únicamente cuando dicho país cuente con niveles adecuados de protección de datos, según los estándares fijados por la Superintendencia de Industria y Comercio (SIC), o cuando se cuente con la autorización expresa del Titular.
              </p>
              <p>
                Para la transmisión de datos a Encargados del Tratamiento fuera del territorio colombiano, se suscribirá el contrato de transmisión de datos previsto en el Artículo 25 del Decreto 1377 de 2013.
              </p>
              <div className="bg-muted/40 rounded-xl px-4 py-3 text-sm">
                <p className="font-semibold text-foreground mb-1">Herramientas con servidores fuera de Colombia</p>
                <p>El uso de herramientas como Google Analytics o Meta Pixel implica la transferencia de datos de navegación a servidores ubicados fuera del territorio colombiano. Dicha transferencia queda sujeta a lo dispuesto en esta sección y en la Sección 17 sobre cookies.</p>
              </div>
              <div className="bg-muted/40 rounded-xl px-4 py-3 text-sm mt-3">
                <p className="font-semibold text-foreground mb-2">Plataformas CRM y herramientas de gestión</p>
                <p className="mb-3">
                  DOMAKEA podrá almacenar y gestionar información de clientes y prospectos mediante plataformas CRM y herramientas de productividad contratadas por la compañía. Dichas plataformas actuarán como Encargados del Tratamiento conforme al Artículo 25 del Decreto 1377 de 2013, y solo podrán tratar los datos según las instrucciones de DOMAKEA y para las finalidades declaradas en la Sección 6 de esta política. Entre las plataformas que pueden ser utilizadas se encuentran:
                </p>
                <ul className="space-y-1">
                  {[
                    'HubSpot — CRM y automatización de marketing (servidores en EE.UU.)',
                    'GoHighLevel — CRM y gestión de embudos de venta (servidores en EE.UU.)',
                    'Zoho CRM — Gestión de relaciones con clientes (servidores en EE.UU. / India)',
                    'Notion — Gestión de proyectos y documentación interna (servidores en EE.UU.)',
                    'Airtable — Bases de datos y gestión operativa (servidores en EE.UU.)',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-primary mt-1.5 text-xs">●</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-3">
                  El Titular autoriza expresamente esta transmisión al aceptar la política de privacidad o al diligenciar cualquier formulario del sitio web de DOMAKEA. En todo caso, DOMAKEA verificará que dichas plataformas cuenten con políticas de protección de datos compatibles con los estándares exigidos por la SIC.
                </p>
              </div>
            </Section>

            {/* 10 */}
            <Section number="10" title="Medidas de Seguridad de la Información">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <p className="font-semibold text-foreground mb-3">Medidas Técnicas</p>
                  <BulletList items={[
                    'Cifrado de datos en reposo y en tránsito.',
                    'Control de acceso basado en roles y privilegios mínimos.',
                    'Monitoreo continuo y registro de accesos a bases de datos.',
                    'Copias de seguridad periódicas con pruebas de restauración.',
                    'Actualización periódica de sistemas y parches de seguridad.',
                  ]} />
                </div>
                <div>
                  <p className="font-semibold text-foreground mb-3">Medidas Administrativas</p>
                  <BulletList items={[
                    'Capacitación obligatoria al personal en protección de datos.',
                    'Cláusulas de confidencialidad en contratos de trabajo y con terceros.',
                    'Designación de un Responsable de Protección de Datos Personales.',
                    'Procedimientos documentados para gestión de incidentes.',
                    'Auditorías internas periódicas sobre el tratamiento de datos.',
                  ]} />
                </div>
              </div>
            </Section>

            {/* 11 */}
            <Section number="11" title="Conservación y Supresión de Datos">
              <p className="mb-4">Los datos personales se conservarán durante el tiempo razonable y necesario para cumplir con las finalidades que justificaron su tratamiento.</p>
              <div className="space-y-2">
                {[
                  { tipo: 'Datos contractuales de clientes', plazo: '10 años tras fin del contrato', base: 'Código de Comercio' },
                  { tipo: 'Datos laborales', plazo: '20 años tras terminación laboral', base: 'Código Sustantivo del Trabajo' },
                  { tipo: 'Datos tributarios / contables', plazo: '10 años', base: 'Estatuto Tributario' },
                  { tipo: 'Datos de prospectos (sin contrato)', plazo: '2 años o hasta revocación', base: 'Ley 1581 de 2012' },
                ].map((item, i) => (
                  <div key={i} className="grid grid-cols-1 sm:grid-cols-3 gap-2 bg-muted/40 rounded-xl px-4 py-3 text-sm">
                    <p className="font-medium text-foreground">{item.tipo}</p>
                    <p className="text-primary font-medium">{item.plazo}</p>
                    <p className="text-muted-foreground">{item.base}</p>
                  </div>
                ))}
              </div>
            </Section>

            {/* 12 */}
            <Section number="12" title="Procedimiento para el Ejercicio de Derechos">
              <p className="mb-4">El Titular o sus causahabientes podrán ejercer sus derechos mediante solicitud escrita a través del correo electrónico:</p>
              <div className="flex flex-col gap-2 mb-5">
                <div className="flex items-center gap-3 bg-muted/40 rounded-xl px-4 py-3 text-sm">
                  <span className="text-muted-foreground w-36 flex-shrink-0">Correo electrónico</span>
                  <a href="mailto:domakea.cons@gmail.com" className="font-medium text-primary hover:underline">
                    domakea.cons@gmail.com
                  </a>
                </div>
              </div>
              <div className="space-y-4">
                {[
                  { titulo: 'Consultas', texto: 'La empresa dará respuesta en un término máximo de diez (10) días hábiles desde la fecha de recibo. Si no es posible, se informará al interesado con un plazo máximo adicional de cinco (5) días hábiles.' },
                  { titulo: 'Reclamos', texto: 'La empresa tendrá un término de quince (15) días hábiles para dar respuesta. Si el reclamo resulta incompleto, se requerirá al interesado dentro de los cinco (5) días siguientes a la recepción.' },
                  { titulo: 'Recurso ante la SIC', texto: 'Si el Titular no queda satisfecho con la respuesta de la empresa, podrá presentar queja ante la Superintendencia de Industria y Comercio, una vez agotado el trámite de consulta o reclamo.' },
                ].map((item, i) => (
                  <div key={i} className="border-l-2 border-primary/40 pl-4">
                    <p className="font-semibold text-foreground mb-1">{item.titulo}</p>
                    <p className="text-sm">{item.texto}</p>
                  </div>
                ))}
              </div>
            </Section>

            {/* 13 */}
            <Section number="13" title="Vigencia y Modificaciones">
              <p>
                La presente Política entra en vigencia a partir de su publicación y será revisada anualmente o cuando se produzcan cambios normativos relevantes. Cualquier modificación sustancial será comunicada a los Titulares a través del sitio web de la empresa y/o por correo electrónico, con al menos quince (15) días de anticipación a su entrada en vigor.
              </p>
              <p className="mt-3">
                La versión actualizada de esta Política estará siempre disponible en:{' '}
                <span className="text-primary font-medium">https://domakea.netlify.app/politica-privacidad</span>
              </p>
            </Section>

            {/* 14 */}
            <Section number="14" title="Contacto y Responsable de Protección de Datos">
              <p className="mb-4">Para cualquier inquietud, solicitud o ejercicio de derechos relacionados con el tratamiento de sus datos personales:</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { label: 'Responsable designado', value: 'Juan Angel Triana - Samuel Jeronimo Ramirez' },
                  { label: 'Correo electrónico', value: 'domakea.cons@gmail.com' },
                  { label: 'Teléfono', value: '+57 301 854 7895' },
                  { label: 'Horario de atención', value: 'Lunes a Viernes: 9:00 AM - 6:00 PM' },
                  { label: 'SIC (autoridad de control)', value: 'www.sic.gov.co · Tel: 601 592 1000' },
                ].map((item, i) => (
                  <div key={i} className="bg-muted/40 rounded-xl px-4 py-3">
                    <p className="text-xs uppercase tracking-wider text-muted-foreground/60 mb-1">{item.label}</p>
                    <p className="font-medium text-foreground text-sm">{item.value}</p>
                  </div>
                ))}
              </div>
            </Section>

            {/* 15 — NUEVA: Menores de edad */}
            <Section number="15" title="Tratamiento de Datos de Menores de Edad">
              <p>
                Los servicios de DOMAKEA están dirigidos exclusivamente a personas naturales mayores de 18 años y a representantes legales de personas jurídicas. DOMAKEA no recopila ni trata de forma intencional datos personales de niños, niñas o adolescentes.
              </p>
              <p>
                En el evento en que, de forma no intencional, se reciban datos de un menor de edad, DOMAKEA procederá a eliminarlos de manera inmediata una vez tenga conocimiento de ello, sin conservar copia alguna.
              </p>
              <p>
                Si un padre, madre o tutor legal considera que su hijo o representado ha proporcionado información personal a DOMAKEA, puede solicitar su supresión inmediata escribiendo a{' '}
                <span className="font-medium text-foreground">domakea.cons@gmail.com</span>. La solicitud será atendida en un plazo máximo de cinco (5) días hábiles.
              </p>
              <div className="bg-muted/40 rounded-xl px-4 py-3 text-sm">
                <p className="font-semibold text-foreground mb-1">Casos excepcionales</p>
                <p>
                  En los casos excepcionales en que el tratamiento de datos de un menor sea estrictamente necesario —por ejemplo, en el contexto de una relación contractual con una empresa cuyos representantes sean menores emancipados— dicho tratamiento se realizará únicamente con autorización expresa de sus representantes legales, respetando el interés superior del menor conforme al Código de la Infancia y la Adolescencia (Ley 1098 de 2006) y la Ley 1581 de 2012.
                </p>
              </div>
            </Section>

            {/* 16 — NUEVA: Deberes del responsable */}
            <Section number="16" title="Deberes del Responsable del Tratamiento">
              <p className="mb-4">
                En cumplimiento del Artículo 17 de la Ley 1581 de 2012, DOMAKEA asume los siguientes deberes frente al tratamiento de datos personales:
              </p>
              <div className="space-y-3">
                {[
                  {
                    titulo: 'Garantizar el ejercicio del Habeas Data',
                    detalle: 'Habilitamos canales permanentes para que los titulares puedan conocer, actualizar, rectificar y suprimir sus datos, conforme al procedimiento descrito en la Sección 12 de esta política.',
                  },
                  {
                    titulo: 'Conservar la información en condiciones de seguridad',
                    detalle: 'Aplicamos las medidas técnicas y administrativas descritas en la Sección 10, incluyendo cifrado, control de acceso por roles y copias de seguridad periódicas.',
                  },
                  {
                    titulo: 'Mantener la información exacta y actualizada',
                    detalle: 'Actualizamos los datos personales cuando el titular lo solicita o cuando detectamos que la información es incompleta o inexacta, dentro de los plazos legales.',
                  },
                  {
                    titulo: 'Tramitar consultas y reclamos oportunamente',
                    detalle: 'Respondemos consultas en máximo 10 días hábiles y reclamos en máximo 15 días hábiles, según lo establecido en la Sección 12.',
                  },
                  {
                    titulo: 'Informar incidentes de seguridad',
                    detalle: 'En caso de vulneración a los sistemas que comprometa datos personales, DOMAKEA notificará a los titulares afectados y a la Superintendencia de Industria y Comercio en los términos y plazos establecidos por la normativa vigente, en particular la Circular Externa 002 de 2021 de la SIC.',
                  },
                  {
                    titulo: 'Abstenerse de circular información no autorizada',
                    detalle: 'Solo compartiremos datos personales con terceros cuando exista autorización del titular, obligación legal, o contrato de transmisión suscrito conforme al Decreto 1377 de 2013.',
                  },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3 bg-muted/30 rounded-xl px-4 py-3">
                    <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-foreground text-sm">{item.titulo}</p>
                      <p className="text-sm mt-0.5">{item.detalle}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Section>

            {/* 17 — NUEVA: Cookies */}
            <Section number="17" title="Uso de Cookies y Tecnologías de Seguimiento">
              <p>
                El sitio web de DOMAKEA (<span className="font-medium text-foreground">domakea.netlify.app</span>) puede utilizar cookies propias y de terceros. A continuación se describen los tipos de cookies utilizadas y su finalidad:
              </p>
              <div className="space-y-3 mt-3">
                {[
                  {
                    tipo: 'Cookies estrictamente necesarias',
                    detalle: 'Permiten el funcionamiento básico del sitio, incluyendo la navegación y el envío de formularios. No requieren consentimiento previo del usuario.',
                    badgeColor: 'bg-green-500/10 text-green-700 dark:text-green-400',
                  },
                  {
                    tipo: 'Cookies analíticas',
                    detalle: 'Recopilan información agregada sobre el comportamiento de los visitantes para mejorar el rendimiento del sitio. Pueden incluir herramientas como Google Analytics, cuyos servidores están ubicados fuera de Colombia. Su uso está condicionado a la aceptación del usuario.',
                    badgeColor: 'bg-amber-500/10 text-amber-700 dark:text-amber-400',
                  },
                  {
                    tipo: 'Cookies de marketing y seguimiento',
                    detalle: 'Permiten identificar comportamientos de navegación con fines publicitarios. Pueden incluir herramientas como Meta Pixel. Su uso está condicionado a la aceptación expresa del usuario.',
                    badgeColor: 'bg-red-500/10 text-red-700 dark:text-red-400',
                  },
                ].map((item, i) => (
                  <div key={i} className="bg-muted/30 rounded-xl px-4 py-3">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <p className="font-semibold text-foreground text-sm">{item.tipo}</p>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${item.badgeColor}`}>{item.badge}</span>
                    </div>
                    <p className="text-sm">{item.detalle}</p>
                  </div>
                ))}
              </div>
              <p className="text-sm mt-4">
                El usuario puede configurar su navegador para rechazar cookies o ser notificado cuando se instalen. Sin embargo, la desactivación de algunas cookies puede afectar la funcionalidad del sitio.
              </p>
              <p className="text-sm mt-2">
                Para las herramientas que implican transferencia de datos a servidores ubicados fuera de Colombia, aplica lo dispuesto en la Sección 9 de esta política sobre Transferencia Internacional de Datos.
              </p>
            </Section>

          </div>
        </section>

        {/* Footer legal */}
        <section className="py-10 bg-muted/20 border-t border-border/40">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-xs text-muted-foreground/60">
              Ley 1581 de 2012 · Versión 1.1 · Junio 2026 · DOMAKEA
            </p>
          </div>
        </section>

      </main>

      <Footer />
    </>
  );
};

export default PoliticaPrivacidad;
