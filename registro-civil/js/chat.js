document.addEventListener("DOMContentLoaded", function () {
  // ========== ELEMENTOS DEL DOM ==========
  const icon = document.getElementById("chatbot-icon");
  const chatWindow = document.getElementById("chatbot-window");
  const closeButton = document.getElementById("close-chatbot");
  const messagesContainer = document.getElementById("chatbot-messages");
  const userInput = document.getElementById("user-input");
  const sendButton = document.getElementById("send-button");

  // ========== CONFIGURACIÓN INICIAL ==========
  let firstOpen = true;

  // ========== FUNCIONALIDAD DE VENTANA ==========
  icon.addEventListener("click", function () {
    chatWindow.classList.toggle("visible");
    if (chatWindow.classList.contains("visible")) {
      setTimeout(() => userInput.focus(), 100);
    }
  });

  closeButton.addEventListener("click", function () {
    chatWindow.classList.remove("visible");
  });

  // ========== BASE DE DATOS DE RESPUESTAS ==========
  const botResponses = [
    // Saludos
    {
      patterns: [
        /hola/,
        /buenos\s*d[ií]as/,
        /buenas\s*tardes/,
        /buenas\s*noches/,
        /saludos/,
      ],
      response:
        "¡Hola! 👋 Soy el asistente del Sistema de Registro Civil Municipal. ¿En qué puedo ayudarte hoy?\n\n• Solicitar partidas y certificados\n• Requisitos para trámites\n• Horarios de atención\n• Costos de trámites\n• Información sobre actas",
    },
    // Despedidas
    {
      patterns: [/adios/, /chao/, /hasta\s*luego/, /nos\s*vemos/, /gracias/],
      response:
        "¡Hasta luego! 👋 Recuerda que estoy aquí para ayudarte con trámites del Registro Civil.",
    },
    // WhatsApp
    {
      patterns: [
        /whatsapp/,
        /numero\s*de\s*telefono/,
        /telefono/,
        /celular/,
        /contacto\s*directo/,
        /hablar\s*con\s*alguien/,
        /asesor/,
        /ejecutivo/,
      ],
      response: "📱 ¡Te redirigiré a WhatsApp!",
      action: "whatsapp",
    },
    // Información general del registro civil
    {
      patterns: [
        /que\s*es.*registro\s*civil/,
        /en\s*que\s*consiste/,
        /informacion.*registro/,
        /hablame.*registro/,
      ],
      response:
        "📋 **Registro Civil Municipal**\n\n🔵 _Funciones_: \n• Inscripción de nacimientos\n• Inscripción de defunciones\n• Inscripción de matrimonios\n• Emisión de partidas y certificados\n\n🟢 **Servicios**:\n✓ Partidas de nacimiento\n✓ Certificado de soltería\n✓ Acta de matrimonio\n✓ Constancia de defunción\n\n💡 _Atención_: Lunes a viernes 8:00 am - 4:00 pm",
    },
    // Partidas de nacimiento
    {
      patterns: [
        /partida\s*de\s*nacimiento/,
        /certificado\s*de\s*nacimiento/,
        /acta\s*de\s*nacimiento/,
        /nacimiento/,
      ],
      response:
        "👶 **Partida de Nacimiento**\n\n🔵 _Requisitos_: \n1. DNI del solicitante\n2. Datos completos del registrado\n3. Lugar y fecha de nacimiento\n4. Nombres de los padres\n\n🟢 **Costos**:\n✓ Primera copia: S/ 10.00\n✓ Copias adicionales: S/ 5.00\n✓ Certificado digital: S/ 8.00\n\n💡 _Tiempo_: Entrega inmediata",
    },
    // Matrimonio civil
    {
      patterns: [
        /matrimonio/,
        /casamiento/,
        /boda\s*civil/,
        /acta\s*de\s*matrimonio/,
      ],
      response:
        "💍 **Matrimonio Civil**\n\n🔵 _Requisitos_: \n1. DNI original de ambos contrayentes\n2. Partidas de nacimiento\n3. Declaración jurada de soltería\n4. Dos testigos con DNI\n\n🟢 **Costos**:\n✓ Inscripción: S/ 50.00\n✓ Acta de matrimonio: S/ 15.00\n\n💡 _Plazo_: 15 días para programación",
    },
    // Defunciones
    {
      patterns: [
        /defuncion/,
        /acta\s*de\s*defuncion/,
        /certificado\s*de\s*defuncion/,
        /fallecimiento/,
      ],
      response:
        "⚰️ **Inscripción de Defunción**\n\n🔵 _Requisitos_: \n1. DNI del declarante\n2. Certificado médico de defunción\n3. DNI del fallecido\n4. Lugar y fecha del deceso\n\n🟢 **Costos**:\n✓ Inscripción: S/ 20.00\n✓ Partida de defunción: S/ 10.00\n\n💡 _Plazo_: 48 horas para inscripción",
    },
    // Certificado de soltería
    {
      patterns: [
        /solter[ií]a/,
        /certificado\s*de\s*solteria/,
        /estado\s*civil/,
        /soltero/,
      ],
      response:
        "📄 **Certificado de Soltería**\n\n🔵 _Requisitos_: \n1. DNI original del solicitante\n2. Partida de nacimiento\n3. Declaración jurada\n\n🟢 **Costos**:\n✓ Certificado físico: S/ 15.00\n✓ Certificado digital: S/ 12.00\n\n💡 _Validez_: 30 días calendario",
    },
    // Horarios de atención
    {
      patterns: [
        /horarios?/,
        /atencion/,
        /a\s*que\s*hora/,
        /cu[aá]ndo\s*atienden/,
        /horario\s*de\s*atencion/,
      ],
      response:
        "⏰ **Horarios de Atención**\n\n🔵 _Atención al público_: \n• Lunes a viernes: 8:00 am - 4:00 pm\n• Sábados: 9:00 am - 12:00 pm\n• Domingos: Cerrado\n\n🟢 _Horario continuo_:\n✓ Sin cerrar al medio día\n✓ Atención por orden de llegada\n\n💡 _Feriados_: Consultar horario especial",
    },
    // Costos y tarifas
    {
      patterns: [
        /costos?/,
        /precios?/,
        /tarifas?/,
        /cuanto\s*cuesta/,
        /pagos?/,
      ],
      response:
        "💰 **Tarifas del Registro Civil**\n\n🔵 _Documentos principales_: \n• Partida de nacimiento: S/ 10.00\n• Acta de matrimonio: S/ 15.00\n• Certificado de soltería: S/ 15.00\n• Inscripción de defunción: S/ 20.00\n\n🟢 _Servicios adicionales_: \n✓ Copias adicionales: S/ 5.00\n✓ Certificados digitales: S/ 8.00\n✓ Búsqueda especial: S/ 25.00\n\n💡 _Medios de pago_: Efectivo y transferencia",
    },
    // Requisitos generales
    {
      patterns: [
        /requisitos?/,
        /que\s*necesito/,
        /documentos?/,
        /que\s*debo\s*llevar/,
      ],
      response:
        "📋 **Requisitos Generales**\n\n🔵 _Documentos básicos_: \n1. DNI original y copia\n2. Partida de nacimiento (según trámite)\n3. Recibo de luz/agua (para domicilio)\n\n🟢 _Recomendaciones_: \n✓ Llegar temprano\n✓ Verificar requisitos específicos\n✓ Traer documentos originales\n\n💡 _Importante_: Algunos trámites requieren cita previa",
    },
    // Tiempos de entrega
    {
      patterns: [
        /tiempo\s*de\s*entrega/,
        /cuanto\s*demora/,
        /cuando\s*estara/,
        /plazo\s*de\s*entrega/,
      ],
      response:
        "⏱️ **Tiempos de Procesamiento**\n\n🔵 _Inmediatos_: \n• Partidas de nacimiento\n• Certificados de soltería\n• Copias de actas\n\n🟢 _Con plazo_: \n✓ Inscripción de matrimonio: 15 días\n✓ Rectificación de actas: 5 días\n✓ Duplicados especiales: 3 días\n\n💡 _Digital_: Certificados digitales en 24 horas",
    },
    // Certificados digitales
    {
      patterns: [
        /digital/,
        /online/,
        /internet/,
        /certificado\s*digital/,
        /virtual/,
      ],
      response:
        "💻 **Certificados Digitales**\n\n🔵 _Ventajas_: \n• Validez legal\n• Envío por correo electrónico\n• Disponibilidad 24/7\n• Firma digital incluida\n\n🟢 _Proceso_: \n✓ Solicitud en ventanilla\n✓ Pago correspondiente\n✓ Recepción en 24 horas\n\n💡 _Costo_: S/ 8.00 por certificado",
    },
    // Rectificación de actas
    {
      patterns: [
        /rectificacion/,
        /corregir/,
        /error\s*en\s*acta/,
        /modificar\s*acta/,
      ],
      response:
        "✏️ **Rectificación de Actas**\n\n🔵 _Causas comunes_: \n• Error en nombres\n• Fecha incorrecta\n• Dato de padres errado\n• Lugar equivocado\n\n🟢 _Proceso_: \n✓ Solicitud formal\n✓ Documentación probatoria\n✓ Resolución municipal\n\n💡 _Plazo_: 5 a 10 días hábiles",
    },
    // Búsqueda de actas
    {
      patterns: [
        /buscar\s*acta/,
        /encontrar\s*partida/,
        /localizar\s*certificado/,
        /consulta\s*de\s*actas/,
      ],
      response:
        "🔍 **Búsqueda de Actas**\n\n🔵 _Tipos de búsqueda_: \n• Por nombres completos\n• Por fecha de registro\n• Por libro y folio\n• Búsqueda especial\n\n🟢 _Requisitos_: \n✓ Datos precisos del registrado\n✓ Pago de tarifa de búsqueda\n✓ DNI del solicitante\n\n💡 _Costo_: Búsqueda especial S/ 25.00",
    },
    // Respuesta por defecto
    {
      patterns: [/.*/],
      response:
        "No estoy seguro de entender. Prueba con alguna de estas opciones:\n\n• 'Partida de nacimiento'\n• 'Matrimonio civil'\n• 'Certificado de soltería'\n• 'Horarios de atención'\n• 'Costos de trámites'\n• 'WhatsApp'",
    },
  ];

  // ========== FUNCIONES PRINCIPALES ==========

  /**
   * Redirige a WhatsApp con un mensaje predeterminado
   */
  function redirectToWhatsApp() {
    const phoneNumber = "51996909051";
    const message = "Hola, me comunico desde el chatbot del Registro Civil";
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappURL, "_blank");
  }

  /**
   * Añade un mensaje al contenedor de mensajes
   * @param {string} text - Texto del mensaje
   * @param {boolean} isUser - Si es mensaje del usuario
   */
  function addMessage(text, isUser) {
    const messageDiv = document.createElement("div");
    messageDiv.classList.add("message");
    messageDiv.classList.add(isUser ? "user-message" : "bot-message");
    messageDiv.classList.add("formatted-message"); // Aplica el formato CSS
    messageDiv.textContent = text;

    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

  /**
   * Obtiene la respuesta del bot basada en el texto del usuario
   * @param {string} userText - Texto ingresado por el usuario
   * @returns {Object} Objeto con respuesta y acción
   */
  function getBotResponse(userText) {
    const cleanText = userText.toLowerCase().replace(/[^\w\sáéíóúñ]/gi, "");

    for (const item of botResponses) {
      for (const pattern of item.patterns) {
        if (pattern.test(cleanText)) {
          return {
            response: item.response,
            action: item.action,
          };
        }
      }
    }

    return {
      response: "No estoy seguro de entender. ¿Podrías reformular tu pregunta?",
      action: null,
    };
  }

  /**
   * Maneja el envío de mensajes del usuario
   */
  function handleSendMessage() {
    const userText = userInput.value.trim();
    if (!userText) return;

    // Añadir mensaje del usuario
    addMessage(userText, true);
    userInput.value = "";

    // Mostrar indicador de escritura
    showTypingIndicator();

    // Procesar respuesta después de un delay
    setTimeout(() => {
      removeTypingIndicator();
      processBotResponse(userText);
    }, 1000);
  }

  /**
   * Muestra el indicador de que el bot está escribiendo
   */
  function showTypingIndicator() {
    const typingIndicator = document.createElement("div");
    typingIndicator.classList.add("message", "bot-message");
    typingIndicator.id = "typing-indicator";
    typingIndicator.textContent = "Escribiendo...";
    messagesContainer.appendChild(typingIndicator);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

  /**
   * Elimina el indicador de escritura
   */
  function removeTypingIndicator() {
    const indicator = document.getElementById("typing-indicator");
    if (indicator) {
      indicator.remove();
    }
  }

  /**
   * Procesa la respuesta del bot y ejecuta acciones si es necesario
   * @param {string} userText - Texto del usuario
   */
  function processBotResponse(userText) {
    const botResponse = getBotResponse(userText);
    addMessage(botResponse.response, false);

    // Ejecutar acción si existe
    if (botResponse.action === "whatsapp") {
      setTimeout(() => {
        redirectToWhatsApp();
      }, 1000);
    }
  }

  // ========== EVENT LISTENERS ==========

  // Envío de mensajes
  sendButton.addEventListener("click", handleSendMessage);

  userInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  });

  // Mensaje inicial
  icon.addEventListener("click", () => {
    if (firstOpen && chatWindow.classList.contains("visible")) {
      setTimeout(() => {
        addMessage(
          "¡Hola! 👋 Soy tu asistente del Sistema de Registro Civil Municipal. Puedes preguntarme sobre partidas de nacimiento, matrimonio civil, certificados de soltería, horarios de atención, costos de trámites o contactarnos por WhatsApp.",
          false
        );
      }, 300);
      firstOpen = false;
    }
  });

  // Enfocar input al hacer clic en el chat
  chatWindow.addEventListener("click", (e) => {
    if (
      e.target.closest("#chatbot-header") ||
      e.target.closest("#chatbot-messages")
    ) {
      userInput.focus();
    }
  });
});
