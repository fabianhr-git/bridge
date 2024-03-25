import { type Config } from "tailwindcss";


export default {
  content: [
    "{routes,islands,components}/**/*.{ts,tsx}",
  ],
  theme: {
    colors: {
      transparent: 'transparent',
      dark: {
        'zinc950': '#09090b',
        'slate800': '#1e293b',
        'slate900': '#0f172a',
        'slate950': '#020617',
        'stone950': '#0c0a09',
      },
      brand: {
        'violet950': '#2e1065',
        'indigo950': '#1e1b4b',
        'red700': '#b91c1c',
        'blue800': '#1e40af',
        'yellow': '#ca8a04',
        'lime600': '#65a30d',
      },
      neutrals: {
        'slate300': '#cbd5e1',
        'slate400': '#94a3b8',
        'slate500': '#64748b',
      }
    },
    extend: {
      boxShadow: {
        'halo': '0 0px 10px 3px rgba(0, 0, 0, 0)',
      }
    }
  },
  
} satisfies Config;
