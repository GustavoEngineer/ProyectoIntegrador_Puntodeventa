export const rules = {
    "proyecto_metadata": {
        "tecnologia_base": "React",
        "paradigma": "Declarativo",
        "herramienta_construccion": "Vite (JSX)",
        "version_guia": "1.0.0"
    },
    "principios_fundamentales": {
        "enfoque_ui": "Basado en componentes independientes y reutilizables",
        "mecanismo_rendimiento": {
            "tecnologia": "Virtual DOM (VDOM)",
            "proceso_actualizacion": [
                "Generación de nuevo árbol VDOM",
                "Algoritmo de Diffing (Comparación)",
                "Actualización selectiva del DOM Real"
            ]
        }
    },
    "estándares_codificacion": {
        "sintaxis": "JSX (JavaScript XML)",
        "reglas_jsx": {
            "expresiones": "Encapsuladas en llaves {}",
            "atributos_clase": "className",
            "for_labels": "htmlFor",
            "event_handlers": "camelCase (ej. onClick)",
            "seguridad": "Prohibido dangerouslySetInnerHTML sin sanitización externa"
        },
        "convencion_nombres": {
            "componentes": "PascalCase",
            "hooks": "prefijo 'use' (ej. useValidation)",
            "variables_funciones": "camelCase"
        }
    },
    "gestion_datos_estado": {
        "props": {
            "definicion": "Paso de datos Padre -> Hijo",
            "naturaleza": "Inmutables (Solo lectura)",
            "tipos_permitidos": ["String", "Number", "Object", "Array", "Function"]
        },
        "estado_useState": {
            "proposito": "Datos internos cambiantes e interactividad",
            "regla_oro": "Inmutabilidad Estricta",
            "metodo_actualización": "Nunca mutar directamente; siempre reemplazar mediante la función setter"
        }
    },
    "arquitectura_proyecto": {
        "estructura_carpetas": {
            "src/components/common": "Elementos atómicos UI (Botones, Inputs)",
            "src/components/layout": "Estructura global (Header, Sidebar)",
            "src/hooks": "Lógica de negocio reutilizable (Custom Hooks)",
            "src/pages": "Componentes Contenedores (Lógica de Vista y Rutas)",
            "src/utils": "Funciones auxiliares (Formatters, Helpers)",
            "src/App.jsx": "Punto de entrada y enrutamiento"
        },
        "flujo_responsabilidad": {
            "pages": "Dueñas de la lógica de negocio y el estado",
            "components": "Presentación pura, reciben datos por props",
            "hooks": "Abstracción de lógica compleja"
        }
    },
    "calidad_y_optimizacion": {
        "principios_software": [
            "Single Responsibility Principle (SRP)",
            "Uso obligatorio de 'key' única en listas (.map)"
        ],
        "estrategias_optimizacion": {
            "React.memo": "Evitar re-renders de componentes si las props no cambian",
            "useCallback": "Memorizar funciones pasadas a hijos",
            "useMemo": "Memorizar cálculos costosos"
        }
    }
};