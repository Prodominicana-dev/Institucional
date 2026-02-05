# Carrusel de Testimonios - Documentación

## Descripción
Sistema de carrusel de testimonios implementado para mostrar feedbacks positivos aprobados por administradores en las páginas de Inversión y Exportación.

## Componentes Creados

### 1. **TestimonialsCarousel** (`src/components/services/TestimonialsCarousel.tsx`)
Componente de carrusel con las siguientes características:
- **Auto-play**: Rotación automática cada 5 segundos
- **Responsive**: Adaptado para móvil y escritorio
- **Navegación**: Botones previo/siguiente y pausado al interactuar
- **Diseño elegante**: Cards con sombras, estrellas de calificación y decoración de comillas
- **Filtrado por tipo**: Muestra solo testimonios del tipo de servicio correspondiente

#### Props:
```typescript
interface TestimonialsCarouselProps {
  serviceType: "investment" | "export"; // Tipo de servicio para filtrar testimonios
  locale: string; // Idioma (es/en)
}
```

#### Características visuales:
- ⭐ Sistema de calificación con estrellas (1-5)
- 💬 Decoración de comillas en el fondo
- 🎨 Gradiente de fondo (gris claro a blanco)
- 🔄 Animación suave entre slides
- 👤 Información del autor (nombre, email)
- 🏷️ Etiqueta del tipo de servicio

## API y Servicios

### 2. **Hook `usePublicFeedbacks`** (en `src/services/feedback/service.ts`)
Nuevo hook para obtener feedbacks públicos aprobados:

```typescript
export function usePublicFeedbacks(serviceType?: "investment" | "export") {
  // Endpoint: GET /feedback/public?serviceType={type}
  // Retorna solo feedbacks con:
  // - status: "approved"
  // - isPublic: true
  // - serviceType coincidente (opcional)
}
```

## Integración en Páginas

### Página de Inversión (`/servicios/inversion`)
```tsx
<TestimonialsCarousel serviceType="investment" locale={params.locale} />
```

### Página de Exportación (`/servicios/exportacion`)
```tsx
<TestimonialsCarousel serviceType="export" locale={params.locale} />
```

## Ubicación Visual
El carrusel se muestra:
1. **Después** de la lista de servicios (cards)
2. **Antes** del botón de "Cuéntanos tu experiencia"

```
┌─────────────────────────────────┐
│  Lista de Servicios (Cards)     │
└─────────────────────────────────┘
         ↓
┌─────────────────────────────────┐
│  CARRUSEL DE TESTIMONIOS        │  ← NUEVO
└─────────────────────────────────┘
         ↓
┌─────────────────────────────────┐
│  Botón "Cuéntanos tu experiencia"│
└─────────────────────────────────┘
```

## Flujo de Datos

1. **Usuario envía feedback** → Formulario de feedback
2. **Backend guarda feedback** → Estado: "pending", isPublic: false
3. **Admin revisa feedback** → Panel de administración
4. **Admin aprueba feedback** → Estado cambia a "approved", isPublic: true
5. **Feedback aparece en carrusel** → usePublicFeedbacks lo obtiene
6. **Se muestra en página correspondiente** → Según serviceType

## Requisitos del Backend

El endpoint `/feedback/public` debe:
- Filtrar por `status === "approved"`
- Filtrar por `isPublic === true`
- Aceptar query param `serviceType` (opcional)
- Retornar array de objetos Feedback

Ejemplo de respuesta:
```json
[
  {
    "id": "1",
    "name": "Juan Pérez",
    "email": "juan@example.com",
    "message": "Excelente servicio de inversión...",
    "rating": 5,
    "status": "approved",
    "isPublic": true,
    "serviceType": "investment",
    "createdAt": "2025-12-20T10:00:00Z"
  }
]
```

## Dependencias
- ✅ `embla-carousel-react`: Ya instalado (v8.6.0)
- ✅ `embla-carousel-autoplay`: Ya instalado (v8.6.0)
- ✅ `lucide-react`: Para iconos (Quote, Star)
- ✅ `@radix-ui/react-dialog`: Para componentes UI

## Estados del Componente

### Loading
Muestra un skeleton animado mientras carga los datos

### Sin datos
No muestra nada (return null) si no hay testimonios aprobados

### Con datos
Muestra el carrusel con:
- Título según tipo de servicio e idioma
- Cards con testimonios
- Controles de navegación (si hay más de 1)
- Indicadores de posición (puntos)

## Personalización

### Colores principales:
- Rojo principal: `bg-red-700`, `text-red-600`
- Estrellas: `fill-yellow-400`, `text-yellow-400`
- Fondo: `bg-gradient-to-b from-gray-50 to-white`
- Cards: `bg-white` con sombras

### Tiempo de autoplay:
Para cambiar el tiempo de rotación, modificar en el componente:
```tsx
Autoplay({ delay: 5000 }) // 5 segundos por defecto
```

## Testing

Para probar el carrusel:
1. Crear feedbacks desde el formulario público
2. Aprobarlos desde el panel de administración
3. Marcarlos como públicos (isPublic: true)
4. Verificar que aparecen en la página correspondiente
5. Probar la navegación manual y automática

## Textos Multiidioma

**Español:**
- Inversión: "Lo que dicen nuestros inversionistas"
- Exportación: "Lo que dicen nuestros exportadores"

**Inglés:**
- Inversión: "What our investors say"
- Exportación: "What our exporters say"
