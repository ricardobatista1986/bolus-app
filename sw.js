self.addEventListener('push', function(event) {
  if (event.data) {
    const data = event.data.json();
    
    // Configurações de como o alerta vai aparecer e vibrar
    const options = {
      body: data.body,
      icon: 'https://cdn-icons-png.flaticon.com/512/883/883407.png', // Ícone genérico de saúde
      badge: 'https://cdn-icons-png.flaticon.com/512/883/883407.png',
      vibrate: [300, 100, 300, 100, 300], // Vibração padrão de alerta SOS
      requireInteraction: true, // Mantém a notificação na tela até você clicar
      data: {
        dateOfArrival: Date.now()
      }
    };

    event.waitUntil(
      self.registration.showNotification(data.title, options)
    );
  }
});

self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  // Quando você clicar na notificação, ele abre o app
  event.waitUntil(
    clients.openWindow('/')
  );
});
