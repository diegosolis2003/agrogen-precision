# AgroGen Precision

Demo funcional de una PWA agrícola para pequeños y medianos productores de Guatemala. El agricultor sube una foto de una hoja, recibe un diagnóstico con IA y pide un bio-insumo formulado para su parcela.

> "Un médico para los cultivos." Todos los datos, casos y métricas de este repositorio son demostrativos.

## Stack

- React 19 + Vite 8
- React Router 7 (`BrowserRouter`)
- Tailwind CSS 4 (`@tailwindcss/vite`)
- Lucide React
- `vite-plugin-pwa` con Workbox y actualización automática
- Oxlint

## Ejecutar

```bash
npm install
npm run dev
```

Abre `http://localhost:5173`.

```bash
npm run build     # genera dist/ + manifest + service worker
npm run preview   # prueba la build de producción
npm run lint      # oxlint
```

La app usa `BrowserRouter`; cualquier servidor de producción debe redirigir rutas desconocidas a `index.html`.

## Rutas

| Ruta | Contenido |
| --- | --- |
| `/` | Landing: propuesta de valor, problema, flujo, muestras, bio-insumos, impacto, planes, FAQ |
| `/diagnostico` | Flujo de 3 pasos: foto/muestra → análisis IA → resultado y receta |
| `/diagnostico?muestra=tizon-temprano` | Preselecciona un caso de ejemplo (IDs: `tizon-temprano`, `roya-cafe`, `pulgon-tomate`, `deficiencia-nitrogeno`) |
| `/diagnostico?historial=dg-seed-1` | Abre un resultado guardado |
| `/panel` | Panel del productor: KPIs, historial, pedidos, suscripción y parcelas |
| `/metricas` | Métricas para inversionistas: MRR, ARR, LTV, CAC, embudo, mezcla de ingresos y uso de fondos |
| `/inversionistas` | Redirección a `/metricas` |

## Demo

- **Vista móvil / Vista web:** botón flotante. La vista móvil muestra la app dentro de un mockup de teléfono; la vista web usa el layout de escritorio. La preferencia se guarda en el navegador.
- **Diagnóstico:** elige una muestra o sube una imagen, selecciona una parcela y pulsa “Analizar con IA”. El análisis está simulado (~3 s) y crea un registro en el historial.
- **Pedido de bio-insumo:** desde el resultado se solicita la receta; el pedido avanza automáticamente de “Preparando” a “En camino” después de 7 s.
- **Suscripción:** plan Precisión de Q150/mes. Se puede renovar, activar si está inactiva o alternar la renovación automática.
- **Métricas:** MRR Q15,000 · ARR Q180,000 · LTV Q2,160 · CAC Q300 · margen bruto 68 % · payback 3 meses. El botón “Descargar one-pager” genera un resumen en texto.

## Persistencia

- Datos de la app: `localStorage` → `agrogen.precision.v1`
- Modo de vista: `localStorage` → `agrogen.precision.view`

Para volver al estado inicial, borra esas claves o usa `localStorage.clear()` en la consola.

## Estructura

```text
src/
  components/
    diagnose/    # pasos del diagnóstico
    landing/     # secciones de la landing
    layout/      # shell móvil/escritorio, header, sidebar, nav
    ui/          # logo, toasts, badges, gauge, toggle
  context/       # estado global + persistencia
  data/          # muestras, recetas, testimonios, métricas
  hooks/         # conteo animado
  lib/           # utilidades y formato
  pages/         # Landing, Diagnose, Dashboard, Metrics
public/
  icons/         # iconos PWA
  samples/       # imágenes SVG de casos
```

## PWA

La build genera `manifest.webmanifest`, `sw.js` y precachea los assets. El manifest se inicia en `./` y la navegación cae en `index.html`. Los iconos están en `public/icons/` (192, 512, maskable y apple-touch-icon).
