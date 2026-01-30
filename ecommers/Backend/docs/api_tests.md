# API Test Commands (cURL)

Import these into Postman or run them in your terminal.

## Base URL
`http://localhost:3000/api`

## 1. TipoUsuario (User Types)

### Get All
```bash
curl -X GET http://localhost:3000/api/tipos-usuario
```

### Create
```bash
curl -X POST http://localhost:3000/api/tipos-usuario \
  -H "Content-Type: application/json" \
  -d '{"Descripcion": "Administrador"}'
```

### Update (Replace :id)
```bash
curl -X PUT http://localhost:3000/api/tipos-usuario/1 \
  -H "Content-Type: application/json" \
  -d '{"Descripcion": "Super Admin"}'
```

### Delete (Replace :id)
```bash
curl -X DELETE http://localhost:3000/api/tipos-usuario/1
```

---

## 2. Usuario (Users)

### Get All
```bash
curl -X GET http://localhost:3000/api/usuarios
```

### Create
```bash
curl -X POST http://localhost:3000/api/usuarios \
  -H "Content-Type: application/json" \
  -d '{
    "Correo": "test@example.com",
    "Contraseña": "password123",
    "Nombre": "Juan",
    "A_Paterno": "Perez",
    "A_Materno": "Lopez",
    "Telefono": "5551234567",
    "Id_TipoUsuario": 1
  }'
```

---

## 3. CategoriaPieza (Part Categories)

### Get All
```bash
curl -X GET http://localhost:3000/api/categorias-pieza
```

### Create
```bash
curl -X POST http://localhost:3000/api/categorias-pieza \
  -H "Content-Type: application/json" \
  -d '{"Descripcion": "Electrónica"}'
```

---

## 4. EstadoPieza (Part Statuses)

### Get All
```bash
curl -X GET http://localhost:3000/api/estados-pieza
```

### Create
```bash
curl -X POST http://localhost:3000/api/estados-pieza \
  -H "Content-Type: application/json" \
  -d '{"Descripcion": "Nuevo"}'
```

---

## 5. TipoPieza (Part Types)

### Get All
```bash
curl -X GET http://localhost:3000/api/tipos-pieza
```

### Create
```bash
curl -X POST http://localhost:3000/api/tipos-pieza \
  -H "Content-Type: application/json" \
  -d '{"Descripcion": "Hardware"}'
```

---

## 6. EquiposCompatibles (Compatible Equipment)

### Get All
```bash
curl -X GET http://localhost:3000/api/equipos-compatibles
```

### Create
```bash
curl -X POST http://localhost:3000/api/equipos-compatibles \
  -H "Content-Type: application/json" \
  -d '{"Nombre": "iPhone 13"}'
```

---

## 7. Pieza (Parts)

### Get All
```bash
curl -X GET http://localhost:3000/api/piezas
```

### Create
```bash
curl -X POST http://localhost:3000/api/piezas \
  -H "Content-Type: application/json" \
  -d '{
    "Nombre": "Pantalla OLED",
    "Descripcion": "Pantalla de reemplazo original",
    "Garantia": 12,
    "Precio": 150.00,
    "Cantidad": 10,
    "Id_CategoriaPieza": 1,
    "Id_EstadoPieza": 1,
    "Id_TipoPieza": 1
  }'
```

---
 
 ## 8. Pieza_Equipo (Part-Equipment Relationship)
 
 ### Get All
 ```bash
 curl -X GET http://localhost:3000/api/pieza-equipo
 ```
 
 ### Create (Associate)
 ```bash
 curl -X POST http://localhost:3000/api/pieza-equipo \
   -H "Content-Type: application/json" \
   -d '{
     "Id_Pieza": 1,
     "Id_EquipoCompatible": 1
   }'
 ```
 
 ### Update (Change Association)
 ```bash
 curl -X PUT http://localhost:3000/api/pieza-equipo/1/1 \
   -H "Content-Type: application/json" \
   -d '{
     "Id_Pieza": 1,
     "Id_EquipoCompatible": 2
   }'
 ```
 
 ### Delete (Dissociate)
 ```bash
 curl -X DELETE http://localhost:3000/api/pieza-equipo/1/1
 ```
 
 ---
 
 ## 9. EstadoOrden (Order Statuses)

### Get All
```bash
curl -X GET http://localhost:3000/api/estados-orden
```

### Create
```bash
curl -X POST http://localhost:3000/api/estados-orden \
  -H "Content-Type: application/json" \
  -d '{"Descripcion": "Pendiente"}'
```

---

## 10. Orden (Orders)

### Get All
```bash
curl -X GET http://localhost:3000/api/ordenes
```

### Create
```bash
curl -X POST http://localhost:3000/api/ordenes \
  -H "Content-Type: application/json" \
  -d '{
    "Id_Usuario": 1,
    "Id_EstadoOrden": 1,
    "Total": 300.00,
    "Detalles": [
      {
        "Id_Pieza": 1,
        "Cantidad": 2,
        "PrecioUnitario": 150.00
      }
    ]
  }'
```

---

## 11. DetalleOrden (Order Details)

### Get All
```bash
curl -X GET http://localhost:3000/api/detalles-orden
```

### Get By ID
```bash
curl -X GET http://localhost:3000/api/detalles-orden/1
```

### Get By Order ID
```bash
curl -X GET http://localhost:3000/api/detalles-orden/orden/1
```

### Create
```bash
curl -X POST http://localhost:3000/api/detalles-orden \
  -H "Content-Type: application/json" \
  -d '{
    "Id_Orden": 1,
    "Id_Pieza": 1,
    "Cantidad": 5,
    "PrecioUnitario": 120.00
  }'
```

### Update
```bash
curl -X PUT http://localhost:3000/api/detalles-orden/1 \
  -H "Content-Type: application/json" \
  -d '{
    "Id_Orden": 1,
    "Id_Pieza": 1,
    "Cantidad": 10,
    "PrecioUnitario": 110.00
  }'
```

### Delete
```bash
curl -X DELETE http://localhost:3000/api/detalles-orden/1
```

---

## 12. AtributosAdicionales (Additional Attributes)

### Get All
```bash
curl -X GET http://localhost:3000/api/atributos-adicionales
```

### Create
```bash
curl -X POST http://localhost:3000/api/atributos-adicionales \
  -H "Content-Type: application/json" \
  -d '{"Nombre": "Color"}'
```

---

## 13. ValorAtributo (Attribute Values)

### Get All
```bash
curl -X GET http://localhost:3000/api/valor-atributo
```

### Get By ID (Pieza + Atributo)
```bash
curl -X GET http://localhost:3000/api/valor-atributo/1/1
```

### Get By Pieza ID
```bash
curl -X GET http://localhost:3000/api/valor-atributo/pieza/1
```

### Create
```bash
curl -X POST http://localhost:3000/api/valor-atributo \
  -H "Content-Type: application/json" \
  -d '{
    "Id_Pieza": 1,
    "Id_Atributo": 1,
    "Valor": "Rojo"
  }'
```

### Update
```bash
curl -X PUT http://localhost:3000/api/valor-atributo/1/1 \
  -H "Content-Type: application/json" \
  -d '{
    "Valor": "Azul"
  }'
```

### Delete
```bash
curl -X DELETE http://localhost:3000/api/valor-atributo/1/1
```
